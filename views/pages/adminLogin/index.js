//index de authentification de l'admin
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Layout from '../../shared-ui/Layout';
import Form from './Form';
import Snackbar from '../../shared-ui/Snackbar';
import adminLogin from '../../requests/adminLogin';
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


export default function Login(props) {
  const { setPage } = props;
  const [WrongCredantials, setWrongCredantials] = useState(false);

  const FetchAdminLogin = async function (submittedData) {
      const res = await adminLogin(submittedData);
    
    if (res.success) {
        setPage('adminChoix');
    } else if (!res.success) {
      setWrongCredantials(true);
      setTimeout(() => { setWrongCredantials(false); }, 3000);
    }
  };

  return (
    <Layout navbar="admin" setPage={setPage}>
      <main className={[mainCSS, fadeIn].join(' ')}>
      <div>
        <header className="banner" >
            <div className="container text-center"> 
               <div className="row">
                  <h1>Vot'ini</h1>
                  <h4>Gerez les élections locales de la commune de Bab El Zouar En tant qu'Admin</h4>
               </div>
            </div>
         </header>
         <br/>
       </div>  
        <Form FetchAdmin= {FetchAdminLogin}/>
        {WrongCredantials && <Snackbar text="Email ou mot de passe errone !" />}
        <br/>
        
      </main>
    </Layout>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired
};
