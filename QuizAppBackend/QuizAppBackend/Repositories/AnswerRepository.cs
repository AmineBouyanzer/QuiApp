using QuizAppBackend.Context;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public class AnswerRepository : CRUDRepository<Answer>, IAnswerRepository
    {
        private readonly AppDbContext _context;
        public AnswerRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Answer> GetByQuestion(Guid idQuiz)
        {
            IEnumerable<Answer> elements = _context.Set<Answer>().Where(x => x.QuestionId == idQuiz);
            return elements;
        }
    }
}
