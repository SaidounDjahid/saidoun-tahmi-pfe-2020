//formulaire de modification des données d'un votant 
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { css } from 'emotion';
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
  const {voterData} = props;
  const [submitdDisabled, setSubmitdDisabled] = useState({
    firstName: true, lastName: true
  });

  const onSubmit = async (submittedData) => {
      submittedData.gender = voterData.gender;
      submittedData.dni = voterData.dni;
      submittedData._id=voterData.dni;
      submittedData.email = voterData.email;
      console.log(submittedData);
    props.ModifyVoterData(submittedData);
  };

  return (
    console.log("This is the message "),   
    
    <form onSubmit={handleSubmit(onSubmit)} className={formCSS}>

      <label htmlFor="firstName">
        Prénom
        <br />
        <input name="firstName" id="firstName" type="text" placeholder={voterData.firstName} ref={register({ required: true, pattern: /^[A-Za-z ]+$/i, minLength: 3 })} onChange={(e) => e.target.value===''? setSubmitdDisabled({ ...submitdDisabled, firstName: true }): setSubmitdDisabled({ ...submitdDisabled, firstName: false })} />
        {validationHandler(errors.firstName)}
      </label>

      <label htmlFor="lastName">
        Nom
        <br />
        <input name="lastName" id="lastName" type="text" placeholder={voterData.lastName} ref={register({ required: true, pattern: /^[A-Za-z ]+$/i, min: 3 })} onChange={(e) =>e.target.value===''? setSubmitdDisabled({ ...submitdDisabled, lastName: true }): setSubmitdDisabled({ ...submitdDisabled, lastName: false })} />
        {validationHandler(errors.lastName)}
      </label>

      <label htmlFor="dni">
        E-Vote (Saisissez le numéro que vous avez reçu par SMS sur votre ligne. Si vous ne l'avez pas reçu, veuillez saisir entrer un nombre à 8 chiffres aléatoire. Veuillez SVP noter votre E-Vote ! )
        <br />
        <input name="dni" type="number" id="dni" disabled={true} value={voterData.dni} />
        {validationHandler(errors.dni)}
      </label>
      <label htmlFor="email">
        Email
        <br />
        <input name="email" id="email" type="text" disabled={true} value={voterData.email}  />
        {validationHandler(errors.email)}
      </label>

      <p>Genre</p>
      <div className="radioInputs">
        <label htmlFor="radio-male">
          <input name="gender" type="radio" value="male" id="radio-male" disabled={true} checked={voterData.gender==='male'}  ref={register({ required: true })} />
          <p>Homme</p>
        </label>

        <label htmlFor="radio-female">
          <input name="gender" type="radio" value="female" id="radio-female"  disabled={true} checked={voterData.gender==='female'} ref={register({ required: true })} />
          <p>Femme</p>
        </label>
      </div>
      <br />
     

      {validationHandler(errors.gender)}

      <input type="submit" value="Modify !" disabled={!((!submitdDisabled.firstName && !submitdDisabled.lastName ))} />
     </form> 
  );
}

Form.propTypes = {
  validateVoterData: PropTypes.func.isRequired
};
