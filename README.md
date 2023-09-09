# Express TS Project Template

## About

This Github template is designed to get you up and running with an ExpressJS API using typescript, paired with Prisma an ORM to handle communication with the DB and running migrations.

### Features

- Express JS (Typescript)
- Prisma (configured to work with PostgreSQL)
- JWT Authentication with middleware in place
- Request Validation schema examples
- Boiler Plate User Flow (Registration, Login, Update-password)
- ESLint and Prettier (Configured with my preferences)

### Directories

```bash
.
├── README.md
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   └── schema.prisma
├── src
│   ├── db
│   │   ├── index.ts
│   │   └── prisma.ts # Prisma Client initialised here
│   ├── index.ts # Entry Point
│   ├── middleware
│   │   ├── auth
│   │   │   └── verifyToken.ts # Verify Auth Token in header
│   │   └── validation # Zod Validation Schemas Defined here
│   │       └── users
│   ├── routes # Express Routers Defined Here
│   │   └── users.ts
│   └── utils
│       ├── index.ts
│       └── jwt.ts # JWT Auth Token Helper functions
└── tsconfig.json
```

## Getting Started

### Pre-requisites

- [NodeJS](https://nodejs.org/en) (Template originally developed with v18)
- [PostgreSQL](https://www.postgresql.org/) (Local Or Remote)

### Setup

1. Copy `.env` file

   ```sh
   cp .env.example .env
   ```

2. Update DB URL with valid `USERNAME`, `PASSWORD`, and `DB_NAME`

3. Generate `.env` Secret Key

   ```sh
   openssl rand -hex 32
   ```

   Copy the output of the command and store it under the `JWT_SECRET_KEY` variable in the `.env` file

### Things to configure

- Models defined in`./prisma/schema.prisma`

## NPM Commands

- To build the app: `npm run build`
- To run the app for development: `npm run dev`
- To migrate the Prisma changes: `npm run prisma:migrate`
- To migrate the Prisma changes: `npm run prisma:generate`
- To validate coding styles: `npm run lint`
- To fix coding styles: `npm run lint:fix`
