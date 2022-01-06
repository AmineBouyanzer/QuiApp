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
    [Route("answer")]
    [ApiController]
    public class AnswerController : GenericController<Answer, AnswerDTO, IAnswerService>
    {
        public AnswerController(IAnswerService service) : base(service)
        {

        }
    }
}
