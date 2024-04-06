import React, {useState} from 'react';
import Login from '../src/components/Login';
import Home from '../src/components/Home'
import Album from './components/Album'
import AbrirSobres from './components/AbrirSobres';
import Repetidas from './components/Repetidas';
import Argentina from './components/Countries/Argentina/Argentina';
import Brasil from './components/Countries/Brasil/Brasil';
import Italia from './components/Countries/Italia/Italia';
import Alemania from './components/Countries/Alemania/Alemania';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [albumId, setAlbumId] = useState(null);
  const [savedStickers, setSavedStickers] = useState();
  const [pastedStickers, setPastedStickers] = useState([]);

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login setAlbumId={setAlbumId}/>} />
          <Route path="/loggeado" element={<Home albumId={albumId}/>} />
          <Route path="/my-album" element={<Album albumId={albumId} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers}/>} />
          <Route path="/abrir-sobres" element={<AbrirSobres albumId={albumId}/>} />
          <Route path="/repetidas" element={<Repetidas albumId={albumId}/>} />

        {/* Definir rutas para cada país */}
        <Route path="/argentina" element={<Argentina albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers} />} />
        <Route path="/brasil" element={<Brasil albumId={albumId} />} />
        <Route path="/italia" element={<Italia albumId={albumId} />} />
        <Route path="/alemania" element={<Alemania albumId={albumId} />} />
        </Routes>
      </Router>
    );
}

export default App;
