using AutoMapper;
using LibraryDbAccess;

namespace LibraryAPI
{
    public interface IBookService
    {
        public Task<bool> AddNewBook(BookAddModel newBook);
        public Task<bool> UpdateBook(BookAddModel bookToUpdate);
        public Task<bool> DeleteBook(int bookID);
        public Task<IQueryable<AuthorModel>> GetAuthors();
        public Task<IQueryable<PublishingHouseModel>> GetPublishingHouses();
    }

    public class BookService : IBookService
    {

        private readonly LibraryDBContext _libraryDBContext;
        private readonly IMapper _mapper;

        public BookService(LibraryDBContext libraryDBContext, IMapper mapper)
        {
            _libraryDBContext = libraryDBContext;
            _mapper = mapper;
        }

        public async Task<bool> AddNewBook(BookAddModel newBook)
        {
            Book bookDbModel = new Book();


            bookDbModel.Title = newBook.Title;
            bookDbModel.BookDescription = newBook.Description;
            bookDbModel.IdAuthor = newBook.AuthorID;
            bookDbModel.IdCategory = newBook.CategoryID;
            bookDbModel.IdPublishingHouse = newBook.PublishingHouseID;
            bookDbModel.YearOfPublishment = newBook.YearOfPublishment;
            bookDbModel.Quantity = newBook.Quantity;

            _libraryDBContext.Add(bookDbModel);
            if (_libraryDBContext.SaveChanges() == 0) return false;

            return true;
        }

        public async Task<bool> UpdateBook(BookAddModel bookToEdit)
        {

            Book bookDbModel = new Book();

            if (bookToEdit.BookId == null) return false;

            bookDbModel.Id = (int)bookToEdit.BookId;
            bookDbModel.Title = bookToEdit.Title;
            bookDbModel.BookDescription = bookToEdit.Description;
            bookDbModel.IdAuthor = bookToEdit.AuthorID;
            bookDbModel.IdCategory = bookToEdit.CategoryID;
            bookDbModel.IdPublishingHouse = bookToEdit.PublishingHouseID;
            bookDbModel.YearOfPublishment = bookToEdit.YearOfPublishment;
            bookDbModel.Quantity = bookToEdit.Quantity;

            _libraryDBContext.Update(bookDbModel);
            _libraryDBContext.SaveChanges();

            return true;
        }


        public async Task<bool> DeleteBook(int bookID)
        {
            Book? bookToDelete = _libraryDBContext.Books.Where(book => book.Id == bookID).FirstOrDefault();

            if (bookToDelete == null || bookToDelete.Quantity == 0) return false;

            bookToDelete.Quantity = 0;

            _libraryDBContext.Update(bookToDelete);
            _libraryDBContext.SaveChanges();

            return true;
        }

        public async Task<IQueryable<AuthorModel>> GetAuthors()
        {
            var authorsFromDB = _mapper.Map<IEnumerable<AuthorModel>>(_libraryDBContext.Authors.AsQueryable());

            IQueryable<AuthorModel> authors = authorsFromDB.AsQueryable();

            return authors;

        }

        public async Task<IQueryable<PublishingHouseModel>> GetPublishingHouses()
        {
            var pbFromDB = _mapper.Map<IEnumerable<PublishingHouseModel>>(_libraryDBContext.PublishingHouses.AsQueryable());
            
            IQueryable<PublishingHouseModel> publishingHouses = pbFromDB.AsQueryable();

            return publishingHouses;
        }
    }
}
