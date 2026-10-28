import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { likeProject } from "@/components/Tools/Misc";
import { useFetch } from "@/context/FetchContext";
import { apiUrl } from "@/dapp";
import axios from "axios";
import { classMap, NotAuth } from "../../Tools/Misc";

interface ProjectLikeProps {
  likes: number;
  project_id: number | string;
  user_id?: number | string;
  guest: boolean;
  slug: string;
  user?: {
    total_lens?: number;
  };
}

const ProjectLike: React.FC<ProjectLikeProps> = ({
  likes,
  project_id,
  user_id,
  guest,
  slug,
  user,
}) => {
  const { store } = useFetch();

  const [likeCount, setLikeCount] = useState<number>(likes);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Guest ID (client-only)
  const guestId = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem("like_id");
    } catch {
      return null;
    }
  }, []);

  // Sync initial liked state from store
  useEffect(() => {
    if (typeof store?.project?.has === "boolean") {
      setLiked(store.project.has);
    }
  }, [store?.project?.has]);

  // Fetch latest likes count
  useEffect(() => {
    const controller = new AbortController();

    const fetchLikes = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/project/get/${project_id}/${slug}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ guestId }),
            signal: controller.signal,
          },
        );

        if (!res.ok) return;
        const data = await res.json();

        setLikeCount(data?.data?.project?.likes_count ?? likes);
        if (typeof data?.data?.project?.has === "boolean") {
          setLiked(data.data.project.has);
        }
      } catch (err: any) {
        if (err.name === "AbortError") return;
      }
    };

    fetchLikes();
    return () => controller.abort();
  }, [project_id, slug, guestId, likes]);

  // Handle like / unlike
  const handleLike = useCallback(async () => {
    if (loading) return;
    setError(null);

    // 🔒 Balance check (only when liking)
    if (!liked && !guest) {
      if ((user?.total_lens ?? 0) < 20) {
        setError("Insufficient Lens balance");
        return;
      }
    }

    setLoading(true);

    const nextLiked = !liked;
    setLiked(nextLiked);

    // Optimistic count update
    setLikeCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      await likeProject(project_id, user_id, guest);

      // Re-sync from server (safety)
      try {
        const r = await axios.post(
          `${apiUrl}/api/project/get/${project_id}/${slug}`,
          { guestId },
        );

        setLikeCount(r?.data?.project?.likes_count ?? likeCount);
        if (typeof r?.data?.project?.has === "boolean") {
          setLiked(r.data.project.has);
        }
      } catch {
        // keep optimistic state
      }
    } catch {
      // rollback on failure
      setLiked(liked);
      setLikeCount(likes);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [
    liked,
    loading,
    project_id,
    user_id,
    guest,
    slug,
    guestId,
    likes,
    likeCount,
    user?.total_lens,
  ]);

  // Keyboard accessibility
  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleLike();
    }
  };

  return user ? (
    <div className={`${classMap.pageSection()}`}>
      <div className="flex items-center justify-center text-sm text-primary">
        <div className="flex flex-col items-center gap-1 text-center">
          <button
            type="button"
            onClick={handleLike}
            onKeyDown={onKeyDown}
            aria-pressed={liked}
            aria-label={liked ? "Unlike project" : "Like project"}
            disabled={loading}
            className="inline-flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-60"
          >
            <FaThumbsUp
              className={`transition-colors ${
                liked ? "text-[var(--owner)]" : "hover:text-gray-500"
              }`}
            />
            <span>{likeCount} Likes</span>
          </button>

          <small className="text-[8px] text-gray-400">
            20 Lens will be deducted
          </small>
        </div>
      </div>
    </div>
  ) : (
    <NotAuth action="Like" />
  );
};

export default ProjectLike;
