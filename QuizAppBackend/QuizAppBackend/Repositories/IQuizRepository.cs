using QuizAppBackend.Enums;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public interface IQuizRepository : ICRUDRepository<Quiz>
    {
        public Quiz getByName(string name);

        public IEnumerable<Quiz> GetByStatus(Status status);

        public IEnumerable<Quiz> GetByCategory(Category category);
    }
}
