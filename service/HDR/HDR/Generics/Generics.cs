using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Generics
{
    public static class Generics
    {
        public static bool IsNullOrEmpty(this string str)
        {
            return str == null || str == "";
        }

        public static bool IsNull(this object obj)
        {
            return obj == null;
        }
    }
}
