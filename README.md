# ReadWise Clone API

Basic Features and Services was Inspired by the [ReadWise](https://readwise.io/) Application.

## Available Features

- Login - Register services.
- Update User's Credential
- Update User's Profile information
- Add - Update Highlights.
- Set Highlight as Favorite.
- Set Highlight as public/private.
- Show all public Highlights.

## Upcoming Features

- Add a Tag to a specific Highlight.
- Like a specific Highlight.

## Documentation

[Swagger Documentation](http://3.144.253.79:5000/api-docs/)

## Tech Stack

- [NestJs](https://docs.nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeOrm](https://typeorm.io)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger for API Docs](https://swagger.io/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

For Database connection as described [here](https://docs.nestjs.com/techniques/database#typeorm-integration)

- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`
- `MODE`=DEV
- `RUN_MIGRATIONS`=true

Other Environment Variables

- `PORT`
- `JWT_SECRET` For JWT token verification

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

OR Start the server in watch/development Mode

```bash
  npm run start:dev
```

## Database Design

![](/img/db-design.png)
