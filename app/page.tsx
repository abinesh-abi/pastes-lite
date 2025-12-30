'use client'
import { axiosInstance } from "@/config/axiosInstance";
import { PastFormBody, PastResponse } from "@/types/global";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

const textColor = 'text-blue-900'


export default function Home() {

  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<PastResponse | null>()
  const [formData, setFormData] = useState<PastFormBody>({
    content: '',
    max_views: null,
    ttl_seconds: null
  })

  const [formErr, setFormErr] = useState<{ content: string | null }>({
    content: null
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {

      e.preventDefault()
      // const { content, max_views, ttl_seconds } = formData
      if (!formData.content.trim()) {
        setFormErr(pre => { return { ...pre, content: 'Please Enter Paste Content ' } })
        return
      }

      const response = await axiosInstance.post<PastResponse>('/api/pastes', formData)
      setResult(response.data || null)

    } catch (error) {

    }


  }

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const content = e.target.value
    //content err handling

    if (!content.trim()) {
      setFormErr(pre => { return { ...pre, content: 'Please enter Paste Content' } })
    } else {
      setFormErr({ content: null })
    }
    //content state handling
    setFormData(val => {
      return { ...val, content }
    })
  }
  return (
    <div className="h-screen p-7">
      <div className="p-4  h-full bg-[#afcbf6] rounded-2xl">
        <form className=""
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            <h3 className=" text-3xl text-white">PastBin Lite</h3>
          </div>

          <div>
            <label htmlFor="content" className="text-blue-900 block mb-2.5 text-sm font-medium text-heading">Enter Text</label>
            <textarea id="content" rows={4} className="rounded bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Write your thoughts here..."
              onChange={handleContentChange}
              value={formData.content}
            ></textarea>
            <p className="text-red-500">{formErr.content}</p>
          </div>



          <div className="flex justify-between py-2">
            <div className="flex gap-1">
              <div>
                <label htmlFor="max_views">Maximum Views</label>
                <input
                  className="rounded bg-white px-4 py-2.5 text-center leading-5"
                  type="number" name="max_views" id="max_views" placeholder="Max Views"
                  onChange={(e) => setFormData(val => { return { ...val, max_views: Number(e.target.value) } })}
                  min={1}
                  value={formData.max_views || undefined}
                />

              </div>
              <div className="relative w-full lg:max-w-sm">
                <label htmlFor="ttl_seconds">Past Expiration</label>
                <select
                  id="ttl_seconds"
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  onChange={e => setFormData(val => { return { ...val, ttl_seconds: Number(e.target.value) } })}
                  value={formData.ttl_seconds || undefined}
                >
                  <option>Never</option>
                  <option value={5 * 60}>5 Minutes</option>
                  <option value={10 * 60}>10 Minutes</option>
                  <option value={60 * 60}>1 Hour</option>
                  <option value={60 * 60 * 24}>1 Day</option>
                  <option value={60 * 60 * 24 * 7}>1 Week</option>

                </select>
              </div>
            </div>
            <div>

              <button type="submit" className="rounded text-heading bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
                Create Paste
              </button>
            </div>
          </div>
        </form >
        <div>


          {
            result?.url &&
            <div className="flex justify-center gap-2 rou">
              <input type="text" className=" px-4 py-2.5 bg-gray-300 rounded-md"
                value={result?.url}
                disabled
              />

              <button
                onClick={() => {
                  copy(result.url);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
                }}
                className="flex items-center gap-x-3 px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {
                  !copied ?
                    'Copy Text'
                    : 'Copied'
                }
              </button>
            </div>
          }










        </div>
      </div>
    </div >
  );
}
