import React, { useContext } from 'react';
import {
  classMap,
  likeProject,
  stringToJson,
} from '@/components/Tools/Misc';
import { OffCanvasContext } from '@/context/OffCanvasContext';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../../App';
import { FaEye, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

type Props = {
  id: number;
  name: string;
  tagline: string;
  status: string;
  quality_status: string;
  stage: string;
  industry: string;
  slug: string,
  rating: number;
  likes_count: number;
  views_count: number;
  comments_count: number;
  founder: any;
  description: string;
  image: string;
  userId?: number;
  authUserId?: number;
  hideButtons?: boolean;
  showForm?: any;
  more?: any;
  className?: any;
  team?: JSON;
  isDB?: boolean;
  logo?: string
};

export default function ProjectCard({
  id,
  name,
  tagline,
  status,
  quality_status,
  stage,
  industry,
  rating,
  slug,
  likes_count,
  views_count,
  comments_count,
  founder,
  description,
  logo,
  userId,
  authUserId,
  hideButtons = false,
  more,
  className,
  isDB
}: Props) {


  const isOwner = userId === authUserId;
  const {setShowOffCanvas, setOffData} = useContext(OffCanvasContext)

  const user = useAuth();
  const { user: account } = useUser();

  const [localStatus, setLocalStatus] = React.useState(status);

  const user_id = user?.user ? authUserId : Math.random().toString(36).substring(2,20);

  const jsonIndustry = stringToJson(industry)

  const guest = user?.user ? false : true

  const updateStatus = async (id, stat) => {
    try{
      const res = await axios.post(`${apiUrl}/api/project/set_status/${id}/${stat}`);
      if(res.status === 200) status = stat;
    }catch(err){
      console.log(err)
    }
  }

  const like = async () => {
    if (!account) {
      toast.error('Login to like a project');
      return;
    }
    if ((account.total_lens ?? 0) < 20) {
      toast.error('Each like costs 20 Lens');
      return;
    }
    try {
      await likeProject(id, account.id, false);
      toast.success('Liked. 20 Lens spent.');
    } catch {
      toast.error('Like failed');
    }
  };

  return (
    <div
      key={id}
      className={`build-shell ${classMap.dehtaCard()} overflow-hidden ${className || ''}`}
    >
      <div className="build-core">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="truncate text-lg font-bold text-[#3dffc5]">{name}</h3>
            {(isOwner && isDB) && (
            <button
              title='Toggle Project Status'
              className={`p-2 transition-all duration-500 rounded-2xl w-10 border-1 flex ${localStatus === 'draft' ? 'items-start justify-start bg-muted-foreground' : `items-end justify-end bg-[var(--owner)]`}`}
              onClick={async () => {
              const newStatus = localStatus === 'draft' ? 'published' : 'draft';
              await updateStatus(id, newStatus);
              setLocalStatus(newStatus);
              }}
            >
              <span className={`${localStatus === 'draft' ? 'bg-muted' : 'bg-[var(--ceo)]'} rounded p-1 transition-all duration-500`}></span>
            </button>
            )}
        </div>
        <div className='h-16 overflow-hidden rounded-xl'>
          <img
          src={logo || '/logo.svg'}
          alt={`Project ${name}`}
          className="h-16 w-full rounded-md object-cover"
        />
        </div>
        {!hideButtons && (
          <div className="build-actions">
            <Link to={`/buildfi/${id}/${slug}`} className="gold-view" aria-label="View">
              <FaEye />
            </Link>
            <button type="button" className="lens-like" onClick={like} aria-label="Like for 20 Lens">
              <FaHeart />
              <span>20</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
