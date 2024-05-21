using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotesServer.Contract;
using MyNotesServer.DataAccess;
using MyNotesServer.Model;
using System.Linq.Expressions;

namespace MyNotesServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly NoteDbContext _dbContext;
        public NoteController(NoteDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateNoteRequest request, CancellationToken ct)
        {
            var note = new Note(request.Title, request.Description);
            await _dbContext.Notes.AddAsync(note, ct);
            await _dbContext.SaveChangesAsync(ct);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
        {
            var notesQuery = _dbContext.Notes
                .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                            n.Title.ToLower().Contains(request.Search.ToLower()));

            Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
            {
                "date" => note => note.CreatedAt,
                "title" => note => note.Title,
                _ => note => note.Id
            };

            notesQuery = request.SortOrder == "desc"
                ? notesQuery.OrderByDescending(selectorKey)
                : notesQuery.OrderBy(selectorKey);

            var noteDtos = await notesQuery
                .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
                .ToListAsync(cancellationToken: ct);

            return Ok(new GetNoteResponse(noteDtos));
        }
    }
}
