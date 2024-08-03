import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from './App';

// Mock routes.js

jest.mock('./Routes/routes.js', () => ({
  routes: [
    {
      path: '/',
      element: <div>Home Page</div>
    },
    {
      path: '/about',
      element: <div>About Page</div>
    },
    // Add more mock routes as necessary
  ]
}));

// Mock Navbar, Footer and other components
jest.mock('./Pages/Home/Layout/Navbar.js', () => () => <div>Navbar</div>);
jest.mock('./Pages/Home/Layout/Footer.js', () => () => <div>Footer</div>);

test('renders Navbar, route and Footer components', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Check if Navbar is rendered
  expect(screen.getByText('Navbar')).toBeInTheDocument();

  // Check if Footer is rendered
  expect(screen.getByText('Footer')).toBeInTheDocument();

  // Check if the Home route is rendered
  await waitFor(() => expect(screen.getByText('Home Page')).toBeInTheDocument());
});
