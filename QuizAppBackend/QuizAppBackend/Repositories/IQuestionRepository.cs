using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public interface IQuestionRepository : ICRUDRepository<Question>
    {

        public IEnumerable<Question> GetByQuiz(Guid idQuiz);
    }
}
