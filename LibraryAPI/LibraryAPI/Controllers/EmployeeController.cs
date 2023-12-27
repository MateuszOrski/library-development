using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LibraryAPI
{
    [Route("employee")]
    [ApiController]
    [Authorize(Roles = "1,2")]

    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("search={searchString}")]
     
        public async Task<ActionResult<IAsyncEnumerable<UserModel>>> SearchUserAsync([FromRoute] string searchString)
        {

           var user = await _employeeService.SearchUser(searchString);

            return Ok(user);
        }

        [HttpPost("borrowing/add")]
 
        public async Task<IActionResult> AddNewBorrowing([FromBody]NewBorrowingModel newBorrowingModel)
        {
            string? userIDFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
          
            Int32.TryParse(userIDFromToken, out int idEmployee);

            if (await _employeeService.AddNewBorrowing(newBorrowingModel, idEmployee) == false)
            {
                return BadRequest();
            }
            return Ok();

        }

       
        [HttpGet("borrowing/update/id={idBorrowing}")]


        public async Task<IActionResult> UpdateBorrowing([FromRoute]int idBorrowing)
        {

            string? idEmployee = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Int32.TryParse(idEmployee, out int employeeID);

            if (await _employeeService.UpdateBorrowing(idBorrowing, employeeID) == false)
            {
                return NotFound();
            }


            return Ok();

        }



     

      

    }
}
