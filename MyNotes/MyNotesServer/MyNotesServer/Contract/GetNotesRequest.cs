namespace MyNotesServer.Contract
{
    public record GetNotesRequest(string? Search, string? SortItem, string? SortOrder);
    
}
