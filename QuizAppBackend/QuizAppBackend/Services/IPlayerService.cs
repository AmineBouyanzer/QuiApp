using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public interface IPlayerService : ICRUDService<Player, PlayerDTO>
    {
        public IEnumerable<PlayerDTO> GetByQuiz(Guid idQuiz);
    }
}
