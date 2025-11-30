import {useEffect,useState} from "react";
import { getFlashcardSetById } from "../services/api";
import {useParams,Link} from 'react-router-dom';

export default function StudyModePage() {
    const {id} = useParams();
    const[setData,setSetData] = useState(null);
    const[currentIndex,setCurrentIndex] = useState(0);
    const[flipped,setFlipped] = useState(false);

    useEffect(() => {
        loadSet();
    },[]);

    useEffect(() => {
        function handleKey(e) {
            if (e.code === "Space") {
                e.preventDefault();
                setFlipped((f) => !f);
            }
            if (e.code === "ArrowRight") {
                e.preventDefault();
                nextCard();
            }
            if (e.code === "ArrowLeft") {
                e.preventDefault();
                prevCard();
            }
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    },[nextCard, prevCard]);

    async function loadSet() {
        const data = await getFlashcardSetById(id);
        setSetData(data);
    }

    if (!setData) return <div>Loading...</div>;
    if (!setData.flashcards || setData.flashcards.length === 0) {
            return (
                <div style={container}>
                    <h1 className="page-title" style={{ textAlign: "center" }}>Study Mode</h1>
                    <p style={{ textAlign: "center", marginTop: "50px" }}>
                        This flashcard set doesn't have any cards yet.
                    </p>
                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <Link to={`/set/${id}`} className="btn">Back to Set</Link>
                    </div>
                </div>
            );
        }

    const total = setData.flashcards.length;
    const safeIndex = ((currentIndex % total) + total) % total;
    const card = setData.flashcards[safeIndex];

    function nextCard() {
        setFlipped(false);
        setCurrentIndex((i) => (i + 1) % setData.flashcards.length);
    }

    function prevCard() {
        setFlipped(false);
        setCurrentIndex((i) => i === 0 ? setData.flashcards.length - 1 : i - 1);
    }

    return (
        <div style={{ containerStyle}}>
            <h1 className="page-title" style={{textAlign: "center"}}>Study Mode</h1>
            <div style={flipCardContainer} onClick={() => setFlipped(!flipped)}>
                <div
                    style={{
                    ...flipCard,
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    {/* FRONT */}
                    <div style={{ ...flipFace }}>
                    <strong style={{ color: "#9bb6ff" }}>Q:</strong>
                    <p style={{ margin: "10px 0 0 0", width: "100%", wordWrap: "break-word", overflowWrap: "break-word" }}>{card.question}</p>
                    </div>

                    {/* BACK */}
                    <div style={flipBack}>
                    <strong style={{ color: "#a1ffa1" }}>A:</strong>
                    <p style={{ margin: "10px 0 0 0", width: "100%", wordWrap: "break-word", overflowWrap: "break-word" }}>{card.answer}</p>
                    </div>
                </div>
            </div>

            <div style={navRow}>
                <button className="btn" onClick={prevCard}>Previous</button>
                <button className="btn" onClick={nextCard}>Next</button>
            </div>
            <p style={{ textAlign: "center", marginTop: "15px", opacity: 0.7 }}>
                Card {currentIndex + 1} / {setData.flashcards.length}
            </p>
            <Link to={`/set/${id}`} className="btn" style={{ marginTop: "20px" }}>
                Exit Study Mode
            </Link>
        </div>

        
    )

}

const container = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",

};

// Styles
const containerStyle = {
  maxWidth: "500px",
  margin: "0 auto",
  padding: "20px",
};

const flipCardContainer = {
  width: "100%",
  height: "360px",
  perspective: "1800px",
  cursor: "pointer",
  marginBottom: "20px",
  
};

const flipCard = {
  width: "100%",
  height: "100%",
  position: "relative",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
  transformOrigin: "center",
};
const flipFace = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  backgroundColor: "#1a1d2b",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  textAlign: "center",
  fontSize: "18px",
  
};
const flipFront = {
  position: "absolute",
  top: 0,
  left: 0,
};

const flipBack = {
  ...flipFace,
  transform: "rotateY(180deg)",
};


const navRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};