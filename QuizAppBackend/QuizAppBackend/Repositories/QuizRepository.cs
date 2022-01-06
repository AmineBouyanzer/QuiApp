using QuizAppBackend.Context;
using QuizAppBackend.Enums;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public class QuizRepository : CRUDRepository<Quiz>, IQuizRepository
    {
        private readonly AppDbContext _context;

        public QuizRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        public Quiz getByName(string name)
        {
            IQueryable<Quiz> elements = _context.Set<Quiz>().Where(x => x.Name == name);
            return elements.Count() > 0 ? elements.First() : null;
        }

        public IEnumerable<Quiz> GetByStatus(Status status)
        {
            IEnumerable<Quiz> elements = _context.Set<Quiz>().Where(x => x.Status == status);
            return elements;
        }

        public IEnumerable<Quiz> GetByCategory(Category category)
        {
            IEnumerable<Quiz> elements = _context.Set<Quiz>().Where(x => x.Category == category);
            return elements;
        }

        public new IEnumerable<Quiz> GetAll()
        {
            IEnumerable<Quiz> elements = _context.Set<Quiz>().OrderByDescending(x => x.Rating);
            return elements;
        }


    }
}
