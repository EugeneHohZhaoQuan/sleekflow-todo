using System;
using System.Collections.Generic;
using System.Linq;
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
    public class TodoControllerTests
    {
        [Fact]
        public async Task GetTodos_ReturnsOk_WithFilteredTodos()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TodoContext>()
                .UseInMemoryDatabase(databaseName: "Test_Db")
                .Options;
            using var context = new TodoContext(options);
            context.TodoItems.Add(new TodoItem { Id = 1, Name = "Todo 1", Description = "Description 1", DueDate = DateTime.Today, Status = "Pending" });
            context.TodoItems.Add(new TodoItem { Id = 2, Name = "Todo 2", Description = "Description 2", DueDate = DateTime.Today.AddDays(1), Status = "Completed" });
            context.SaveChanges();

            var controller = new TodoController(context);

            // Act
            var result = await controller.GetTodos(status: "Pending", dueDate: DateTime.Today, sortBy: "due-date", ascending: true) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            var todos = result.Value as List<TodoItem>;
            Assert.NotNull(todos);
            Assert.Single(todos);
            Assert.Equal("Todo 1", todos[0].Name);
        }

        [Fact]
        public async Task GetTodoItem_ReturnsNotFound_WhenTodoItemNotFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TodoContext>()
                .UseInMemoryDatabase(databaseName: "Test_Db")
                .Options;
            using var context = new TodoContext(options);
            var controller = new TodoController(context);

            // Act
            var result = await controller.GetTodoItem(id: 24167892868092956) as ActionResult<TodoItem>;

            // Assert
            Assert.NotNull(result);
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostTodoItem_ReturnsCreatedResponse()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TodoContext>()
                .UseInMemoryDatabase(databaseName: "Test_Db")
                .Options;
            using var context = new TodoContext(options);
            var controller = new TodoController(context);
            var newTodo = new TodoItem { Id = 4, Name = "New Todo", Description = "Description", DueDate = DateTime.Today, Status = "Pending" };

            // Act
            var result = await controller.PostTodoItem(newTodo) as ActionResult<TodoItem>;

            // Assert
            Assert.NotNull(result);
            Assert.IsType<CreatedAtActionResult>(result.Result);
        }

        // Additional test cases for PutTodoItem, DeleteTodoItem, etc. can be added similarly.
    }
}
