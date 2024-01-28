import './main.css'

import { Button, Input } from 'antd'
import { useRef } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

const SHOW_HOST = 'mp.weixin.qq.com'

const Popup = () => {
  const inputRef = useRef(null)
  const [showHost, setShowHost] = useStorage('canIUse', SHOW_HOST)

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
        onChange={(e) => setShowHost(e.target.value)}
      />

      <div className="flex center gap-2 mt-2">
        <Button onClick={handleReset} size="small">
          恢复默认
        </Button>
      </div>
    </div>
  )
}

export default Popup
