import 'whatwg-fetch';

export default (client, dropdown) => {

  if (!client) {
    throw new Error('Missing `client` argument');
  }

  if (!dropdown) {
    throw new Error('Missing `dropdown` argument');
  }

  return {
    send: expression => {

      if (!expression) {
        throw new Error('Missing `expression` argument');
      }

      return client
        .post('dropdown/messages', {
          message: {
            dropdown,
            expression
          }
        })
        .then(res => {
          let id = res.message.option;
          if (id) {
            return res.options
              .find(option => option.id === id)
              .value;
          } else {
            return null;
          }
        });
    }
  };
}
