const API_BASE = "";

export async function getFlashcardSets() {
    let token = localStorage.getItem('accessToken');
    let response = await fetch(`${API_BASE}/api/FlashcardSet`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    // If unauthorized, try to refresh token and retry
    if (response.status === 401) {
        try {
            token = await refreshToken();
            response = await fetch(`${API_BASE}/api/FlashcardSet`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            window.location.href = '/login';
            throw error;
        }
    }
    
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
    let token = localStorage.getItem('accessToken');
    let response = await fetch(`${API_BASE}/api/FlashcardSet`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(set)
    });
    
    // If unauthorized, try to refresh token and retry
    if (response.status === 401) {
        try {
            token = await refreshToken();
            response = await fetch(`${API_BASE}/api/FlashcardSet`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(set)
            });
        } catch (error) {
            window.location.href = '/login';
            throw error;
        }
    }
    
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

// Refresh token function using your existing backend endpoint
export async function refreshToken() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }
    
    const response = await fetch(`${API_BASE}/api/Accounts/token/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            accessToken: accessToken,
            refreshToken: refreshToken 
        }),
    });
    
    if (!response.ok) {
        // Refresh token expired, clear storage
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw new Error('Session expired, please login again');
    }
    
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.accessToken;
}

