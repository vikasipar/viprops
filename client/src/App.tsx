import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/layout/Header';
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return(
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<Login/>} />
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/auth/signup' element={<Signup/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
)}
