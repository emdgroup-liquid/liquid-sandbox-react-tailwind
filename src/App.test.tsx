import App from './App'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

async function waitForLiquidToHydrate() {
  return waitFor(() => {
    Array.from(document.querySelectorAll('*'))
      .filter((e) => e.tagName.startsWith('LD-'))
      .forEach((component) => {
        expect(component).toHaveClass('hydrated')
      })
  })
}

test('renders heading', async () => {
  render(<App />)
  const heading = screen.getByText('Liquid Sandbox App')
  expect(heading).toBeInTheDocument()
})

test('validates input', async () => {
  render(<App />)

  await waitForLiquidToHydrate()

  const ldInputName = screen.getByPlaceholderText('e.g. Jason Parse')
  expect(ldInputName).toBeInTheDocument()

  const ldButtonSubmit = screen.getByText('Submit')
  expect(ldButtonSubmit).toBeInTheDocument()
  userEvent.click(ldButtonSubmit)

  const form = await screen.findByTestId('form')
  expect(form).toBeInTheDocument()

  fireEvent.submit(form)

  await screen.findByText('Your full name is required.')
})
