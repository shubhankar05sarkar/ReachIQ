import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Segments from "./pages/Segments";
import Campaigns from "./pages/Campaigns";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <aside className="sidebar">
          <div className="logo">
            <h2>ReachIQ</h2>
            <p>Customer Engagement CRM</p>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/customers"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Customers
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/segments"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Segments
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/campaigns"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Campaigns
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Analytics
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/segments" element={<Segments />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;