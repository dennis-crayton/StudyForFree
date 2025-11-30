using System.ComponentModel.DataAnnotations;

namespace StudyForFree.Entities.DTOs
{
    public class TokenDTO
    {
        [Required]
        public string AccessToken { get; set; } = string.Empty;

        [Required]
        public string RefreshToken { get; set; } = string.Empty;
    }
}
