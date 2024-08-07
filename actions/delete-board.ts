"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBoard(id:string) {
    await db.board.delete({
        where:{
            id
        }
    })
    revalidatePath("/organization/org_2jyREc98NOBPjO4hZMAvxialo0i");
    redirect("/organization/org_2jyREc98NOBPjO4hZMAvxialo0i")
}