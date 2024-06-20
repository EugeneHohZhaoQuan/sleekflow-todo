using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using TodoListApi.Controllers;
using TodoListApi.Data;
using TodoListApi.Models;
using Xunit;

namespace TodoListApi.Tests
{
    public class AuthControllerTests
    {
        [Fact]
        public async Task SignUp_ReturnsConflict_WhenUsernameExists()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TodoContext>()
                .UseInMemoryDatabase(databaseName: "Test_Db")
                .Options;
            using var context = new TodoContext(options);
            context.Users.Add(new User { Id = 6, Username = "existingUser", Email = "test@example.com", PasswordHash = "hashedPassword", Password = "password" });
            context.SaveChanges();

            var controller = new AuthController(context);

            // Act
            var result = await controller.SignUp(new User { Id = 2, Username = "existingUser", Email = "new@example.com", PasswordHash = "hashedPassword", Password = "password" }) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(409, result.StatusCode);
            Assert.Equal("Username or email already exists.", result.Value);
        }

        [Fact]
        public async Task SignUp_ReturnsOk_WhenUserCreated()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TodoContext>()
                .UseInMemoryDatabase(databaseName: "Test_Db")
                .Options;
            using var context = new TodoContext(options);
            var controller = new AuthController(context);

            // Act
            var result = await controller.SignUp(new User { Id = 9, Username = "newUser", Email = "new@example.com", PasswordHash = "hashedPassword", Password = "password" }) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal("User signed up successfully.", result.Value);
        }

        [Fact]
        public async Task Login_ReturnsBadRequest_WhenInvalidCredentials()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TodoContext>()
                .UseInMemoryDatabase(databaseName: "Test_Db")
                .Options;
            using var context = new TodoContext(options);
            context.Users.Add(new User { Id = 7, Username = "testUser", Email = "test@example.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"), Password = "password" });
            context.SaveChanges();

            var controller = new AuthController(context);

            // Act
            var result = await controller.Login(new LoginModel { UsernameOrEmail = "testUser", Password = "wrongPassword" }) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode);
            Assert.Equal("Invalid username or password.", result.Value);
        }

        [Fact]
        public async Task Login_ReturnsOk_WhenValidCredentials()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TodoContext>()
                .UseInMemoryDatabase(databaseName: "Test_Db")
                .Options;
            using var context = new TodoContext(options);
            context.Users.Add(new User { Id = 1, Username = "testUser", Email = "test@example.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"), Password = "password" });
            context.SaveChanges();

            var controller = new AuthController(context);

            // Act
            var result = await controller.Login(new LoginModel { UsernameOrEmail = "testUser", Password = "password" }) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal("Authentication successful.", result.Value);
        }
    }
}
