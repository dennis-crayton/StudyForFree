const API_BASE = "";

export async function getFlashcardSets() {
    const response = await fetch(`${API_BASE}/api/FlashcardSet`);
    if (!response.ok) {
        throw new Error('Failed to fetch flashcard sets');
    }
    return response.json();
}
export async function getFlashcardSetById(id) {
    const response = await fetch(`${API_BASE}/api/FlashcardSet/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch flashcard sets');
    }
    return response.json();
}

export async function createFlashcardSet(set) {
    const response = await fetch(`${API_BASE}/api/FlashcardSet`,{
        method: 'POST',
        headers: 
        {'Content-Type' : 'application/json'},
        body: JSON.stringify(set)
    });
    return response.json();

}

export async function updateFlashcardSet(id,updatedSet) {
    const response = await fetch(`${API_BASE}/api/FlashcardSet/flashcardSetId/${id}`,{
        method: 'PUT',
        headers: 
        {'Content-Type' : 'application/json'},
        body: JSON.stringify(updatedSet)
    });
    return response.json();

}

export async function deleteFlashcardSet(id) {
    const response = await fetch(`${API_BASE}/api/FlashcardSet/flashcardSetId/${id}`,{
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete flashcard set');
    }

    return response.ok;
}

export async function createFlashcard(setId, card) {
    const response = await fetch(`${API_BASE}/api/Flashcard/flashcardSetId/${setId}`,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(card)
    });
    return response.json();
}

export async function deleteFlashcard(setId,cardId) {
    const response = await fetch(`${API_BASE}/api/Flashcard/flashcardSetId/${setId}/flashcardId/${cardId}`,{
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete flashcard');
    }
    return response.ok;
}

export async function updateFlashcard(setId, cardId, updatedCard) {
    const response = await fetch(`${API_BASE}/api/Flashcard/flashcardSetId/${setId}/flashcardId/${cardId}`,{
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedCard)
    });
    return response.json();
}