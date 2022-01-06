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
    [Route("player")]
    [ApiController]
    public class PlayerController : GenericController<Player, PlayerDTO, IPlayerService>
    {
        public PlayerController(IPlayerService service) : base(service)
        {

        }
    }
}
