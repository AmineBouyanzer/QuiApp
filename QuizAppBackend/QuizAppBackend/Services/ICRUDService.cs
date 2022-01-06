using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public interface ICRUDService<T, DTO> where T : EntityWithId
    {
        IEnumerable<DTO> GetAll();
        DTO GetById(Guid Id);
        void Insert(DTO obj);
        void Update(DTO obj);
        void Delete(Guid id);
    }
}
