'use client'
import Link from 'next/link'
import {Plus} from "lucide-react"
import { useLocalStorage } from 'usehooks-ts'
import { useOrganization,useOrganizationList } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Accordion } from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { NavItem } from './navbar-item'
interface SideBarProps{
    storageKey?:string
}
export const SideBar=({
    storageKey="t-sidebar-state"
}:SideBarProps)=>{
    const [expanded,setExpanded]=useLocalStorage<Record<string,any>>(storageKey,{});
    const {organization:activeOrganization,isLoaded:isLoadedOrg}=useOrganization();
    const {userMemberships,isLoaded:isLoadedOrgList}=useOrganizationList({userMemberships:{infinite:true}});
    const defaultAccrodionValue:string[]=Object.keys(expanded).reduce((acc:string[],key:string)=>{
        if(expanded[key]){
            acc.push(key)
        }
        return acc;
    },[]);
    const onExpand=(id:string)=>{
        setExpanded((curr)=>({
            ...curr,
            [id]:!expanded[id]
        }))
    };
    if(!isLoadedOrg||!isLoadedOrgList||userMemberships.isLoading){
        return(
            <>
            <Skeleton/>
            </>
        )
    }
    return(
        <>
        <div className='font-medium text-xs flex items-center mb-1'>
            <span className='pl-4'>
        Workspaces
            </span>
            <Button
            asChild
            type='button'
            size='icon'
            variant='ghost'
            className='ml-auto'>
                <Link href='/select-org'>
                <Plus className='h-4 w-4'></Plus>
                </Link>
            </Button>
        </div>
        <Accordion type='multiple'defaultValue={defaultAccrodionValue}className='space-y-2'>
            {userMemberships.data.map(({organization})=>(
               <NavItem
               key={organization.id}
               isActive={activeOrganization?.id===organization.id}
               organization={organization}
               isExpanded={expanded[organization.id]}
               onExpand={onExpand}
               >
                
               </NavItem>
            ))}

        </Accordion>
        </>
    )
}