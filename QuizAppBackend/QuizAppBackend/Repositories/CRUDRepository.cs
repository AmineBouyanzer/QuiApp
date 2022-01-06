using Microsoft.EntityFrameworkCore;
using QuizAppBackend.Context;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Repositories
{
    public class CRUDRepository<T> : ICRUDRepository<T> where T : EntityWithId
    {
        //internal AppDbContext _context;
        private readonly AppDbContext _context;

        public CRUDRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }
        public T GetById(Guid id)
        {
            return _context.Set<T>().Find(id);
        }
        public void Insert(T obj)
        {
            _context.Set<T>().Add(obj);
            _context.SaveChanges();
        }
        public void Update(T obj)
        {
            _context.Entry(obj).State = EntityState.Modified;

            _context.SaveChanges();

            /*var entry = _context.Set<T>().FirstOrDefault(e => e.Id.Equals(obj.Id));
            _context.Entry(entry).CurrentValues.SetValues(obj);*/

            /*T existing = _context.Set<T>().Find(obj.Id);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(obj);
     
            }
*/
        }
        public void Delete(Guid id)
        {
            T existing = _context.Set<T>().Find(id);
            System.Diagnostics.Debug.WriteLine(existing);
            _context.Set<T>().Remove(existing);
            _context.SaveChanges();
        }
    }
}
