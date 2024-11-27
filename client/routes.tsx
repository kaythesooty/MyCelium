import { createRoutesFromElements, Route } from 'react-router-dom'

import GamePage from '@pages/GamePage'
import LoginPage from '@pages/LoginPage'
import RegisterPage from '@pages/RegisterPage'
import ForgotPage from '@pages/ForgotPage'

export default createRoutesFromElements(
  <>
    <Route index element={<GamePage />} />
    <Route path='login' element={<LoginPage />} />
    <Route path='register' element={<RegisterPage />} />
    <Route path='forgot' element={<ForgotPage />} />
  </>,
)
