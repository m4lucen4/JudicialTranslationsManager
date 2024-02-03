import { useEffect, useState } from "react";

import "./newFile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ModalForm from './components/modalForm';
import MainForm from './components/mainForm';
import TranslatorForm from "./components/translatorForm";
import InterpreterForm from "./components/interpreterForm";
import InitialReviewerForm from "./components/initialReviewerForm";
import ButtonContainer from "./components/buttonContainer";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

import useGetUser from "../../hooks/useGetUser";
import FinalReviewerForm from "./components/finalReviewer";

const NewFile = ({ title }) => {
  const [file, setFile] = useState("");
  const [translationFile, setTranslationFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [initialReviewerFile, setInitialReviewerFile] = useState(null);
  const [finalTranslationFile, setFinalTranslationFile] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fileId } = useParams();
  const navigate = useNavigate()

  const { userData, loading, error } = useGetUser();

  useEffect(() => {
    const fetchFileData = async () => {
      if (fileId) {
        const fileRef = doc(db, "files", fileId);
        const fileSnap = await getDoc(fileRef);
  
        if (fileSnap.exists()) {
          setData(fileSnap.data());
        } else {
          console.log("No se encontró el documento cabesa!");
        }
      }
    };
  
    fetchFileData();
  }, [fileId]);

  console.log("DATO", data)

  useEffect(() => {
    if (!loading && userData) {
      setData(prevData => ({
        ...prevData,
        oojjName: userData.displayName,
      }));
    }
  }, [loading, userData]);

  useEffect(() => {
    let now = new Date();
    now.setHours(now.getHours() + 1);
    const dateTimeLocalFormat = now.toISOString().slice(0, 16); 
    setData(prevData => ({
      ...prevData,
      createdAt: dateTimeLocalFormat,
    }));
  }, []);

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

  useEffect(() => {
    if (certFile) {
      const uploadCert = () => {
        const certName = `cert_${new Date().getTime()}_${certFile.name}`;
        const storageRef = ref(storage, `certificates/${certName}`);
        const uploadTask = uploadBytesResumable(storageRef, certFile);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Certificado está siendo cargado ", progress, "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, certURL: downloadURL }));
            });
          }
        );
      };
  
      uploadCert();
    }
  }, [certFile]);
  
  useEffect(() => {
    if (translationFile) {
      const uploadTranslation = () => {
        const translationName = `translation_${new Date().getTime()}_${translationFile.name}`;
        const storageRef = ref(storage, `translations/${translationName}`);
        const uploadTask = uploadBytesResumable(storageRef, translationFile);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Traducción está siendo cargada ", progress, "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("URL de la traducción:", downloadURL);
              setData((prev) => ({ ...prev, translationURL: downloadURL }));
            });
          }
        );
      };
  
      uploadTranslation();
    }
  }, [translationFile]);

  useEffect(() => {
    if (initialReviewerFile) {
      const uploadInitialReviewerFile = () => {
        const initialReviewerFileName = `initialReviewer_${new Date().getTime()}_${initialReviewerFile.name}`;
        const storageRef = ref(storage, `initialReviewerFiles/${initialReviewerFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, initialReviewerFile);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Archivo del revisor inicial está siendo cargado", progress, "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("URL del archivo del revisor inicial:", downloadURL);
              setData((prev) => ({ ...prev, initialReviewerFileURL: downloadURL }));
            });
          }
        );
      };
  
      uploadInitialReviewerFile();
    }
  }, [initialReviewerFile]);

  useEffect(() => {
    if (finalTranslationFile) {
        const uploadFinalTranslationFile = () => {
            const finalTranslationFileName = `finalTranslation_${new Date().getTime()}_${finalTranslationFile.name}`;
            const storageRef = ref(storage, `finalTranslations/${finalTranslationFileName}`);
            const uploadTask = uploadBytesResumable(storageRef, finalTranslationFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Final translation file is being uploaded", progress, "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("URL of the final translation file:", downloadURL);
                        setData((prev) => ({ ...prev, finalTranslationFileURL: downloadURL }));
                    });
                }
            );
        };

        uploadFinalTranslationFile();
    }
}, [finalTranslationFile]);

useEffect(() => {
    if (receiptFile) {
        const uploadReceiptFile = () => {
            const receiptFileName = `receipt_${new Date().getTime()}_${receiptFile.name}`;
            const storageRef = ref(storage, `receipts/${receiptFileName}`);
            const uploadTask = uploadBytesResumable(storageRef, receiptFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Receipt file is being uploaded", progress, "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("URL of the receipt file:", downloadURL);
                        setData((prev) => ({ ...prev, receiptFileURL: downloadURL }));
                    });
                }
            );
        };

        uploadReceiptFile();
    }
}, [receiptFile]);

  
  //Submit form
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "files"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setIsModalOpen(true);
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
            <MainForm data={data} setData={setData} setFile={setFile} />
              { (data.type === "1" || data.type === "2") && data.state !== "0" && (
               <InterpreterForm data={data} setData={setData} setCertFile={setCertFile} />
              )}
              { data.type === "0" && data.state !== "0" && (
                <>
               <TranslatorForm data={data} setData={setData} setTranslationFile={setTranslationFile} />
               <InitialReviewerForm
                  data={data}
                  setData={setData}
                  setInitialReviewerFile={setInitialReviewerFile}
                />
               <FinalReviewerForm data={data} setData={setData} setFinalTranslationFile={setFinalTranslationFile} setReceiptFile={setReceiptFile} />
               </>
              )}
            <ButtonContainer 
                isDisabled={per !== null && per < 100} 
                onSave={(e) => {
                  e.preventDefault();
                  handleAdd(e);
                }} 
                onCancel={() => navigate(-1)}
              />
            </form>
          </div>
        </div>
      </div>
      <ModalForm 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        onClose={() => navigate(-1)}
      />
    </div>
  );
};

export default NewFile;
