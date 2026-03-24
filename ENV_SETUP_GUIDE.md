# Environment Variables Setup Guide

## Quick Deployment Checklist

### For Backend (Render)
![Complete these environment variables in Render Settings:]

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://khwajalakadhare47_db_user:fllVWaC17CE2Pi5Z@cluster0.r8dhrpz.mongodb.net/
JWT_SECRET=f0ab16048dff2f0304dae7cf1407168acdeb0e2e2dbd7ea2559799ef4d92b2c1
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://phoenixtechweb.onrender.com,https://your-vercel-domain.vercel.app,https://phoenix-tech.in
SEED_ADMIN_USERNAME=admin
SEED_ADMIN_PASSWORD=admin@123
```

**File: `backend/.env`**

---

### For Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.onrender.com
VITE_APP_ENV=production
```

**File: `frontend/.env.local` or set in Vercel UI**

---

## Environment Variables Reference

### Backend Variables

| Variable | Required | Type | Default | Purpose | Example |
|----------|----------|------|---------|---------|---------|
| `PORT` | Yes | Number | 5000 | Server port | `5000` |
| `NODE_ENV` | No | String | development | Environment | `production` |
| `MONGO_URI` | Yes | URL | - | MongoDB connection | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Yes | String | - | JWT signing key | Long random 32+ char string |
| `JWT_EXPIRES_IN` | No | String | 7d | Token expiration | `7d`, `30d`, `24h` |
| `CORS_ORIGIN` | Yes* | String | * | Allowed origins | `https://domain1.com,https://domain2.com` |
| `SEED_ADMIN_USERNAME` | No | String | admin | Initial admin user | `admin` |
| `SEED_ADMIN_PASSWORD` | No | String | admin@123 | Initial admin pass | Strong password |

*CORS_ORIGIN is required for production; defaults to "*" in development

---

### Frontend Variables

| Variable | Required | Type | Default | Purpose | Example |
|----------|----------|------|---------|---------|---------|
| `VITE_API_URL` | No | URL | http://localhost:5000 | Backend API endpoint | `https://api.onrender.com` |
| `VITE_APP_ENV` | No | String | development | App environment | `production` |

---

## Deployment Steps

### Step 1: Deploy Backend to Render
1. Push backend code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set Root Directory: `backend`
5. Add environment variables from `backend/.env`
6. Deploy

**Get your backend URL**: `https://your-service-name.onrender.com`

---

### Step 2: Deploy Frontend to Vercel
1. Push frontend code to GitHub
2. Create new project on Vercel
3. Select GitHub repository
4. Set Root Directory: `frontend`
5. Add environment variables:
   - `VITE_API_URL=https://your-service-name.onrender.com`
6. Deploy

**Your frontend URL**: `https://your-project.vercel.app`

---

### Step 3: Update CORS_ORIGIN in Backend
If you deployed to Vercel, update the backend's `CORS_ORIGIN` to include your Vercel URL:

```
CORS_ORIGIN=https://your-project.vercel.app,https://phoenixtechweb.onrender.com,https://phoenix-tech.in
```

Then redeploy the backend.

---

## Files Reference

- **Backend**: See `backend/.env` or `backend/.env.example`
- **Frontend**: See `frontend/.env.example`
- **Root**: This guide (`ENV_SETUP_GUIDE.md`)

---

## Important Security Notes

⚠️ **NEVER commit `.env` files with real credentials to GitHub**

- Add `.env` to `.gitignore`
- Use `.env.example` as a template
- Rotate `JWT_SECRET` in production
- Use strong passwords for `SEED_ADMIN_PASSWORD`
- Keep `MONGO_URI` credentials secure

---

## Troubleshooting

**CORS Error?** → Check `CORS_ORIGIN` includes your frontend URL
**API Connection Error?** → Check `VITE_API_URL` matches your backend URL
**JWT Error?** → Ensure same `JWT_SECRET` across all instances
