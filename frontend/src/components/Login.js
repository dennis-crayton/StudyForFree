
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { login } from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Login() {
    const navigate = useNavigate();
    const { login: setAuthUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Username:", username, "Password:", password);

        try {
            login(username, password);
            const data = await login(username, password);
            console.log("Login successful:", data);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            localStorage.setItem("user", JSON.stringify({username}));
            setAuthUser({username});
            navigate("/");
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid username or password");
        }
    };

    return (
        <div style={pageContainer}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label htmlFor="username" style={labelStyle}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="password" style={labelStyle}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p style={{justifyContent: "center", display: "flex", marginTop: "15px"}}>
                Don't have an account? <Link to="/register" style={{marginLeft: "5px"}}>Register here</Link>
            </p>
        </div>
    );
}


const pageContainer = {
  maxWidth: "520px",
  margin: "40px auto",
  padding: "0 20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#161822",
  padding: "25px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  gap: "18px", // consistent modern spacing
};


const labelStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#d0d5e0",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #3a3f5c",
  backgroundColor: "#0e1018",
  color: "white",
  fontSize: "15px",
  boxSizing: "border-box",
};

const textareaStyle = {
  width: "100%",
  padding: "10px 12px",
  height: "120px",
  borderRadius: "8px",
  border: "1px solid #3a3f5c",
  backgroundColor: "#0e1018",
  color: "white",
  fontSize: "15px",
  resize: "vertical",
  boxSizing: "border-box",

  /* FIXES CURSOR POSITION */
  verticalAlign: "top",
  lineHeight: "1.4",
};


export default Login;