import {useState,useEffect} from 'react';
import {createFlashcardSet, getFlashcardSetById} from '../services/api';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {updateFlashcardSet} from '../services/api';
import {Link} from 'react-router-dom';



export default function EditSetPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");

    useEffect(() => {
        loadSet();
    },[id]);

    useEffect(() => {
      function handleKey(e) {
          if (e.code === "Escape") {
              navigate(-1);
          }
      }
      window.addEventListener("keydown", handleKey);
      return () => {
          window.removeEventListener("keydown", handleKey);
      };
    }, [navigate]);

    async function loadSet() {
        const set = await getFlashcardSetById(id);
        setTitle(set.title);
        setDescription(set.description);

    }
    async function handleSubmit(event) {
        event.preventDefault();

        await updateFlashcardSet(id, {
            title,
            description,
            isPublic: false
        });
        navigate("/");
    }

    return (
        <div className ="page-container">
            <h1 className="page-title">Edit FlashcardSet</h1>
            <form onSubmit={handleSubmit} className="form-style">
                <label className="label-style">Title:</label>
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-style"
                />
                <br />
                <label className="label-style">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea-style"
                />
                <br />
                <button className="btn" type="submit" style={{ height:"35px"}}>Save Changes</button>
                <button className="btn" type="button" style={{marginTop:"10px", height:"35px"}} onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    )
}