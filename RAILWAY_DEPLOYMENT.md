# Task Manager - Railway Deployment Guide

Complete guide to deploy both frontend and backend to Railway.

## Prerequisites

1. Railway account (https://railway.app)
2. GitHub repository with code
3. Backend API implemented
4. Node.js 18+ installed locally
5. Git installed

## Frontend Deployment (Angular)

### Step 1: Prepare Frontend for Production

1. **Update API URL**
   - Edit `src/environments/environment.ts`
   - Update `apiUrl` to your backend Railway URL:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-backend.railway.app/api'
   };
   ```

2. **Build for production**
   ```bash
   npm run build
   ```
   This creates optimized files in `dist/task-manager/browser/`

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### Step 3: Create Railway Project for Frontend

1. Go to https://railway.app/dashboard
2. Click "Create New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Choose the branch (main)

### Step 4: Configure Frontend Build

1. In Railway project settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npx http-server dist/task-manager/browser -p $PORT --gzip`
   - **Node Version**: 18.x

2. Set Environment Variables:
   ```
   NODE_ENV=production
   ```

3. Configure Port:
   - Railway automatically assigns a port via $PORT variable

### Step 5: Add Custom Domain (Optional)

1. In Railway project settings
2. Go to "Domains"
3. Add custom domain or use Railway's default domain
4. Update backend CORS configuration with frontend URL

## Backend Deployment (Node.js/Express)

### Step 1: Prepare Backend for Production

1. **Update Environment Variables**
   - Create `.env.production` file:
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=<production-db-url>
   JWT_SECRET=<secure-random-secret>
   JWT_EXPIRY=24h
   CORS_ORIGIN=https://your-frontend.railway.app
   ```

2. **Ensure package.json has start script**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

### Step 2: Set Up Database

#### Option 1: Railway Database Service

1. In Railway project, click "Create"
2. Select "Database"
3. Choose PostgreSQL or MongoDB
4. Railway will provide DATABASE_URL

#### Option 2: External Database

1. Create database on external service (e.g., Supabase, MongoDB Atlas)
2. Get connection string
3. Set as DATABASE_URL variable

### Step 3: Push Backend to GitHub

```bash
git add .
git commit -m "Backend ready for Railway"
git push origin main
```

### Step 4: Create Railway Project for Backend

1. Go to https://railway.app/dashboard
2. Click "Create New Project"
3. Select "Deploy from GitHub repo"
4. Select backend repository or branch
5. Select Node.js environment

### Step 5: Configure Backend

1. **Set Environment Variables** in Railway:
   - Click "Variables"
   - Add all environment variables:
     - NODE_ENV=production
     - DATABASE_URL (if using Railway DB)
     - JWT_SECRET
     - CORS_ORIGIN
     - Any other required variables

2. **Build Configuration**:
   - **Start Command**: `npm start`
   - **Node Version**: 18.x

3. **Port Configuration**:
   - Railway assigns port via $PORT
   - Update server to use: `const PORT = process.env.PORT || 3000`

### Step 6: Test Backend

Once deployed, test endpoints:

```bash
# Get the Railway backend URL from dashboard
BACKEND_URL="https://your-backend.railway.app"

# Test signup
curl -X POST $BACKEND_URL/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123",
    "firstName":"Test",
    "lastName":"User"
  }'

# Test login
curl -X POST $BACKEND_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123"
  }'
```

## Linking Frontend to Backend

### Step 1: Get Backend URL
1. In Railway backend project
2. Click "Deployments"
3. Copy the public URL
4. Format: `https://your-backend-name.railway.app`

### Step 2: Update Frontend Environment
1. Edit `src/environments/environment.ts`
2. Set correct API URL:
   ```typescript
   apiUrl: 'https://your-backend-name.railway.app/api'
   ```

### Step 3: Configure CORS on Backend
1. Update CORS configuration with frontend URL
2. Update `process.env.CORS_ORIGIN` in backend
3. Redeploy backend

### Step 4: Update Frontend with CORS
1. Commit changes
2. Push to GitHub
3. Railway will automatically rebuild and deploy

## Environment Variables Reference

### Frontend
```
NODE_ENV=production
```

### Backend
```
NODE_ENV=production
PORT=3000 (auto-assigned by Railway)
DATABASE_URL=postgresql://... or mongodb://...
JWT_SECRET=your-very-secure-secret-key
JWT_EXPIRY=24h
CORS_ORIGIN=https://frontend.railway.app
LOG_LEVEL=info
```

## SSL/HTTPS

Railway automatically provides SSL certificates for all deployments:
- URLs are HTTPS by default
- Certificates auto-renew
- No additional configuration needed

## Database Setup Checklist

- [ ] Database created in Railway
- [ ] Connection string stored in DATABASE_URL
- [ ] Tables created (migrations run)
- [ ] Test data inserted (optional)
- [ ] Backup plan established

## Monitoring & Logs

### View Logs in Railway

1. Go to project
2. Click on Deployments
3. Click "View Logs" to see:
   - Build logs
   - Runtime errors
   - Application output

### Real-time Monitoring

1. In Railway dashboard
2. Check "Metrics" tab for:
   - CPU usage
   - Memory usage
   - Network I/O
   - Disk usage

## Common Issues & Solutions

### Issue: "CORS error"
**Solution:**
- Check backend CORS_ORIGIN matches frontend URL
- Verify backend is deployed and running
- Check browser console for exact error

### Issue: "Cannot find module"
**Solution:**
- Ensure `npm install` runs during build
- Check package.json has all dependencies
- Verify Node version compatibility

### Issue: "Database connection failed"
**Solution:**
- Verify DATABASE_URL is correct
- Check database is accessible from Railway
- Test connection locally first

### Issue: "401 Unauthorized"
**Solution:**
- Verify JWT_SECRET is set
- Check token expiration
- Ensure Authorization header is sent

### Issue: Frontend shows blank page
**Solution:**
- Check browser console (F12)
- Verify API endpoint URL
- Check backend is responding
- Look at Railway logs

## Performance Optimization

### Frontend
1. Enable gzip compression (already in start command)
2. Use production build (smaller bundle)
3. Consider caching headers
4. Monitor bundle size

### Backend
1. Enable response caching
2. Use connection pooling
3. Implement request rate limiting
4. Use pagination for large datasets

## Security Checklist

- [ ] Environment variables secured
- [ ] Database password strong
- [ ] JWT secret strong and random
- [ ] CORS properly configured
- [ ] HTTPS enabled (automatic)
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] SQL injection prevention (prepared statements)
- [ ] XSS protection headers set
- [ ] Regular security updates

## Testing Full Application

1. **Sign up**: Create new user account
2. **Log in**: Test authentication
3. **Create project**: Add new project
4. **Create task**: Add task to project
5. **Update task**: Modify task status
6. **Assign task**: Assign to team member
7. **Dashboard**: Verify statistics load
8. **Mobile**: Test on mobile browser

## Production Deployment Checklist

Frontend:
- [ ] Environment file updated
- [ ] Build passes without errors
- [ ] No console errors in production build
- [ ] All routes working
- [ ] API calls successful
- [ ] Responsive design tested
- [ ] Browser compatibility checked

Backend:
- [ ] All environment variables set
- [ ] Database migrated
- [ ] API endpoints tested
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Rate limiting active
- [ ] CORS configured
- [ ] Performance acceptable

## Post-Deployment

1. **Monitor for errors**: Check logs regularly
2. **Test core flows**: Verify all features work
3. **Performance**: Monitor response times
4. **Backups**: Ensure database backups are running
5. **SSL**: Verify HTTPS working
6. **Analytics**: Set up error tracking (Sentry, LogRocket, etc.)

## Continuous Deployment

### Auto-deploy on Push
Railway can automatically deploy when you push to GitHub:

1. Go to Railway project settings
2. Enable "Auto Deploy"
3. Select branch to deploy from
4. Each push will trigger automatic deployment

### Manual Deployment
If auto-deploy is disabled:
1. Go to Railway dashboard
2. Click "Deploy" button
3. Select the deployment to redeploy

## Troubleshooting Guide

See `docs/TROUBLESHOOTING.md` for detailed debugging steps.

## Support

- Railway Docs: https://docs.railway.app
- Railway Community: https://railway.app/contact
- GitHub Issues: Create issue in repository

## Success Indicators

Your deployment is successful when:

1. ✅ Frontend loads without errors
2. ✅ Can sign up and log in
3. ✅ Can create projects
4. ✅ Can create and manage tasks
5. ✅ Dashboard displays correctly
6. ✅ All API calls work
7. ✅ No console errors
8. ✅ Mobile responsive
9. ✅ HTTPS working
10. ✅ Performance acceptable

---

**Congratulations! Your Task Manager is now live on Railway! 🚀**
