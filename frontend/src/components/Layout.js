import { Link, Outlet } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import './Layout.css';

export default function Layout() {
    const { query, setQuery } = useSearch();
    const { user, logout } = useContext(AuthContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mobileMenuOpen]);

  return (
    <div style={appContainer}>
      {/* NAVBAR */}
      <nav className="nav-container">
        <div style={navLeft}>
          <Link to="/" style={logoStyle}>FreeStudy</Link>
        </div>

        {/* Desktop Search */}
        <div className="search-container">
          <input 
              type="text"
              placeholder="Search Sets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={searchInput}
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="hamburger-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {/* Mobile Search */}
          <div className="mobile-search-container">
            <input 
                type="text"
                placeholder="Search Sets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mobile-search-input"
            />
          </div>
          
          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/create-set" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Create</Link>
            <Link to="/settings" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
            {user ? (
              <span className="mobile-nav-link" style={{ cursor: "pointer" }} onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Logout
              </span>
            ) : (
              <>
                  <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}

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



const navLeft = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "white",
  textDecoration: "none",
  marginRight: "20px",
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
  '@media (max-width: 768px)': {
    padding: '20px 15px',
  },
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


