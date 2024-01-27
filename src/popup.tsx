import { useEffect, useRef, useState } from 'react'

import './main.css'

function IndexPopup() {
  const [imgList, setImgList] = useState([])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      console.log('接收了来自 content.js的消息', req.info)
      sendResponse('我收到了你的来信')
    })
  }, [])

  async function handleTrigger() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      chrome.tabs.sendMessage(tab.id, { type: 'request images' }, (res) => {
        console.log(res, 'resCb')
      })
    })
  }

  return (
    <div className="p-4">
      <button onClick={() => handleTrigger()}>trigger</button>
    </div>
  )
}

export default IndexPopup
