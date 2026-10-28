import { classMap, emptyData, Loading } from "../../Tools/Misc"

type Props = {
    info: any,
    data: any,
    loading: boolean,
    emptyMessage: string
}

const Fection = ({info, data, loading, emptyMessage} : Props) => {

    return(
       <>
       {loading ? (<Loading/>) : (
        data ? (info) : (emptyData(emptyMessage))
       )}
       </>
    )
}


export default Fection