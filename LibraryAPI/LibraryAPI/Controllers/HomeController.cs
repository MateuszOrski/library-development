using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI
{
    [Route("home")]
    [ApiController]
    public class HomeController : ControllerBase
    {

        private readonly IHomeService _homeService;


        public HomeController(IHomeService homeService, IMapper mapper)
        {
            _homeService = homeService;

        }


        [HttpGet,Route("page={page}/fetch={fetch}/category/id={catID}")]
        public async Task<ActionResult<IAsyncEnumerable<BookModel>>> GetBooks(int page, int fetch, int catID)
        {
            if (page >= 0 && fetch > 0 && catID >= 0)
            {
                var books = await _homeService.GetBooks(page, fetch, catID);
                return Ok(books);
            }
            else
            {
                return BadRequest();
            }


        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<CategoryModel>>> GetCategories()
        {

            var categories = await _homeService.GetCategories();
            return Ok(categories);
        }


        [HttpGet("page={page}/fetch={fetch}/category/id={catID}/search={searchString}")]
        public async Task<ActionResult<IAsyncEnumerable<BookModel>>> SearchBook([FromRoute] int page, int fetch, string searchString, int catID)
        {
            if (page >= 0 && fetch > 0 && catID >= 0)
            {
                var books = await _homeService.GetSearchBook(page, fetch, searchString, catID);

                return Ok(books);
            }
            else
            {
                return BadRequest();
            }
        }
        
    }
}
