using System;
using System.Collections.Generic;
namespace Carousel.Tookit
{
    public class MonthReportEntity
    {
        /// <summary>
        /// 月报标题
        /// </summary>
        public string ReportTitle { get; set; }

        /// <summary>
        /// 月报时间
        /// </summary>
        public string Peroid { get; set; }

        /// <summary>
        /// 期次内容
        /// </summary>
        public List<MonthReportContentEntity> MonthReportContentList { get; set; }

        /// <summary>
        /// 报告类型
        /// </summary>
        public string ReportType { get; set; }

        /// <summary>
        /// 期次的ID
        /// </summary>
        public string ID { get; set; }
    }
}