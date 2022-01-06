using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public interface IPlayerRepository : ICRUDRepository<Player>
    {
        public IEnumerable<Player> GetByQuiz(Guid idQuiz);
    }
}
