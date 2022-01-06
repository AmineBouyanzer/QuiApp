using QuizAppBackend.Context;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public class QuestionRepository : CRUDRepository<Question>, IQuestionRepository
    {
        private readonly AppDbContext _context = null;
        public QuestionRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Question> GetByQuiz(Guid idQuiz)
        {
            IEnumerable<Question> questions = _context.Set<Question>().Where(x => x.QuizId == idQuiz);
            return questions;
        }
    }
}
