using System;
using System.Collections.Generic;
namespace Carousel.Tookit
{
    public  abstract  class BaseMonthReport
    {
        /// <summary>
        /// 重写这样方法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dicPars"></param>
        /// <returns></returns>
        public virtual T Render<T>(Dictionary<string,string> dicPars)
        {
            return default(T);
        }
    }
}