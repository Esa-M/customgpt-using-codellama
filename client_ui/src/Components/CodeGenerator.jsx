import React, { useEffect, useState } from 'react'

import Panel from './Panel'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'


export default function CodeGenerator() {

 
  

  return (
    <div className='hero min-h-screen bg-base-200 flex justify-center align-center'>
    <LeftPanel></LeftPanel>
    <Panel ></Panel>
    {/* <RightPanel historyCount={historyCount} setHistory={setHistory} history={history} historyIndex={historyIndex} setHistoryIndex={setHistoryIndex}></RightPanel> */}
   </div>
  )
}
