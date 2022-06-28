namespace ASPNET_Backend.Models
{
    public class UserInfo
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? TelephoneNumber { get; set; }
        // 1: Male, 2: Female, 3: NoInfo
        public int Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
