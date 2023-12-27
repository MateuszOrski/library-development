using LibraryDbAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IAccountService accountService, ILogger<AccountController> logger)
        {
            this._accountService = accountService;
            this._logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegistrationModel registration)
        {
            try
            {
                await _accountService.Registration(registration);

                return Ok();
            }
            catch (Exception ex)
            {
               // _logger.LogInformation("Example !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

                    throw new SomeException(ex.Message);
            }

            
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginModel login)
        {

            LoginResponse loginResponse = await _accountService.Login(login);
            
            return Ok(loginResponse);
        }
    }
}
