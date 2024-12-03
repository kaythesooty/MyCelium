import { expect, beforeEach } from 'vitest'
import { render, cleanup } from '@testing-library/react/pure'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import routes from '../../routes'
import userEvent from '@testing-library/user-event'

expect.extend(matchers)

beforeEach(cleanup)

export function renderRoute(path = '/') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  })

  const user = userEvent.setup()

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { ...screen, user }
}
