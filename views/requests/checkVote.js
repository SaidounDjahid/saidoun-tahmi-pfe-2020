//requete admin login, convertion des données vers ou depuis json grace a stringify : 

export default async function (voterData) {
    const response = await fetch('/checkVote', {
      method: 'POST',
      body :JSON.stringify({
          id : voterData._id
      }),
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
  