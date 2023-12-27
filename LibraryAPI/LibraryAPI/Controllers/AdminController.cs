using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI
{
    [Route("admin")]
    [ApiController]
    [Authorize(Roles = "1")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("account/roles/{userID}/{roleID}")]
        public async Task<IActionResult> ChangeUserRole([FromRoute] int userID, int roleID)
        {
            try
            {
                await _adminService.ChangeUserRole(userID, roleID);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet("account/status/{userID}/{accountStatus}")]
        public async Task<IActionResult> ChangeUserAccountStatus([FromRoute] int userID, bool accountStatus)
        {
            try
            {
               await _adminService.ChangeAccountStatus(userID, accountStatus);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

    }
}
