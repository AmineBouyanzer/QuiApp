using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public interface ICRUDRepository<T> where T : EntityWithId
    {
        IEnumerable<T> GetAll();
        T GetById(Guid Id);
        void Insert(T obj);
        void Update(T obj);
        void Delete(Guid id);
    }
}
