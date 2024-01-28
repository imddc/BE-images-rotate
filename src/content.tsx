import { StyleProvider } from '@ant-design/cssinjs'
import { Button, Image } from 'antd'
import cssText from 'data-text:~/src/main.css'
import antdResetCssText from 'data-text:antd/dist/reset.css'
import type { PlasmoCSConfig, PlasmoGetShadowHostId } from 'plasmo'
import { useEffect, useRef, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import Settings from './components/Settings'

const HOST_ID = 'engage-csui'
const SHOW_HOST = 'mp.weixin.qq.com'
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
  // 只在微信公众号页面生效
  const url = window.location.hostname
  if (url !== SHOW_HOST) return null

  const previewRef = useRef<HTMLDivElement>(null)
  const [imgList, setImgList] = useState([])
  const [imgIndex, setImgIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [storage, setStorage] = useStorage('previewSettings', {
    rotate: 90,
    scale: 1
  })

  useEffect(() => {
    const images = document.querySelectorAll('img')
    setImgList(getImagesRealUrl(images))
  }, [])

  useEffect(() => {
    const container = document.getElementById('img-content')
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
        <div className="p-2 w-fit rounded-md">
          <div className="flex items-center justify-between gap-2">
            <Button type="primary" onClick={() => setVisible(true)}>
              开启相册模式
            </Button>

            <Settings data={storage} onChange={setStorage} />
          </div>

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
                  transform.rotate = -storage.rotate
                  transform.scale = storage.scale
                  return v
                }
              }}
            />
          </div>
        </div>
      </div>
    </StyleProvider>
  )
}

export default Content
