import { SettingOutlined } from '@ant-design/icons'
import { Button, InputNumber, Modal, Radio, type MenuProps } from 'antd'
import React, { forwardRef, useRef, useState } from 'react'

const Settings = ({ data, onChange }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <SettingOutlined />
      </Button>

      <div ref={modalRef}>
        <Modal
          title="设置"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          okText="确定"
          cancelText="取消"
          getContainer={modalRef.current}>
          <div>
            <span>旋转角度： </span>
            <Radio.Group
              value={data.rotate}
              onChange={(e) =>
                onChange({
                  ...data,
                  rotate: e.target.value
                })
              }>
              {[90, 180, 270].map((v) => (
                <Radio.Button key={v} value={v}>
                  {v}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>

          <div className="mt-2">
            <span>放大倍数： </span>
            <InputNumber
              min={1}
              step={0.1}
              max={5}
              value={data.scale}
              onChange={(e) =>
                onChange({
                  ...data,
                  scale: e
                })
              }
            />
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Settings
