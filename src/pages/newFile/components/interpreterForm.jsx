import React from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const InterpreterForm = ({ data, setData, setCertFile }) => {
  const handleInput = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCertFileChange = (e) => {
    setCertFile(e.target.files[0]);
  };

  return (
    <>
    <h1>Información Intérprete</h1>
      <div className="formInput">
        <label htmlFor="worker">Intérprete</label>
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
        <label htmlFor="kms">Kms</label>
        <input
          id="kms"
          type="number"
          value={data.kms || ''}
          onChange={handleInput}
        />
      </div>
      <div className="formInput">
        <label htmlFor="time">Tiempo (en horas)</label>
        <input
          id="time"
          type="number"
          value={data.time || ''}
          onChange={handleInput}
        />
      </div>
      <div className="formInput">
        <label htmlFor="certificate">
          Certificado: <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="certificate"
          onChange={handleCertFileChange}
          style={{ display: "none" }}
        />
        {data.certURL && (
          <div className="left">
            <a href={data.certURL} target="_blank" download="Certificado" rel="noreferrer">
              Descargar certificado
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default InterpreterForm;
