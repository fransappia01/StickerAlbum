import React, {useState} from 'react';
import Login from '../src/components/Login';
import Home from '../src/components/Home'
import Album from './components/Album'
import AbrirSobres from './components/AbrirSobres';
import Repetidas from './components/Repetidas';
import OlvidoContraseña from './components/OlvidoContraseña';
import CambioContraseña from './components/CambioContraseña';
import Argentina from './components/Countries/Argentina/Argentina';
import Brasil from './components/Countries/Brasil/Brasil';
import Italia from './components/Countries/Italia/Italia';
import Alemania from './components/Countries/Alemania/Alemania';
import Uruguay from './components/Countries/Uruguay/Uruguay';
import Francia from './components/Countries/Francia/Francia';
import Inglaterra from './components/Countries/Inglaterra/Inglaterra';
import España from './components/Countries/España/España';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [albumId, setAlbumId] = useState(null);
  const [savedStickers, setSavedStickers] = useState();
  const [pastedStickers, setPastedStickers] = useState([]);

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login setAlbumId={setAlbumId}/>} />
          <Route path="/olvidaste-contraseña" element={<OlvidoContraseña albumId={albumId}/>} />
          <Route path="/recuperar-contra" element={<CambioContraseña albumId={albumId}/>} />
          <Route path="/loggeado" element={<Home albumId={albumId}/>} />
          <Route path="/my-album" element={<Album albumId={albumId} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers}/>} />
          <Route path="/abrir-sobres" element={<AbrirSobres albumId={albumId}/>} />
          <Route path="/repetidas" element={<Repetidas albumId={albumId}/>} />

        {/* Definir rutas para cada país */}
        <Route path="/argentina" element={<Argentina albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers} />} />
        <Route path="/brasil" element={<Brasil albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers}/>} />
        {/* <Route path="/italia" element={<Italia albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers}/>} /> */}
        <Route path="/alemania" element={<Alemania albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers}/>} />
        <Route path="/uruguay" element={<Uruguay albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers} />} />
        <Route path="/francia" element={<Francia albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers}/>} />
        <Route path="/inglaterra" element={<Inglaterra albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers}/>} />
        <Route path="/españa" element={<España albumId={albumId} savedStickers={savedStickers} pastedStickers={pastedStickers} setSavedStickers={setSavedStickers} setPastedStickers={setPastedStickers}/>} />
        </Routes>
      </Router>
    );
}

export default App;
