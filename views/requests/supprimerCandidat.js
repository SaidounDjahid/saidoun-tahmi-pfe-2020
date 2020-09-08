//requete supprimerCandidat
import { json } from "body-parser";
export default async function (requestData) {
    console.log(requestData)
    const response = await fetch('/supprimerCandidat', {
      method: 'POST',
      body : JSON.stringify(requestData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      mode: 'cors',
      cache: 'default'
    }).then((res) => res.json())
      .catch((error) => error)
      .then((resJson) => resJson);
    return response;
  }
  