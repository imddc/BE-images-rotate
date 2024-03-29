import { StyleProvider } from '@ant-design/cssinjs'
import { Button, Image } from 'antd'
import cssText from 'data-text:~/src/main.css'
import antdResetCssText from 'data-text:antd/dist/reset.css'
import type { PlasmoCSConfig, PlasmoGetShadowHostId } from 'plasmo'
import { useEffect, useRef, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import Settings from './components/Settings'
import { CAN_I_USE, SHOW_HOST } from './config'

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

const Content = () => {
  const scopeMap = new Map([
    [
      SHOW_HOST,
      {
        container: document.querySelector('#img-content'),
        images: '#img-content img',
        realSrc: (v) => v.dataset.src
      }
    ],
    [
      '*',
      {
        container: document.body,
        images: 'img',
        realSrc: (v) => v.dataset.src || v.src
      }
    ]
  ])

  const previewRef = useRef<HTMLDivElement>(null)
  const [imgList, setImgList] = useState([])
  const [imgIndex, setImgIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [storage, setStorage] = useStorage('previewSettings', {
    rotate: 0,
    scale: 1
  })
  const [pathName] = useStorage(CAN_I_USE, SHOW_HOST)
  const scope = scopeMap.get(pathName)

  function isSupposed() {
    const url = window.location.hostname
    return pathName === '*' || url.includes(pathName)
  }

  function getImagesRealUrl(images: NodeListOf<Element>) {
    return (
      Array.from(images)
        // @ts-ignore
        .map(scope.realSrc)
        .filter(Boolean)
    )
  }

  useEffect(() => {
    const images = document.querySelectorAll(scope.images)
    setImgList(getImagesRealUrl(images))
  }, [pathName])

  useEffect(() => {
    const container = scope.container
    container &&
      container.addEventListener('click', (e) => {
        // @ts-ignore 只作用于图片
        if (e.target.tagName !== 'IMG') return

        // @ts-ignore
        const src = e.target.dataset.src || e.target.src
        const index = imgList.findIndex((v) => v === src)

        if (index === -1) return

        setImgIndex(index)
        setVisible(true)
      })
  }, [imgList])

  return (
    <StyleProvider container={document.getElementById(HOST_ID).shadowRoot}>
      {/* 只在微信公众号页面生效 */}
      {!isSupposed() ? null : (
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
      )}
    </StyleProvider>
  )
}

export default Content
