import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation'; 
import Home from './pages/Home';
import Chat from './pages/Chat';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';


function App() {
  return ( 
    <BrowserRouter>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
