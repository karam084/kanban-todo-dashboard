# 🧠 Kanban Todo Dashboard

A modern, drag-and-drop Kanban task manager built with **React**, **Zustand**, **React Query**, and **Bootstrap 5**. Organize your work into visual columns and enjoy a smooth user experience with real-time task editing, filtering, infinite scroll, and more.

## 🚀 Live Demo

🌐 [View Deployed App](https://kanban-todo-dashboard.netlify.app)

📁 [GitHub Repository](https://github.com/karam084/kanban-todo-dashboard)

---

## 🛠️ Tech Stack & Tools

| Category            | Library / Tool                 |
|---------------------|-------------------------------|
| Frontend Framework  | [React](https://reactjs.org/) |
| State Management    | [Zustand](https://zustand-demo.pmnd.rs/) |
| Data Fetching       | [React Query](https://tanstack.com/query/latest) |
| Drag-and-Drop       | [React DnD](https://react-dnd.github.io/react-dnd/about) |
| UI Components       | [Bootstrap 5](https://getbootstrap.com/) + [Material UI Icons](https://mui.com/material-ui/icons/) |
| API                 | [JSON Server](https://github.com/typicode/json-server) |
| Deployment          | [Netlify](https://www.netlify.com/) |

---

## ✨ Features

- ✅ Drag-and-drop tasks between columns
- ✅ Add, update, and delete tasks
- ✅ Infinite scroll per column
- ✅ Task search by title or description
- ✅ Responsive Bootstrap 5 design
- ✅ React Query caching & mutations
- ✅ Zustand store for global task management
- ✅ jQuery bonus task (Dynamic List Component)

---

## 📷 Screenshots

![Kanban UI](./public/kanban-dashboard.png.jpg)

---

## 🧪 Bonus: jQuery Dynamic List

- Add item via input field
- Show error for empty input
- Fade-out animation on item delete
- Styled with Bootstrap

Find it under: `src/components/JQueryList.jsx`

---

## 🧰 Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/karam084/kanban-todo-dashboard.git
cd kanban-todo-dashboard



2. **Install dependencies**
   npm install


3. **Start the mock API**
  npx json-server --watch db.json --port 4000

4. **Run the app**
  npm run dev

  The app runs on http://localhost:5173.

📦 Deployment
Deployed on Netlify from main branch.

Uses vite for fast build & serve.

🙌 Author
Built by @karam084 with ❤️

📄 License
This project is licensed under the MIT License.
