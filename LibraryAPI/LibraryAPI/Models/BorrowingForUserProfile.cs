namespace LibraryAPI
{
    public class BorrowingForUserProfile
    {
        public int ID { get; set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public DateTime DateOfBorrowing { get; set; }
        public DateTime? DateOfReturning { get; set; }
        

    }
}
