namespace LibraryAPI
{
    public class UserBorrowingModel
    {

        public int Id { get; set; }
        public string FristName { get; set; }
        public string LastName { get; set;}
        public string Title {get; set;}
        public string Author { get; set;}
        public DateTime DateOfBorrowing { get; set; }
        public DateTime? DateOfReturning { get; set; }


    }
}
