using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudyForFree.Entities;

namespace StudyForFree.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<TokenInfo> TokenInfo { get; set; }
        public DbSet<FlashcardSet> FlashcardSets { get; set; }
        public DbSet<Flashcard> Flashcards { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //One to Many, FlashcardSet -> Flashcards
            builder.Entity<FlashcardSet>()
                .HasMany(fc => fc.Flashcards)
                .WithOne()
                .HasForeignKey(fc => fc.FlashcardSetId)
                .OnDelete(DeleteBehavior.Cascade);


        }
    }
}
