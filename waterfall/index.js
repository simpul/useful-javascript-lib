//based on jQuery 
//基于jQuery语法

// 刷新或改变视窗大小的时候触发图片瀑布流排列 
//when refresh or change the size of the browser trigger the waterFall function
window.onload = window.onresize = function () {
    waterFall('#main', '.wrap');
}

//显示返回顶部按钮
//show the button uesd for scroll to the top of the webpage
window.onscroll = function () {
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (scroll >= 800) {
        $("#rocket").css("display", "block");
    } else {
        $("#rocket").css("display", "none");
    }
}

//返回顶部
//button uesd for scroll to top
$("#rocket").click(() => {
    $("body").animate({
        scrollTop: 0
    }, 500);
});

//打开详细窗口
//click the image and show details
$("#main .wrap img").click(function () {
    $("#mask").css("display", "block");
    $("#mask_bg").animate({
        opacity: 0.6
    }, 500);
    $("#mask_img").attr("src", $(this).attr("src"));
});

//关闭详细窗口
//close the detail window
$("#mask_cross").click(function () {
    $("#mask_bg")
        .animate({
            opacity: 0
        }, 100, function () {
            $("#mask").css("display", "none")
        });
});

//瀑布流布局函数
//waterFall function itself
function waterFall(parent, children) {
    var oWraps = $(children);
    var oWrapWeight = oWraps
        .get(0)
        .offsetWidth;
    //计算整个页面显示的列数
    //calculate the number of the colunms for layout
    var cols = Math.floor(document.documentElement.clientWidth * 0.9 / oWrapWeight);
    //找出高度最小的图片，将下一个图片放在下面 定义一个数组，存放每一列的高度，初始化存的是第一行的所有列的高度
    //set an Array to storage each column's height, then find out the column with minimum height and put the next image below it and update its height;
    var arrHeight = [];
    for (var i = 0; i < oWraps.length; i++) {
        if (i < cols) {
            oWraps
                .eq(i)
                .css({
                    "top": 0,
                    "left": i * oWrapWeight + 'px'
                });
            arrHeight.push(oWraps.get(i).offsetHeight);
        } else {
            var minHeight = Math
                .min
                .apply(null, arrHeight);
            var minIndex = arrHeight.indexOf(minHeight);
            oWraps
                .eq(i)
                .css({
                    "position": "absolute",
                    "top": minHeight + 'px',
                    "left": minIndex * oWrapWeight + 'px'
                });
            arrHeight[minIndex] += oWraps
                .get(i)
                .offsetHeight;
        }
    }
    //设置main的宽度，并且居中，高度设置为撑开所有内容的高+10px
    //set div#main 's height, in order to warp all the content(which is set position:absolute), here make 10px margin;
    $(parent).css({
        "width": oWrapWeight * cols,
        "margin": "0 auto",
        "height": Math
            .max
            .apply(null, arrHeight) + 10 + 'px'
    });
}