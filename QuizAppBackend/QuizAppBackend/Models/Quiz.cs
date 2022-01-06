using QuizAppBackend.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Models
{
    public class Quiz : EntityWithId
    {
        public string Name { get; set; }
        public Status Status { get; set; }
        public string Password { get; set; }

        public float Rating { get; set; }

        public int NbRating { get; set; }
        public virtual Category Category { get; set; }

        public virtual IEnumerable<Question> Questions { get; set; }

        public virtual IEnumerable<Player> Score { get; set; }
    }
}
