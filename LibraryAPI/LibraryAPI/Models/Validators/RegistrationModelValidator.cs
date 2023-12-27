using FluentValidation;
using LibraryDbAccess;

namespace LibraryAPI
{
    public class RegistrationModelValidator : AbstractValidator<RegistrationModel>
    {
        public RegistrationModelValidator(LibraryDBContext dBContext)
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(30);

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .MaximumLength(30);

            RuleFor(x => x.Password).MinimumLength(8);

           

            RuleFor(x => x.UserName)
                .Custom((value, context)=>
                {
                   var userNameInUse =  dBContext.Users.Any(u => u.UserName == value);
                    if(userNameInUse)
                    {
                        context.AddFailure("UserName ", "That user name is taken");
                    }
                });

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    var userEmailInUse = dBContext.Users.Any(u => u.Email == value);
                    if(userEmailInUse)
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });
        }
    }
}
