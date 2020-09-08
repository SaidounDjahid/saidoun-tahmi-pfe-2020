//index de modification des données d'un votant  
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Layout from '../../shared-ui/Layout';
import Form from './Form';
import Snackbar from '../../shared-ui/Snackbar';
import modify from '../../requests/modify';
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


export default function Modify(props) {
  const { setPage, setVoterData,voterData } = props;
  const [showSnackModify, setshowSnackModify] = useState(false);
  const [showSnackError, setshowSnackError] = useState(false);

  const ModifyVoterData = async function (submittedData) {
    const modifyRes = await modify(submittedData);

    if(modifyRes.success) {
        setVoterData(modifyRes.user)
        setshowSnackModify(true);
        setTimeout(() => { setshowSnackModify(false); }, 3000);
        setTimeout(() => { setPage('choix'); }, 3000);
    }
    else {
        setshowSnackError(true);
        setTimeout(() => { setshowSnackError(false); }, 3000);
    }
  };
   const toChoixPage = async function () {setPage('choix')}
  return (
    <Layout navbar="votar" setPage={setPage}>
      <main className={[mainCSS, fadeIn].join(' ')}>
      <div>
        <header className="banner" >
            <div className="container text-center"> 
               <div className="row">
               <h4 style={{fontWeight :'bold',textDecoration :'underline'}} onClick={toChoixPage}> Retour</h4>
                  <h1>Vot'ini</h1>
                  <h4>Participez aux élections locales de la commune de Bab El Zouar avec le Vote Électronique</h4>
               
                
                 <br/>
                
                 <p>Modifiez vos informations facilement !</p>

               </div>
            </div>
         </header>
         <br/>
       </div>  
        <Form  ModifyVoterData={ModifyVoterData} voterData={voterData} />
        {showSnackModify && <Snackbar text="Informations Modifies avec succes! " />}
        {showSnackError && <Snackbar text="Oops une erreur est apparue. Veuillez Reeassayer ! " />}
      </main>
    </Layout>
  );
}

Modify.propTypes = {
  setPage: PropTypes.func.isRequired,
  //setVoterData: PropTypes.func.isRequired
};
