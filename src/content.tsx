import cssText from 'data-text:~/src/main.css'
import type { PlasmoCSConfig } from 'plasmo'

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  all_frames: true
}

console.clear()

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const images = document.querySelectorAll('.rich_pages')
  console.log('接收到了', request, sender)
})

chrome.runtime.sendMessage(
  {
    info: '我是 content.js'
  },
  (res) => {
    // 答复
  }
)

const CustomButton = () => {
  return (
    <div className="p-4">
      <button className="text-red">Custom button</button>
    </div>
  )
}

export default CustomButton
