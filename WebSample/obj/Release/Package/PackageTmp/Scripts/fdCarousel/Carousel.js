(function ($) {
    /*
    * @author fandong 2018/01/28
    * example: $("#id").Carousel({url;'',carouselStyle:'rtl2d'});
    */
    var defaults = {
        url: '',
        data:'',
        carouselStyle: '',
        loadTableUrl: '',
        loadChartUrl:'',
        speed:1000 //默认加载速度为1s加载完成
    };
    
    var Plugin = function (element, options) {
        this.$element = element;
        this.options = options;
        this.currentIndex = 0;//默认开始索引；
        this.preIndex = 0;
        this.successArray = [];//加载成功存到此数组中
        this.nodeOrders = [];//ppt加载顺序
        this.nodeParmsOrder = [];//ppt 单页的顺序加载
    }


    Plugin.prototype = {
        
        render: function () {
            console.log(this.options.url + " " + this.options.carouselStyle);
            //序列化列表
            var data = JSON.parse(this.asyncData());
            //在后台排好序
            debugger;
            var contentArray = data.MonthReportContentList;
            for (var i = 0; i < contentArray.length; i++) {
                if(this.nodeOrders.indexOf(contentArray[i].NodeOrder) < 0) {
                    this.nodeOrders.push(contentArray[i].NodeOrder);
                } 
            }
            var pageCount = this.nodeOrders.length;
            //加载数据默认加载当前页和当前页周围的
            var boxUlJq = $("<ul>").addClass("box").attr("id","ul_inner").css({ 'width': (this.options.clientWidth) * pageCount + "px", 'height': this.options.clientHeight + "px" });
            this.$element.append(boxUlJq);
            for (var i = 0; i < pageCount; i++) {
                var boxliJq = $("<li>").addClass("sub").attr("id",'ul_inner_'+i).css({'width':(this.options.clientWidth-4) + "px", 'height':(this.options.clientHeight-4) + 'px'});
                boxliJq.text("第" + i + "页");
                boxUlJq.append(boxliJq);
            }
            for (var i = 0; i < pageCount; i++) {
                if (i >= 2) {
                    break;
                } else {
                    //获取相同序号的图片
                    var tempArr = [];
                    for (var j = 0; j < contentArray.length; j++) {
                        if (this.nodeOrders.indexOf(contentArray[i].NodeOrder) > -1) {
                            tempArr.push(contentArray[i]);
                        }
                    }
                    tempArr = tempArr.sort(function (obj1, obj2) { return obj1.NodeParmsOrder - obj2.NodeParmsOrder; });
                    for (var j = 0; j < tempArr.length; j++) {
                        
                    }
                }
            }
            this.bindEvent(this);
            return this.$element;
        },
        asyncData: function () {
             //获取月报的期次
            var tempStr = '';
            $.ajax({
                url: this.options.url,
                type:'post',
                async: false,
                data:this.options.data,
                dataType: 'xml',
                error: function (jqXHR,textStatus,errorThrown) {
                },
                success: function (data, textStatus, jqXHR) {
                    tempStr = $(data).text();
                }
            });
            return tempStr;
        },
        next: function () {
            this.preIndex = this.currentIndex;
            this.currentIndex = this.currentIndex + 1;
            console.log(this.options.clientWidth * this.currentIndex + " " + this.currentIndex);
            if (this.currentIndex > this.nodeOrders.length - 1) {
                this.currentIndex = 0;
            }
            $("#ul_inner").css({ "transform": 'translateX('+(-1*this.currentIndex*this.options.clientWidth)+'px)'});
        },
        prev: function () {
            this.preIndex = this.currentIndex;
            this.currentIndex = this.currentIndex-1;
            console.log("prevPage" + this.preIndex + " currentPage" + this.currentIndex);
            if (this.currentIndex > this.nodeOrders.length - 1) {
                this.currentIndex = 0
            } else {
                if (this.currentIndex < 0) {
                    this.currentIndex = this.nodeOrders.length - 1;
                }
            }
            $("#ul_inner").css({ "transform": 'translateX(' + (-1 * this.currentIndex * this.options.clientWidth) + 'px)' });
        },
        navigation: function (page) {
            //如果导航的页，是当前页什么也不做。
            if (page == this.currentIndex) {
                return;
            } else {
                this.preIndex = this.currentIndex;
                this.currentIndex =page;
                console.log("prevPage" + this.preIndex + " currentPage" + this.currentIndex);
            }
        },
        bindEvent: function () {
            console.log("开始绑定事件");
            var $this = this;
            //键盘事件
            window.document.onkeyup=function (event) {
                var e = event || window.event;
                switch (e.keyCode) {
                    case 37:$this.prev(); break;
                    case 38:$this.prev(); break;
                    case 39:$this.next(); break;
                    case 40:$this.next(); break;
                }
            };
            //鼠标滚轮事件绑定
            window.document.onmousewheel = function (event) {
                var e = event || window.event;
                if (e.wheelDelta > 0) {
                    $this.prev();
                } else {
                    $this.next();
                }
                console.log(e.wheelDelta);
            }
        },
        loadTableData: function (item,nodeOrder,nodeParmsOrder) {
            var objJq = $("#" + item);
            //系统加载函数;
            $.ajax({
                url: '',
                type: 'post',
                async: true,
                data:'',
                dataType: 'html',
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                },
                success: function (data, textStatus, jqXHR) {
                    objJq.append($(data));
                    this.nodeParmsOrder({ nodeOrder: nodeOrder, nodeParmOrders: nodeParmsOrder });
                }
            });

        },
        loadChartData: function (item) {
            //系统加载函数
            var objJq = $("#" + item);
            //系统加载函数;
            $.ajax({
                url: '',
                type: 'post',
                async: false,
                data: '',
                dataType: 'html',
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                },
                success: function (data, textStatus, jqXHR) {
                    objJq.append($(data));
                    this.nodeParmsOrder({ nodeOrder: nodeOrder, nodeParmOrders: nodeParmsOrder });
                }
            });

        }
    }
    //滑边的显示位置；
    var SlidePlugin = function (element, options,plugin) {
        this.$element = element;
        this.options = options;
        this.mainPlugin = plugin;
    }

    SlidePlugin.prototype = {
        draw: function () {
            var $MainPlugin = this.mainPlugin;
            switch (this.options.carouselStyle) {
                case "ltr":
                    var leftSliderJq = $("<div>").addClass("slider-left").css({ top: this.options.clientHeight / 2 + 'px' });
                    var rightSliderJq = $("<div>").addClass("slider-right").css({ top: this.options.clientHeight / 2 + 'px' });
                    this.$element.append(leftSliderJq);
                    this.$element.append(rightSliderJq);
                    leftSliderJq.text("上一页");
                    rightSliderJq.text("下一页");
                    leftSliderJq.bind("click", function () {
                        $MainPlugin.prev();
                    });
                    rightSliderJq.bind("click", function () {
                        $MainPlugin.next();
                    })
                    break;
                case "ttd":
                    var topSliderJq = $("<div>").addClass("slider-top").css({ top: this.options.clientWidth / 2 + 'px' });
                    var downSliderJq = $("<div>").addClass("slider-down").css({ top: this.options.clientWidth / 2 + 'px' });
                    this.$element.append(topSliderJq);
                    this.$element.append(downSliderJq);
                    topSliderJq.text("上一页");
                    downSliderJq.text("下一页");
                    topSliderJq.bind("click", function () {
                        $MainPlugin.prev();
                    });
                    downSliderJq.bind("click", function () {
                        $MainPlugin.next();
                    })
                    break;
            }
            return this.$element;
        }
    }

    var CarouselStylePlugin = function (element, options) {
        this.element = element;
        this.options = options;
    }



    $.fn.Carousel = function (options) {
        var setting = $.extend(true, {}, defaults, options);
        var documentWidth = document.documentElement.clientWidth;
        var documentHeight = document.documentElement.clientHeight;
        setting.clientHeight = documentHeight;
        setting.clientWidth = documentWidth;
        return this.each(function () {
            var $this = $(this);
            $this.css({height:documentHeight+"px"});
            var plugin = new Plugin($this, setting);
            $this=plugin.render();
            var slidePlugin = new SlidePlugin($this, setting, plugin);
            $this= slidePlugin.draw();

        });
    }

    
})(jQuery || window);