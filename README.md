# Service Documentation

## Requirements

1. MySQL
2. JavaScript

## Running the Service

```bash
npm i
npm run start
```

## Curl of APIs

### Create Role

```bash
curl --location 'http://localhost:8000/v1/role' \
--header 'Content-Type: application/json' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc5MjQ2MX0.SLJENjVW7shqRF1ecluBnTRfH1gQnJwPTh2KGtVL57M' \
--data '{
    "name": "Community Member"
}'
```


### Get all Role

```bash
curl --location 'http://localhost:8000/v1/role' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc5MjQ2MX0.SLJENjVW7shqRF1ecluBnTRfH1gQnJwPTh2KGtVL57M'
```

### User Signup

```bash
curl --location 'http://localhost:8000/v1/auth/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9iZXJ0IGRvd25leSIsImlkIjoiNzE0NjIyMzIyMjE5NjM1Njk4OCIsImlhdCI6MTcwMzc5MjM4Nn0.aqtPWDosPjJMM5IwHU9Yk09sC9CRNlfw9aJTbHLNF94' \
--data-raw '{
    "name": "robert downey",
    "email": "robert54@gmail.com",
    "password": "dogcat"
}'
```

### User Signin

```bash
curl --location --request GET 'http://localhost:8000/v1/auth/signin' \
--header 'Content-Type: application/json' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc5MjQ2MX0.SLJENjVW7shqRF1ecluBnTRfH1gQnJwPTh2KGtVL57M' \
--data-raw '{
    "email": "starmoun@gmail.com",
    "password": "missKing"
}'
```

### Get User

```bash
curl --location 'http://localhost:8000/v1/auth/me' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc5MjQ2MX0.SLJENjVW7shqRF1ecluBnTRfH1gQnJwPTh2KGtVL57M'
```

### Create Community

```bash
curl --location 'http://localhost:8000/v1/community' \
--header 'Content-Type: application/json' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc4OTc3Nn0.6ovitWxPx8QpkJnrIlJQ8J5zAHSg9xFbR2kLozR83uk' \
--data '{
  "name": "Namaste"
}'
```

### Get all Community

```bash
curl --location 'http://localhost:8000/v1/community' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc4OTc3Nn0.6ovitWxPx8QpkJnrIlJQ8J5zAHSg9xFbR2kLozR83uk'
```

### Get all Community Member

```bash
curl --location 'http://localhost:8000/v1/community/Namaste/members' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc4OTc3Nn0.6ovitWxPx8QpkJnrIlJQ8J5zAHSg9xFbR2kLozR83uk'
```

### Get Community Owned by Me

```bash
curl --location 'http://localhost:8000/v1/community/me/owner' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc4OTc3Nn0.6ovitWxPx8QpkJnrIlJQ8J5zAHSg9xFbR2kLozR83uk'
```

### Get Community I am Member of

```bash
curl --location 'http://localhost:8000/v1/community/me/member' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc4OTc3Nn0.6ovitWxPx8QpkJnrIlJQ8J5zAHSg9xFbR2kLozR83uk'
```

### Add New Member

```bash
curl --location 'http://localhost:8000/v1/member' \
--header 'Content-Type: application/json' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9udSIsImlkIjoiNzE0NjIxMTgxMDQ4MjE0OTI4MSIsImlhdCI6MTcwMzc4OTc3Nn0.6ovitWxPx8QpkJnrIlJQ8J5zAHSg9xFbR2kLozR83uk' \
--data '{
    "community": "7146214580046633389",
    "user": "7146212013804401968",
    "role": "7146214580152870625"
}'
```



