# 📌 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```ini
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?sslmode=require"
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```
👉 **Replace the placeholders with your actual credentials before running the project.**

---
# Running with Docker 
1. **Build the Docker image**
   ```sh
   docker build -t dietly_nodejs_backend .
   ```

2. **Run the container** add in  
   ```sh
   docker run -p 5000:5000 --env-file .env dietly_nodejs_backend
   ```
# User Management & Fitness Tracker API Documentation

This document outlines the API endpoints and functionality for a comprehensive user management system, food database, meal tracker, exercise tracker, personalized recommendations, and analytics for fitness and wellness tracking.

---

## 🚀 1. User Management

### Purpose: 
Handle user registration, authentication, and profile management.

### Components

#### 🔐 Authentication
- **JWT-Based Authentication:**
  - **AccessToken**: Short-lived tokens for stateless authentication.
  - **RefreshToken**: Long-lived tokens to renew access tokens.
  
- **APIs:**
  - `POST /register`: Register a new user.
  - `POST /login`: Authenticate and issue tokens.
  - `POST /refresh`: Renew access tokens.

#### 👤 User Profiles
- **APIs:**
  - `GET /profile`: Fetch user profile.
  - `PUT /profile`: Update user details (e.g., weight, goals, activity level).

#### 🍏 User Preferences
- **Dietary restrictions and calorie/water intake goals.**
- **APIs:**
  - `GET /preferences`: Fetch user preferences.
  - `PUT /preferences`: Update preferences.

---

## 🍽️ 2. Food Database

### Purpose:
Store and manage food items with nutritional information.

### Components

#### 🍔 Food Management
- **Entities:** FoodItem (predefined foods), UserFoods (custom user-defined foods).

- **APIs:**
  - `GET /foods`: Fetch food list (with filters like category or calories).
  - `POST /foods`: Add a new food item (admin or user-defined).
  - `GET /foods/{id}`: Get food details.

#### 🔍 Search & Filter
- **Query foods by:**
  - Name, Category, Macros, or Calories.

- **Caching:** 
  - Use Redis to cache frequently accessed foods for faster retrieval.

---

## 🍴 3. Meal Tracker

### Purpose:
Track meals and calculate daily calorie and macro intake.

### Components

#### 🍽️ Meal Logging
- Log meals with associated foods and quantities.
- Automatically calculate:
  - Total calories.
  - Macros (carbs, proteins, fats).

- **APIs:**
  - `POST /meals`: Log a meal.
  - `GET /meals`: Fetch all meals for a specific day.
  - `DELETE /meals/{id}`: Delete a specific meal log.

#### 📊 Daily Summary
- Aggregate daily calorie and macro data.
- Calculate remaining calories based on goals.

- **APIs:**
  - `GET /meals/summary`: Fetch daily calorie/macro summary.

---

## 🏋️‍♂️ 4. Exercise Tracker

### Purpose:
Log exercises and calculate calories burned.

### Components

#### 🏃‍♀️ Exercise Database
- Predefined exercises with calories burned per minute.
- Custom exercises added by users.

- **APIs:**
  - `GET /exercises`: Fetch exercise list.
  - `POST /exercises`: Add a custom exercise.

#### 🏅 Exercise Logging
- Log exercise sessions with duration and calories burned.
- Automatically calculate calories burned based on:
  - Duration × Calories per Minute.

- **APIs:**
  - `POST /exercise`: Log an exercise session.
  - `GET /exercise`: Fetch all exercises for a specific day.
  - `DELETE /exercise/{id}`: Delete a specific exercise log.

---

## 💡 5. Recommendations

### Purpose:
Provide personalized suggestions for meals and exercises.

### Components

#### 🍲 Meal Recommendations
- Recommend meals based on:
  - User preferences (e.g., dietary restrictions).
  - Remaining calorie/macro targets for the day.

- **APIs:**
  - `GET /recommendations/meals`: Fetch meal suggestions.

#### 🏋️‍♀️ Exercise Recommendations
- Suggest exercises based on:
  - User activity level.
  - Calories left to burn for the day.

- **APIs:**
  - `GET /recommendations/exercises`: Fetch exercise suggestions.

---

## 📈 6. Analytics & Insights

### Purpose:
Provide users with progress tracking and visual insights.

### Components

#### 📊 Progress Tracking
- Track daily, weekly, and monthly progress for:
  - Weight.
  - Calories consumed vs. burned.

- **APIs:**
  - `GET /analytics/progress`: Fetch progress logs.

#### 📉 Data Visualization
- Generate charts and graphs:
  - Weight changes over time.
  - Calories consumed vs. burned.
- Use libraries like Chart.js for frontend rendering.

- **APIs:**
  - `GET /analytics/charts`: Fetch data for visualization.

---

## 🔔 7. Notifications

### Purpose:
Keep users engaged with timely reminders.

### Components

#### 🍽️ Meal Reminders
- Send notifications for meal logging.
- Configurable times based on user preferences.

#### 💧 Hydration Alerts
- Reminders to drink water based on:
  - Water intake goal.
  - Time intervals.

#### 🏋️‍♀️ Exercise Prompts
- Remind users to log exercises or take breaks.
- Suggest short activities.

#### 🛠️ System Design
- Use a task scheduler (e.g., Cron Jobs or Celery) to manage notification triggers.
- Integrate with push notification services (e.g., Firebase).

---

## 📲 8. Integration

### Purpose:
Extend functionality via external devices and APIs.

### Components

#### ⌚ Wearable Device Integration
- Sync with devices like Fitbit or Apple Watch to:
  - Fetch step count, calories burned, and activity data.

#### 🌐 External APIs
- Use third-party APIs for:
  - Food database (e.g., USDA, Edamam).
  - Exercise data.

- **APIs:**
  - `POST /integrations/{type}`: Sync external data with the app.

---

## 🗺️ 9. Workflow Diagram

Here is an overview of how the application flows:

1. **User Login:**
   - Authenticate user and fetch preferences.
   - Set daily calorie and macro goals.

2. **Food Logging:**
   - Search food database, log meals.
   - Automatically calculate calories/macros.

3. **Exercise Logging:**
   - Log exercises and calculate calories burned.

4. **Recommendations:**
   - Dynamically update meal and exercise suggestions.

5. **Analytics:**
   - Generate insights on progress and visualize data.

6. **Notifications:**
   - Send timely reminders for meals, hydration, and exercises.

**Workflow Diagram:**

1. **User Login:**
   - Authenticate user and fetch preferences.
   - Set daily calorie and macro goals.

2. **Food Logging:**
   - Search food database, log meals.
   - Automatically calculate calories/macros.

3. **Exercise Logging:**
   - Log exercises and calculate calories burned.

4. **Recommendations:**
   - Dynamically update meal and exercise suggestions.

5. **Analytics:**
   - Generate insights on progress and visualize data.

6. **Notifications:**
   - Send timely reminders for meals, hydration, and exercises.

---

## API Summary Table

| Endpoint                     | Method | Description                                             |
|------------------------------|--------|---------------------------------------------------------|
| `/register`                   | POST   | Register a new user.                                    |
| `/login`                      | POST   | Authenticate and issue tokens.                          |
| `/profile`                    | GET/PUT| Fetch/update user profile.                              |
| `/preferences`                | GET/PUT| Fetch/update user preferences.                          |
| `/foods`                      | GET/POST| Fetch/add food items.                                  |
| `/foods/{id}`                 | GET    | Fetch food details by ID.                               |
| `/meals`                      | POST/GET| Log/fetch meals.                                        |
| `/meals/{id}`                 | DELETE | Delete a meal log.                                      |
| `/exercise`                   | POST/GET| Log/fetch exercises.                                    |
| `/exercise/{id}`              | DELETE | Delete an exercise log.                                 |
| `/recommendations/meals`      | GET    | Get meal suggestions.                                   |
| `/recommendations/exercises`  | GET    | Get exercise suggestions.                               |
| `/analytics/progress`         | GET    | Fetch progress data.                                    |
| `/analytics/charts`           | GET    | Fetch chart data.                                       |
| `/notifications`              | POST   | Schedule notifications. 
