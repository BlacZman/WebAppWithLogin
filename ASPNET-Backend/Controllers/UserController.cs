using ASPNET_Backend.Interfaces;
using ASPNET_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASPNET_Backend.Controllers
{
    [Route("api/user")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _IUser;

        public UserController(IUser IUser)
        {
            _IUser = IUser;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserInfo>> Post(UserInfo user)
        {
            
            try
            {
                _IUser.AddUser(user);
            }
            catch (Exception)
            {
                if (UserExists(user.Email))
                {
                    return Forbid();
                }
                else
                {
                    throw;
                }
            }


            return await Task.FromResult(user);
        }

        // Get api/user/{email}
        [HttpGet("{email}")]
        public async Task<ActionResult<UserInfo>> Get(string email)
        {
            var user = await Task.FromResult(_IUser.GetUserDetails(email));
            if (user == null)
            {
                return NotFound();
            }

            // Identify claim, for the current user need to be equal
            if (!IsClaimValueEqual("Roles", "Administrator"))
            {
                if (!IsClaimValueEqual("Email", email))
                {
                    return Forbid();
                }
            }

            return user;
        }

        // PUT api/user/{email}
        [HttpPut("{email}")]
        public async Task<ActionResult<UserInfo>> Put(string email, UserInfo user)
        {
            if (email != user.Email)
            {
                return BadRequest();
            }
            try
            {
                // Identify claim, for the current user need to be equal
                if (!IsClaimValueEqual("Roles", "Administrator"))
                {
                    if (!IsClaimValueEqual("Email", email))
                    {
                        return Forbid();
                    }
                }

                _IUser.UpdateUser(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(email))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return await Task.FromResult(user);
        }

        // DELETE api/user/{email}
        [HttpDelete("{email}")]
        public async Task<ActionResult<UserInfo>> Delete(string email)
        {
            // Identify claim, for the current user need to be equal
            if (!IsClaimValueEqual("Roles", "Administrator"))
            {
                if (!IsClaimValueEqual("Email", email))
                {
                    return Forbid();
                }
            }

            var employee = _IUser.DeleteUser(email);
            return await Task.FromResult(employee);
        }

        private bool UserExists(string email)
        {
            return _IUser.CheckUser(email);
        }

        private bool IsClaimValueEqual(string claimType, string compareValue)
        {
            // Identify claim, for the current user need to be equal
            var identity = (System.Security.Claims.ClaimsIdentity) User.Identity;
            var claim = identity?.FindFirst(claimType);
            if (claim != null && claim.Value == compareValue)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
