using System.ComponentModel.DataAnnotations;

namespace LibraryAPI
{ 
    public class RegistrationModel
    {

        public string UserName { get; set; }
        public string FisrtName { get; set; }
        public string LastName { get; set; }
     
        public string Password { get; set; }
 
        public string Email { get; set; }
      
    }
}
