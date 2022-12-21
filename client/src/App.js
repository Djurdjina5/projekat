
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Admin from "./components/Admin"
import Citalac from "./components/Citalac"
import Bibliotekar from "./components/Bibliotekar"
import ChangePassword from "./components/ChangePassword"
import DeleteAccount from "./components/DeleteAccount"
import Homepage  from "./components/Homepage"
import AddNewBook from "./components/AddNewBook"
import SearchBook from "./components/BookSearch"
import RegisterUser from "./components/RegisterUser"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/citalac" element={<Citalac />} />
        <Route path ="/bibliotekar" element={<Bibliotekar />} />
        <Route path ="/promenaLozinke" element={<ChangePassword />} />
        <Route path = "/brisanjeNaloga" element={<DeleteAccount />} />
        <Route path = "/dodajKnjigu" element={<AddNewBook />} />
        <Route path = "/pretraga" element = {<SearchBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App