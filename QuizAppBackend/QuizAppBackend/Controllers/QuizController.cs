using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizAppBackend.Enums;
using QuizAppBackend.Models;
using QuizAppBackend.Objects;
using QuizAppBackend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Controllers
{
    [Route("quiz")]
    [ApiController]
    public class QuizController : GenericController<Quiz, QuizDTO, IQuizService>
    {
        private readonly IQuizService _service;
        public QuizController(IQuizService service) : base(service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("categories/all")]
        public IActionResult GetAllCategories()
        {
            try
            {
                return Ok(Enum.GetNames(typeof(Category)));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("status/{status}")]
        public IActionResult GetByStatus(Status status)
        {
            try
            {
                return Ok(_service.GetByStatus(status));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("category/{category}")]
        public IActionResult GetByCategory(Category category)
        {
            try
            {
                return Ok(_service.GetByCategory(category));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("details/{quizId}")]
        public IActionResult GetCascadeQuizById(Guid quizId)
        {
            try
            {
                if (_service.GetById(quizId) == null)
                {
                    return NotFound();
                }
                return Ok(_service.GetCascadeQuizById(quizId));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("unlock")]
        public IActionResult UnlockQuiz(Unlock unlock)
        {
            try
            {
                int q = _service.VerifyPassword(unlock);
                if (q == -1)
                {
                    return NotFound("Quiz not found");
                } else if (q == 0)
                {
                    return BadRequest("Mot de passe incorrect");
                }
                return Ok(_service.GetCascadeQuizById(unlock.Id));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("rating")]
        public IActionResult Rating(Rating unlock)
        {
            try
            {
                bool b = _service.Rating(unlock);
                if (!b)
                {
                    return NotFound("Quiz not found");
                }
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPut]
        [Route("update/{id:Guid}")]
        public IActionResult Update(Guid id, [FromBody] QuizDTO quizz)
        {
            try
            {
                if (_service.GetById(id) == null)
                {
                    return NotFound();
                }
                if (ModelState.IsValid)
                {
                    return Ok(_service.UpdateQuizOnCascade(id, quizz));
                }
                return BadRequest();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
