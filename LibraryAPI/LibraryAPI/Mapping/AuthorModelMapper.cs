using AutoMapper;

namespace LibraryAPI
{
    public class AuthorModelMapper : Profile
    {
        public AuthorModelMapper()
        {
            CreateMap<LibraryDbAccess.Author, AuthorModel>();
        }
    }
}
