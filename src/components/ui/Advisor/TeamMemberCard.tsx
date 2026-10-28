import { toJson } from "@/components/Tools/Misc"


const TeamMemberCard = (data:any) => {

    const team = data ? toJson(data) : []

    console.log(team)

    return(
        <></>
    )
}


export default TeamMemberCard