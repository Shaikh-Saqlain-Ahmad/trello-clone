import {startCase} from "lodash"
import { Navbar } from "../../_components/navbar";
import { OrgControl } from "./_components/org-control";
import { auth } from "@clerk/nextjs/server";


export async function generateMetaData() {
    const { orgSlug } = await auth();
    return {
        title: startCase(orgSlug || "organization")
    };
}

const OrganizationIdLayout =({children}:{children:React.ReactNode})=>{
    return(
        <>
        
            <OrgControl/>
            {children}
        </>
    )
}
export default OrganizationIdLayout;