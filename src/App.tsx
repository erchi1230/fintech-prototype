import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
  Palette,
  LineChart,
} from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import Portfolio from "@/pages/Portfolio";
import Transactions from "@/pages/Transactions";
import ComponentLibrary from "@/pages/ComponentLibrary";
import ScenarioModeling from "@/pages/ScenarioModeling";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/scenario-modeling", label: "Scenario Modeling", icon: LineChart },
];

const designItems = [
  { to: "/components", label: "Component Library", icon: Palette },
];

/* Sidebar + topbar shell — wraps all standard pages */
function ShellLayout() {
  return (
    <div className="mb-shell">
      {/* Sidebar */}
      <nav className="mb-sidebar">
        <div className="px-[var(--spacing-05)] py-[var(--spacing-04)]">
          <span className="font-serif-medium text-[var(--text-lg)] font-medium text-text-primary">
            Maybern
          </span>
        </div>

        <div className="mb-sidebar__label">Fund Management</div>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `mb-sidebar__item ${isActive ? "mb-sidebar__item--active" : ""}`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}

        <div className="mb-sidebar__label">Design</div>
        {designItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `mb-sidebar__item ${isActive ? "mb-sidebar__item--active" : ""}`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Main content area */}
      <div className="mb-shell__main">
        <header className="mb-topbar">
          <span className="text-[var(--text-sm)] text-text-secondary">
            Fintech Prototype
          </span>
          <div className="flex items-center gap-[var(--spacing-04)]">
            <button className="mb-btn mb-btn--primary mb-btn--sm">
              Book Demo
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone pages — no sidebar */}
        <Route path="/scenario-modeling" element={<ScenarioModeling />} />

        {/* Shell pages — sidebar + topbar */}
        <Route element={<ShellLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/components" element={<ComponentLibrary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
