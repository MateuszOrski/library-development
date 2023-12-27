using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{
    [Route("book")]
    [ApiController]
    [Authorize(Roles = "1,2")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet("authors")]
        public async Task<ActionResult<IAsyncEnumerable<AuthorModel>>> GetAuthors()
        {
            return Ok(await _bookService.GetAuthors());
        }

        [HttpGet("publishinghouses")]
        public async Task<ActionResult<IAsyncEnumerable<PublishingHouseModel>>> GetPublishingHouses()
        {
            return Ok(await _bookService.GetPublishingHouses());
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddBook([FromBody] BookAddModel newBook)
        {

            await _bookService.AddNewBook(newBook);

            return Ok();
        }

        [HttpPost("edit")]
        public async Task<IActionResult> UpdateBook(BookAddModel bookToUpdate)
        {
            if (await _bookService.UpdateBook(bookToUpdate) == false) return BadRequest();

            return Ok();
        }

        [HttpGet("delete/id={bookID}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int bookID)
        {
            if (await _bookService.DeleteBook(bookID) == false) return BadRequest();

            return Ok();
        }
    }
}
