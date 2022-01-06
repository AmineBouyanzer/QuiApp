using QuizAppBackend.Context;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public class PlayerRepository : CRUDRepository<Player>, IPlayerRepository
    {
        private readonly AppDbContext _context;
        public PlayerRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        public IEnumerable<Player> GetByQuiz(Guid idQuiz)
        {
            IEnumerable<Player> score = _context.Set<Player>().Where(x => x.QuizId == idQuiz);
            return score;
        }
    }
}
