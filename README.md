# RaspberryRocketeer

## How to run

### Copy .env
First you need to copy the `.env.example`.

```shell
cp .env.example .env
```

<small>Note: It is recommended to change the values for the database user.</small>

### Install node packages
Go into the frontend folder using
```shell
cd frontend
```
and run:
```shell
npm install
```

### Start the container

```shell
docker compose up --build
```
