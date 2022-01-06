using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizAppBackend.Models;
using QuizAppBackend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Controllers
{
    [Route("questions")]
    [ApiController]
    public class QuestionController : GenericController<Question, QuestionDTO, IQuestionService>
    {
        public QuestionController(IQuestionService service) : base(service)
        {
        }
    }
}
