# secure-message-app
Building a MVP of a secure messaging app that will set the foundations for the internal messaging communication tool

# Secure Messaging App 🛡️

A secure internal messaging MVP built with Node.js and TypeScript. This project demonstrates how to design and implement a scalable, secure REST API for internal communication, aligned with industry security best practices.

---

## 🚀 Features

- ✅ Register and list users with availability tracking
- ✅ Send and retrieve messages by user
- ✅ Secure JWT-based authentication
- ✅ Environment-based secret management
- ✅ Input validation and sanitization using `zod`
- ✅ Middleware protections: Helmet, Rate Limiting
- ✅ Structured logging and health check endpoint
- ✅ Security scanning integrated into CI/CD

---

## 🔧 Tech Stack

- **Language**: TypeScript (Node.js)
- **Framework**: Express.js
- **Auth**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **Logging**: Morgan / Winston
- **Security**: Helmet, express-rate-limit, dotenv
- **Testing**: Jest (planned)
- **CI/CD Security**: Bandit, Trivy, CodeQL, `npm audit`

---

## 🏁 Getting Started

### 📦 Prerequisites

- Node.js ≥ 18
- npm or yarn

### 🔧 Install dependencies

bash
npm install
