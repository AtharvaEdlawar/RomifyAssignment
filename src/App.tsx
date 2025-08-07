// Updated App.tsx
import './App.css'
import AuthPage from './auth/Pages/Login'
import TaskList from '../src/Modules/Tasks/Pages/List'
import TaskView from '../src/Modules/Tasks/Pages/view'
import { Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoutes';
import SmartRedirect from './Components/smartRedirect';

function App() {
  return (
    <Routes>
      {/* Root route with smart redirect */}
      <Route path='/' element={<SmartRedirect />} />
      
      {/* Public routes */}
      <Route path='/login' element={<AuthPage />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/task' element={<TaskList />} />
        <Route path='/task/:mode' element={<TaskView />} />
        <Route path='/task/:id/:mode' element={<TaskView />} />
      </Route>
      
      {/* Catch all */}
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App;