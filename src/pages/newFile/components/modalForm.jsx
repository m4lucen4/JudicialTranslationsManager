import React from 'react'

const ModalForm = ({ isModalOpen, setIsModalOpen, onClose, title }) => {
  if (!isModalOpen) return null

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          zIndex: 1000,
        }}
      >
        <p>{title}</p>
        <button
          onClick={() => {
            setIsModalOpen(false)
            if (onClose) onClose()
          }}
        >
          Cerrar
        </button>
      </div>
    </>
  )
}

export default ModalForm
