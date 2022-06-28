using ASPNET_Backend.Models;

namespace ASPNET_Backend.Interfaces
{
    public interface IUser
    {
        public void AddUser(UserInfo user);
        public UserInfo GetUserDetails(string email);
        public void UpdateUser(UserInfo user);
        public UserInfo DeleteUser(string email);
        public bool CheckUser(string email);
    }
}
