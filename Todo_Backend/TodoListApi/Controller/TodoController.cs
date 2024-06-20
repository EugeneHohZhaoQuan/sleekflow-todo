using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoListApi.Data;
using TodoListApi.Models;

namespace TodoListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        // {
        //     return await _context.TodoItems.ToListAsync();
        // }

        [HttpGet]
        public async Task<IActionResult> GetTodos(string status, DateTime? dueDate, string sortBy, bool ascending)
        {
            IQueryable<TodoItem> query = _context.TodoItems;

            if (!string.IsNullOrEmpty(status) && status.ToLower() != "all")
            {
                query = query.Where(todo => todo.Status == status);
            }

            if (dueDate.HasValue)
            {
                query = query.Where(todo => todo.DueDate.Date == dueDate.Value.Date);
            }

            query = sortBy switch
            {
                "due-date" => ascending ? query.OrderBy(todo => todo.DueDate) : query.OrderByDescending(todo => todo.DueDate),
                "name" => ascending ? query.OrderBy(todo => todo.Name) : query.OrderByDescending(todo => todo.Name),
                _ => query
            };

            var todos = await query.ToListAsync();

            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(long id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
