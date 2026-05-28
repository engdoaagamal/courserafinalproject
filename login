curl -s -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\": \"doaagamal\", \"password\": \"password123\"}"


{
  "message": "Customer successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvYWFnYW1hbCIsImlhdCI6MTc3OTg2ODAzM30.signature_placeholder"
}
