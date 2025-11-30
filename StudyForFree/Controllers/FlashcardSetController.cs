using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyForFree.Data;
using StudyForFree.Entities;
using StudyForFree.Entities.DTOs;
using System.Security.Claims;

namespace StudyForFree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashcardSetController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public FlashcardSetController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllSets()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { Message = "User not authenticated." });
            }
            var sets = await _context.FlashcardSets.Where(s => s.UserId == userId).Select(x => new FlashcardSetGetDTO
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                IsPublic = x.IsPublic,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt,
                Flashcards = x.Flashcards.Select(fc => new FlashcardGetDTO
                {
                    Id = fc.Id,
                    //FlashcardSetId = fc.FlashcardSetId,
                    Question = fc.Question,
                    Answer = fc.Answer

                }).ToList()
            }).ToListAsync();

            return Ok(sets);
        }
        [HttpGet("{flashcardSetId:guid}")]
        public async Task<IActionResult> GetSetById(Guid flashcardSetId)
        {
            var sets = await _context.FlashcardSets.Where(x => x.Id == flashcardSetId).Select(x => new FlashcardSetGetDTO
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                IsPublic = x.IsPublic,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt,
                Flashcards = x.Flashcards.Select(fc => new FlashcardGetDTO
                {
                    Id = fc.Id,
                    //FlashcardSetId = fc.FlashcardSetId,
                    Question = fc.Question,
                    Answer = fc.Answer
                }).ToList()
            }).SingleOrDefaultAsync();
            return Ok(sets);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateSet([FromBody] FlashcardSetCreateDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { Message = "User not authenticated." });
            }
            var newSet = new FlashcardSet
            {
                Title = dto.Title,
                Description = dto.Description,
                IsPublic = dto.IsPublic,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
            };
            _context.FlashcardSets.Add(newSet);
            await _context.SaveChangesAsync();
            return Ok(newSet);
        }
        [HttpPut("flashcardSetId/{flashcardSetId:guid}")]
        public async Task<IActionResult> UpdateSet(Guid flashcardSetId, [FromBody] FlashcardSetCreateDTO dto)
        {
            var existingSet = await _context.FlashcardSets.FindAsync(flashcardSetId);

            if (existingSet == null)
            {
                return NotFound("FlashcardSet not found.");
            }
            existingSet.Title = dto.Title;
            existingSet.Description = dto.Description;
            existingSet.IsPublic = dto.IsPublic;
            existingSet.UpdatedAt = DateTime.UtcNow;



            await _context.SaveChangesAsync();

            var updatedDto = new FlashcardSetGetDTO
            {
                Id = existingSet.Id,
                Title = existingSet.Title,
                Description = existingSet.Description,
                IsPublic = existingSet.IsPublic,
                CreatedAt = existingSet.CreatedAt,
                UpdatedAt = existingSet.UpdatedAt,
                Flashcards = existingSet.Flashcards.Select(fc => new FlashcardGetDTO
                {
                    Id = fc.Id,
                    Question = fc.Question,
                    Answer = fc.Answer
                }).ToList()
            };

            return Ok(updatedDto);
        }

        [HttpDelete("flashcardSetId/{flashcardSetId:guid}")]
        public async Task<IActionResult> DeleteSet(Guid flashcardSetId)
        {
            var existingSet = await _context.FlashcardSets.FindAsync(flashcardSetId);
            if (existingSet == null)
            {
                return NotFound("FlashcardSet not found.");
            }
            _context.FlashcardSets.Remove(existingSet);
            await _context.SaveChangesAsync();
            return Ok("FlashcardSet deleted successfully.");
        }
    }
}
