using AutoMapper;
using QuizAppBackend.Models;
using QuizAppBackend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public class AnswerService : CRUDService<Answer, IAnswerRepository, AnswerDTO>, IAnswerService
    {
        private readonly IAnswerRepository _repository;
        private readonly IMapper _mapper;
        public AnswerService(IAnswerRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public IEnumerable<AnswerDTO> GetByQuestion(Guid idQuiz)
        {
            IEnumerable<Answer> answers = _repository.GetByQuestion(idQuiz);
            IEnumerable<AnswerDTO> answersDTO = _mapper.Map<IEnumerable<AnswerDTO>>(answers);
            return answersDTO;
        }

        public void UpdateAnswer(AnswerDTO answerDto)
        {
            Answer answer = _repository.GetById(answerDto.Id);
            answer.Text = answerDto.Text;
            answer.Correct = answerDto.Correct;
            _repository.Update(answer);
        }
    }
}
