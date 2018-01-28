using System;
namespace Carousel.Tookit
{
    public class MonthReportContentEntity
    {
        public string Id { get; set; }

        public string SubjectId { get; set; }

        public string NodeTitle { get; set; }

        public int  NodeOrder { get; set; }

        public string NodeType { get; set; }

        public string  NodeParms { get; set; }

        public int NodeParmsOrder { get; set; }

        public string NodeComment { get; set; }

        public string NodeContentStyle { get; set; }

        public string NodeTitleStyle { get; set; }

        public string NodeCommentStyle { get; set; }

        public string CreateBy { get; set; }

        public string CreateDate { get; set; }
    }
}