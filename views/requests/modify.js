//requete de la modification
export default async function (formValues) {
    console.log(formValues)
    const response = await fetch('/modify', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default'
    }).then((res) => res.json())
      .catch((error) => error)
      .then((resJson) => resJson);
    return response;
  }
  