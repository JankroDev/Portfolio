
import './App.css';
import { SplashPage } from './SplashPage';
import { ACIProject } from './ACIProject';
import { NapaProject } from './NapaProject';
import {ACIOEMProject} from'./ACIOEMProject'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/aciProject" element={<ACIProject />} />
          <Route path="/napaProject" element={<NapaProject />} />
          <Route path="/aciOemProject" element={<ACIOEMProject />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
