import "./filetable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { filesColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";

const FileTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "files"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteDoc(doc(db, "files", id));
  //     setData(data.filter((item) => item.id !== id));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/files/newFile/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Editar</div>
            </Link>
            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Eliminar
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Expedientes
        <Link to="/files/newFile" className="link">
          Añadir
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={filesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default FileTable;
