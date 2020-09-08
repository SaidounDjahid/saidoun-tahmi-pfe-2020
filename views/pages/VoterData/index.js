import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Layout from '../../shared-ui/Layout';
import Form from './Form';
import Snackbar from '../../shared-ui/Snackbar';
import register from '../../requests/register';
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
  const { setPage, setVoterData } = props;
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  const validateVoterData = async function (submittedData) {
    const registerRes = await register(submittedData);

    if (registerRes.success) {
      setVoterData(submittedData);
      setPage('login');
    } else if (registerRes.message) {
      setAlreadyVoted(true);
      setTimeout(() => { setAlreadyVoted(false); }, 3000);
    }
  };
  const toLoginPage = async function () {setPage('login')}

  return (
    <Layout navbar="votar" setPage={setPage}>
      <main className={[mainCSS, fadeIn].join(' ')}>
      <div>
        <header className="banner" >
            <div className="container text-center"> 
               <div className="row">
                  <h1>Vot'ini</h1>
                  <h4>Participez aux élections locales de la commune de Bab El Zouar avec le Vote Électronique</h4>
               
                  <br/>
                  <p>Vous avez déjà un compte ? <strong style={{textDecoration:"underline"}} onClick={toLoginPage} >Connectez-vous</strong>  </p>
                
                 <br/>
                
                 <p>Créer votre compte pour inscrire votre vote aujourd'hui !</p>
    
               
                
               </div>
            </div>
         </header>
         <br/>
       </div>  
        <Form validateVoterData={validateVoterData} />
        {alreadyVoted && <Snackbar text="Email et E-Vote existe Deja ! " />}
      </main>
    </Layout>
  );
}

VoterData.propTypes = {
  setPage: PropTypes.func.isRequired,
  setVoterData: PropTypes.func.isRequired
};
