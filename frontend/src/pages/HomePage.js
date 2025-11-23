import { useEffect, useState } from "react";
import FlashcardSetCard from "../components/FlashcardSetCard";
import { deleteFlashcardSet, getFlashcardSets } from "../services/api";
import {Link} from 'react-router-dom';
import { useSearch } from "../context/SearchContext";
export default function HomePage() {
    const[sets,setSets]=useState([]);
    const[loading,setLoading]=useState(true);

    const { query } = useSearch();

    useEffect(()=>{
        loadSets();
    }, []);

    async function loadSets() {
        try {
            const data = await getFlashcardSets();
            setSets(data);

        } catch (error) {
            console.error("Error loading flashcard sets:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        await deleteFlashcardSet(id);
        loadSets();
    }


    if (loading) return <div>Loading...</div>;

    if (sets.length === 0) return <div>No flashcard sets found.</div>;

    const filteredSets = sets.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase())
    );


    return (
        <div>
      <h1 className="page-title">Your Flashcard Sets</h1>

      <Link className="btn" to="/create-set">+ New Set</Link>
      <br /><br />

      {filteredSets.map(set => (
        <div key={set.id} className="card">
          <h3>{set.title}</h3>
          <p>{set.description}</p>
          <p style={{ opacity: 0.7 }}>{set.flashcards.length} cards</p>
            
            <button onClick={() => window.location=`/set/${set.id}`} style={{marginLeft: '10px', fontSize: '14px'}}>View</button>            
            <button onClick={() => handleDelete(set.id)} style={{marginLeft: '10px', fontSize: '14px'}}>Delete</button>
        </div>
      ))}
    </div>
    )
}