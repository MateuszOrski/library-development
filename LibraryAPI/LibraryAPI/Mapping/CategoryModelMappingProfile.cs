using AutoMapper;

namespace LibraryAPI
{
    public class CategoryModelMappingProfile : Profile
    {
        public CategoryModelMappingProfile()
        {

            CreateMap<LibraryDbAccess.Category, CategoryModel>().ForMember(c => c.Name, x => x.MapFrom(y => y.CategoryName));
            
        }
    }
}
