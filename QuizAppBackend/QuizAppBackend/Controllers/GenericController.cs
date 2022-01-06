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
    [Route("[controller]")]
    [ApiController]
    public class GenericController<T, DTO, S> : ControllerBase where DTO : EntityWithIdDTO 
        where S : ICRUDService<T, DTO> where T : EntityWithId
    {
        private S _service;

        public GenericController(S service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("all")]
        public IActionResult Get()
        {
            try
            {
                return Ok(_service.GetAll());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                return Ok(_service.GetById(id));
            } catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] DTO obj)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _service.Insert(obj);
                    return Ok(obj);
                }
                return BadRequest();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] DTO obj)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _service.Update(obj);
                    return Ok(obj);
                }
                return BadRequest();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }   

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _service.Delete(id);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
