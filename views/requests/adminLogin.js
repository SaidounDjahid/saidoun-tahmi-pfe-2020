//requete admin login, convertion des données vers ou depuis json grace a stringify 
import { json } from "body-parser";
export default async function (requestData) {
    const response = await fetch('/adminLogin', {
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
  