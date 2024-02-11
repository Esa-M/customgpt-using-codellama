import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'


import CodeGenerator from './Components/CodeGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CodeGenerator></CodeGenerator>
    </>
  )
}

export default App
