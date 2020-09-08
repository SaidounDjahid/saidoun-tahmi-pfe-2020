//code ui du dashboard de l'administrateur 
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Layout from '../../shared-ui/Layout';
import Snackbar from '../../shared-ui/Snackbar';
import checkVote from '../../requests/checkVote';
import fadeIn from '../../shared-ui/animations';

//fonction css applique a ui de l'admin
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
export default function Choix(props) {
  const { setPage } = props;

const ToAddCandidat = async function () { setPage('ajouterCandidat')}
const ToStats = async function () { setPage('statistics')}
const ToSupprimerCandidat = async function () { setPage('supprimerCandidat')}
const tologinPage = async function () {setPage('adminLogin')}


//les boutons 
  return (
    <Layout navbar="admin" setPage={setPage}>
      <main className={[mainCSS, fadeIn].join(' ')}>
      <div>
        <header className="banner" >
            <div className="container text-center"> 
               <div className="row">
               <h4 style={{fontWeight :'bold',textDecoration :'underline'}} onClick={tologinPage}> Se déconnecter</h4>
                  <h1>Vot'ini</h1>
                  <h4>Gerez les élections locales de la commune de Bab El Zouar En tant qu'Admin</h4>
               
                  <br/>
                  <button onClick={ToAddCandidat}> Ajouter Candidat</button>
                  <button onClick={ToSupprimerCandidat}> Supprimer Candidat</button> 
                  <button onClick={ToStats}> Check Statistiques</button> 
               </div>
            </div>
         </header>
         <br/>
       </div>  
      </main>
    </Layout>
  );
}
Choix.propTypes = {
  setPage: PropTypes.func.isRequired,
};
