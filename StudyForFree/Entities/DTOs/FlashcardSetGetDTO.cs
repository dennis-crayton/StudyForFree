namespace StudyForFree.Entities.DTOs
{
    public class FlashcardSetGetDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsPublic { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<FlashcardGetDTO> Flashcards { get; set; } 
    }
}
