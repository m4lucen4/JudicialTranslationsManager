import React from 'react';

import "../newFile.scss"

const ButtonContainer = ({ isDisabled, onSave, onCancel }) => {
  return (
    <div className="buttonContainer">
      <button className="submitButton" disabled={isDisabled} onClick={onSave}>
        Guardar
      </button>
      <button className="cancelButton" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  );
};

export default ButtonContainer;