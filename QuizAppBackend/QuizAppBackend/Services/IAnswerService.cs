using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public interface IAnswerService : ICRUDService<Answer, AnswerDTO>
    {
        public IEnumerable<AnswerDTO> GetByQuestion(Guid idQuiz);

        public void UpdateAnswer(AnswerDTO answerDto);
    }
}
