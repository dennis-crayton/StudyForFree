const API_BASE = "";

export async function getFlashcardSets() {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${API_BASE}/api/FlashcardSet`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
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
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${API_BASE}/api/FlashcardSet`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(set)
    });
    if (!response.ok) {
        throw new Error('Failed to create flashcard set');
    }
    return response.json();

}

export async function updateFlashcardSet(id,updatedSet) {
    const response = await fetch(`${API_BASE}/api/FlashcardSet/flashcardSetId/${id}`,{
        method: 'PUT',
        headers: 
        {'Content-Type' : 'application/json'},
        body: JSON.stringify(updatedSet)
    });
    if (!response.ok) {
        throw new Error('Failed to update flashcard set');
    }
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
    if (!response.ok) {
        throw new Error('Failed to create flashcard');
    }
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
    if (!response.ok) {
        throw new Error('Failed to update flashcard');
    }
    return response.json();
}

export async function login(username, password) {
    const response = await fetch(`${API_BASE}/api/Accounts/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password}),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    };
    return response.json();
}

export async function register(name, email, password) {
    const response = await fetch(`${API_BASE}/api/Accounts/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, password: password }),
    });
    if (!response.ok) {
        throw new Error('Registration failed');
    };
    return response.json();
}

// need a way to make logout show when logged in

