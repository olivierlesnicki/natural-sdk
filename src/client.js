export default host => {
  return {
    post: (urn, body) => {
      return fetch(`${host}/${urn}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json());
    }
  };
};
