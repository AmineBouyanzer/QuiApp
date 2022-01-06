using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizAppBackend.Migrations
{
    public partial class m4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Creator",
                table: "Quizes");

            migrationBuilder.AddColumn<int>(
                name: "NbRating",
                table: "Quizes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Rating",
                table: "Quizes",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NbRating",
                table: "Quizes");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Quizes");

            migrationBuilder.AddColumn<string>(
                name: "Creator",
                table: "Quizes",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
