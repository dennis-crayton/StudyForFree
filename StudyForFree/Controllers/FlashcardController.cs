using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyForFree.Data;
using StudyForFree.Entities;
using StudyForFree.Entities.DTOs;

namespace StudyForFree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashcardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FlashcardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("flashcardSetId/{flashcardSetId:guid}")]
        public async Task<IActionResult> GetAllFlashcards(Guid flashcardSetId)
        {
            var setId = await _context.FlashcardSets.FindAsync(flashcardSetId);

            var flashcards = await _context.Flashcards.Select(x => new FlashcardGetDTO
            {
                Id = x.Id,
                //FlashcardSetId = x.FlashcardSetId,
                Question = x.Question,
                Answer = x.Answer
            }).ToListAsync();

            return Ok(flashcards);
        }

        [HttpPost("flashcardSetId/{flashcardSetId:guid}")]
        public async Task<IActionResult> CreateFlashcard(Guid flashcardSetId, [FromBody] FlashcardCreateDTO dto)
        {
            var flashcardSet = await _context.FlashcardSets.FindAsync(flashcardSetId);

            var newFlashcard = new Flashcard
            {
                Id = Guid.NewGuid(),
                FlashcardSetId = flashcardSetId,
                Question = dto.Question,
                Answer = dto.Answer
            };
            _context.Flashcards.Add(newFlashcard);
            await _context.SaveChangesAsync();
            return Ok(newFlashcard);
        }
        [HttpDelete("flashcardSetId/{flashcardSetId:guid}/flashcardId/{flashcardId:guid}")]
        public async Task<IActionResult> DeleteFlashcard(Guid flashcardSetId, Guid flashcardId)
        {
            var flashcardSet = await _context.FlashcardSets.FindAsync(flashcardSetId);
            var flashcard = await _context.Flashcards.FindAsync(flashcardId);

            if (flashcard == null || flashcardSet == null)
            {
                return NotFound("FlashcardSet or Flashcard not found.");
            }

            _context.Flashcards.Remove(flashcard);
            await _context.SaveChangesAsync();  
            return Ok("Flashcard deleted from Set successfully.");
        }
        [HttpPut("flashcardSetId/{flashcardSetId:guid}/flashcardId/{flashcardId:guid}")]
        public async Task<IActionResult> UpdateFlashcard(Guid flashcardSetId, Guid flashcardId, [FromBody] FlashcardCreateDTO dto)
        {
            var flashcardSet = await _context.FlashcardSets.FindAsync(flashcardSetId);
            var flashcard = await _context.Flashcards.FindAsync(flashcardId);

            if (flashcard == null || flashcardSet == null)
            {
                return NotFound("FlashcardSet or Flashcard not found.");
            }
            flashcard.Question = dto.Question;
            flashcard.Answer = dto.Answer;
            await _context.SaveChangesAsync();
            return Ok(new FlashcardGetDTO
            {
                Id = flashcard.Id,
                Question = flashcard.Question,
                Answer = flashcard.Answer
            });
        }

    }
}
