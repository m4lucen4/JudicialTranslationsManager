import React from 'react'

import '../newFile.scss'
import { useNavigate } from 'react-router-dom'

const ButtonContainer = ({ isDisabled, onSave }) => {
  const navigate = useNavigate()
  return (
    <div className="buttonContainer">
      <button className="submitButton" disabled={isDisabled} onClick={onSave}>
        Guardar
      </button>
      {/* <button className="cancelButton" onClick={navigate(-1)}>
        Cancelar
      </button> */}
    </div>
  )
}

export default ButtonContainer
