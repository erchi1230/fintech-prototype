import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
} from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import Portfolio from "@/pages/Portfolio";
import Transactions from "@/pages/Transactions";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
];

export default function App() {
  return (
    <BrowserRouter>
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

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
