using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using BCrypt.Net;

using TodoListApi.Models;
using TodoListApi.Data;

namespace TodoListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TodoContext _context;

        public AuthController(TodoContext context)
        {
            _context = context;
        }

        // Signup endpoint
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(User user)
        {
            // Check if the username or email already exists
            if (await _context.Users.AnyAsync(u => u.Username == user.Username || u.Email == user.Email))
            {
                return Conflict("Username or email already exists.");
            }

            
            // Hash the password before saving to database
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User signed up successfully.");
        }

       [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginModel.UsernameOrEmail || u.Email == loginModel.UsernameOrEmail);


            if (user == null || !BCrypt.Net.BCrypt.Verify(loginModel.Password, user.PasswordHash))
            {
                // Handle invalid username or password
                return BadRequest("Invalid username or password.");
            }

            // Authentication successful
            // Generate and return authentication token, set user session, etc.
            return Ok("Authentication successful.");
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
