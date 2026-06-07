# 🧪 InterviewGPT AI - Complete Testing Guide

## ✅ Quick Status Check

Both servers are now running:
- ✅ **Backend:** http://localhost:5000 (MongoDB Connected)
- ✅ **Frontend:** http://localhost:3000

---

## 🎯 Complete Feature Testing Checklist

### 1️⃣ Authentication System (5 minutes)

#### Test Registration
1. Go to http://localhost:3000
2. Click "Start Free Trial" or "Get Started"
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
   - Confirm Password: Test123!
4. Click "Create Account"
5. ✅ Should see success message
6. ✅ Should redirect to dashboard
7. ✅ Token saved in localStorage

#### Test Login
1. Logout (if logged in)
2. Go to http://localhost:3000/login
3. Enter:
   - Email: test@example.com
   - Password: Test123!
4. Click "Sign In"
5. ✅ Should redirect to dashboard

---

### 2️⃣ Dashboard Overview (2 minutes)

1. Go to http://localhost:3000/dashboard
2. ✅ See 4 stat cards with numbers
3. ✅ See performance chart
4. ✅ See recent activity feed
5. ✅ Sidebar shows 10 menu items
6. ✅ Top navbar with search and profile

---

### 3️⃣ AI Career Assistant ⭐ NEW! (10 minutes)

#### Test Text Chat
1. Click **"AI Assistant"** in sidebar
2. ✅ New conversation created automatically
3. ✅ See welcome message from AI
4. Type: **"How do I improve my resume?"**
5. Press Enter or click Send
6. ✅ Message appears with user avatar (green)
7. ✅ Loading indicator shows
8. ✅ AI response appears with bot avatar (blue/purple)
9. ✅ Response includes tips and advice
10. ✅ Can click "Listen" to hear response

#### Test Voice Input
1. Click the **🎤 Microphone** button
2. ✅ Browser asks for permission
3. Allow microphone access
4. ✅ Recording indicator shows (red, pulsing)
5. Speak clearly: **"What are the best job boards?"**
6. ✅ Speech converts to text in input box
7. Click Send
8. ✅ AI responds with job board recommendations

#### Test Voice Output
1. Toggle the **🔊 Speaker** icon (top right)
2. ✅ Icon turns blue (auto-speak ON)
3. Send a message
4. ✅ AI reads response aloud automatically
5. ✅ Speaking indicator shows while playing
6. Click speaker icon again to turn OFF

#### Test Conversation Management
1. Click **"New Conversation"** button
2. ✅ New chat starts
3. ✅ Previous chat saved in sidebar
4. Click a **saved conversation** in sidebar
5. ✅ Loads previous messages
6. Click **trash icon** on a conversation
7. ✅ Conversation deleted

#### Test Smart Suggestions
1. In active chat, scroll to bottom
2. ✅ See 4 suggested questions
3. Click a suggestion
4. ✅ Sends message automatically
5. ✅ AI responds
6. ✅ Suggestions update based on context

#### Test Different Topics
Ask these to test AI capabilities:
- **Job Search:** "Help me find software engineering jobs"
- **Resume:** "Review my resume structure"
- **Interview:** "Common interview questions for developers"
- **Career:** "Should I switch from Java to Python?"
- **Salary:** "How do I negotiate my salary?"
- **LinkedIn:** "Tips for optimizing my LinkedIn profile"

---

### 4️⃣ Voice Interview (10 minutes)

1. Go to **"Voice Interview"** in sidebar
2. Click **"Test Audio"** (optional)
3. ✅ Hear test message
4. Click **"Start Interview"**
5. ✅ Redirects to session page
6. ✅ AI speaks first question aloud
7. ✅ Timer starts counting
8. Click **"Start Recording"**
9. Speak your answer
10. Click **"Stop Recording"**
11. Click **"Next Question"**
12. ✅ Loading indicator shows
13. ✅ Next question appears
14. ✅ AI speaks new question
15. Complete 2-3 questions
16. Click **"Finish"** on last question
17. ✅ Redirects to results page
18. ✅ See overall score with animation
19. ✅ See 4 detailed metric scores
20. ✅ See AI feedback and suggestions

---

### 5️⃣ Resume Analysis (5 minutes)

1. Go to **"Resume"** in sidebar
2. Click **"Choose File"**
3. Select a PDF or DOCX file (max 5MB)
4. ✅ File name appears
5. Click **"Upload Resume"**
6. ✅ Loading indicator shows
7. ✅ Success message appears
8. ✅ Analysis scores display:
   - Format Score
   - Content Quality
   - Keywords Match
9. ✅ Progress bars animate

**If you get an error:**
- Check file size (must be < 5MB)
- Check file type (PDF or DOCX only)
- Ensure you're logged in
- Check backend is running

---

### 6️⃣ Knowledge Base (5 minutes)

1. Go to **"Knowledge Base"** in sidebar
2. Click **"Choose Files"**
3. Select a PDF, DOC, or TXT file
4. ✅ File name appears
5. Click **"Upload"**
6. ✅ Loading indicator shows
7. ✅ Success message appears
8. ✅ File appears in recent uploads

#### Test Search
1. Scroll to "Search Knowledge" card
2. Enter a search query
3. Click **"Search"**
4. ✅ AI searches through uploaded documents
5. ✅ Returns relevant results

---

### 7️⃣ Technical Interview (3 minutes)

1. Go to **"Technical"** in sidebar
2. ✅ See 3 coding problems:
   - Two Sum (Easy, 15min, 100pts)
   - Binary Search (Medium, 30min, 200pts)
   - System Design (Hard, 60min, 500pts)
3. Click **"Start Challenge"** on any problem
4. ✅ Alert shows (ready for full implementation)

---

### 8️⃣ HR Interview (3 minutes)

1. Go to **"HR Interview"** in sidebar
2. ✅ See 3 behavioral questions:
   - Tell me about yourself
   - Why work here?
   - Challenging situation
3. ✅ See difficulty badges (Easy/Medium/Hard)
4. ✅ See time estimates
5. Click **"Start Practice"**
6. ✅ Alert shows

---

### 9️⃣ DSA Practice (3 minutes)

1. Go to **"DSA Practice"** in sidebar
2. ✅ See 4 algorithm problems:
   - Two Sum (Array, Easy, 50pts)
   - Valid Parentheses (Stack, Easy, 50pts)
   - Merge Intervals (Array, Medium, 100pts)
   - LRU Cache (Design, Hard, 200pts)
3. ✅ See category tags
4. ✅ See difficulty levels
5. Click **"Solve Problem"**
6. ✅ Alert shows

---

### 🔟 Analytics (2 minutes)

1. Go to **"Analytics"** in sidebar
2. ✅ See 4 metric cards:
   - Improvement: +15%
   - Accuracy: 92%
   - Rank: #247
   - Streak: 7 days
3. ✅ Cards have gradient backgrounds
4. ✅ Numbers display correctly

---

### 1️⃣1️⃣ Settings (2 minutes)

1. Go to **"Settings"** in sidebar
2. ✅ See 4 setting sections:
   - Profile Settings
   - Notifications
   - Security
   - Appearance
3. ✅ Toggle switches work
4. ✅ Input fields editable
5. Click **"Save Changes"**
6. ✅ Success message shows

---

## 🎨 UI/UX Testing

### Visual Checks
- ✅ All pages have glassmorphism effect
- ✅ Buttons have hover animations
- ✅ Cards have subtle glow effects
- ✅ Smooth page transitions
- ✅ Loading states display properly
- ✅ Error messages show in red
- ✅ Success messages show in green
- ✅ Icons render correctly
- ✅ Text is readable (good contrast)
- ✅ Gradients look smooth

### Responsive Design
1. Press **F12** to open DevTools
2. Click **Device Toolbar** icon
3. Test different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)
4. ✅ Sidebar collapses on mobile
5. ✅ Cards stack vertically
6. ✅ Text remains readable
7. ✅ Buttons stay accessible

### Animation Testing
- ✅ Sidebar slides in on page load
- ✅ Messages fade in when sent
- ✅ Progress bars animate smoothly
- ✅ Score circles animate on results page
- ✅ Hover effects on all buttons
- ✅ Page transitions are smooth

---

## 🔧 Technical Testing

### Backend API Testing

#### Test Health Endpoint
```bash
# Open browser or use curl
http://localhost:5000/api/health

# Should return:
{
  "status": "OK",
  "message": "InterviewGPT AI Server Running"
}
```

#### Test Chat API (with token)
```javascript
// In browser console (after login)
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/chat/conversation', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(console.log);

// Should return conversation with messages
```

### Database Testing
1. Open MongoDB Compass or CLI
2. Connect to `mongodb://localhost:27017/interviewgpt`
3. Check collections:
   - ✅ `users` - Has your test user
   - ✅ `chats` - Has conversations
   - ✅ `interviews` - Has interview records
   - ✅ `resumes` - Has uploaded resumes
   - ✅ `knowledges` - Has documents

### LocalStorage Testing
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Local Storage** > http://localhost:3000
4. Check:
   - ✅ `token` - JWT token exists
   - ✅ Token starts with "eyJ"

---

## 🐛 Common Issues & Fixes

### Issue 1: "Please login first"
**Fix:**
1. Go to `/login`
2. Login again
3. Token will be saved
4. Retry the action

### Issue 2: "Microphone permission denied"
**Fix:**
1. Click 🔒 in address bar
2. Site Settings
3. Microphone → Allow
4. Refresh page

### Issue 3: "Upload failed"
**Fix:**
- Check file size (< 5MB)
- Check file type (PDF/DOCX/TXT)
- Ensure backend is running
- Check you're logged in

### Issue 4: "Failed to load conversations"
**Fix:**
- Check backend is running (port 5000)
- Check MongoDB is connected
- Check browser console for errors
- Try logging out and back in

### Issue 5: Voice recognition not working
**Fix:**
- Use Chrome or Edge browser
- Allow microphone permission
- Speak clearly and loudly
- Check microphone in system settings

### Issue 6: AI responses are generic
**Fix:**
- Add OpenAI API key to `backend/.env`
- Set `OPENAI_API_KEY=sk-your-key`
- Restart backend server
- Responses will be much better!

---

## 📊 Performance Testing

### Page Load Times
- Landing: < 2s
- Dashboard: < 2s
- AI Assistant: < 3s
- Voice Interview: < 2s

### API Response Times
- Auth: < 500ms
- Chat message: < 2s (with AI)
- File upload: < 5s (depending on size)
- Interview generation: < 3s

### Browser Performance
1. Open DevTools
2. Go to **Performance** tab
3. Record while navigating
4. Check:
   - ✅ No memory leaks
   - ✅ Smooth 60fps animations
   - ✅ Fast component renders

---

## ✅ Final Verification Checklist

### Authentication
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Token saved in localStorage
- [ ] Protected routes work
- [ ] Can't access dashboard without login

### AI Assistant
- [ ] Text chat works
- [ ] Voice input works
- [ ] Voice output works
- [ ] Conversations save
- [ ] Can load old conversations
- [ ] Can delete conversations
- [ ] Suggestions appear
- [ ] AI provides helpful responses

### Voice Interview
- [ ] Can start interview
- [ ] AI speaks questions
- [ ] Can record answers
- [ ] Timer works
- [ ] Can navigate questions
- [ ] Results page shows
- [ ] Scores display correctly

### File Upload
- [ ] Resume upload works
- [ ] Knowledge upload works
- [ ] File validation works
- [ ] Success messages show
- [ ] Files appear in list

### UI/UX
- [ ] All pages load
- [ ] Animations smooth
- [ ] No console errors
- [ ] Responsive design works
- [ ] All buttons clickable
- [ ] Navigation works

### Backend
- [ ] Server running on 5000
- [ ] MongoDB connected
- [ ] All API endpoints work
- [ ] Authentication works
- [ ] File uploads work

---

## 🎉 Success Criteria

Your platform is working perfectly if:

✅ All 13 features are accessible  
✅ AI Assistant text chat works  
✅ AI Assistant voice features work  
✅ Voice interviews can be completed  
✅ Files can be uploaded  
✅ No TypeScript errors  
✅ No console errors  
✅ Smooth animations  
✅ Responsive design  
✅ All API endpoints respond  

---

## 📝 Test Report Template

```
Date: ___________
Tester: ___________

✅ Authentication: Pass / Fail
✅ Dashboard: Pass / Fail
✅ AI Assistant Text: Pass / Fail
✅ AI Assistant Voice: Pass / Fail
✅ Voice Interview: Pass / Fail
✅ Resume Upload: Pass / Fail
✅ Knowledge Upload: Pass / Fail
✅ Technical Interview: Pass / Fail
✅ HR Interview: Pass / Fail
✅ DSA Practice: Pass / Fail
✅ Analytics: Pass / Fail
✅ Settings: Pass / Fail
✅ UI/UX: Pass / Fail

Issues Found:
1. _______________________
2. _______________________
3. _______________________

Overall Status: Pass / Fail
```

---

## 🚀 Ready to Test!

**Start here:**
1. Open http://localhost:3000
2. Create an account
3. Test AI Assistant first (most exciting!)
4. Try voice features
5. Complete a voice interview
6. Upload files
7. Explore other features

**Estimated total testing time:** 60 minutes

---

**Everything is ready! Start testing now!** 🎉
