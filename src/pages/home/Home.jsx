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

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="translations" />
          <Widget type="interpretations" />
          <Widget type="ratifications" />
        </div>
        <div className="charts">
          <ChartLine title="Costes consumidos por órgano" aspect={2 / 1} />
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
