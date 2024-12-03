// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import { renderRoute } from './setup.tsx'

import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
})

describe('Opening Fungipedia', () => {
it.todo('Shows the welcome to fungipedia text')
it.todo('Lets you click to the next page')
it.todo('Shows the correct infomation about a mushroom')
})