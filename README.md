# RomifyAssignment

A full-stack CRUD Task Management application built with **React**, **TypeScript**, **Vite**, **Recoil**, **Formik**, **PrimeReact**, and **Yup**.  
This project allows users to sign up, log in, and manage tasks with features like authentication, protected routes, pagination, and form validation.

## Features

- User authentication (login & signup) with JWT token management
- Protected routes for authenticated users
- Task CRUD operations (Create, Read, Update, Delete)
- Responsive UI with PrimeReact components
- Form validation using Formik and Yup
- Toast notifications for user feedback
- Pagination and search for task lists
- State management with Recoil and persistent login

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [PrimeReact](https://primereact.org/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [Recoil](https://recoiljs.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AtharvaEdlawar/RomifyAssignment.git
   cd RomifyAssignment
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Edit the `.env` file to set your API URL:
   ```
   VITE_API_URL='http://localhost:4000/'
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

### Build for Production

```sh
npm run build
# or
yarn build
```

### Linting

```sh
npm run lint
# or
yarn lint
```

## Project Structure

```
.
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── auth/
│   │   ├── Pages/
│   │   │   └── Login.tsx
│   │   └── Stores/
│   ├── Components/
│   ├── Modules/
│   │   └── Tasks/
│   │       ├── Pages/
│   │       └── Stores/
│   └── Utils/
├── public/
├── index.html
├── package.json
├── vite.config.ts
└── ...
```

## License

This project is licensed under the MIT License.

---

**Made with ❤️ by [Atharva Edlawar](https://github.com/AtharvaEdlawar)**