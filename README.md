# 🚀 Complete API Workflow Guide - Step by Step

## Prerequisites
- FastAPI server running on `http://localhost:8000`
- PostgreSQL database set up
- API documentation available at `http://localhost:8000/docs`

---

## 📋 **STEP 1: User Registration & Authentication**

### 1.1 Register a New User
```bash
POST http://localhost:8000/api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "age": 28,
  "gender": "M"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 28,
  "gender": "M",
  "role": "USER",
  "avatar_url": null,
  "is_active": true,
  "created_at": "2024-06-03T10:30:00Z"
}
```

### 1.2 Login to Get Access Token
```bash
POST http://localhost:8000/api/v1/auth/login
Content-Type: application/x-www-form-urlencoded

username=john.doe@example.com&password=SecurePass123!
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**🔑 Save this token! You'll need it for all subsequent API calls.**

---

## 🍎 **STEP 2: Add Food Items**

### 2.1 Admin Creates Predefined Food Items
```bash
POST http://localhost:8000/api/v1/foods
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Banana",
  "calories": 105,
  "image_url": "https://example.com/banana.jpg",
  "is_predefined": true
}
```

### 2.2 User Creates Personal Food Item
```bash
POST http://localhost:8000/api/v1/foods
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Homemade Protein Smoothie",
  "calories": 320,
  "image_url": "https://example.com/smoothie.jpg",
  "is_predefined": false
}
```

### 2.3 Get All Available Food Items
```bash
GET http://localhost:8000/api/v1/foods
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
[
  {
    "id": "food-uuid-1",
    "name": "Banana",
    "calories": 105,
    "image_url": "https://example.com/banana.jpg",
    "is_predefined": true,
    "user_id": null
  },
  {
    "id": "food-uuid-2",
    "name": "Homemade Protein Smoothie",
    "calories": 320,
    "image_url": "https://example.com/smoothie.jpg",
    "is_predefined": false,
    "user_id": "550e8400-e29b-41d4-a716-446655440000"
  }
]
```

---

## 🏋️ **STEP 3: Add Exercise Items**

### 3.1 Create Predefined Exercise
```bash
POST http://localhost:8000/api/v1/exercises
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Running",
  "duration_mins": 30,
  "calories_burnt": 300,
  "is_predefined": true
}
```

### 3.2 User Creates Personal Exercise
```bash
POST http://localhost:8000/api/v1/exercises
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Home Yoga Session",
  "duration_mins": 45,
  "calories_burnt": 180,
  "is_predefined": false
}
```

### 3.3 Get All Available Exercises
```bash
GET http://localhost:8000/api/v1/exercises
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🥗 **STEP 4: Log Daily Meals**

### 4.1 Create a Meal Entry
```bash
POST http://localhost:8000/api/v1/meals
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "meal_date": "2024-06-03",
  "meal_time": "08:30:00",
  "image_url": "https://example.com/breakfast.jpg"
}
```

**Response:**
```json
{
  "id": "meal-uuid-1",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "meal_date": "2024-06-03",
  "meal_time": "08:30:00",
  "image_url": "https://example.com/breakfast.jpg",
  "created_at": "2024-06-03T08:30:00Z"
}
```

### 4.2 Add Food Items to the Meal
```bash
POST http://localhost:8000/api/v1/meal-items
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "meal_id": "meal-uuid-1",
  "food_item_id": "food-uuid-1",
  "quantity": 2
}
```

```bash
POST http://localhost:8000/api/v1/meal-items
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "meal_id": "meal-uuid-1",
  "food_item_id": "food-uuid-2",
  "quantity": 1
}
```

### 4.3 Get User's Meals
```bash
GET http://localhost:8000/api/v1/meals/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🏃 **STEP 5: Log Exercise Activities**

### 5.1 Log Running Exercise
```bash
POST http://localhost:8000/api/v1/user-exercises
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "exercise_item_id": "exercise-uuid-1",
  "date": "2024-06-03T09:00:00Z",
  "duration_mins": 25
}
```

### 5.2 Log Yoga Session
```bash
POST http://localhost:8000/api/v1/user-exercises
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "exercise_item_id": "exercise-uuid-2",
  "date": "2024-06-03T18:00:00Z",
  "duration_mins": 45
}
```

### 5.3 Get User's Exercise History
```bash
GET http://localhost:8000/api/v1/user-exercises/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 **STEP 6: View Analytics**

### 6.1 Get Daily Analytics
```bash
GET http://localhost:8000/api/v1/analytics/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "date": "2024-06-03",
  "total_calories_in": 530,
  "total_calories_out": 430,
  "net_calories": 100,
  "meals": [
    {
      "meal_time": "08:30:00",
      "total_calories": 530,
      "foods": [
        {"name": "Banana", "quantity": 2, "calories": 210},
        {"name": "Homemade Protein Smoothie", "quantity": 1, "calories": 320}
      ]
    }
  ],
  "exercises": [
    {"name": "Running", "duration": 25, "calories_burnt": 250},
    {"name": "Home Yoga Session", "duration": 45, "calories_burnt": 180}
  ]
}
```

---

## 🤖 **STEP 7: Get Recommendations**

### 7.1 Get Personalized Recommendations
```bash
GET http://localhost:8000/api/v1/recommendations/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "food_recommendations": [
    {
      "id": "rec-uuid-1",
      "type": "Food",
      "recommended_item": {
        "name": "Greek Yogurt",
        "calories": 150
      },
      "reason": "High protein, low calorie option to balance your intake"
    }
  ],
  "exercise_recommendations": [
    {
      "id": "rec-uuid-2", 
      "type": "Exercise",
      "recommended_item": {
        "name": "Light Walking",
        "duration_mins": 20,
        "calories_burnt": 80
      },
      "reason": "Low impact exercise to burn remaining 100 calories"
    }
  ]
}
```

---

## 📸 **STEP 8: Social Features - Vlogs**

### 8.1 Create a Food Vlog Post
```bash
POST http://localhost:8000/api/v1/vlogs
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "My Healthy Breakfast Bowl 🥣",
  "image_url": "https://example.com/breakfast-bowl.jpg",
  "description": "Started my day with this amazing acai bowl! Recipe: acai, banana, granola, and fresh berries. Perfect balance of nutrients!"
}
```

### 8.2 Get All Vlogs (Social Feed)
```bash
GET http://localhost:8000/api/v1/vlogs
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 8.3 Like a Vlog Post
```bash
POST http://localhost:8000/api/v1/vlogs/vlog-uuid-1/like
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 8.4 Comment on a Vlog
```bash
POST http://localhost:8000/api/v1/vlogs/vlog-uuid-1/comments
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "comment": "This looks amazing! Could you share the exact recipe?"
}
```

### 8.5 Reply to a Comment
```bash
POST http://localhost:8000/api/v1/vlogs/vlog-uuid-1/comments
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "comment": "Sure! I'll post the full recipe in my next vlog 😊",
  "parent_id": "comment-uuid-1"
}
```

---

## 🔄 **Complete Daily Workflow Example**

Here's a typical user's daily workflow:

### Morning (8:00 AM)
1. **Log Breakfast**
   - Create meal entry for 8:00 AM
   - Add oatmeal (200 cal) + banana (105 cal) + milk (80 cal)
   - Total breakfast: 385 calories

2. **Plan Morning Exercise**
   - Check recommendations
   - Log planned 30-min jog (300 cal burn)

### Afternoon (12:30 PM)
3. **Log Lunch**
   - Create meal entry for 12:30 PM
   - Add chicken salad (450 cal) + apple (80 cal)
   - Total lunch: 530 calories

### Evening (6:00 PM)
4. **Log Actual Exercise**
   - Update with actual 25-min jog (250 cal burn)
   - Add evening yoga (45 min, 180 cal burn)

5. **Check Analytics**
   - Total calories in: 915
   - Total calories out: 430
   - Net calories: +485

6. **Get Dinner Recommendations**
   - System suggests light dinner (~400 cal) for balanced day
   - Recommends grilled fish with vegetables

### Night (8:00 PM)
7. **Log Dinner & Social Sharing**
   - Create meal entry for dinner
   - Take photo and create vlog post
   - Share recipe and get community feedback

---

## 📈 **Data Flow Summary**

```
User Registration → Authentication Token → 
Add Foods/Exercises → Log Daily Meals → 
Log Exercise Activities → System Calculates Analytics → 
Generate Personalized Recommendations → 
Share Social Content → Community Engagement
```




1. **Save the access token** as an environment variable
2. **Test with multiple users** to see social features
3. **Log data for several days** to see recommendation improvements
4. **Try different calorie balances** to see varied recommendations

## 🔍 **API Endpoints Quick Reference**

| Feature | Method | Endpoint | Purpose |
|---------|--------|----------|---------|
| Auth | POST | `/auth/signup` | Register user |
| Auth | POST | `/auth/login` | Get access token |
| Foods | GET/POST | `/foods` | Manage food items |
| Exercises | GET/POST | `/exercises` | Manage exercises |
| Meals | POST | `/meals` | Create meal entry |
| Meal Items | POST | `/meal-items` | Add foods to meal |
| User Exercises | POST | `/user-exercises` | Log exercise activity |
| Analytics | GET | `/analytics/{user_id}` | View daily stats |
| Recommendations | GET | `/recommendations/{user_id}` | Get suggestions |
| Vlogs | GET/POST | `/vlogs` | Social food posts |
| Comments | POST | `/vlogs/{id}/comments` | Engage with posts |
| Likes | POST/DELETE | `/vlogs/{id}/like` | Like/unlike posts |

