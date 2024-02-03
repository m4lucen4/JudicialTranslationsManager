import React from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const InitialReviewerForm = ({ data, setData, setInitialReviewerFile }) => {
  const handleInput = (e) => {
    const { id, value } = e.target;
    setData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    setInitialReviewerFile(e.target.files[0]);
  };

  return (
    <>
    <h1>Información Revisión Inicial</h1>
      <div className="formInput">
        <label htmlFor="initialReviewer">Revisor</label>
        <input
          id="initialReviewer"
          type="text"
          value={data.initialReviewer || ''}
          onChange={handleInput}
        />
      </div>
      <div className="formInput">
        <label htmlFor="amountReviewer">Coste</label>
        <input
          id="amountReviewer"
          type="number"
          value={data.amountReviewer || ''}
          onChange={handleInput}
        />
      </div>
      <div className="formInput">
        <label htmlFor="initialReviewerFile">
          Archivo: <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="initialReviewerFile"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {data.initialReviewerFileURL && (
          <div className="left">
            <a href={data.initialReviewerFileURL} target="_blank" download="Revisión inicial" rel="noreferrer">
              Descargar archivo de revisión
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default InitialReviewerForm;
