using LibraryDbAccess;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace LibraryAPI
{
    public interface IAccountService
    {
        public  Task Registration(RegistrationModel registration);
        public Task<LoginResponse> Login(LoginModel login);
      

    }

    public class AccountService : IAccountService
    {
        private readonly LibraryDBContext _libraryDBContext;

        private readonly AuthenticationSettings _authenticationSettings;

        public AccountService(LibraryDBContext context, AuthenticationSettings _authenticationSettings)
        {
            _libraryDBContext = context;
         
            this._authenticationSettings = _authenticationSettings;
        }


        public async Task Registration(RegistrationModel registration) 
        {
            User user = new User();
            
            user.UserName = registration.UserName;
            user.FirstName = registration.FisrtName;
            user.LastName = registration.LastName;
            user.Passwd = BCrypt.Net.BCrypt.HashPassword(registration.Password);
            user.Email = registration.Email;
            user.IdRole = 3;
            user.IsActive = false;


            _libraryDBContext.Users.Add(user);
            _libraryDBContext.SaveChanges();

        }

        public async Task<LoginResponse> Login(LoginModel login)
        {
            LoginResponse response = new LoginResponse();
            
            response.token = GenerateJwt(login);
            response.UserName = login.UserName;
            int id = _libraryDBContext.Users.Where(u => u.UserName == login.UserName).Select(x => x.IdRole) .FirstOrDefault();
            response.roleID = id;

            return response;
        }


        private string GenerateJwt(LoginModel login)
        {
            var user = _libraryDBContext.Users.FirstOrDefault(x => x.UserName == login.UserName);

            if(user == null)
            {
                throw new SomeException("Invalid user name or password");
            }

           
            bool verified = BCrypt.Net.BCrypt.Verify(login.Password, user.Passwd);


            if (verified == false)
            {
                throw new SomeException("Invalid user name or password");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName), 
                new Claim(ClaimTypes.Role, user.IdRole.ToString())
            };

         
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);

        }



    }
}
