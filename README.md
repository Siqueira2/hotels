# Guia para Subir o Frontend com Docker e Executar Testes

Este guia fornece instruções para configurar e executar o ambiente frontend utilizando Docker, além de orientações para rodar os testes automatizados.

## Requisitos

Certifique-se de que sua máquina possui os seguintes softwares instalados:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js e npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) (Caso deseje executar localmente)

## Passos para Subir o Frontend com Docker

**Construir e Iniciar o Container**

Execute os comandos abaixo para construir a imagem Docker e iniciar o container em segundo plano:

   ```
   docker compose pull
   docker compose build
   docker compose up -d
   ```

Este comando executa o ambiente no modo destacado (background).
Caso queira executar localmente, execute os seguintes comandos:

   ```
   npm install
   npm run dev
   ```

### 3. Acessar a Aplicação

Após o container estar em execução, acesse o frontend através do endereço:

```
http://localhost:9000
```

### 4. Parar o Container

Para interromper a execução do container, utilize o comando:

```
docker compose down
```

## Executar Testes Automatizados

### Acessar o Container

Utilize o comando abaixo para acessar o shell do container em execução:

```
docker compose exec frontend sh
```

### Executar os Testes

Dentro do container, execute o seguinte comando para rodar os testes:

```
npm run test:unit
```
### Preview
Link para [preview](https://hotels-iota.vercel.app/).

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
