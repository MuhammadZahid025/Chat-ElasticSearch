import { Client } from '@elastic/elasticsearch';

export const ClientProvider = {
  provide: 'ELASTICSEARCH_CLIENT',
  useFactory: async () => {
    const client = new Client({
      node: process.env.ELASTIC_NODE,
      auth: {
        username: process.env.ELASTIC_SEARCH_USER_NAME,
        password: process.env.ELASTIC_SEARCH_PASSWORD,
      },
    });
    return client;
  },
};
