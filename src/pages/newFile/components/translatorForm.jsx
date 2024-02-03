import React from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const TranslatorForm = ({ data, setData, setTranslationFile }) => {
  const handleInput = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleTranslationFileChange = (e) => {
    setTranslationFile(e.target.files[0]);
  };

  return (
    <>
    <h1>Información Traductor</h1>
      <div className="formInput">
        <label htmlFor="deliveryDate">Fecha de entrega</label>
        <input
          id="deliveryDate"
          type="date"
          value={data.deliveryDate || ''}
          onChange={handleInput}
        />
      </div>
      <div className="formInput">
        <label htmlFor="worker">Traductor</label>
        <input
          id="worker"
          type="text"
          value={data.worker || ''}
          onChange={handleInput}
        />
      </div>
      <div className="formInput">
        <label htmlFor="rate">Tarifa</label>
        <input
          id="rate"
          type="number"
          value={data.rate || ''}
          onChange={handleInput}
        />
      </div>
      <div className="formInput">
        <label htmlFor="wordCount">Número de palabras</label>
        <input
          id="wordCount"
          type="number"
          value={data.wordCount || ''}
          onChange={handleInput}
        />
      </div>
      <div className="formInput">
        <label htmlFor="regimen">Régimen</label>
        <select
          id="regimen"
          value={data.regimen || ''}
          onChange={handleInput}
        >
          <option value="" disabled>Selecciona un régimen</option>
          <option value="autonomo">Autónomo</option>
          <option value="cuentaAjena">Cuenta ajena</option>
        </select>
      </div>
      <div className="formInput">
        <label htmlFor="translation">
          Traducción: <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="translation"
          onChange={handleTranslationFileChange}
          style={{ display: "none" }}
        />
        {data.translationURL && (
          <div className="left">
            <a href={data.translationURL} target="_blank" download="Traducción" rel="noreferrer">
              Descargar traducción
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default TranslatorForm;