# 🏋️‍♂️ FitLog

**FitLog** is a dark, no-nonsense gym companion built with Next.js. Pick a lift from the workout library, lock it into today's plan, save the rest for later, and watch the day's work add up — all with a clean, responsive, dark-themed UI.

> *Train with intent. Log every set.*

---

## 📖 Description

FitLog lets users browse a library of workouts pulled from a live API, view detailed instructions and stats for each lift, and organize their training day around two simple actions: **Add to Today's Plan** or **Save for Later**. Plan and saved counts are reflected live in the navbar, persist across page reloads, and the My Plan page lets users track, sort, and mark their workouts as done.

---

## 🛠️ Technologies Used

| Category | Stack |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Notifications | [React Toastify](https://fkhadra.github.io/react-toastify/) |
| State Management | React Context API |
| Persistence | Browser `localStorage` |
| Deployment | Vercel |

---

## ✨ Features

1. **Workout Library** — Browse a full catalog of exercises fetched from a live API, each shown with muscle group tags, equipment, duration, calories, and rating.
2. **Workout Details Page** — Tap any workout to view a dedicated detail page with full instructions, stats breakdown, and muscle group badges.
3. **Add to Today's Plan** — Add up to 5 workouts to a daily plan directly from the detail page, with a toast confirmation and a live count shown in the navbar.
4. **Save for Later** — Bookmark any workout to revisit later, independent of the daily plan, also reflected live in the navbar.
5. **My Plan Dashboard** — A dedicated page with tabs for *Today's Plan* and *Saved*, showing total exercises, minutes, and calories at a glance, with sortable lists (by duration, calories, rating, or name).
6. **Mark as Done** — Check off completed workouts from today's plan without losing them from the list.
7. **Toast Notifications** — Instant visual feedback (success, info, warning) for every add, remove, and completion action.
8. **Fully Responsive** — Mobile, tablet, and desktop layouts across the navbar, banner, workout grid, and plan dashboard.
9. **Persistent State** — Plan, saved, and completed workouts are stored in `localStorage`, so selections survive a page reload.
10. **Polished UX Details** — Global loading state, custom 404 page, and a dynamic auto-updating footer year.

---

## 📦 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push the repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/new).
3. Add the `NEXT_PUBLIC_API_URL` environment variable in the Vercel project settings.
4. Deploy 🚀

---

## 📄 License

This project was built for educational/assignment purposes.