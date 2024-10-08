import { title } from "process"
import {z} from "zod"
export const UpdateBoard=z.object(
    {
        title:z.string({
            required_error:"title is required!",
            invalid_type_error:"title is required!" 


        }).min(3,{
            message:"Title is too short"
        }),
        id:z.string()
    }
)