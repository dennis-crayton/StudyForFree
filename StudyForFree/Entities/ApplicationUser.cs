using Microsoft.AspNetCore.Identity;

namespace StudyForFree.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public List<FlashcardSet> FlashcardSets { get; set; } = new();
    }
}
