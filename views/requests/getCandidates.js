//requete getCandidates from the db, convertion des données vers ou depuis json grace a stringify 

export default async function (votecount) {
  const response = await fetch('/candidates', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'vote-count': votecount
    },
    mode: 'cors',
    cache: 'default'
  }).then((res) => res.json())
    .catch((error) => error)
    .then((resJson) => resJson);
  return response;
}
