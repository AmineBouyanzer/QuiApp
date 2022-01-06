using AutoMapper;
using QuizAppBackend.Models;
using QuizAppBackend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Services
{
    public class CRUDService<T, U, DTO> : ICRUDService<T, DTO> where T : EntityWithId
        where U : ICRUDRepository<T> where DTO : EntityWithIdDTO
    {
        private readonly U _CRUDRepository;
        private readonly IMapper _mapper;

        public CRUDService(U CRUDRepository, IMapper mapper)
        {
            _CRUDRepository = CRUDRepository;
            _mapper = mapper;
        }
        public IEnumerable<DTO> GetAll()
        {
            var q = _CRUDRepository.GetAll();
            IEnumerable<DTO> qDTO = _mapper.Map<IEnumerable<DTO>>(q);
            return qDTO;
        }

        public DTO GetById(Guid Id)
        {
            var q = _CRUDRepository.GetById(Id);
            if (q == null)
            {
                return null;
            }
            DTO qDTO = _mapper.Map<DTO>(q);
            return qDTO;
        }

        public void Insert(DTO obj)
        {
            if (obj == null) throw new ArgumentNullException("entity");

            T q = _mapper.Map<T>(obj);
            _CRUDRepository.Insert(q);
        }

        public void Update(DTO obj)
        {
            if (obj == null) throw new ArgumentNullException("entity");

            var q = _mapper.Map<T>(obj);
            _CRUDRepository.Update(q);
        }

        public void Delete(Guid id)
        {
            if (id == Guid.Empty) throw new ArgumentNullException("entity");

            _CRUDRepository.Delete(id);
        }
    }
}
