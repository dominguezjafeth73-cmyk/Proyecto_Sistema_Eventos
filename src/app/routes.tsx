import { createBrowserRouter } from 'react-router';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { PurchaseConfirmation } from './pages/PurchaseConfirmation';
import { MyTickets } from './pages/MyTickets';
import { TicketDetail } from './pages/TicketDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'events/:id',
        element: <EventDetail />,
      },
      {
        path: 'checkout/:id',
        element: <Checkout />,
      },
      {
        path: 'purchase-success/:id',
        element: <PurchaseConfirmation />,
      },
      {
        path: 'tickets',
        element: <MyTickets />,
      },
      {
        path: 'tickets/:id',
        element: <TicketDetail />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
    ],
  },
]);
