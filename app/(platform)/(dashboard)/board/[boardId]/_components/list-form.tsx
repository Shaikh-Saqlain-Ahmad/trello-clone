"use client"
import { Button } from "@/components/ui/button";
import  {ListWrapper} from "./list-wrapper";
import {  Plus, X } from "lucide-react";
import {FormInput} from "@/components/form/form-input";
import {useRef,ElementRef, useState} from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-actions";
import { createList } from "@/actions/createList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ListForm=()=>{
    const router=useRouter();
    const params=useParams();
    const [isEditing,setIsEditing]=useState(false);
    const formRef=useRef<ElementRef<"form">>(null);
    const inputRef=useRef<ElementRef<"input">>(null);

    const enableEditing=()=>{
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
        })
    }
    const disableEditing=()=>{
        setIsEditing(false)
    }
    const {execute,fieldErrors}=useAction(createList,{
        onSuccess(data) {
            toast.success(`List "${data.title}"created`);
            disableEditing();
            router.refresh()
            
        },
        onError(error) {
            toast.error(error);
        },
    })
    const onKeyDown=(e:KeyboardEvent)=>{
        if(e.key==="Escape"){
            disableEditing();
        }
    }
    useEventListener('keydown',onKeyDown);
    useOnClickOutside(formRef,disableEditing);
    const onSubmit=(formData:FormData)=>{
        const title=formData.get("title") as string;
        const boardId=formData.get("boardId")as string;
        execute({
            title,
            boardId
        })
    }
    if(isEditing){
        return(
            <ListWrapper>
                <form 
                action={onSubmit}
                ref={formRef}
                className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
                >
                    <FormInput ref={inputRef}
                    errors={fieldErrors}
                    id="title"
                    placeholder="Enter list title..."
                    className="text-sm px-2 py-1 h-7 font font-medium border-transparent hover:border-input focus:border-input transition"
                    />
                    <input hidden value={params.boardId}
                    name="boardId"
                    />
                    <FormSubmit>
                        Add list
                    </FormSubmit>
                    <Button onClick={disableEditing}
                    size={"sm"}
                    variant={"ghost"}
                    >
                        <X className="h-5 w-5"/>
                    </Button>
                </form>
            </ListWrapper>
        )
    }
    return(
        <ListWrapper>
           <Button 
           onClick={enableEditing}
           className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
        
            <Plus className="h-4 w-4 mr-2"/>
            Add a list
           </Button>
        </ListWrapper>
    )
}