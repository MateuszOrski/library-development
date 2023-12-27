using AutoMapper;
using LibraryDbAccess;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI
{
    public interface IHomeService
    {
        public Task<IQueryable<CategoryModel>> GetCategories();

        public Task<IQueryable<BookModel>> GetBooks(int pageNumber, int rowsToDispaly, int catID);
        public Task<IQueryable<BookModel>> GetSearchBook(int pageNumber, int rowsToDispaly, string searchString, int catID);



    }

    public class HomeServicecs : IHomeService
    {
        private readonly LibraryDBContext _libraryDBContext;
        private readonly IMapper _mapper;

     

        public HomeServicecs(LibraryDBContext libraryDBContext, IMapper mapper)
        {
            this._libraryDBContext = libraryDBContext;
            this._mapper = mapper;
        }

        public async Task<IQueryable<BookModel>> GetBooks(int pageNumber, int rowsToDisplay, int catID)
        {

            IQueryable<BookModel> books;

            int offSet = pageNumber * rowsToDisplay;

            if (catID != 0)
            {
               books = _libraryDBContext
                     .Books
                     .Where(x => x.IdCategory == catID)
                     .Join(_libraryDBContext.Authors,
                    b => b.IdAuthor,
                    a => a.Id,
                    (b, a) => new BookModel
                    {

                        ID = b.Id,
                        Title = b.Title,
                        Author = a.AuthorName

                    }
                    )
                     .Skip(offSet)
                     .Take(rowsToDisplay)
                     .AsQueryable();

                return books;
            }


            books = _libraryDBContext
                .Books
                .Join(_libraryDBContext.Authors,
                b => b.IdAuthor,
                a => a.Id,
                (b, a) => new BookModel
                {

                    ID = b.Id,
                    Title = b.Title,
                    Author = a.AuthorName

                }
                )
                 .Skip(offSet)
                 .Take(rowsToDisplay)
                 .AsQueryable();


                return books;
             
          



        }

        public async Task<IQueryable<CategoryModel>> GetCategories()
        {
            
           var categoriesFromDB =_mapper.Map<IEnumerable<CategoryModel>>( _libraryDBContext.Categories.AsQueryable());

    

            IQueryable<CategoryModel> categories = categoriesFromDB.AsQueryable();


            return categories;
        }

        public async Task<IQueryable<BookModel>> GetSearchBook(int pageNumber, int rowsToDisplay, string searchString, int catID)
        {

            IQueryable<BookModel> books;
            int offSet = pageNumber * rowsToDisplay;
            if (catID != 0)
            {
                books = _libraryDBContext
                     .Books
                     .Where(x => x.IdCategory == catID)
                     .Join(_libraryDBContext.Authors,
                    b => b.IdAuthor,
                    a => a.Id,
                    (b, a) => new BookModel
                    {

                        ID = b.Id,
                        Title = b.Title,
                        Author = a.AuthorName

                    }
                    )
                     .Where(x => x.Title.Contains(searchString) || x.Author.Contains(searchString))
                     .Skip(offSet)
                     .Take(rowsToDisplay)
                     .AsQueryable();

                return books;
            }
           
               books = _libraryDBContext
                 .Books
                 .Join(_libraryDBContext.Authors,
                 b => b.IdAuthor,
                 a => a.Id,
                 (b, a) => new BookModel
                 {

                     ID = b.Id,
                     Title = b.Title,
                     Author = a.AuthorName

                 }
                 )
                 .Where(x => x.Title.Contains(searchString) || x.Author.Contains(searchString))
                 .Skip(offSet)
                 .Take(rowsToDisplay)
                 .AsQueryable();

                return books;
         

           
        }
    }
}
