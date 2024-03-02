import { port } from './port';

export const openApiConfig = {
  info: {
    title: 'Vehicle API',
    version: '1.0.0',
    description: 'Internal tool for managing cars and motorcycles',
    contact: { name: 'Arvil Mena', url: 'https://arvilmena.com' },
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Local server',
    },
    {
      url: `http://MY-PRODUCTION-DOMAIN.com`,
      description: 'Production',
    },
  ],
};

export const openApiOptions = {
  setOperationId: true,
};
