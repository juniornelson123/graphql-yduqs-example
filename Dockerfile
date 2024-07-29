# Estágio de build
FROM node:16 AS builder

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install
RUN npm install --save-dev nodemon typescript ts-node

# Copia todo o código da aplicação para o diretório de trabalho
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Estágio de produção
FROM node:16 AS production

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia as dependências instaladas do estágio de build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Exponha a porta que o servidor usará
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["node", "dist/server.js"]

# Estágio de desenvolvimento
FROM builder AS development

# Exponha a porta que o servidor usará
EXPOSE 4000

# Comando para rodar a aplicação em desenvolvimento
CMD ["npm", "run", "dev"]
