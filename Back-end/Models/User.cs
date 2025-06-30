using Microsoft.AspNetCore.Identity;

namespace AuthBackend.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;
    }
}