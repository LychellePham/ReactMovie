
import './css/App.css'
import MovieCard from './components/MovieCard';
import Favourites from './pages/Favourites';
import Home from './pages/Home'
import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar';

function App() {
  const movieNumber = 2;

  return (
    <>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
        </Routes>

      </main>
      
    </>
  )
}

export default App
