
import { use, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { register } from "../services/api";


function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Signup Attempt:", {name, email, password});

        try {
            await register(name, email, password);
            console.log("Signup successful");
            navigate("/login");
        } catch (err) {
            setError("Signup failed. Please try again.");
            console.error("Signup failed:", err);
        }
    };
    return (
        <div style={pageContainer}>
            <h2 >Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label htmlFor="name" style={labelStyle}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Sign Up</button>
            </form>
            <p style={{justifyContent: "center", display: "flex", marginTop: "15px"}}>
                Already have an account?  
                <Link to="/login" style={{marginLeft: "5px"}}>Login here</Link>
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

export default SignUp;