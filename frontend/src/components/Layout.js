import { Link, Outlet } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {
    const { query, setQuery } = useSearch();
    const { user, logout } = useContext(AuthContext);
  return (
    <div style={appContainer}>
      {/* NAVBAR */}
      <nav style={navStyle}>
        <div style={navLeft}>
          <Link to="/" style={logoStyle}>FreeStudy</Link>
        </div>

      <div style={searchContainer}>
        <input 
            type="text"
            placeholder="Search Sets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={searchInput}
        />
      </div>
        <div style={navLinks}>
          <Link to="/" style={navLink}>Home</Link>
          <Link to="/create-set" style={navLink}>Create</Link>
          <Link to="/settings" style={navLink}>Settings</Link>
          {user ? (
            <>
                <span style={{ ...navLink, cursor: "pointer" }} onClick={logout}>
                    Logout
                </span>
            </>
            ) : (
                <>
                    <Link to="/login" style={navLink}>Login</Link>
                    <Link to="/signup" style={navLink}>Sign Up</Link>
                </>
            )}

        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
}

/* ==== Styles ==== */

const appContainer = {
  fontFamily: "Inter, sans-serif",
  backgroundColor: "#0e1018",
  minHeight: "100vh",
  color: "white",
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  backgroundColor: "#161822",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const navLeft = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "white",
  textDecoration: "none",
};

const navLinks = {
  display: "flex",
  gap: "25px",
};

const navLink = {
  fontSize: "15px",
  color: "rgba(255,255,255,0.85)",
  textDecoration: "none",
};

const mainStyle = {
  padding: "30px",
  maxWidth: "900px",
  margin: "0 auto",
};
const searchContainer = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const searchInput = {
  width: "300px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "1px solid #3a3f5c",
  backgroundColor: "#0e1018",
  color: "white",
  fontSize: "14px",
};
