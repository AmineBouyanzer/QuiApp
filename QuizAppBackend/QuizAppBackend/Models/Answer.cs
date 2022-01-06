using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Models
{
    public class Answer : EntityWithId
    {
        public string Text { get; set; }

        public bool Correct { get; set; }

        public Guid QuestionId { get; set; }
    }
}
