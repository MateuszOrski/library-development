using AutoMapper;

namespace LibraryAPI.Mapping
{
    public class PublishingHouseMapper : Profile
    {
        public PublishingHouseMapper()
        {
            CreateMap<LibraryDbAccess.PublishingHouse, PublishingHouseModel>();
        }
    }
}
