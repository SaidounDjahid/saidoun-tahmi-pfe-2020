//formulaire ajout d'un candidat par un admin
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
  const [submitdDisabled, setSubmitdDisabled] = useState({
     name: true, id: true,parti : true,img :true
  });

  const onSubmit = async (submittedData) => {
      console.log(submittedData)
      var formData = new FormData();
      const items=['name','_id','house'];
      items.forEach((item)=>{
          formData.append(item,submittedData[item])
      });
      formData.append('img',submittedData.img[0])
    props.AjouterCandidat(formData);
  };

  return (
    console.log("This is the message "),   
    
    <form onSubmit={handleSubmit(onSubmit)} className={formCSS}>


      <label htmlFor="name">
        Nom Complet Du candidat
        <br />
        <input name="name" id="name" type="text" ref={register({ required: true, pattern: /^[A-Za-z ]+$/i, min: 3 })} onFocus={() => submitdDisabled.name && setSubmitdDisabled({ ...submitdDisabled, name: false })} />
        {validationHandler(errors.lastName)}
      </label>

      <label htmlFor="_id">
        ID
        <br />
        <input name="_id" type="number" id="id" ref={register({ required: true, min: 1, max: 100 })} onFocus={() => submitdDisabled.id && setSubmitdDisabled({ ...submitdDisabled, id: false })} />
        {validationHandler(errors.dni)}
      </label>
      <label htmlFor="house">
        Parti Politique
        <br />
        <input name="house" id="parti" type="text" ref={register({ required: true,  min: 3 })} onFocus={() => submitdDisabled.parti && setSubmitdDisabled({ ...submitdDisabled, parti: false })} />
        {validationHandler(errors.parti)}
      </label>


      <label htmlFor="img">
        Photo D'identite
        <br />
        <input name="img" id="parti" type="file" ref={register({ required: true})} onFocus={() => submitdDisabled.img && setSubmitdDisabled({ ...submitdDisabled, img: false })} />
        {validationHandler(errors.parti)}
      </label>

      <br />
      <input type="submit" value="Ajouter !" disabled={!(( !submitdDisabled.name && !submitdDisabled.id && !submitdDisabled.parti && !submitdDisabled.img))} />
     </form> 
  );
}

Form.propTypes = {
  validateVoterData: PropTypes.func.isRequired
};
