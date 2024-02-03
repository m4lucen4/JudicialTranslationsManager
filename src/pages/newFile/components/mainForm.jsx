import React from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import "../newFile.scss"

const MainForm = ({ data, setData, setFile }) => {
  const handleInput = (e) => {
    const { id, value } = e.target;
    setData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <input
                  id="createdAt"
                  type="hidden"
                  value={data.createdAt || ''}
                  onChange={handleInput}
                  required
                />
                <div className="formInput">
                <label htmlFor="oojjName">Órgano</label>
                <input
                  id="oojjName"
                  type="text"
                  value={data.oojjName || ''}
                  onChange={handleInput}
                  disabled
                />
              </div>
              <div className="formInput">
                <label htmlFor="description">Descripción</label>
                <input
                  id="description"
                  type="text"
                  placeholder="Nombre del procedimiento"
                  value={data.description || ''}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="formInput">
              <label htmlFor="date">Fecha del procedimiento</label>
              <input
                id="date"
                type="datetime-local"
                value={data.date || ''}
                onChange={handleInput}
                required
              />
              </div>
              <div className="formInput">
                <label htmlFor="state">Estado</label>
                <select
                  id="state"
                  onChange={handleInput}
                  defaultValue=""
                  value={data.state || ""}
                >
                  <option value="" disabled>Selecciona un tipo</option>
                  <option value="0">Pendiente</option>
                  <option value="1">En curso</option>
                  <option value="2">Pendiente de facturar</option>
                  <option value="3">Suspendido</option>
                  <option value="4">Facturado</option>
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="type">Tipo de procedimiento</label>
                <select
                  id="type"
                  onChange={handleInput}
                  defaultValue=""
                  required
                  value={data.type || ""}
                >
                  <option value="" disabled>Selecciona un tipo</option>
                  <option value="0">Traducción</option>
                  <option value="1">Interpretación</option>
                  <option value="2">Ratificación</option>
                </select>
              </div>
              {data.type === "1" || data.type === "2" ? (
                <div className="formInput">
                  <label htmlFor="address">Dirección</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Dirección del procedimiento"
                    value={data.address || ''}
                    onChange={handleInput}
                  />
                </div>
              ) : null}
              {data.type === "1" || data.type === "2" ? (
                <div className="formInput">
                  <label htmlFor="originlanguage">Idioma origen</label>
                  <select
                    id="originlanguage"
                    onChange={handleInput}
                    defaultValue=""
                  >
                    <option value="" disabled>Selecciona un tipo</option>
                    <option value="spanish">Español</option>
                    <option value="english">Inglés</option>
                    <option value="french">Frances</option>
                    <option value="german">Alemán</option>
                  </select>
                </div>
              ) : null}
              {data.type === "0" || data.type === "1" || data.type === "2" ? (
                <div className="formInput">
                  <label htmlFor="destinylanguage">{data.type === "0" ? "Idioma" : "Idioma destino"}</label>
                  <select
                    id="destinylanguage"
                    onChange={handleInput}
                    defaultValue=""
                  >
                    <option value="" disabled>Selecciona un tipo</option>
                    <option value="spanish">Español</option>
                    <option value="english">Inglés</option>
                    <option value="french">Frances</option>
                    <option value="german">Alemán</option>
                  </select>
                </div>
              ) : null}
              <div className="formInput">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="123 456 789"
                  value={data.phone || ''}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="observations">Observaciones</label>
                <input
                  id="observations"
                  type="text"
                  placeholder="Observaciones del procedimiento"
                  value={data.observations || ''}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
              <label htmlFor="attachment">Documento: <DriveFolderUploadOutlinedIcon className="icon" /></label>
        <input
          type="file"
          id="attachment"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {data.img && (
          <div className="left">
            <a href={data.img} target="_blank" download="Documento" rel="noreferrer">Descargar</a>
          </div>
        )}
              </div>
    </>
  );
};

export default MainForm;