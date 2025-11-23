namespace StudyForFree.Entities
{
    public class FlashcardSet
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsPublic { get; set; } = false;
        public List<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
