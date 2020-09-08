import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Layout from '../../shared-ui/Layout';
import Snackbar from '../../shared-ui/Snackbar';
import List from './List';
import Modal from './Modal';
import supprimerCandidat from '../../requests/supprimerCandidat';
import getCandidatesDbData from '../../requests/getCandidates';
import fadeIn from '../../shared-ui/animations';

const mainCSS = css`
display: block;
margin: 0 auto;
min-height: 100%;
height: auto;
border-radius: 5px;
background-color: #f2f2f2;
pDeleteing: 20px;
margin-top: 1.5vh;
animation-name: fadeIn;
animation-duration: 0.5s;
@media (max-width: 1199px) {
  width: 80%;
  margin-top: 30px;
  margin-bottom: 50px;
  h1 {
    text-align: center;
  }
}
@media (min-width: 1200px) {
  width: 90%;
  margin-top: 5%;
}
`;


export default function Candidates(props) {
  const { setPage } = props;
  const [candidates, setCandidates] = useState(undefined);
  const [modal, setModal] = useState({ opened: false, data: null });
  const [showSnackDelete, setshowSnackDelete] = useState(false);
  const [showSnackError, setshowSnackError] = useState(false);
  const toChoixPage = async function () {setPage('adminChoix')}

  async function fetchCandidates() {
    const result = await getCandidatesDbData(false);
    setCandidates(result);
  }
  useEffect(() => {
    fetchCandidates();
  }, []);


  function onCandidateSelect(selectedCandidate) {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    setModal({ opened: true, data: { selectedCandidate } });
    console.log(modal);
  }

  function closeModal() {
    setModal({ opened: false, data: null });
  }

  async function dataConfirmed(postReqData) {
    const res= await supprimerCandidat(postReqData);
    closeModal();
    if (res.success) {
        setshowSnackDelete(true);
        setTimeout(() => { setshowSnackDelete(false); }, 3000);
        setTimeout(() => { setPage('adminChoix'); }, 3000);
    }
    else if (!res.success) {
        setshowSnackError(true);
        setTimeout(() => { setshowSnackError(false); }, 3000);
    }
  }
  return (
    <Layout navbar="admin" setPage={setPage}>
      <main className={[mainCSS, fadeIn].join(' ')}>
      <div>
        <header className="banner" >
            <div className="container text-center"> 
               <div className="row" style={{margin:30}}>
                 <br/>
               <h4 style={{fontWeight :'bold',textDecoration :'underline'}} onClick={toChoixPage}> Retour</h4>
                {candidates
                  ? (
                    <>
                      <h1>Sélectionner le candidat que vous voulez supprimer </h1>
                      <List candidates={candidates} onCandidateSelect={onCandidateSelect} />
                    </>
                  ) : (<h1>Chargement des candidats ...</h1>)}
                {(modal.opened)
                && (
                <Modal
                  data={modal.data}
                  dataConfirmed={dataConfirmed}
                  closeModal={closeModal}
                />
                )}
                {showSnackDelete && <Snackbar text="Candidat Supprimé avec succes! " />}
                {showSnackError && <Snackbar text="Oops une erreur est apparue. Veuillez Reeassayer ! " />}
               </div>
            </div>
        </header>
      </div>
      
      </main>
    </Layout>
  );
}
Candidates.propTypes = {
  setPage: PropTypes.func.isRequired
};
