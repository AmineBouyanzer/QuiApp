using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public interface IQuestionService : ICRUDService<Question, QuestionDTO>
    {
        public IEnumerable<QuestionDTO> GetByQuiz(Guid idQuiz);

        public void updateQuestion(QuestionDTO questionDTO);
    }
}
