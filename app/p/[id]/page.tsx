'use client'
import { axiosInstance } from "@/config/axiosInstance";
import { DbContent } from "@/types/global";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState('')
    const [contentErr, setContentErr] = useState(false)


    async function fetchPastes() {
        try {
            setLoading(true)
            const response = await axiosInstance.get<DbContent>(`/api/pastes/${params.id}`)
            setContent(response.data.content)
            console.log(response.data)

        } catch (error) {
            setContentErr(true)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPastes()
    }, [params?.id])


    return (
        <div className="h-screen p-7">
            <div className="p-4  h-full bg-[#afcbf6] rounded-2xl">

                {
                    loading ?
                        <div className="flex justify-center h-full items-center" >
                            <p className="text-3xl">Loading...</p>
                        </div>
                        :
                        content?
                        <>
                            <h3 className="text-center text-2xl p-2 text-gray-800">Paste Content</h3>
                            <div className="flex bg-white rounded p-3 min-h-[60%]">
                                <p>{content}</p>
                            </div>
                        </>
                        :
                        (!content || contentErr ) &&

                        <div className="flex flex-col justify-center h-full items-center" >
                            <p className="text-5xl">404</p>
                            <p className="text-3xl"> Pastes Not Fount</p>
                        </div>
                }
                {
                }
            </div>
        </div>
    );
}
