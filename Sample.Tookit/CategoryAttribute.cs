using System;

namespace Carousel.Tookit
{
    [System.AttributeUsage(AttributeTargets.Class,AllowMultiple =true)]
    public class CategoryAttribute:Attribute
    {
        private string name;

        private MonthReportEnum enumType;
        public CategoryAttribute(string name,MonthReportEnum enumType)
        {
            this.name = name;
            this.enumType = enumType;
        }

        /// <summary>
        /// 获取名字    
        /// </summary>
        /// <returns></returns>
        public string GetName()
        {
            return this.name;
        }

        /// <summary>
        /// 获取枚举类型
        /// </summary>
        /// <returns></returns>
        public MonthReportEnum GetEnumType()
        {
            return this.enumType;
        }
    }
}