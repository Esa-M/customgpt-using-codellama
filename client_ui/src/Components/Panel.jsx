import React, { useEffect, useRef, useState } from 'react'

import { MdDeleteOutline, MdContentCopy, MdDelete   } from "react-icons/md";
import { PiShootingStarFill } from "react-icons/pi";
import { PiShootingStarThin } from "react-icons/pi";
import {ReactTyped} from "react-typed"

import Md from "react-markdown"


import axios from 'axios';
import { withOptions } from 'tailwindcss/plugin';

export default function Panel({historyCount, setHistoryCount, history, setHistory, historyIndex}) {
  
    console.log(historyIndex)
    const chatHistory = window.localStorage.getItem(`chat${historyIndex}`)
    const [load, setLoad] = useState(false)
    const [Copy, setCopy] = useState(false)
    const [Chat, setChat] = useState( [] )
    const [Query, setQuery] = useState('')
    const [DeleteHover, setDeleteHover] = useState(false)
    const ChatSnippetRef = useRef(null)
    
  

    const ScrollToBottom = () =>{
      ChatSnippetRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const GenerateResponse = async(Query) =>{
        const res = await axios.post("http://localhost:8000/code_generator", {request: Query})
        
        
        const regex = /```([\s\S]*?)```/g;
        const matches = res.data.response.match(regex);
        
        const ChatSnapShot = {query: Query, response: res.data.response,  codes: matches || []}
        setChat(Chat => [...Chat, ChatSnapShot])

        
       
        setLoad(load => false)
        setQuery(Query => "")

        if(Chat.length > 1){
          ScrollToBottom()
         
        }
        window.localStorage.setItem(`chat${historyIndex}`, JSON.stringify(Chat))
    
    }

    console.log(Chat)
    useEffect(()=>{},[history])
   
  return (
    <div data-theme="dim" className=" min-h-screen h-full bg-base-200 lg:w-4/5 w-full relative ">
      <div className="navbar bg-base-200 sticky top-0  "><a className="p-3 Title-font lg:text-3xl">Code Generator</a></div>
  
        <div className='p-14  h-40rem  overflow-y-scroll'>
            {Chat.map((context, idx) => {
              
                return (<><div ref={(Chat.length - 1 == idx) ? ChatSnippetRef : null} className={`flex flex-col text-left mt-5 relative ${(Chat.length != 1 && idx != Chat.length-1) ? ` `:``}`} key={idx}>
                      <div className='flex flex-row justify-center align-middle absolute top-0 right-0 p-1'>
                        <div className='p-1' onMouseEnter={()=>{setDeleteHover(true)}} onMouseLeave={()=>{setDeleteHover(false)}}> 
                        { DeleteHover ? <MdDelete className='cursor-pointer' onClick={()=>{const updatedChat = Chat.filter((c,uidx)=> uidx != idx); setChat(updatedChat)}} ></MdDelete> :   <MdDeleteOutline className='cursor-pointer' ></MdDeleteOutline> } </div>
                      
                      </div>
                    <div className=' text-white/80  flex flex-row  mt-2'>
                      <div className='w-5px h-5px p-1'>
                        <div className='p-2  bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mr-2'></div>
                        </div> <pre className='whitespace-pre-wrap'>{context.query}</pre></div>
                    <pre className='whitespace-pre-wrap mt-2 font-normal p-10'> 
                   
                      <ReactTyped strings={[context.response]} typeSpeed={10}></ReactTyped>
                 
                    </pre>
                    <br />

                    {context.codes.map((code, id)=>{
                            return (<pre className=' p-3 mb-5 rounded-md bg-black  relative' key={id}>
                              <MdContentCopy className=' absolute top-3 right-3 hover:text-white cursor-pointer rounded-full'></MdContentCopy>
                              {code}</pre>)
                        })}
                </div>
                        
                        
                        
                </>)
            })}
  
        </div>
        <div className='lg:w-full p-3 z-50 absolute bottom-0 bg-base-200  flex flex-row gap-2 justify-center align-center'>
          <div className='self-center border border-gray-600 hover:border-gray-500 active:border-gray-500 rounded-2xl p-2 w-3/4 h-16  flex flex-row gap-2 justify-center align-center'>
            <input type="text" onChange={(e)=>{setQuery(e.target.value)}} value={Query} placeholder='Write your prompt here ...' className='w-full p-2 bg-transparent focus:border-none focus:outline-none text-wrap' />
            { (load) ? ( <PiShootingStarFill className='self-center h-8 w-8 p-2 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-ping'></PiShootingStarFill> ): <PiShootingStarThin className='h-8 w-8 self-center ml-3 cursor-pointer p-1  hover:text-white' onClick={()=>{GenerateResponse(Query);setLoad( load => true)}}></PiShootingStarThin>}
          </div>
        </div>
        
  </div>
  )
}
