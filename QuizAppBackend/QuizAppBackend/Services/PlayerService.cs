using AutoMapper;
using QuizAppBackend.Models;
using QuizAppBackend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public class PlayerService : CRUDService<Player, IPlayerRepository, PlayerDTO>, IPlayerService
    {
        private readonly IPlayerRepository _repository;
        private readonly IMapper _mapper;
        public PlayerService(IPlayerRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public IEnumerable<PlayerDTO> GetByQuiz(Guid idQuiz)
        {
            IEnumerable<Player> score = _repository.GetByQuiz(idQuiz);
            IEnumerable<PlayerDTO> scoreDTO = _mapper.Map<IEnumerable<PlayerDTO>>(score);
            return scoreDTO;
        }

    }
}
