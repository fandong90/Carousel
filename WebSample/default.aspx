<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="WebSample._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="Scripts/jquery-3.3.1.js"></script>
    <script src="Scripts/fdCarousel/Carousel.js"></script>
    <link href="Scripts/fdCarousel/Carousel.css" rel="stylesheet" />
</head>
<body  style="overflow:hidden;">
    <form id="form1" runat="server">
        <div id="carousel" class="fd-Carousel">
        </div>
    </form>
    <script type="text/javascript">
        $(function () {
            $("#carousel").Carousel({
                url: '../webService/WebService1.asmx/GetCurrentMonthReport', data:'monthReportType=Expense&peroid=201801',carouselStyle:'ltr' });
        });
       
    </script>
</body>
</html>
