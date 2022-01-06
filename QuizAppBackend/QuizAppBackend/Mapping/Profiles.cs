using AutoMapper;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Mapping
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Quiz, QuizDTO>().ReverseMap();
            CreateMap<Question, QuestionDTO>().ReverseMap();
            CreateMap<Answer, AnswerDTO>().ReverseMap();
            CreateMap<Player, PlayerDTO>().ReverseMap();
        }
    }
}
