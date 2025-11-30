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
      <div className="title-row">
        <h1 className="page-title">{setData.title}</h1>
        <div>
          <Link className="btn btn-with-margin" to={`/study/${setData.id}`}>
            Study Mode
          </Link>
          <Link className="btn btn-with-margin" to={`/learn/${setData.id}`}>
            Learn Mode
          </Link>
          <Link className="btn btn-with-margin" to={`/edit-set/${setData.id}`}>
            Edit Set
          </Link>
          <Link className="btn" to="/">Back</Link>
        </div>
      </div>

      <p className="description-style">{setData.description}</p>

        <h3 className="add-card-header">Add Flashcard</h3>

            <form onSubmit={handleAddFlashcard} className="add-card-form">
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="edit-input-style"
                />

                <input
                    type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="edit-input-style"
                />
                <button className="btn add-button" type="submit">Add</button>
            </form>        

            <h3 className="flashcards-header">Flashcards</h3>

             {setData.flashcards.length === 0 ? (
                <p>No flashcards in this set yet.</p>
            ) : (
                setData.flashcards.map((card) => (
                    <div key={card.id} className="flashcard">

                        {editingCardId === card.id ? (
                            <>
                            <div className="question-section">
                                <strong className="question-label">Q:</strong>
                                <input
                                    type="text"
                                    value={editQuestion}
                                    onChange={(e) => setEditQuestion(e.target.value)}
                                    className="edit-input-style"
                                />

                            </div>
                             <div className="answer-section">
                                <strong className="answer-label">A:</strong>
                                <input
                                type="text"
                                value={editAnswer}
                                onChange={(e) => setEditAnswer(e.target.value)}
                                className="edit-input-style"
                                />
                            </div>

                            <button 
                                className="btn btn-with-margin" 
                                onClick={() => handleSaveEdit(card.id)}
                                >
                                Save
                            </button>
                            <button
                                className="btn btn-cancel"
                                onClick={cancelEdit}
                                >
                                Cancel
                            </button>
                            </>
                        ) : (
                            <>
                        {/* Question */}
                        <div className="question-section">
                            <strong className="question-label">Q:</strong> {card.question}
                        </div>

                        {/* Answer */}
                        <div className="answer-section">
                            <strong className="answer-label">A:</strong> {card.answer}
                        </div>

                        {/* Edit Button */}
                        <button
                            className="btn btn-with-margin"
                            onClick={() => startEditing(card)}
                        >
                            Edit
                        </button>

                        {/* Delete */}
                        <button
                            className="btn btn-delete"
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

