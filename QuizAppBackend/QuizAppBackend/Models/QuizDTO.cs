using QuizAppBackend.Enums;
using QuizAppBackend.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Models
{
    public class QuizDTO : EntityWithIdDTO, IValidatableObject
    {
        [Required]
        public string Name { get; set; }

        public float Rating { get; set; }

        public int NbRating { get; set; }

        public virtual Status Status { get; set; }
        public string Password { get; set; }

        public virtual Category Category { get; set; }

        public virtual IEnumerable<QuestionDTO> Questions { get; set; }

        public virtual IEnumerable<PlayerDTO> Score { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var service = (IQuizService)validationContext.GetService(typeof(IQuizService));
            var existingQuizName = service.getByName(Name);
            var existingQuiz = service.GetById(Id);

            if (Password == null || Password == "")
            {
                yield return new ValidationResult("Veuillez entrez un mot de passe", new List<string>() { nameof(this.Password) });
            }

            if (existingQuizName != null && existingQuiz == null)
            {

                yield return new ValidationResult("Ce nom est déjà utilisé", new List<string>() { nameof(Name) });

            }
        }
    }
}
