import './App.css'
import Navbar from './components/Navbar'
import Slider from './components/Slider'
import Footer from './components/Footer'
// import CardsItem from '../components/CardsItem'
import Card from './components/Card'
import Filter from './components/Navbar'

function App() {
  
  return (
    <>
    <div className='max-w-[1440px] mx-auto overflow-x-hidden '>
      <Navbar/>
      <Slider/>
      {/* <Filter/> */}
      <Card/>
      <Footer/>
      </div>
           </>
  )
}

export default App
