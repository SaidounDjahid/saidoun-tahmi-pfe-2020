//index votant
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Layout from '../../shared-ui/Layout';
import Snackbar from '../../shared-ui/Snackbar';
import checkVote from '../../requests/checkVote';
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


export default function login(props) {
  const { setPage ,voterData } = props;
  const [alreadyVoted, setAlreadyVoted] = useState(false);
    console.log(voterData)

  const CheckIfVote = async function () {
      const checkRes = await checkVote(voterData);
    if (!checkRes.alreadyVoted) {
      //setVoterData(submittedData);
      setPage('candidates');
    } else if (checkRes.alreadyVoted) {
      setAlreadyVoted(true);
      setTimeout(() => { setAlreadyVoted(false); }, 3000);
    }
  };
const ToModify = async function () { setPage('modify')}
const tologinPage = async function () {setPage('login')}

  return (
    <Layout navbar="votar" setPage={setPage}>
      <main className={[mainCSS, fadeIn].join(' ')}>
      <div>
        <header className="banner" >
            <div className="container text-center"> 
               <div className="row">
               <h4 style={{fontWeight :'bold',textDecoration :'underline'}} onClick={tologinPage}> Se déconnecter</h4>
                  <h1>Vot'ini</h1>
                  <h4>Participez aux élections locales de la commune de Bab El Zouar avec le Vote Électronique</h4>
               
                  <br/>
                  <button onClick={ToModify}> Modifier Info</button>
                  <button onClick={CheckIfVote}> Voter !</button> 
               </div>
            </div>
         </header>
         <br/>
       </div>  
       {alreadyVoted && <Snackbar text="Vous avez deja voté ! En cas d'Erreur, contactez votre administrateur " />}
      </main>
    </Layout>
  );
}

login.propTypes = {
  setPage: PropTypes.func.isRequired,
};
