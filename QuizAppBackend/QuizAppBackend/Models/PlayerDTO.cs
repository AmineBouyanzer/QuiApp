using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Models
{
    public class PlayerDTO : EntityWithIdDTO
    {
        public string Name { get; set; }

        public int Result { get; set; }

        public Guid QuizId { get; set; }
    }
}
