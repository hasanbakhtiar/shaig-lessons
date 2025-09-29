import { BrowserRouter, Route, Routes } from "react-router-dom"
import Add from "./dashboard/Add"
import Login from "./Login"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login />}></Route>
        <Route path={'/add'} element={<Add />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
