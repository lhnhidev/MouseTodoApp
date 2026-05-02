using MouseTodoApp.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Extensions
{
    internal static class DateTimeExtension
    {
        public static DateTime ThrowIfPastDate(this DateTime value, string paramName)
        {
            if (value < DateTime.Now)
            {
                throw new InvalidDateTime(paramName);
            }
            return value;
        }

        public static DateTime ThrowIfAfterTheTimeline(this DateTime value, DateTime timeLine, string paramName)
        {
            if (value < timeLine)
            {
                throw new InvalidDateTime(paramName);
            }
            return value;
        }
    }
}
