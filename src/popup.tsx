import './main.css'

import { Button, Input } from 'antd'
import { useRef } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { CAN_I_USE, SHOW_HOST } from './config'

const Popup = () => {
  const inputRef = useRef(null)
  const [showHost, setShowHost] = useStorage(CAN_I_USE, SHOW_HOST)

  function handleSet(scope: string) {
    inputRef.current.value = scope
    setShowHost(scope)
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

      <div className="flex center justify-between gap-2 mt-2 pl-20">
        <Button onClick={() => handleSet(SHOW_HOST)} size="small">
          公众号
        </Button>

        <Button onClick={() => handleSet('*')} size="small">
          全部
        </Button>
      </div>
    </div>
  )
}

export default Popup
