import {useState} from 'react';
import {createFlashcardSet} from '../services/api';
import {useNavigate} from 'react-router-dom';

export default function CreateSetPage() {
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setError("");
            await createFlashcardSet({title, description, isPublic: false});
            navigate("/");
        } catch (err) {
            setError(`Failed to create set: User may not be logged in.`);
            console.error("Create set error:", err);
        }
    }
    return (
        <div className="page-container">
            <h1 className="page-title">Create Flashcard Set</h1>
            {error && <div className="error-style">{error}</div>}
            <form onSubmit={handleSubmit} className="form-style">
                <label className="label-style">Title:</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-style"
                />
                <br />
                <label className="label-style">Description:</label>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    className="textarea-style"
                />
                <br />
                <button className="btn" type="submit" style={{ height:"35px"}}>Save Changes</button>
                <button className="btn" type="button" style={{marginTop:"10px", height:"35px"}} onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    )
}

