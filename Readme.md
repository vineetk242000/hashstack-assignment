# Auth_backend

## Default urls:

- {base_uri}/user/signup - POST

  Request structure:
  {
  "userName":"superadmin",
  "userLevel":"super_admin",
  "password":"password",
  "mobile":XXXXXXXX
  }

- {base_uri}/user/login - POST
  Request structure:
  {
  "userName":"superadmin",
  "password":"password",
  }

- {base_uri}/user/info - POST (requires super_admin user level)
  Request structure:
  {
  "mobile":XXXXXXX
  }

## Instalation

(I could have added docker for this.)

1. Clone Git repository
2. Add local .env file
3. Add variables http_port, Jwt_Secret, MongoDB_uri to the env file.
4. In your terminal run npm i
5. npm start will start your server
