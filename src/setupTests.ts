import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { vi, beforeAll, afterEach } from 'vitest'

// Prevent display of error message from JSDom CSS parser.
// See https://github.com/jsdom/jsdom/issues/2177#issuecomment-376139329
const originalConsoleError = console.error
console.error = function (msg) {
  if (msg.toString().startsWith('Error: Could not parse CSS stylesheet')) return
  originalConsoleError(msg)
}

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.__LD_ASSET_PATH__ = '/' // removes CDN warning
  defineCustomElements()

  global.fetch = vi
    .fn()
    .mockReturnValue(Promise.resolve({ text: () => Promise.resolve('') }))
})

// Run a cleanup after each test case.
afterEach(() => {
  cleanup()
})
