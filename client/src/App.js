
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Admin from "./components/Admin"
import Citalac from "./components/Citalac"
import Bibliotekar from "./components/Bibliotekar"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/citalac" element={<Citalac />} />
        <Route path ="/bibliotekar" element={<Bibliotekar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App