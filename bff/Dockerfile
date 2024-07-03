# Use a imagem oficial do Node.js
FROM node:14

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de configuração e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o resto dos arquivos do projeto
COPY . .

# Compile TypeScript para JavaScript
RUN npm run build

# Expõe a porta do aplicativo
EXPOSE 3000

# Comando padrão para executar o aplicativo
CMD ["npm", "start"]
