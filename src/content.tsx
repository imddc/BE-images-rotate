import { StyleProvider } from '@ant-design/cssinjs'
import { Button, Image } from 'antd'
import cssText from 'data-text:~/src/main.css'
import antdResetCssText from 'data-text:antd/dist/reset.css'
import type { PlasmoCSConfig, PlasmoGetShadowHostId } from 'plasmo'
import { useEffect, useRef, useState } from 'react'

const HOST_ID = 'engage-csui'
export const getShadowHostId: PlasmoGetShadowHostId = () => HOST_ID

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = antdResetCssText + cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  all_frames: true
}

console.clear()

function getImagesRealUrl(images: NodeListOf<HTMLImageElement>) {
  return Array.from(images)
    .map((img) => img.dataset.src)
    .filter((v) => Boolean(v))
}

const Content = () => {
  const [imgList, setImgList] = useState([])
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const images = document.querySelectorAll('img')
    setImgList(getImagesRealUrl(images))
  }, [])

  return (
    <StyleProvider container={document.getElementById(HOST_ID).shadowRoot}>
      <div className="p-4 fixed top-0 min-h-100vh w-full left-0 bg-gray-50">
        <div className="p-2">
          <Button type="primary">开启相册模式</Button>
          <div ref={previewRef}>
            <Image.PreviewGroup
              items={imgList}
              preview={{ getContainer: previewRef.current }}>
              <Image src={imgList[0]} width={100} />
            </Image.PreviewGroup>
          </div>
        </div>
      </div>
    </StyleProvider>
  )
}

export default Content
