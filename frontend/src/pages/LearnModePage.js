import {useEffect,useState} from "react";
import { getFlashcardSetById } from "../services/api";
import {useParams,Link} from "react-router-dom";

export default function LearnModePage() {
    const{id} = useParams();
    const[setData, setSetData] = useState(null);
    const[questionIndex, setQuestionIndex] = useState(0);
    const[choices,setChoices] = useState([]);
    const[correctAnswer, setCorrectAnswer] = useState("");
    const[selected, setSelected] = useState(null);
    const[feedback, setFeedback] = useState("");
    const[questionAnswered, setQuestionAnswered] = useState(false);

    useEffect(() => {
        loadSet();
    },[]);

    useEffect(() => {
        function handleKey(e) {
            if (["Space","ArrowRight"].includes(e.code)) {
                e.preventDefault();
            }

            if (!questionAnswered) {
                if (e.code === "Digit1" && choices[0]) handleSelect(choices[0]);
                if (e.code === "Digit2" && choices[1]) handleSelect(choices[1]);
                if (e.code === "Digit3" && choices[2]) handleSelect(choices[2]);
                if (e.code === "Digit4" && choices[3]) handleSelect(choices[3]);
            }
            if (questionAnswered && e.code === "ArrowRight") {
                nextQuestion();
            }
            if (e.code === "Escape") {
                window.location.href = `/set/${id}`;
            }
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [choices, questionAnswered, correctAnswer]);

    async function loadSet() {
        const data = await getFlashcardSetById(id);
        setSetData(data);
        if (data.flashcards && data.flashcards.length > 0) {
            generateQuestion(data.flashcards,0);
        }
    }

    function shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    

    function generateQuestion(cards,index) {
        const card = cards[index];
        const wrongAnswers = shuffle(cards.filter((c) => c.id !== card.id).map((c) => c.answer)).slice(0,3);
        const options = shuffle([card.answer,...wrongAnswers]);

        setChoices(options);
        setCorrectAnswer(card.answer);
        setSelected(null);
        setFeedback("");
    }

    function handleSelect(option) {
        if (questionAnswered) return;
        setSelected(option);
        setQuestionAnswered(true);
        if (option === correctAnswer) {
            setFeedback("Correct!");
        } else {
            setFeedback(`Incorrect. The correct answer is: ${correctAnswer}`);
        }
    }

    function nextQuestion() {
        const nextIndex = (questionIndex + 1) % setData.flashcards.length;
        setQuestionIndex(nextIndex);
        setQuestionAnswered(false);
        generateQuestion(setData.flashcards,nextIndex);
    }

    if (!setData) return <div>Loading...</div>;
    
    if (!setData.flashcards || setData.flashcards.length === 0) {
        return (
            <div style={container}>
                <h1 className="page-title" style={{ textAlign: "center" }}>Learn Mode</h1>
                <p style={{ textAlign: "center", marginTop: "50px" }}>
                    This flashcard set doesn't have any cards yet.
                </p>
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <Link to={`/set/${id}`} className="btn">Back to Set</Link>
                </div>
            </div>
        );
    }

    const card = setData.flashcards[questionIndex];

    return (
        <div className="page-container" >
            <h1 className="page-title" style={{ textAlign: "center" }}>
                Learn Mode
            </h1>

            <p style={questionText}>
                <strong>Q:</strong> {card.question}
            </p>

            <div style={choicesContainer}>
                {choices.map((option, idx) => (
                <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    style={{
                    ...choiceButton,
                    border:
                        selected === option
                        ? option === correctAnswer
                            ? "2px solid #4caf50"
                            : "2px solid #ff5252"
                        : "1px solid #3a3f5c",
                    backgroundColor:
                        selected === option
                        ? option === correctAnswer
                            ? "#1f3321"
                            : "#331f1f"
                        : "#1a1d2b",
                    }}
                >
                    {option}
                </button>
                ))}
            </div>

            {feedback && (
                <button className="btn" onClick={nextQuestion} style={{ marginTop: "20px" }}>
                Next Question
                </button>
            )}

            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <p style={{ opacity: 0.7 }}>
                Question {questionIndex + 1} / {setData.flashcards.length}
                </p>
                <Link to={`/set/${id}`} className="btn" style={{ marginTop: "10px" }}>
                Exit
                </Link>
        </div>
    </div>
  );
}

// Styles
const container = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const questionText = {
  fontSize: "18px",
  textAlign: "center",
  marginBottom: "20px",
};

const choicesContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const choiceButton = {
  padding: "12px 16px",
  backgroundColor: "#1a1d2b",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "0.2s",
};