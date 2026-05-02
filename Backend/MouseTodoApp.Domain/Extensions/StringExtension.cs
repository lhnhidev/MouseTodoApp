using MouseTodoApp.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Extensions
{
    internal static class StringExtension
    {
        public static string ThrowIfNullOrEmpty(this string value, string paramName)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new InvalidValueException(paramName);
            }
            return value.Trim();
        }
    }
}
