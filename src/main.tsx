// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  RecoilRoot
} from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <ToastContainer stacked />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
  // </StrictMode>,
)
