using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LibraryAPI
{
    [Route("home/details")]
    [ApiController]
    public class HomeDetailsController : ControllerBase
    {
        private readonly IHomeDetailsService _homeDetailsService;

        public HomeDetailsController(IHomeDetailsService homeDetailsService)
        {
            _homeDetailsService = homeDetailsService;
        }

        [HttpGet("book/id={IdBook}")]
        public async Task<ActionResult<BookDetailsModel>> GetBookDetails([FromRoute] int IdBook)
        {

            var book = await _homeDetailsService.GetBookDetails(IdBook);


            return Ok(book);
        }

       
        [HttpPost("reservation/add")]
        [Authorize(Roles = "1,2,3")]
        public async Task<IActionResult> AddNewReservation([FromBody] int idBook)
        {
            string? userIDFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
           


            if (userIDFromToken == null)
            {
                return BadRequest();
            }
            else
            {
                Int32.TryParse(userIDFromToken, out int idUser);

                if (await _homeDetailsService.AddNewReservation(idBook, idUser) == false)
                {
                    return BadRequest();
                }
                return Ok();
            }

           
        }
        
    }
}
