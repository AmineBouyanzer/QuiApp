using QuizAppBackend.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Models
{
    public class Question : EntityWithId
    {
        public string question { get; set; }
        public virtual QuestionType Type { get; set; }

        public virtual IEnumerable<Answer> Answers { get; set; }

        public Guid QuizId { get; set; }
    }
}
