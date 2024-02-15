import { useEffect, useState } from 'react'

import './newFile.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import ModalForm from './components/modalForm'
import MainForm from './components/mainForm'
import TranslatorForm from './components/translatorForm'
import InterpreterForm from './components/interpreterForm'
import ButtonContainer from './components/buttonContainer'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate, useParams } from 'react-router-dom'

import useGetUser from '../../hooks/useGetUser'
import FinalReviewerForm from './components/finalReviewer'

const NewFile = ({ title }) => {
  const [file, setFile] = useState('')
  const [certFile, setCertFile] = useState(null)
  const [finalTranslationFile, setFinalTranslationFile] = useState(null)
  const [receiptFile, setReceiptFile] = useState(null)
  const [data, setData] = useState({})
  const [per, setPerc] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { fileId } = useParams()
  const navigate = useNavigate()

  const { userData, loading, error } = useGetUser()

  useEffect(() => {
    const fetchFileData = async () => {
      if (fileId) {
        const fileRef = doc(db, 'files', fileId)
        const fileSnap = await getDoc(fileRef)

        if (fileSnap.exists()) {
          setData(fileSnap.data())
        } else {
          console.log('No se encontró el documento')
        }
      }
    }

    fetchFileData()
  }, [fileId])

  useEffect(() => {
    if (!fileId && !loading && userData) {
      setData((prevData) => ({
        ...prevData,
        oojjName: userData.displayName,
      }))
    }
  }, [fileId, loading, userData])

  useEffect(() => {
    let now = new Date()
    now.setHours(now.getHours() + 1)
    const dateTimeLocalFormat = now.toISOString().slice(0, 16)
    setData((prevData) => ({
      ...prevData,
      createdAt: dateTimeLocalFormat,
    }))
  }, [])

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name

      console.log(name)
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          setPerc(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }))
          })
        }
      )
    }
    file && uploadFile()
  }, [file])

  useEffect(() => {
    if (certFile) {
      const uploadCert = () => {
        const certName = `cert_${new Date().getTime()}_${certFile.name}`
        const storageRef = ref(storage, `certificates/${certName}`)
        const uploadTask = uploadBytesResumable(storageRef, certFile)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Certificado está siendo cargado ', progress, '% done')
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, certURL: downloadURL }))
            })
          }
        )
      }

      uploadCert()
    }
  }, [certFile])

  useEffect(() => {
    if (finalTranslationFile) {
      const uploadFinalTranslationFile = () => {
        const finalTranslationFileName = `finalTranslation_${new Date().getTime()}_${
          finalTranslationFile.name
        }`
        const storageRef = ref(
          storage,
          `finalTranslations/${finalTranslationFileName}`
        )
        const uploadTask = uploadBytesResumable(
          storageRef,
          finalTranslationFile
        )

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(
              'Final translation file is being uploaded',
              progress,
              '% done'
            )
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('URL of the final translation file:', downloadURL)
              setData((prev) => ({
                ...prev,
                finalTranslationFileURL: downloadURL,
              }))
            })
          }
        )
      }

      uploadFinalTranslationFile()
    }
  }, [finalTranslationFile])

  useEffect(() => {
    if (receiptFile) {
      const uploadReceiptFile = () => {
        const receiptFileName = `receipt_${new Date().getTime()}_${
          receiptFile.name
        }`
        const storageRef = ref(storage, `receipts/${receiptFileName}`)
        const uploadTask = uploadBytesResumable(storageRef, receiptFile)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Receipt file is being uploaded', progress, '% done')
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('URL of the receipt file:', downloadURL)
              setData((prev) => ({ ...prev, receiptFileURL: downloadURL }))
            })
          }
        )
      }

      uploadReceiptFile()
    }
  }, [receiptFile])

  //Submit form
  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      let newData = {
        ...data,
        timeStamp: serverTimestamp(),
      }
      if (!fileId) {
        const userUID = userData?.uid
        const userDisplayName = userData?.displayName
        if (!userUID || !userDisplayName) {
          console.error('No se encontró el UID o displayName del usuario')
          return
        }
        newData = {
          ...newData,
          userUID: userUID,
          userDisplayName: userDisplayName,
        }
      }
      if (fileId) {
        await setDoc(doc(db, 'files', fileId), newData)
      } else {
        await addDoc(collection(db, 'files'), newData)
      }
      setIsModalOpen(true)
      navigate(-1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar userData={userData} />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>
              <MainForm
                data={data}
                setData={setData}
                setFile={setFile}
                userData={userData}
                fileId={fileId}
              />
              {(data.type === '1' || data.type === '2') &&
                data.state !== '0' && (
                  <InterpreterForm
                    data={data}
                    userData={userData}
                    setData={setData}
                    setCertFile={setCertFile}
                  />
                )}
              {data.type === '0' && data.state !== '0' && (
                <>
                  <TranslatorForm
                    data={data}
                    userData={userData}
                    setData={setData}
                  />
                  <FinalReviewerForm
                    data={data}
                    userData={userData}
                    setData={setData}
                    setFinalTranslationFile={setFinalTranslationFile}
                    setReceiptFile={setReceiptFile}
                  />
                </>
              )}
              <ButtonContainer
                isDisabled={per !== null && per < 100}
                onSave={(e) => {
                  e.preventDefault()
                  handleAdd(e)
                }}
              />
            </form>
          </div>
        </div>
      </div>
      <ModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onClose={() => navigate(-1)}
        title="Registro añadido/actualizado correctamente"
      />
    </div>
  )
}

export default NewFile
