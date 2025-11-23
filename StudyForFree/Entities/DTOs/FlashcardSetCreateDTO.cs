namespace StudyForFree.Entities.DTOs
{
    public class FlashcardSetCreateDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsPublic { get; set; } = false;
    }
}
