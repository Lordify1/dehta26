import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "@/App";
import axios from "axios";
import { toast } from "react-toastify";



const MiscContext = createContext()

export const MiscProvider = ({children}) => {
    const [selectedTrend, setSelectedTrend] = useState([])
    const [trends, setTrends] = useState([]);
    const [userProject, setUserProject] = useState([]);
    const [projects, setProjects] = useState([]);
    const [quests, setQuests] = useState([]);
    const [userAns, setUserAns] = useState([]);
    const [earnfiTasks, setEarnfiTasks] = useState([]);
    const [earnfiJobs, setEarnfiJobs] = useState([]);
    const [earnfiStats, setEarnFiStats] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [earnFiOffer, setEarnFiOffer] = useState([]);

    const getTrends = async () => {
            try{
                const res = await axios.post(`${apiUrl}/api/trendbet/get`);
                setTrends(res.data)
                setIsLoading(false)
            }catch(err){
                setIsLoading(false)
                
            }
    }

    const getUserProject = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/project/get/project`);
            setUserProject(res.data.project)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            
        }
    }

    const getQuests = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/quest/get`);
            setQuests(res.data.quests)
            // console.log(res.data.quests)
            setUserAns(res.data.userAnswers)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            
        }
    }

    const getProjects = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/project/all`);
            setProjects(res.data.projects)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            
        }
    }

    const getEarnFiOffers = async () => {
        try {
            const offers = await axios.post(`${apiUrl}/api/earnfi`);

            setEarnfiJobs(offers.data?.jobs || []);
            setEarnfiTasks(offers.data?.tasks || []);
            setEarnFiStats(offers.data?.stats || {});
            setIsLoading(false);

            return offers.data; // optional, but nice
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    
    return(
        <MiscContext.Provider value={{ trends ,selectedTrend, setSelectedTrend, getTrends, isLoading, setIsLoading, getUserProject, userProject, projects, setProjects, getProjects, quests, getQuests, userAns, setUserAns, getEarnFiOffers, earnfiJobs, setEarnfiJobs, earnfiTasks, setEarnfiTasks, earnfiStats, setEarnFiStats, earnFiOffer, setEarnFiOffer }}>
            {children}
        </MiscContext.Provider>
    )
}

export const useMisc = () => useContext(MiscContext)