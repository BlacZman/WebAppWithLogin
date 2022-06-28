using ASPNET_Backend.Interfaces;
using ASPNET_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPNET_Backend.Scripts.Database
{
    public class UserDatabase : IUser
    {
        readonly DatabaseContext _dbContext = new();

        public UserDatabase(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddUser(UserInfo user)
        {
            try
            {
                _dbContext.UserInfos.Add(user);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void UpdateUser(UserInfo user)
        {
            try
            {
                _dbContext.Entry(user).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public UserInfo DeleteUser(string email)
        {
            try
            {
                UserInfo? user = _dbContext.UserInfos.Find(email);

                if (user != null)
                {
                    _dbContext.UserInfos.Remove(user);
                    _dbContext.SaveChanges();
                    return user;
                }
                else
                {
                    throw new ArgumentNullException();
                }
            }
            catch
            {
                throw;
            }
        }

        public bool CheckUser(string email)
        {
            return _dbContext.UserInfos.Any(e => e.Email == email);
        }

        public UserInfo GetUserDetails(string email)
        {
            try
            {
                UserInfo? user = _dbContext.UserInfos.Find(email);
                return user;
            }
            catch
            {
                throw;
            }
        }
    }
}
