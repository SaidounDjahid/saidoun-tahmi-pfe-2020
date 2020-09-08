//index formulaire insertion d'un nouvel candidat par un admin
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Layout from '../../shared-ui/Layout';
import Form from './Form';
import Snackbar from '../../shared-ui/Snackbar';
import AjouterCandidat from '../../requests/AjouterCandidat';
import fadeIn from '../../shared-ui/animations';


const mainCSS = css`
display: block;
margin: 0 auto;
width: 50%;
min-height: 100%;
height: auto;
border-radius: 5px;
background-color: #f3f5f0;
padding: 20px;
margin-top: 1.5vh;
animation-name: fadeIn;
animation-duration: 0.5s;
@media (max-width: 1199px) {
  width: 80%;
  margin-top: 30px;
  margin-bottom: 50px;
}
@media (min-width: 1200px) {
  width: 50%;
  margin-top: 5%;
}
`;


export default function VoterData(props) {
  const { setPage } = props;
  const [showSnackAdd, setshowSnackAdd] = useState(false);
  const [showSnackError, setshowSnackError] = useState(false);

  const AddCandidat = async function (submittedData) {
    const res = await AjouterCandidat(submittedData);

    if (res.success) {
        setshowSnackAdd(true);
        setTimeout(() => { setshowSnackAdd(false); }, 3000);
        setTimeout(() => { setPage('adminChoix'); }, 3000);
    } else if (!res.success) {
        setshowSnackError(true);
        setTimeout(() => { setshowSnackError(false); }, 3000);
        
    }
  };
  const toChoixPage = async function () {setPage('adminChoix')}

  return (
    <Layout navbar="admin" setPage={setPage}>
      <main className={[mainCSS, fadeIn].join(' ')}>
      <div>
        <header className="banner" >
            <div className="container text-center"> 
               <div className="row">
               <h4 style={{fontWeight :'bold',textDecoration :'underline'}} onClick={toChoixPage}> Retour</h4>
                  <h1>Vot'ini</h1>
                  <h4>Ajoutez un candidat aux élections locales de la commune de Bab El Zouar avec le Vote Électronique</h4>
               
                
                 <br/>              
               </div>
            </div>
         </header>
         <br/>
       </div>  
        <Form AjouterCandidat={AddCandidat} />
        {showSnackAdd && <Snackbar text="Candidat Ajouté avec succes! " />}
        {showSnackError && <Snackbar text="Oops une erreur est apparue. Veuillez Reeassayer ! " />}
      </main>
    </Layout>
  );
}

VoterData.propTypes = {
  setPage: PropTypes.func.isRequired
};
