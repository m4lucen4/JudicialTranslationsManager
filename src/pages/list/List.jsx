import './list.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Datatable from '../../components/datatable/Datatable'

import useGetUser from '../../hooks/useGetUser'

const List = () => {
  const { userData } = useGetUser()
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar userData={userData} />
        <Datatable />
      </div>
    </div>
  )
}

export default List
