# Smart Bookmark App

A simple bookmark manager built with Next.js App Router, Supabase Auth, Database and Realtime.

# Features
- Google OAuth Login
- Add bookmark (title + URL)
- Bookmarks are private per user (Row Level Security)
- Realtime updates without refresh
- Delete bookmarks
- Deployed on Vercel

# Tech Stack
- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS

# Problems Faced and Solutions
1. Add Bookmark Button Was Not Working
   - Issue
     After clicking the "Add Bookmark" button, the bookmark was not showing in the list.
     There was no visible UI error, but the bookmark was not saved in and the list stayed unchanged.
   - Fix
     To solve this issue, I followed a simple debugging process:
     First I checked whether the button click was working and then reviewed the insert object and noticed it only contained `title` and `url`.
     Since bookmarks were supposed to be stored per logged-in user, my Supabase table contained user_id.
     After updating the code by adding user_id, the bookmark was successfully showing in the UI.

