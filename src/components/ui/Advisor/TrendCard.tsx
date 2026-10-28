import { classMap, ProgressBar } from "@/components/Tools/Misc";
import { useMisc } from "@/context/MiscContext";
import { useOffCanvas } from "@/context/OffCanvasContext";
import { FaCopy, FaEllipsisH, FaEllipsisV, FaEye, FaEyeDropper, FaShare, FaTrash, FaVoteYea } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { apiUrl, appUrl } from "../../../App";
import { toast } from "react-toastify";
import SendRequest from "../../Tools/SendRequest";
import { EllipsisDropdown, Lens } from "../../Tools/Misc";
import TrendImg from '../../../assets/dehta_logo.png'
import { useState } from "react";


type creator = {
    username: string,
    avatar: string
}

type votes = {
    id: number
}

type Props = {
    id: any,
    user_id: number,
    title: string,
    body: string,
    target_votes: number,
    hash: any,
    commission_rate: any,
    reward_per_correct: any,
    minumum_vote_to_payout: number,
    status: string,
    creator: creator,
    votes: votes,
    data: any,
    clickFunction?: () => {}
};

const TrendCard = ({id,user_id, title,body, target_votes,hash,commission_rate,reward_per_correct,minumum_vote_to_payout,status, creator, votes, data, clickFunction}: Props) => {
    const {setSelectedTrend, getTrends} = useMisc()
    const {setShowOffCanvas, setOffId, SetOfftitle} = useOffCanvas()
    const {user, getUser } = useUser();
    const [localStatus, setLocalStatus] = useState(status);

    const trend = {
        id: id,
        user_id: user_id,
        title: title,
        body: body,
        target_votes: target_votes,
        hash: hash,
        commission_rate: commission_rate,
        reward_per_correct: reward_per_correct,
        minumum_vote_to_payout: minumum_vote_to_payout,
        status: status,
        creator: creator,
        votes: votes
    }

    const isOwner = user_id === user.id


    const deleteTrend = async () => {
        try{
            const res = await axios.post(`${apiUrl}/trendbet/delete/${id}`)
            toast.success(res?.message)
        }catch(err){
            console.log(err)
        }
    }

    const updateStatus = async (id:any, stat:any) => {
        try{
          const res = await axios.post(`${apiUrl}/api/trendbet/set_status/${id}/${stat}`);
          if(res.status === 200){
            status = stat;
            getUser();
            getTrends();
          }
        }catch(err){
          toast.error('Something went wrong');
          console.log(err)
        }
    }

    return(
        <section
        key={id}
        className={`envelope-card ${classMap.dehtaCard()} flex flex-col itesm-center justify-center p-2`}
        >
            {/* header  */}
            <div className="flex flex-row items-center justify-between w-full p-1">
                <div className="flex flex-row items-center">
                    <img src={creator.avatar || "/logo.svg"} className="rounded-full w-7 h-7 object-cover bg-accent me-1" loading="lazy" alt="" />
                    <h3>{creator.username}</h3>
                </div>
                {/* {user?.id === user_id && (
                    <EllipsisDropdown>
                        <SendRequest
                            url={`/api/trendbet/delete/${id}`}
                            method="post"
                            deleteBtn={true}
                            awaitConfirmation={true}
                            onResponse={() => {
                                getUser()
                            }}
                        />
                    </EllipsisDropdown>
                )} */}
                {(isOwner) && (
                    <button 
                    title='Toggle Project Status'
                    className={`p-2 transition-all duration-500 rounded-2xl w-10 border-1 flex ${localStatus === 'draft' ? 'items-start justify-start bg-muted-foreground' : `items-end justify-end bg-[var(--owner)]`}`}
                    onClick={async () => {
                    const newStatus = localStatus === 'draft' ? 'active' : 'draft';
                    await updateStatus(id, newStatus);
                    setLocalStatus(newStatus);
                    }}
                    >
                    <span className={`${localStatus === 'draft' ? 'bg-muted' : 'bg-[var(--ceo)]'} rounded p-1 transition-all duration-500`}></span>
                    </button>
                )}
            </div>
            {/* body */}
            <div className={`flex flex-col items-center justify-center w-full ${classMap.section} text-start overflow-hidden h-55`}>
                <p>{body}</p>
                <div className="w-full h-50 overflow-hidden rounded-md mt-1">
                    <img
                        src={data.image || `/logo.svg`}
                        // alt={'trend img'}
                        loading="lazy"
                        className="w-full h-50 object-cover mb-2"
                        onError={(e) => e.currentTarget.src = '/placeholder.png'}
                    />
                </div>
            </div>
            {/* footer  */}
            <div className="flex flex-col items-center justify-center w-full p-1">
                {votes.length !== target_votes ? (
                <>
                <ProgressBar
                current={votes?.length}
                destination={target_votes}                
                />
                <div className="grid grid-cols-3 gap-1 w-full p-1 items-center justify-center">
                    <button 
                    onClick={() => {
                        setSelectedTrend([data]);
                        setShowOffCanvas(true);
                        setOffId('viewTrend');
                        SetOfftitle(`Trend View`)
                    }} className={`${classMap.button()}`}><FaEye className={`inline`}/></button>
                    <button disabled className={`${classMap.button()} opacity-40`}><FaShare className={`inline`}/></button>
                    <button disabled className={`${classMap.button()} opacity-40`}><FaCopy className={`inline`}/></button>
                </div>
                </>
                ) : (
                    <div className="flex flex-col gap-1 w-full p-1 items-center justify-center opacity-70">
                        <p>Trend is Closed</p>
                        <button 
                        onClick={() => {
                            setSelectedTrend([data]);
                            setShowOffCanvas(true);
                            setOffId('viewTrend');
                            SetOfftitle(`Trend View`)
                        }} className={`${classMap.button()} w-full`}>View Results</button>
                    </div>
                )}
            </div>
        </section>
    )
}


export default TrendCard