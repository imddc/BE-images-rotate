import './main.css'

import { Button, Input } from 'antd'
import { useRef } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { CAN_I_USE, SHOW_HOST } from './config'

const Popup = () => {
  const inputRef = useRef(null)
  const [showHost, setShowHost] = useStorage(CAN_I_USE, SHOW_HOST)

  function handleReset() {
    inputRef.current.value = SHOW_HOST
    setShowHost(SHOW_HOST)
  }

  return (
    <div className="p w-150">
      <Input
        ref={inputRef}
        placeholder={showHost}
        value={showHost}
        onChange={(e) => {
          console.log(e.target.value)
          setShowHost(e.target.value)
        }}
      />

      <div className="flex center gap-2 mt-2 pl-20">
        <Button onClick={handleReset} size="small">
          恢复默认
        </Button>
      </div>
    </div>
  )
}

export default Popup
