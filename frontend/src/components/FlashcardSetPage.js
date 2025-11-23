import {useEffect,useState} from 'react';
import { getFlashcardSetById } from '../services/api';
import {useParams,Link} from 'react-router-dom';
import { createFlashcard } from '../services/api';
import { deleteFlashcard } from '../services/api';
import { updateFlashcard } from '../services/api';

export default function FlashcardSetPage() {
    const {id} = useParams();
    const[setData,setSetData] = useState(null);
    const[loading,setLoading] = useState(true);

    const[question,setQuestion] = useState("");
    const[answer,setAnswer] = useState("");

    const[editingCardId, setEditingCardId] = useState(null);
    const[editQuestion,setEditQuestion] = useState("");
    const[editAnswer,setEditAnswer] = useState("");


    useEffect(() => {
        loadSet();
    }, []);

    async function loadSet() {
        const data = await getFlashcardSetById(id);
        setSetData(data);
        setLoading(false);
    };

    if (loading) return <div>Loading...</div>;
    if (!setData) return <div>Flashcard set not found.</div>;

    async function handleAddFlashcard(event) {
        event.preventDefault();
        if (!question.trim() || !answer.trim()) {
            return;
        }
        await createFlashcard(id, { question, answer });
        setQuestion("");
        setAnswer("");
        loadSet();
    }

    async function startEditing(card) {
        setEditingCardId(card.id);
        setEditQuestion(card.question);
        setEditAnswer(card.answer);
    }
    async function handleSaveEdit(cardId) {
        await updateFlashcard(id, cardId, {
            question: editQuestion,
            answer: editAnswer
        });
        setEditingCardId(null);
        loadSet();
    }

    async function handleDeleteFlashcard(cardId) {
        if (!window.confirm("Delete this flashcard?")) return;

        await deleteFlashcard(id, cardId);

        loadSet();
    }        

    async function cancelEdit() {
        setEditingCardId(null);
    }


    return (
    <div>
      <div style={titleRow}>
        <h1 className="page-title">{setData.title}</h1>
        <div>
          <Link className="btn" to={`/study/${setData.id}`} style={{ marginRight: "10px" }}>
            Study Mode
          </Link>
          <Link className="btn" to={`/learn/${setData.id}`} style={{ marginRight: "10px" }}>
            Learn Mode
          </Link>
          <Link className="btn" to={`/edit-set/${setData.id}`} style={{ marginRight: "10px" }}>
            Edit Set
          </Link>
          <Link className="btn" to="/">Back</Link>
        </div>
      </div>

      <p style={descriptionStyle}>{setData.description}</p>

        <h3 style={{ marginTop: "30px" }}>Add Flashcard</h3>

            <form onSubmit={handleAddFlashcard} style={{ marginBottom: "25px" }}>
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={editInputStyle}
                />

                <input
                    type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={editInputStyle}
                />
                <button style={{marginTop:"10px"}} className="btn" type="submit">Add</button>
            </form>        

            <h3 style={flashcardsHeader}>Flashcards</h3>

             {setData.flashcards.length === 0 ? (
                <p>No flashcards in this set yet.</p>
            ) : (
                setData.flashcards.map((card) => (
                    <div key={card.id} className="flashcard">

                        {editingCardId === card.id ? (
                            <>
                            <div style={{marginBottom: "15px"}}>
                                <strong style={{color:"#9bb6ff"}}>Q:</strong>
                                <input
                                    type="text"
                                    value={editQuestion}
                                    onChange={(e) => setEditQuestion(e.target.value)}
                                    style={editInputStyle}
                                />

                            </div>
                             <div style={{ marginBottom: "8px" }}>
                                <strong style={{ color: "#a1ffa1" }}>A:</strong>
                                <input
                                type="text"
                                value={editAnswer}
                                onChange={(e) => setEditAnswer(e.target.value)}
                                style={editInputStyle}
                                />
                            </div>

                            <button 
                                className="btn" 
                                style={{marginRight: "10px"}} 
                                onClick={() => handleSaveEdit(card.id)}
                                >
                                Save
                            </button>
                            <button
                                className="btn"
                                style={{backgroundColor:"#444"}}
                                onClick={cancelEdit}
                                >
                                Cancel
                            </button>
                            </>
                        ) : (
                            <>
                        {/* Question */}
                        <div style={{ marginBottom: "15px" }}>
                            <strong style={{ color: "#9bb6ff" }}>Q:</strong> {card.question}
                        </div>

                        {/* Answer */}
                        <div style={{ marginBottom: "8px" }}>
                            <strong style={{ color: "#a1ffa1" }}>A:</strong> {card.answer}
                        </div>

                        {/* Edit Button */}
                        <button
                            className="btn"
                            style={{ marginRight: "10px" }}
                            onClick={() => startEditing(card)}
                        >
                            Edit
                        </button>

                        {/* Delete */}
                        <button
                            className="btn"
                            style={{ backgroundColor: "#552222" }}
                            onClick={() => handleDeleteFlashcard(card.id)}
                        >
                            Delete
                        </button>
                        </>
                        )}
                    </div>
                ))
            )}
    </div>
    );
}

const titleRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
};

const descriptionStyle = {
  opacity: 0.85,
  marginBottom: "25px",
  fontSize: "16px",
};

const flashcardsHeader = {
  marginTop: "25px",
  marginBottom: "15px",
};
const inputStyle = {
    padding: "8px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1b1d29",
    color: "white",
};

const editInputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "1px solid #444",
  backgroundColor: "#12141c",
  color: "white",
  fontSize: "15px",
  boxSizing: "border-box",
};