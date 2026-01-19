import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Mortgagerepayment from './mortgage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Mortgagerepayment />
  </StrictMode>,
)
