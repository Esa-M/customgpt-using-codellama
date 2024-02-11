import React from 'react'
import { IoMdSettings } from "react-icons/io";
import { GrChatOption } from "react-icons/gr"

export default function LeftPanel({}) {
  return (
    <div data-theme="black" className="hero min-h-screen bg-base-200/50 lg:w-1/5 w-0">
    <div className="hero-content text-center min-h-screen w-full relative flex flex-col ">
    <div className='absolute top-1 p-5 flex flex-col -2 w-4/5 '>
        <div className='flex flex-row justify-center text-white/80 hover:text-white hover:bg-gray-800 align-middle gap-2 font-semibold cursor-pointer  rounded-md  p-1' onClick={()=>{const preVal = parseInt(window.localStorage.getItem("count")); window.localStorage.setItem("count", preVal+1); setHistoryIndex(window.localStorage.getItem("count"))}}> <GrChatOption className='self-center'></GrChatOption> New chat</div>
      </div>
      <div className='absolute bottom-1 p-5 flex flex-col border-t-2 w-4/5 border-white/60'>
        <div className='flex flex-row justify-center text-white/80 hover:text-white hover:bg-gray-800 align-middle gap-1 font-semibold cursor-pointer  rounded-md  p-1'> <IoMdSettings className='self-center'></IoMdSettings> Settings</div>
      </div>
       
    </div>
  </div>
  )
}
