import {useState} from 'react';
import {createFlashcardSet} from '../services/api';
import {useNavigate} from 'react-router-dom';

export default function CreateSetPage() {
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        await createFlashcardSet({title,description});
        navigate("/");
    }
    return (
        <div style={pageContainer}>
            <h1 className="page-title">Create Flashcard Set</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Title:</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                />
                <br />
                <label style={labelStyle}>Description:</label>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    style={textareaStyle}
                />
                <br />
                <button className="btn" type="submit" style={{ height:"35px"}}>Save Changes</button>
                <button className="btn" type="button" style={{marginTop:"10px", height:"35px"}} onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    )
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