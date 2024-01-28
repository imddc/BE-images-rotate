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

function getImagesRealUrl(images: NodeListOf<HTMLImageElement>) {
  return Array.from(images)
    .map((img) => img.dataset.src)
    .filter((v) => Boolean(v))
}

const Content = () => {
  const previewRef = useRef<HTMLDivElement>(null)
  const [imgList, setImgList] = useState([])
  const [imgIndex, setImgIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const images = document.querySelectorAll('img')
    setImgList(getImagesRealUrl(images))
  }, [])

  useEffect(() => {
    const container = document.getElementById('img-content')
    if (!container) return
    container.addEventListener('click', (e) => {
      // @ts-ignore
      const src = e.target.dataset.src
      const index = imgList.findIndex((v) => v === src)

      if (index === -1) return

      setImgIndex(index)
      setVisible(true)
    })
  })

  return (
    <StyleProvider container={document.getElementById(HOST_ID).shadowRoot}>
      <div className="p-4 fixed top-0 min-h-100vh w-full left-0">
        <div className="p-2 bg-white w-fit rounded-md">
          <Button type="primary" onClick={() => setVisible(true)}>
            开启相册模式
          </Button>

          <div ref={previewRef}>
            <Image.PreviewGroup
              items={imgList}
              preview={{
                getContainer: previewRef.current,
                visible,
                onVisibleChange(v) {
                  setVisible(v)
                },
                onChange(index) {
                  setImgIndex(index)
                },
                current: imgIndex,
                toolbarRender(v, { transform }) {
                  transform.rotate = -90
                  return v
                }
              }}></Image.PreviewGroup>
          </div>
        </div>
      </div>
    </StyleProvider>
  )
}

export default Content
