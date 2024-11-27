import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import routes from './routes.tsx'

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
    v7_normalizeFormMethod: true,
  },
})

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain=""
      clientId=""
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: '',
      }}
    >
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Auth0Provider>,
  )
})
