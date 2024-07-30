import { Navbar } from "../../_components/navbar";
import { OrgControl } from "./_components/org-control";

const OrganizationIdLayout =({children}:{children:React.ReactNode})=>{
    return(
        <>
        
            <OrgControl/>
            {children}
        </>
    )
}
export default OrganizationIdLayout;