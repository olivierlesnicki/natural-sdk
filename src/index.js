import createClient from './client';
import dropdown from './api/dropdown';

export default host => {
  let client;

  if (!host) {
    throw new Error('Missing `host` argument');
  }

  client = createClient(host);

  return {
    dropdown: id => {
      if (!id) {
        throw new Error('Missing `id` argument');
      }
      return dropdown(client, id);
    }
  }
}
