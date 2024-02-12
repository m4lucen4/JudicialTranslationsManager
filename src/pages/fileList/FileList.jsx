import './list.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import FileTable from './components/FileTable'

import useGetUser from '../../hooks/useGetUser'

const FileList = () => {
  const { userData } = useGetUser()
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar userData={userData} />
        <FileTable userData={userData} />
      </div>
    </div>
  )
}

export default FileList
