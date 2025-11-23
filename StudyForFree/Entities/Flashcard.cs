namespace StudyForFree.Entities
{
    public class Flashcard
    {
        public Guid Id { get; set; }
        public Guid FlashcardSetId { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;

    }
}
