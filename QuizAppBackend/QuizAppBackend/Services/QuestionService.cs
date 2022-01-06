using AutoMapper;
using QuizAppBackend.Models;
using QuizAppBackend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public class QuestionService : CRUDService<Question, IQuestionRepository, QuestionDTO>, IQuestionService
    {
        private readonly IQuestionRepository _repository;
        private readonly IAnswerService _serviceAnswer;
        private readonly IMapper _mapper;
        public QuestionService(IQuestionRepository repository, IAnswerService serviceAnswer, IMapper mapper) : base(repository, mapper)
        {
            _repository = repository;
            _serviceAnswer = serviceAnswer;
            _mapper = mapper;
        }
        public IEnumerable<QuestionDTO> GetByQuiz(Guid idQuiz)
        {
            IEnumerable<Question> questions = _repository.GetByQuiz(idQuiz);
            IEnumerable<QuestionDTO> questionsDTO = _mapper.Map<IEnumerable<QuestionDTO>>(questions);
            return questionsDTO;
        }

        public void updateQuestion(QuestionDTO questionDTO)
        {
          
            Question question = _repository.GetById(questionDTO.Id);
            question.Type = questionDTO.Type;
            question.question = questionDTO.question;
            IEnumerable<AnswerDTO> answerList = _serviceAnswer.GetByQuestion(questionDTO.Id);
            foreach (AnswerDTO answer in answerList)
            {
                var isIn = false;
                foreach(AnswerDTO answer1 in questionDTO.Answers)
                {
                    if(_serviceAnswer.GetById(answer1.Id) == null)
                    {
                        answer1.QuestionId = answer.QuestionId;
                        _serviceAnswer.Insert(answer1);
                    }else
                    {
                        if(answer.Id == answer1.Id)
                        {
                            System.Diagnostics.Debug.WriteLine("answer");
                            _serviceAnswer.UpdateAnswer(answer1);
                            isIn = true;
                        }
                    }
                }
                if(!isIn)
                {
                    _serviceAnswer.Delete(answer.Id);
                }
            }
            _repository.Update(question);
        }
    }
}
