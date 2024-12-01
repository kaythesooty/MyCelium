import { createRoutesFromElements, Route } from 'react-router-dom'

import Game from '@components/Game'
import LoginPage from '@pages/login'
import RegisterPage from '@pages/register'
import ForgotPage from '@pages/forgot-password'

export default createRoutesFromElements(
  <>
    <Route index element={<Game />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="forgot" element={<ForgotPage />} />
  </>,
)
