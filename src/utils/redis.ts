import { createClient } from 'redis';

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

console.log('Conectando ao Redis em:', `${redisHost}:${redisPort}`);

const redisClient = createClient({
    socket: {
        host: redisHost,
        port: Number(redisPort),
    },
});

redisClient.on('error', (err) => {
    console.error('Erro no Redis client', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Redis conectado');
    } catch (err) {
        console.error('Erro ao conectar ao Redis:', err);
    }
})();

export { redisClient };
