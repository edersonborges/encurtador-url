# Espera o banco de dados estar acessível
until nc -z -v -w30 db 5432
do
  echo "Esperando pelo banco de dados..."
  sleep 1
done
echo "Banco de dados está disponível!"

# Espera o Redis estar acessível
until nc -z -v -w30 redis 6379
do
  echo "Esperando pelo Redis..."
  sleep 5
done
echo "Redis está disponível!"

# Executa as migrações de produção
npx prisma migrate deploy

# Inicia a aplicação
npm start
