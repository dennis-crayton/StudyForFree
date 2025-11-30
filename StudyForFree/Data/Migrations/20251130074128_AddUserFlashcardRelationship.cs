using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyForFree.Migrations
{
    /// <inheritdoc />
    public partial class AddUserFlashcardRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "FlashcardSets",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlashcardSets_UserId",
                table: "FlashcardSets",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlashcardSets_AspNetUsers_UserId",
                table: "FlashcardSets",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlashcardSets_AspNetUsers_UserId",
                table: "FlashcardSets");

            migrationBuilder.DropIndex(
                name: "IX_FlashcardSets_UserId",
                table: "FlashcardSets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FlashcardSets");
        }
    }
}
