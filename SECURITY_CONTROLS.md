# SECURITY_CONTROLS.md

## 🛡️ Secure Messaging App - Security Controls

This document outlines the security architecture and controls implemented in the **Secure Messaging App**. These measures ensure confidentiality, integrity, and availability across the app's lifecycle — from design to deployment.

---

## 🔍 1. Design-Level Controls

### ✅ Threat Modeling
- Conducted during design phase. See [THREAT_MODEL.md](./THREAT_MODEL.md).
- Identified key risks: data leakage, spoofed identities, abuse of message API, token theft.

### ✅ Secure-by-Default Architecture
- RESTful API design with strict access control.
- Separation of concerns: routing, validation, business logic, and persistence.

---

## 🧰 2. Development-Level Controls

### ✅ Authentication & Authorization
- JWT-based authentication with expiration.
- Auth middleware protects all private endpoints.
- Secret keys managed via `.env` and never hardcoded.

### ✅ Input Validation
- All inputs validated using `zod` schemas.
- Prevents injection, malformed payloads, and overposting.

### ✅ Secure Coding Practices
- TypeScript + strict mode (`tsconfig.json`).
- Avoids usage of `eval`, dynamic `require`, and unsafe regex.
- Avoids leaking sensitive data in error messages or logs.

### ✅ Dependency Management
- All dependencies version-pinned in `package.json`.
- Vulnerability scanning via `npm audit`, Trivy, and CodeQL.
- Minimal dependencies to reduce attack surface.

---

## 🧱 3. Middleware Security

### ✅ HTTP Header Hardening
- `helmet` middleware configured to:
  - Disable content sniffing
  - Enforce XSS protection
  - Disable client-side caching of sensitive endpoints

### ✅ Brute-Force Protection
- `express-rate-limit` protects:
  - Login
  - Registration
  - Message spamming

### ✅ Logging & Monitoring
- `morgan` logs all HTTP access attempts.
- Log level controlled via environment config.
- Sensitive data (e.g. JWTs, passwords) never logged.

---

## 🧪 4. Testing & Validation

### ✅ Linting & Code Scanning
- `eslint` with security plugin (`eslint-plugin-security`)
- CI pipeline includes:
  - `npm audit`
  - `trivy` for container/image scanning
  - `CodeQL` static code analysis

### ✅ Runtime Health Check
- `/health` endpoint for Kubernetes/LB readiness probes.

---

## 🔐 5. Secrets & Configuration

- `.env.example` defines all required secrets
- `.env` file excluded from Git and secured in production
- Secrets injected via environment in Docker/CI/CD

---

## 🔄 6. CI/CD Security

- GitHub Actions workflow includes:
  - Secure linting (`eslint`)
  - Dependency audit (`npm audit`)
  - Image scanning (Trivy)
  - Static analysis (CodeQL)
- PR protection recommended: required status checks on all commits

---

## 🧠 Future Enhancements

- ❗ Add HTTPS in production deployment with TLS termination
- ❗ OAuth2 / Single Sign-On integration
- ✅ Integrate request-level logging (e.g., via Winston)
- ✅ Add fine-grained permissions (admin vs user)
- ✅ Integrate real database with encrypted storage (e.g., MongoDB, Postgres)

---

## ✅ Summary

This application adopts a **defense-in-depth** strategy:
- Minimized attack surface
- Secure APIs
- Authenticated, rate-limited, and validated access
- CI-integrated scanning and validation

This is designed not just as a coding exercise, but a **secure-by-design microservice** worthy of internal production usage with minimal additional hardening.

---
