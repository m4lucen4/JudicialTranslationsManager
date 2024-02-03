import React from 'react'

import '../newFile.scss'
import { Link } from '@mui/material'

const ButtonContainer = ({ isDisabled, onSave }) => {
  return (
    <div className="buttonContainer">
      <button className="submitButton" disabled={isDisabled} onClick={onSave}>
        Guardar
      </button>
      <Link href="/files">
        <button className="cancelButton">Cancelar</button>
      </Link>
    </div>
  )
}

export default ButtonContainer
