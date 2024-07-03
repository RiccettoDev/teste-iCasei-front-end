# Use a imagem oficial do nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos HTML, CSS, JS para a pasta correta do nginx
COPY ./index.html /usr/share/nginx/html
COPY ./styles.css /usr/share/nginx/html
COPY ./script.js /usr/share/nginx/html
