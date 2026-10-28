import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

export function useCurrentUserState() {
  const { user, userLoading } = useUser();
  const id = user?.id ?? user?.email ?? null;

  useEffect(() => {
    if (id) localStorage.setItem("dehta-tradfi-uid", String(id));
  }, [id]);

  return {
    isPending: Boolean(userLoading) && !user,
    user: id
      ? { id: String(id), name: user?.name || user?.username || user?.email || "Account" }
      : null,
  };
}

export function DeskAccount() {
  const { user } = useCurrentUserState();
  if (!user) return null;
  return (
    <Link to="/dashboard" className="nav-link">
      {user.name}
    </Link>
  );
}
