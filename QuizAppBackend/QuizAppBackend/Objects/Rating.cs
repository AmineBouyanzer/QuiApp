using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Objects
{
    public class Rating
    {
        public Guid  Id { get; set; }

        public int Rate { get; set; }
    }
}
