# Getting Started

## Keycloak

You need to configure a Keycloak server, for example: \
[https://www.keycloak.org/getting-started/getting-started-docker](https://www.keycloak.org/getting-started/getting-started-docker)

Valid redirect URIs:

```bash
http://localhost:3000/*
```

Web origins:

```bash
/*
```

Admin URL:

```bash
http://localhost:3000
```

- Enable "Client Authentication" to obtain Credentials.
- Create the "admin" role.
- Create at least two users, assign the "admin" role to one of them.
- Add the "manage users" role to the created users.

## Vimeo

You need to have access to Vimeo. \
[https://vimeo.com/](https://vimeo.com/)

Create an app. \
[https://developer.vimeo.com/](https://developer.vimeo.com/)

## Frontend

Create the **.env.local** file, copy and complete the information:

```
KEYCLOAK_ID=
KEYCLOAK_SECRET=
KEYCLOAK_HOST=http://localhost:8080
REFRESH_TOKEN_URL=http://localhost:8080/realms/{replace-your-realm}/protocol/openid-connect/token

NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=CpbbYMhjS1MRqjmmxwSAKOxyJKoAfjVOXYYDiTD4qyk=

VIMEO_ACCESS_TOKEN=
VIMEO_CLIENT_ID=
VIMEO_CLIENT_SECRET=
VIMEO_USER_ID=
VIMEO_PER_PAGE=8
```

Install the dependencies.

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
