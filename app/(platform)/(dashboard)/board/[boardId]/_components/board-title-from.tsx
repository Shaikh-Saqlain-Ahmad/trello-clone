"use client"
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { useState} from "react"

interface BoardTitleFormProps{
    data:Board;
}
export const BoardTitleForm=({
    data
}:BoardTitleFormProps)=>{
    const [isEditing,setIsEditing]=useState(false);
    const disableEditing=()=>{
        setIsEditing(false);
    }
    const enableEditing=()=>{
        //TODO: Focus input
        setIsEditing(true);
    }
    if(isEditing){
        return(
            <form className="flex items-center gap-x-2">
                <FormInput  id="title"
                onBlur={()=>{}}
                defaultValue={data.title}
                className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"/>
            </form>
        )
    }
    return(
        <Button 
        onClick={enableEditing}
        className="font-bold text-lg h-auto w-auto p-1 px-2"
        variant={"transparent"}>
            {data.title}
        </Button>
    )
}