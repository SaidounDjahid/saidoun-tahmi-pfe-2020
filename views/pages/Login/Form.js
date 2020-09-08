//formulaire de connexion d'un votant : nécessite email et evote
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { css } from 'emotion';
//css du formulaire
const formCSS = css`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    height: 100%;

    label {
        width: 100%;
    }

    input[type=text], input[type=number] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
    
    input[type=radio] {
        width: 25px;
        height: 25px;
    }
    
    input[type=submit] {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      input[type=submit] {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      input[type=submit]:hover {
        background-color: #45a049;
      }

      input[type=submit][disabled], input[type=submit][disabled]:hover {
        background-color: gray;
        cursor: default
      }



    p {
        margin-top: 0;
        margin-bottom: 0;
    }

    .radioInputs {
        display: flex;
        flex-direction: row;
        justify-content: center;
        label {
            display: flex;
            flex-direction: row;
            width: 35%;
            p {
                margin-top: 7px;
                margin-left: 5px;
            }
        }
    }

    .validation {
        height: 30px;
        width: 100%;
        max-height: 30px;
        overflow: hidden;
        color: red;
    }
`;


function validationHandler(error) {
  let message = <div className="validation" />;
  if (!error) return message;

  switch (error.type) {
    case 'required':
      message = <div className="validation">Champ obligatoire</div>;
      break;
    case 'pattern':
      message = <div className="validation">Certains caractères sont incorrects</div>;
      break;
    case 'minLength':
      message = <div className="validation">Sous le minimum de caractères</div>;
      break;
    case 'max':
      message = <div className="validation">Dépasse la valeur maximale</div>;
      break;
    case 'min':
      message = <div className="validation">En dessous de la valeur minimale</div>;
      break;
  }
  return message;
}

export default function Form(props) {
  const { register, handleSubmit, errors } = useForm();
  const [submitdDisabled, setSubmitdDisabled] = useState({
    dni: true,email : true
  });

  const onSubmit = async (submittedData) => {
    props.validateVoterData(submittedData);
  };

  return (
    console.log("This is the message "),   
    
    <form onSubmit={handleSubmit(onSubmit)} className={formCSS}>      
      <label htmlFor="email">
        Email
        <br />
        <input name="email" id="email" type="text" ref={register({ required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, min: 3 })} onChange={(e) => e.target.value !=="" ? setSubmitdDisabled({ ...submitdDisabled, email: false }) :setSubmitdDisabled({ ...submitdDisabled, email: true })} />
        {validationHandler(errors.email)}
      </label>
      <label htmlFor="dni">
        E-Vote (Saisissez le numéro que vous avez reçu par SMS . Si vous ne l'avez pas reçu, veuillez entrer un nombre à 8 chiffres aléatoire que vous prendrez le soin de noter ! )
        <br />
        <input name="dni" type="number" id="dni" ref={register({ required: true, min: 10000000, max: 50000000 })} onChange={(e) => {
            var i = parseInt(e.target.value);
            i >=10000000 && i <=50000000 ? setSubmitdDisabled({ ...submitdDisabled, dni: false }) : setSubmitdDisabled({ ...submitdDisabled, dni: true })
        }} />
        {validationHandler(errors.dni)}
      </label>

      {validationHandler(errors.gender)}

      <input type="submit" value="Login" disabled={!((!submitdDisabled.dni && !submitdDisabled.email))} />
     </form> 
  );
}

Form.propTypes = {
  validateVoterData: PropTypes.func.isRequired
};
