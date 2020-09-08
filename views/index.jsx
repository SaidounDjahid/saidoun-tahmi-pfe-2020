//index principal et redirect, ui , import de react, des routes , 
import React, { useState } from 'react';
import Home from './pages/Home';
import VoterData from './pages/VoterData';
import Candidates from './pages/Candidates';
import Login from './pages/Login';
import Choix from './pages/choix';
import Modify from './pages/Modify';
import AdminLogin from './pages/adminLogin';
import AdminChoix from './pages/adminChoix';
import AjouterCandidat from './pages/AjouterCandidat';
import SupprimerCandidat from './pages/SupprimerCandidat';
import Statistics from './pages/Statistics';


export default function Index() {
  const [page, setPage] = useState('home');
  const [voterData, setVoterData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    gender: ''
  });
  function renderPage() {
    const pages = {
      home: <Home setPage={setPage} />,
      voterdata: <VoterData setPage={setPage} setVoterData={setVoterData} />,
      candidates: <Candidates setPage={setPage} voterData={voterData} />,
      login : <Login setPage={setPage}  setVoterData={setVoterData} />,
      choix : <Choix setPage={setPage} voterData={voterData} />,
      modify : <Modify setPage={setPage} voterData={voterData} setVoterData={setVoterData}/>,
      statistics: <Statistics setPage={setPage} />,
      adminLogin : <AdminLogin setPage={setPage} />,
      adminChoix : <AdminChoix setPage={setPage} />,
      ajouterCandidat : <AjouterCandidat setPage={setPage} />,
      supprimerCandidat : <SupprimerCandidat setPage={setPage} />,
      //admin: <Admin setPage={setPage} />
    };
    return pages[page];
  }

  return (
    <>
      {renderPage()}
    </>
  );
}
