$(function(){
onMouseOver();
})


//首页轮播展示图片
$(function(){
    $.post("/ShoppingCart/indexPicture",function(data){
        var jsonData=$.parseJSON(data);
        for(var i in jsonData){
            $(".picture").eq(i).attr("src",jsonData[i].picUrl);
        }
    })
})

//领取优惠劵
$("body").on("click",".indexPrivilege",function(){
    var privilegeTypeId = $(this).attr("id");
    $.post("/ShoppingCart/privilege",{"privilegeTypeId":privilegeTypeId},function(data){
        if(data==4){
            alert("请先登录再领取优惠劵！");
        }
        else if(data==1){
            alert("优惠劵领取成功！");
        }
        else if(data==2){
            alert("优惠劵已领取完！");
        }
        else if(data==3){
            alert("该优惠券已经领取！")
        }
        else{
            alert("优惠劵领取失败！")
        }
    })
})


///*鼠标放置到商品出 出现遮罩蒙层效果*/
function onMouseOver(){
$("body").on("mouseenter",".seal_img_box",function(){
    $(this).children("a").children("div .span").css("display","block");
    $(this).children("a").children("div .mask-layer").css("display","block");
})

$("body").on("mouseleave",".seal_img_box",function(){
    $(this).children("a").children("div .span").css("display","none");
    $(this).children("a").children("div .mask-layer").css("display","none");
})
}

