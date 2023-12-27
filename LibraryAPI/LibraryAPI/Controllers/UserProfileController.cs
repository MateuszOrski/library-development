using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LibraryAPI
{
    [Route("user")]
    [ApiController]
    [Authorize(Roles = "1,2,3")]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;
       
        public UserProfileController(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        [HttpGet("user")]
  
        public async Task<ActionResult<UserModel>> GetUser()
        {
            string? userIDFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIDFromToken == null) return BadRequest();

            UserModel? user = await _userProfileService.GetUser(Convert.ToInt32(userIDFromToken));

            if (user == null) return BadRequest();

            return Ok(user);
        }


        [HttpGet("reservations/current/={login}")]
   
        public async Task<ActionResult<IAsyncEnumerable<ReservationForUserProfileModel>>> GetCurrentReservations([FromRoute] string login)
        {
            var reservations = await _userProfileService.GetCurrentReservations(login);

            return Ok(reservations);

        }

        [HttpGet("reservations/cancel/username={login}/reservation/id={idReservation}")]
      
        public async Task<IActionResult> CancelReservation([FromRoute] string login, int idReservation)
        {

            if (await _userProfileService.CancelReservation(login, idReservation) == false)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpGet("borrowings/current/username={userName}")]
        
        public async Task<ActionResult<IAsyncEnumerable<BorrowingForUserProfile>>> GetCurrentBorrowings([FromRoute] string userName)
        {
            string? userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            Int32.TryParse(userRole, out var idRole);
            if(idRole != 2 && idRole != 1)
            {
                string? userIDFromToken = User.FindFirst(ClaimTypes.Name)?.Value;
                if(userIDFromToken != userName)
                {

                    return BadRequest();

                }
            }
            
                var borrowings = await _userProfileService.GetCurrentBorrowings(userName);
                return Ok(borrowings);
         
        }

        [HttpGet("borrowings/history/username={userName}")]
     
        public async Task<ActionResult<IAsyncEnumerable<BorrowingForUserProfile>>> GetHisotryOfBorrowings([FromRoute] string userName)
        {


            var borrowings = await _userProfileService.GetHistoryOfBorrowings(userName);
            return Ok(borrowings);
        }

        [HttpDelete("reservation/delete/{id}")]

        public async Task<IActionResult> DeleteReservation([FromRoute]int id)
        {
            
            string? userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            int? idUser = null;
            Int32.TryParse(userRole, out var idRole);
            if (idRole != 2 && idRole != 3)
            {
               string userIDFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

               idUser =  Int32.Parse(userIDFromToken);
            }

          
            if (await _userProfileService.DeleteReservation(id, idUser) == false)
            {
                return NotFound();
            }


            return Ok();

        }
    }
}
