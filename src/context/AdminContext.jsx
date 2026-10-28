import { createContext, useContext, useState } from "react";
import { apiUrl } from "@/App";
import axios from "axios";

const AdminContext = createContext()

export const AdminProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [AdminLoading, setAdminLoading] = useState(true);
    const [glasses, setGlasses] = useState(null);
    const [dbData, setDbData] = useState({});
    const [earnFiOffers, setEarnfiOffers] = useState([]);
    const [earnfiSubmissions, setEarnfiSubmissions] = useState([]);
    const [trendbets, setTrendbets] = useState([]);
    const [selectedVotes, setSelectedVotes] = useState([])

    const getGlasses = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/admin/glass/get`);
            setGlasses(res.data)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
        }
    }

    const getDBData = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/admin/db_data`);
            setDbData(res.data);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);
            console.log(err)
        }
    }


    const getEarnFiOffers = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/admin/earnfi/offers`);
            setEarnfiOffers(res.data);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);
            console.log(err)
        }
    }


    const getEarnFiSubmissions = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/admin/earnfi/submissions`);
            setEarnfiSubmissions(res.data);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);
            console.log(err)
        }
    }
    
    const getTrendbets = async () => {
        try{
            const res = await axios.post(`${apiUrl}/api/admin/trendbet`);
            console.log(res)
            setTrendbets(res.data);
            setAdminLoading(false);
        }catch(err){
            setAdminLoading(false);
            console.log(err)
        }
    }

    return(
        <AdminContext.Provider value={{ isLoading, setIsLoading, glasses, getGlasses, dbData, getDBData, getEarnFiOffers, earnFiOffers, setEarnfiOffers, earnfiSubmissions, getEarnFiSubmissions, getTrendbets, trendbets, setTrendbets, AdminLoading, setAdminLoading, selectedVotes, setSelectedVotes }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)