namespace StudyForFree.Entities.DTOs
{
    public class FlashcardGetDTO
    {
        public Guid Id { get; set; }
        //public Guid FlashcardSetId { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;

    }
}
