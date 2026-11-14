# AI Health Advisor

A full-stack **MERN** health management web application with AI-powered health guidance.

**Live Demo:** https://ai-health-advisor-saurabh-f7c6.vercel.app

## About

AI Health Advisor helps users manage their daily health in one place. Users can track nutrition, water intake, weight and sleep, view health reports and progress charts, and get general health and wellness guidance from an AI advisor powered by the Google Gemini API.

## Features

- Secure authentication with JWT and bcrypt password hashing
- Personal dashboard with BMI, daily calories, water and sleep goals
- AI Health Advisor chat (Google Gemini API) with built-in safety rules
- Nutrition Tracker with USDA FoodData Central food search
- Water Tracker with daily intake goal
- Health Reports and progress charts
- User profile with personal health goals

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, JavaScript, Vite, React Router, Recharts |
| Backend | Node.js, Express.js (REST API) |
| Database | MongoDB Atlas with Mongoose |
| Authentication | JWT, bcrypt |
| AI | Google Gemini API |
| Food Data | USDA FoodData Central API |
| Deployment | Vercel (frontend and serverless backend) |

## Run Locally

```bash
npm install
npm run dev
```

The backend requires a `.env` file with `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `GEMINI_MODEL` and `FDC_API_KEY`.

## Author

**Saurabh** — Full Stack Developer (MERN Stack)

LinkedIn: https://www.linkedin.com/in/saurabh-goud
