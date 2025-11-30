using Microsoft.AspNetCore.Identity;

namespace StudyForFree.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
