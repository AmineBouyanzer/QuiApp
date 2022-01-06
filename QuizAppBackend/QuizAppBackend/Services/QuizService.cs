using AutoMapper;
using QuizAppBackend.Enums;
using QuizAppBackend.Models;
using QuizAppBackend.Objects;
using QuizAppBackend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCryptNet = BCrypt.Net.BCrypt;

namespace QuizAppBackend.Services
{
    public class QuizService : CRUDService<Quiz, IQuizRepository, QuizDTO>, IQuizService
    {
        private readonly IQuizRepository _repository;
        private readonly IQuestionService _questionService;
        private readonly IAnswerService _serviceAnswer;
        private readonly IPlayerService _servicePlayer;
        private readonly IMapper _mapper;
        public QuizService(IQuizRepository repository, IMapper mapper, IQuestionService questionService, 
            IAnswerService serviceAnswer, IPlayerService servicePlayer) : base(repository, mapper)
        {
            _repository = repository;
            _questionService = questionService;
            _serviceAnswer = serviceAnswer;
            _servicePlayer = servicePlayer;
            _mapper = mapper;
        }

        public IEnumerable<QuizDTO> GetByStatus(Status status)
        {
            IEnumerable<Quiz> quizes = _repository.GetByStatus(status);
            IEnumerable<QuizDTO> quizesDTO = _mapper.Map<IEnumerable<QuizDTO>>(quizes);
            return quizesDTO;
        }

        public IEnumerable<QuizDTO> GetByCategory(Category category)
        {
            IEnumerable<Quiz> quizes = _repository.GetByCategory(category);
            IEnumerable<QuizDTO> quizesDTO = _mapper.Map<IEnumerable<QuizDTO>>(quizes);
            return quizesDTO;
        }


        public QuizDTO getByName(string name)
        {
            Quiz quiz = _repository.getByName(name);
            QuizDTO qDTO = _mapper.Map<QuizDTO>(quiz);
            return qDTO;
        }

        public new void Insert(QuizDTO quiz)
        {
            if (quiz == null) throw new ArgumentNullException("entity");

            string passwordHash = BCryptNet.HashPassword(quiz.Password, BCryptNet.GenerateSalt(12));
            quiz.Password = passwordHash;
            var q = _mapper.Map<Quiz>(quiz);
            _repository.Insert(q);
        }


        public QuizDTO GetCascadeQuizById(Guid quizId)
        {
            QuizDTO quiz = GetById(quizId);
            IEnumerable<QuestionDTO> questions = _questionService.GetByQuiz(quizId);
            if (questions != null && questions.Count() > 0)
            {
                foreach (var q in questions)
                {
                    Guid id = q.Id;
                    q.Answers = _serviceAnswer.GetByQuestion(id).ToList();
                }
                quiz.Questions = questions;
                IEnumerable<PlayerDTO> score = _servicePlayer.GetByQuiz(quizId);
                quiz.Score = score;
            }
            return quiz;
        }

        public bool Rating(Rating rating)
        {
            QuizDTO quiz = GetCascadeQuizById(rating.Id);

            if (quiz == null)
            {
                return false;
            }
            float note = ((quiz.Rating * quiz.NbRating) + rating.Rate) / (quiz.NbRating + 1);
            quiz.NbRating++;
            quiz.Rating = note;
            UpdateQuizOnCascade(rating.Id, quiz);
            return true;
        } 

        public int VerifyPassword(Unlock mdp)
        {
            QuizDTO quiz = GetById(mdp.Id);

            if (quiz == null)
            {
                return -1;
            }

            bool verified = BCryptNet.Verify(mdp.Password, quiz.Password);
            if (!verified)
            {
                return 0;
            }
            return 1;
        }

        public QuizDTO UpdateQuizOnCascade(Guid id, QuizDTO quiz)
        {
            Quiz quizz = _repository.GetById(id);
            quizz.Name = quiz.Name;
            quizz.NbRating = quiz.NbRating;
            quizz.Rating = quiz.Rating;
            quizz.Category = quiz.Category;
            quizz.Status = quiz.Status;
            if(quizz.Password == quiz.Password)
            {
                quizz.Password = quiz.Password;
            } else
            {
                string passwordHash = BCryptNet.HashPassword(quiz.Password, BCryptNet.GenerateSalt(12));
                quizz.Password = passwordHash;
            }
            
            IEnumerable<QuestionDTO> questionList = _questionService.GetByQuiz(id);
            IEnumerable<PlayerDTO> scoreList = _servicePlayer.GetByQuiz(id);


            foreach (QuestionDTO question in questionList)
            {
                var isIn = false;
                foreach (QuestionDTO question1 in quiz.Questions)
                {
                    if (_questionService.GetById(question1.Id) == null)
                    {
                        question1.QuizId = question.QuizId;
                        _questionService.Insert(question1);
                    }else
                    {
                        if(question.Id == question1.Id)
                        {
                            _questionService.updateQuestion(question1);
                            isIn = true;
                        }
     
                    }
                }
                if (!isIn)
                {
                    _questionService.Delete(question.Id);
                }
            }

            foreach (PlayerDTO playerDTO1 in quiz.Score)
            {
                if (_servicePlayer.GetById(playerDTO1.Id) == null)
                {
                    playerDTO1.QuizId = id;
                    _servicePlayer.Insert(playerDTO1);
                }

            }

            _repository.Update(quizz);
            return quiz;
        }
    }
}
