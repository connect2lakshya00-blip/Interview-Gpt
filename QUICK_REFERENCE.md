# 🚀 InterviewGPT AI - Quick Reference

## 📍 URLs

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
Health:    http://localhost:5000/api/health
```

## 🎯 Main Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | Home page |
| Register | `/register` | Sign up |
| Login | `/login` | Sign in |
| Dashboard | `/dashboard` | Main dashboard |
| Technical | `/dashboard/technical` | Coding challenges |
| HR Interview | `/dashboard/hr-interview` | Behavioral questions |
| DSA | `/dashboard/dsa` | Algorithm problems |
| Voice | `/dashboard/voice` | Voice interviews |
| Resume | `/dashboard/resume` | Resume analysis |
| Knowledge | `/dashboard/knowledge` | Document management |
| Analytics | `/dashboard/analytics` | Performance tracking |
| Settings | `/dashboard/settings` | Account settings |

## 🔧 Commands

### Start Servers
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && npm run dev
```

### Stop Servers
Press `Ctrl + C` in terminal

### Restart
Kill process and run `npm run dev` again

## 📦 Installation

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

## 🎨 Key Features

- ✅ Landing page with animations
- ✅ User authentication (register/login)
- ✅ Dashboard with 9 modules
- ✅ Technical interview practice
- ✅ HR interview questions
- ✅ DSA problem solving
- ✅ Voice interview simulation
- ✅ Resume analysis
- ✅ Knowledge base
- ✅ Analytics dashboard
- ✅ Settings management

## 🔑 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interviewgpt
JWT_SECRET=dev_secret_key
OPENAI_API_KEY=your-key-here
```

## 📚 Documentation

- `COMPLETE_PROJECT_WORKFLOW.md` - Complete workflows
- `FINAL_PROJECT_SUMMARY.md` - Project summary
- `FRONTEND_ARCHITECTURE.md` - Frontend docs
- `COMPONENT_SHOWCASE.md` - UI components

## 🆘 Troubleshooting

### Page not loading
```bash
# Hard refresh
Ctrl + Shift + R

# Or clear cache
F12 → Application → Clear storage
```

### Server not responding
```bash
# Restart frontend
cd frontend
npm run dev

# Restart backend
cd backend
npm run dev
```

### API errors
Check backend terminal for error logs

## ✅ Status Check

Both servers running:
- Frontend: Terminal 1
- Backend: Terminal 2

Access: http://localhost:3000

**All systems operational!** 🚀
