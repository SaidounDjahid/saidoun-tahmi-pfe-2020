//index du home
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Layout from '../../shared-ui/Layout';
/*importe le fichier button qui définit le paramétrage ( redirections ou) a partir du dossier shared-ui*/
import Button from '../../shared-ui/Button';
import { flipInX } from '../../shared-ui/animations';


export default function Home(props) {
  const { setPage } = props;
  //css
  const mainCSS = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
  div {
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    img {
      height: auto;
    }
  }

  @media (max-width: 1199px) {
    padding-top: 16vh;
    div {
      margin-bottom: 25vh;
      img {
        width: 95%;
      }
    }
  }
  @media (min-width: 1200px) {
    padding-top: 6%;
    div {
      margin-bottom: 13%;
      img {
        width: 972px;
      }
    }
  }
  `;
/* définit la mise en forme de notre bouton couleur et tout ... le bouton est de la meme couleur 
que le logo de notre fac usthb*/
  const buttonCSS = css`
    height: 100px;
    font-size: 24px;
    background-color: #3452B5;
    animation-name: flipInX;
    animation-duration: 0.75s;
  `;
  return (
    <Layout navbar="home" setPage={setPage}>
      <main className={mainCSS}>
        <div>
          <img src="./images/mern.png" alt="" />
        </div>
        <Button className={flipInX} text="Vot'Ini : Bienvenue ! " click={setPage} nonDefaultCss={buttonCSS} />
      </main>
    </Layout>
  );
}
Home.propTypes = {
  setPage: PropTypes.func.isRequired
};
