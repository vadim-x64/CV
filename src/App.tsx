import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Portfolio from './pages/Portfolio'

const App = () => (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/portfolio" element={<Portfolio/>}/>
        </Routes>
        <Footer/>
    </>
)

export default App