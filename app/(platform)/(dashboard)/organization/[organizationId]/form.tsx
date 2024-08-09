"use client";

import { createBoard } from "@/actions/board/index"



import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-actions";
import { FormInput } from "@/components/form/form-input";

export const Form=()=>{
    const {execute,fieldErrors}=useAction(createBoard,{
        onSuccess(data) {
            console.log(data,"success")
        },
        onError(error) {
            console.error(error)
        },
    });
    const onSubmit=(formData:FormData)=>{
        const title=formData.get("title") as string;
        execute({title})

    }
    return(
        <form action={onSubmit}>
           <div className="flex flex-col space-y-2">
          <FormInput errors={fieldErrors} id={"title"} label="Board Title"/>
           </div>
           <FormSubmit>
            Save
           </FormSubmit>
        </form>
    )
}