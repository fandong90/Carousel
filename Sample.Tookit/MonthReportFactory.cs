using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
namespace Carousel.Tookit
{
    public class MonthReportFactory
    {

        private string monthReportType;

        private string peroid;

        private MonthReportEnum emunType;

        private Dictionary<string, string> dic=new Dictionary<string, string> ();

        private List<Type> currentMapper=new List<Type>();
        public MonthReportFactory(string monthReportType,string peroid)
        {
            this.monthReportType = monthReportType;
            this.peroid = peroid;
        }
        public MonthReportFactory(string enumType)
        {
            this.emunType=(MonthReportEnum)Enum.Parse(typeof(MonthReportEnum), enumType);
        }

        /// <summary>
        /// 获取当前月报
        /// </summary>
        /// <returns></returns>
        public string GetCurrentMonthReport()
        {
            
            MonthReportEntity entity = new MonthReportEntity();
            entity.ID = Guid.NewGuid().ToString();
            entity.ReportTitle = "测试";
            entity.ReportType = "Expense";
            entity.Peroid = "201801";
            entity.MonthReportContentList = new List<MonthReportContentEntity>();
            for (var i = 0; i < 10; i++)
            {
                MonthReportContentEntity contentEntity = new MonthReportContentEntity();
                contentEntity.Id = Guid.NewGuid().ToString();
                contentEntity.SubjectId = entity.ID;
                contentEntity.NodeTitle = string.Format(@"测试第{0}节",i);
                contentEntity.NodeOrder = i;
                contentEntity.NodeParms = JsonConvert.SerializeObject(new { id = "haha", title = "aha",order=i});
                contentEntity.NodeParmsOrder = 10 - i;
                contentEntity.NodeComment =string.Format(@"我是评论{0}",i);
                contentEntity.NodeContentStyle = "ltf";
                contentEntity.NodeTitleStyle = "ltf";
                contentEntity.NodeCommentStyle = "ltf";
                contentEntity.CreateBy = "fandong";
                contentEntity.CreateDate = string.Format(@"20180{0}",i);
                entity.MonthReportContentList.Add(contentEntity);
            }
            
            var JsonStr=JsonConvert.SerializeObject(entity);
            return JsonStr;
        }

        //参数转成字典值
        public Dictionary<string,string> GetDictionary(string jsonStr)
        {
           return    JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonStr);
        }
        
        public T Action<T>(Dictionary<string,string> dic)
        {
            try
            {
                Type currentType = null;
                var assemblies = AppDomain.CurrentDomain.GetAssemblies();
                foreach (var assembly in assemblies)
                {
                    currentMapper.AddRange(assembly.GetTypes().Where(s => s.IsSubclassOf(typeof(BaseMonthReport))));
                }
                foreach(var type in currentMapper)
                {
                    var attribute = (CategoryAttribute)Attribute.GetCustomAttribute(type, typeof(CategoryAttribute));
                    if (attribute != null)
                    {
                        if (attribute.GetEnumType() == this.emunType)
                        {
                            currentType = type;
                            break;
                        }
                    }
                }
                BaseMonthReport map = (BaseMonthReport)currentType.Assembly.CreateInstance(currentType.FullName, true);
                return  map.Render<T>(dic);
               
            }catch(Exception ex)
            {
                throw new Exception("实例化", ex);
            }
           
        }
    }
}