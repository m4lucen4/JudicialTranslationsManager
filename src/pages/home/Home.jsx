import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './home.scss'
import Widget from '../../components/widget/Widget'
import ChartMixBar from '../../components/chart/ChartMixBar'
import ChartBar from '../../components/chart/ChartBar'
import ChartLine from '../../components/chart/ChartLine'
import ChartPie from '../../components/chart/ChartPie'
import FileTable from '../fileList/components/FileTable'
import useGetUser from '../../hooks/useGetUser'

const Home = () => {
  const { userData } = useGetUser()
  return (
    <div className="home">
      <Sidebar userType={userData?.userType} />
      <div className="homeContainer">
        <Navbar userDisplay={userData?.displayName} />
        <div className="widgets">
          {userData?.userType === 'SuperUsuario' && <Widget type="user" />}
          <Widget type="translations" userData={userData} />
          <Widget type="interpretations" userData={userData} />
          <Widget type="ratifications" userData={userData} />
        </div>
        <div className="charts">
          <ChartLine
            title="Total de procedimientos por mes y año"
            aspect={2 / 1}
          />
          <ChartBar
            title="Relación de traducciones solicitadas/entregadas"
            aspect={2 / 1}
          />
        </div>
        <div className="charts">
          <ChartPie title="Costes consumidos por órgano" aspect={2 / 1} />
          <ChartMixBar title="Estado de los servicios" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <FileTable />
        </div>
      </div>
    </div>
  )
}

export default Home
