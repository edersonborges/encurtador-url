const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes.ts']; // Inclua aqui os arquivos com as anotações

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger JSON generated');
});
