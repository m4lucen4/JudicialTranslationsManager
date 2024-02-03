import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";


const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No se encontró el documento!");
        }
      }
    };
  
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await setDoc(doc(db, "users", userId), {
          ...data,
          timeStamp: serverTimestamp(),
        });
      } else {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        await setDoc(doc(db, "users", res.user.uid), {
          ...data,
          timeStamp: serverTimestamp(),
        });
      }
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
<div className="new">
  <Sidebar />
  <div className="newContainer">
    <Navbar />
    <div className="top">
      <h1>{title}</h1>
    </div>
    <div className="bottom">
      <div className="right">
        <form onSubmit={handleAdd}>
          <div className="formInput">
            <label>Denominación</label>
            <input
              id="displayName"
              type="text"
              placeholder="Juzgado de Primera Instancia e Ins...."
              onChange={handleInput}
              value={data?.displayName}
            />
          </div>
          <div className="formInput">
            <label>Correo electrónico</label>
            <input
              id="email"
              type="mail"
              placeholder="ejemplo@ejemplo.com"
              onChange={handleInput}
              value={data?.email}
            />
          </div>
          <div className="formInput">
            <label>Tipo de usuario</label>
            <select
              id="userType"
              onChange={handleInput}
              value={data.userType || ""}
            >
              <option value="" disabled>Selecciona un tipo</option>
              <option value="SuperUsuario">SuperUsuario</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>
          <div className="formInput">
            <label>Contraseña</label>
            <input
              id="password"
              type="password"
              onChange={handleInput}
            />
          </div>
          <div className="formInput">
            <label>Dirección</label>
            <input
              id="address"
              type="text"
              placeholder="La dirección es..."
              onChange={handleInput}
              value={data?.address}
            />
          </div>
          <div className="formInput">
            <label>Teléfono de contacto</label>
            <input
              id="phone"
              type="text"
              placeholder="123 456 789"
              onChange={handleInput}
              value={data?.phone}
            />
          </div>
          <div className="formInput">
            <label>Municipio</label>
            <input
              id="county"
              type="text"
              placeholder="Málaga"
              onChange={handleInput}
              value={data?.county}
            />
          </div>
          <div className="buttonContainer">
            <button disabled={per !== null && per < 100} type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default New;
