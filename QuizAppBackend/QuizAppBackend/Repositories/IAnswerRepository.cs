using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public interface IAnswerRepository : ICRUDRepository<Answer>
    {
        public IEnumerable<Answer> GetByQuestion(Guid idQuiz);
    }
}
