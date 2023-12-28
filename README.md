//user sign up

curl --location 'http://localhost:8000/v1/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Palak",
    "email": "alpha@gmail.com",
    "password": "queenalpha"
}'


//user sign up

curl --location --request GET 'http://localhost:8000/v1/auth/signin' \
--header 'Content-Type: application/json' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDM3NjE4Njl9.bElZ0Z3bCeGO5VV9pyGbuEyp4AKdYymRiiQTytAFgLk' \
--data-raw '{
    "email": "alpha@gmail.com",
    "password": "queenalpha"
}'


//create role

curl --location 'http://localhost:8000/v1/role' \
--header 'Content-Type: application/json' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDM3NjE4Njl9.bElZ0Z3bCeGO5VV9pyGbuEyp4AKdYymRiiQTytAFgLk' \
--data '{
  "name": "Community Admin"
}'

// get all role

curl --location 'http://localhost:8000/v1/role' \
--header 'Cookie: uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDM3NjE4Njl9.bElZ0Z3bCeGO5VV9pyGbuEyp4AKdYymRiiQTytAFgLk'