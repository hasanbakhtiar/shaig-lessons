import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import SinglePhoto from "./dashboard/SinglePhoto"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login />}></Route>
        <Route path={'/singlephoto'} element={<SinglePhoto />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
