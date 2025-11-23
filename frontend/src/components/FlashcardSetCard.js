import React from 'react';
import { Link } from 'react-router-dom';
import { deleteFlashcardSet } from '../services/api';

export default function FlashcardSetCard({ set }) {

    async function handleDelete() {
        if (!window.confirm("Delete this flashcard set?")) return;
        await deleteFlashcardSet(set.id);
        window.location.reload();
    }
    return (
        <div className="flashcardSet">
            <h3>
                {set.title}            
                <Link to={`/set/${set.id}`} style={{marginLeft: '10px', fontSize: '18px'}}>View</Link>
                <button onClick={handleDelete} style={{marginLeft: '10px', fontSize: '14px'}}>Delete</button>

            </h3>
            <p>{set.description}</p>
            <p>Number of flashcards: {set.flashcards.length}</p>
        </div>
    );
}

