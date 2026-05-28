This is a POST request to log in as an old user.

curl -s -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\": \"doaagamal\", \"password\": \"password123\"}"

{
  "message": "Login successful!"
}
