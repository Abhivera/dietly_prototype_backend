
### Purpose: 
Handle user registration, authentication.

### Components

#### 🔐 Authentication
- **JWT-Based Authentication:**
  - **AccessToken**: Short-lived tokens for stateless authentication.
  - **RefreshToken**: Long-lived tokens to renew access tokens.
  
- **APIs:**
  - `POST /register`: Register a new user.
  - `POST /login`: Authenticate and issue tokens.
  - `POST /refresh`: Renew access tokens.



## API Summary Table

| Endpoint                     | Method | Description                                             |
|------------------------------|--------|---------------------------------------------------------|
| `/register`                   | POST   | Register a new user.                                    |
| `/login`                      | POST   | Authenticate and issue tokens.                      