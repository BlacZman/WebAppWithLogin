﻿using System.Security.Cryptography;
using System.Text;

namespace ASPNET_Backend.Scripts
{
    public class Hash
    {
        public static String sha256_hash(string value)
        {
            StringBuilder Sb = new StringBuilder();
            using (var hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (byte b in result)
                    Sb.Append(b.ToString("x2"));
            }
            return Sb.ToString();
        }
    }
}
