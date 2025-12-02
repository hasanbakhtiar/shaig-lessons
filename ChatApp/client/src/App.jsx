import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Messages from './pages/Messages';
import Inbox from './pages/Inbox';
import Header from './layout/Header';
import { Container } from 'react-bootstrap';
import { SocketContext } from './context/SocketContext';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Backend portu

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Messages />}></Route>
            <Route path='/:id' element={<Inbox />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </SocketContext.Provider>
  )
}

export default App;
