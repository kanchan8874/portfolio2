# Deployment Fix Guide - Backend & Frontend Configuration

## Issues Identified & Fixed

### 1. ✅ Backend CORS Configuration - FIXED
**Problem:** CORS was only allowing `FRONTEND_URL` from env, which might not include the deployed frontend domain.

**Fix Applied:**
- Updated `backend/index.js` to allow multiple origins
- Added explicit support for `https://portfolio2-1-t3ns.onrender.com`
- Added proper CORS logging

### 2. ⚠️ Backend URL Mismatch - NEEDS VERIFICATION
**Current Frontend API URL:** `https://portfolio2-11.onrender.com`
**Expected Frontend Domain:** `https://portfolio2-1-t3ns.onrender.com`

**Action Required:** Verify which backend URL is correct:
- If backend is at `https://portfolio2-11.onrender.com` → Keep as is
- If backend is at different URL → Update frontend `api.js` or set `REACT_APP_API_URL` env variable

### 3. ✅ Backend Environment Variables - NEEDS UPDATE
**Required for Render Backend:**
```env
FRONTEND_URL=https://portfolio2-1-t3ns.onrender.com
MONGODB_URI=your_mongodb_uri
PORT=10000 (or Render assigned port)
NODE_ENV=production
EMAIL_FROM=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
CONTACT_EMAIL=kanchankushwaha65520@gmail.com
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD_HASH=your_admin_hash
```

## Testing Endpoints

### Test these endpoints on your deployed backend:

1. **Health Check:**
   ```
   GET https://portfolio2-11.onrender.com/api/health
   ```
   Expected: `{"status":"OK","message":"Portfolio Backend Running"}`

2. **Projects:**
   ```
   GET https://portfolio2-11.onrender.com/api/projects
   ```

3. **Skills:**
   ```
   GET https://portfolio2-11.onrender.com/api/skills
   ```

4. **About:**
   ```
   GET https://portfolio2-11.onrender.com/api/about
   ```

5. **Hero:**
   ```
   GET https://portfolio2-11.onrender.com/api/hero
   ```

6. **Contact Info:**
   ```
   GET https://portfolio2-11.onrender.com/api/contact-info
   ```

## Frontend Configuration

### Option 1: Environment Variable (Recommended)
Create `frontend/.env` or set in Render:
```env
REACT_APP_API_URL=https://portfolio2-11.onrender.com
```

### Option 2: Update api.js directly
If backend URL is different, update line 1 in `frontend/src/services/api.js`

## Render Backend Environment Variables Checklist

In Render dashboard → Your Backend Service → Environment:

- [ ] `FRONTEND_URL=https://portfolio2-1-t3ns.onrender.com`
- [ ] `MONGODB_URI=your_mongodb_connection_string`
- [ ] `PORT=10000` (or auto-assigned)
- [ ] `NODE_ENV=production`
- [ ] `EMAIL_FROM=saurabhkumarrr18@gmail.com`
- [ ] `EMAIL_PASSWORD=mojhberokehyylrr`
- [ ] `EMAIL_HOST=smtp.gmail.com`
- [ ] `EMAIL_PORT=587`
- [ ] `CONTACT_EMAIL=kanchankushwaha65520@gmail.com`
- [ ] `JWT_SECRET=your_secret`
- [ ] `ADMIN_PASSWORD_HASH=your_hash`

## Common Issues & Solutions

### Issue: CORS Error
**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**
1. Verify `FRONTEND_URL` in backend env matches frontend domain exactly
2. Check backend logs for CORS warnings
3. Ensure backend allows the frontend origin

### Issue: 404 Not Found
**Error:** `GET .../api/projects 404`

**Solution:**
1. Verify routes are mounted with `/api` prefix
2. Check backend logs for route registration
3. Test health endpoint first: `/api/health`

### Issue: MongoDB Connection Failed
**Error:** `MongoDB Connection Error`

**Solution:**
1. Verify `MONGODB_URI` is correct
2. Check MongoDB Atlas IP whitelist includes Render IPs (0.0.0.0/0 for all)
3. Verify database name in connection string

### Issue: API Returns Empty/No Data
**Solution:**
1. Check if database has seeded data
2. Verify MongoDB connection is successful
3. Check backend logs for query errors

## Next Steps

1. **Update Render Backend Environment Variables** with the checklist above
2. **Redeploy Backend** after env changes
3. **Test Endpoints** using the URLs above
4. **Check Backend Logs** in Render dashboard for errors
5. **Update Frontend** if backend URL is different
6. **Redeploy Frontend** if needed

## Debugging Commands

### Check Backend Health:
```bash
curl https://portfolio2-11.onrender.com/api/health
```

### Check CORS:
```bash
curl -H "Origin: https://portfolio2-1-t3ns.onrender.com" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://portfolio2-11.onrender.com/api/health
```

### Test API Endpoint:
```bash
curl https://portfolio2-11.onrender.com/api/projects
```

