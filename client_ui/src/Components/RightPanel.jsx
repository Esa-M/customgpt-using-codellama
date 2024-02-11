import React, { useEffect, useState } from 'react'

export default function RightPanel({historyCount, setHistory, history, historyIndex, setHistoryIndex}) {
  const [chat, setChat] = useState([])
  const [histroyCount, setHistoryCount] = useState(parseInt(window.localStorage.getItem("count")))


  useEffect(()=>{
    
    for(let i = 0; i <= parseInt(historyCount) ; i++ ){
      const Chat = window.localStorage.getItem(`chat${i}`)
      console.log(Chat)

      setChat([...chat, JSON.parse(Chat)[0]])
     
    }
    
      
    
  }, [])

  console.log(chat)
  
  return (
    <div data-theme="black" className="hero min-h-screen bg-base-200/50 lg:w-1/5 w-0  ">
    <div className="hero-content text-center ">
     <div className='h-40rem p-1  overflow-y-scroll'>
        History
      {/* {chat.map((context, id)=>{
        return (<div className='w-full overflow-hidden p-1 h-8 ' key={id} onClick={()=>{setHistoryIndex(historyIndex => historyCount)}}>{ chat[0].response }</div>)
      })} */}
     </div>
    </div>
  </div>
  )
}
