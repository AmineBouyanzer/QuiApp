using QuizAppBackend.Enums;
using QuizAppBackend.Models;
using QuizAppBackend.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public interface IQuizService : ICRUDService<Quiz, QuizDTO>
    {
        public QuizDTO GetCascadeQuizById(Guid quizId);

        public QuizDTO UpdateQuizOnCascade(Guid id, QuizDTO quiz);

        public bool Rating(Rating rating);

        public int VerifyPassword(Unlock mdp);

        public IEnumerable<QuizDTO> GetByStatus(Status status);

        public IEnumerable<QuizDTO> GetByCategory(Category category);

        public QuizDTO getByName(string name);
    }
}
