import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Home } from "./pages/Home";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminUsers } from "./pages/AdminUsers";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { OrganizerCreateEvent } from "./pages/OrganizerCreateEvent";
import { PlaceholderPage } from "./pages/PlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "events", Component: PlaceholderPage },
      { path: "users", Component: AdminUsers },
      { path: "reports", Component: PlaceholderPage },
      { path: "support", Component: PlaceholderPage },
    ],
  },
  {
    path: "/organizer",
    Component: DashboardLayout,
    children: [
      { index: true, Component: OrganizerDashboard },
      { path: "create", Component: OrganizerCreateEvent },
      { path: "events", Component: PlaceholderPage },
      { path: "venues", Component: PlaceholderPage },
      { path: "artists", Component: PlaceholderPage },
    ],
  }
]);
