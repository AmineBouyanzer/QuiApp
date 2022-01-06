using Microsoft.EntityFrameworkCore;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Quiz> Quizes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }

        public DbSet<Player> Players { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Quiz>()
                .Property(q => q.Rating)
                .HasDefaultValue(-1);

            base.OnModelCreating(modelBuilder);
        }



    }
}
