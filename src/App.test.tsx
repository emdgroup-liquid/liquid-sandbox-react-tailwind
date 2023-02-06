import App from './App'
import { render, screen } from '@testing-library/react'
import React from 'react'

test('renders heading', async () => {
  render(<App />)
  const heading = screen.getByText('Liquid Sandbox App')
  expect(heading).toBeInTheDocument()
})
