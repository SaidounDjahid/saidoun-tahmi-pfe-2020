//requete ajoutcandidat, convertion des données vers ou depuis json grace a stringify 

import { json } from "body-parser";

export default async function (requestData) {
    const response = await fetch('/AjouterCandidat', {
      method: 'POST',
      body : requestData,
      mode: 'cors',
      cache: 'default'
    }).then((res) => res.json())
      .catch((error) => error)
      .then((resJson) => resJson);
    return response;
  }
  