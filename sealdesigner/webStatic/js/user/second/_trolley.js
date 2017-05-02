$(function(){
    look();
    $.cookie("page",1);       //默认当前页数为1
    if ($("#comeFrom").val()=="12345"){//form shoppingcart list in
    document.getElementById("change").style.display="inline"
    document.getElementById("goB").style.display="inline"
    document.getElementById("editB").style.display="inline"

    }

    if ($("#orderState").val()=="")//come from trolley
       {
         $("#changeback").css("display","none")
       }
    else if ($("#orderState").val()=="-1")//order need change
    {
     $("#sure,#goB").css("display","none")

     $("#editB,#change,#changeback").css("display","inline")
    }
    //order dont to change
    else
    {
     $("#editB,#change,#sure,#goB,#changeback").css("display","none")
    }
})

/*进入购物车商品详情页面*/
var heightA="";
var heightB="";
function look(){
    var trolleyId=$("#trolleyId").val();
    $.post("../ShoppingCart/getMateClass",{"trolleyId":$("#trolleyId").val()},function(data){
        var jsonData = $.parseJSON(data);
        var MateClass=jsonData.class;
        var Company=jsonData.company;
        var userDataId=jsonData.userDataId;
        $("#companyId").val(Company);
        $("#userDataId").val(userDataId);
        $("#mateClass").val(MateClass);
        //判断商品父类为其他时改变详情页布局
        if(MateClass==3){
            var companyA=document.getElementById("companyA");
            var fontNameA=document.getElementById("fontNameA");
            var troDeLeft_down=document.getElementById("troDeLeft_down");
            var troDeLeft=document.getElementById("troDeLeft");
            var troDeRight_affix=document.getElementById("troDeRight_affix");
            var troDeRight_down=document.getElementById("troDeRight_down");
            var trolleyDetail=document.getElementById("trolleyDetail");
            companyA.style.display="none";
            fontNameA.style.display="none";
            troDeLeft_downA.style.display="none";
            troDeLeft.style.height="403px";
            troDeRight_affix.style.display="none";
            troDeRight_down.style.height="50px";
            trolleyDetail.style.height="403px";
        }
        //判断商品为个人章时改变详情页页面布局
        if(MateClass==1){
            var companyA=document.getElementById("companyA");
            var trolleyDetail=document.getElementById("trolleyDetail");
            var troDeRight_down=document.getElementById("troDeRight_down");
            var troDeRight_affix=document.getElementById("troDeRight_affix");
            trolleyDetail.style.height="500px";
            troDeRight_down.style.height="130px";
            companyA.style.display="none";
            troDeRight_affix.style.display="none";
        }

        //获取购物车商品详细信息
        $.post("materialMinuteInfo",{"trolleyId":trolleyId,"mateClass":MateClass},function(data){
            var jsonData=$.parseJSON(data);
            var str="";
            str+="<div><img src="+jsonData.picture+"  style='width:200px;height:150px;display:block;margin:auto'></div><div style='margin-top:5px;'><span style='margin-left:200px'>商品示例图</span></div>"
            $("#picture").empty().append(str);
            if(MateClass==1||MateClass==2){//若为章
                var str=""
                str+="<div><img src="+jsonData.samplePictureUrl+"  style='width:200px;height:200px;display:block;margin:auto'></div><div style='margin-top:5px;'><span style='margin-left:200px'>商品版式</span></div>"
                $("#samplePicture").empty().append(str);
            }
            document.getElementById('materialName').innerHTML = jsonData.materialName;
            document.getElementById('sealClass').innerHTML = jsonData.sealClass;
            document.getElementById('materialIntroduction').innerHTML = jsonData.materialIntroduction;
            document.getElementById('colorName').innerHTML = jsonData.colorName;
            document.getElementById('fontName').innerHTML = jsonData.fontName;
            document.getElementById('number').innerHTML = jsonData.number;
            document.getElementById('price').innerHTML = jsonData.price;
            document.getElementById('amount').innerHTML = jsonData.amount;
            document.getElementById('company').innerHTML = jsonData.company;
            $("#materialId").val(jsonData.materialId);
            $("#colorNames").val(jsonData.colorName);
            $("#colorId").val(jsonData.colorId);
            $("#fontNames").val(jsonData.fontName);
            console.log(jsonData.fontId)
            $("#fontId").val(jsonData.fontId);
            var companyStatementStr=""/*首次刻章的上传*/
            for(i=0,dataIndex=0;i<jsonData.LenDataType;dataIndex++,i++){
                dataTypeName="dataType"+dataIndex;
                dataTypeId="dataTypeId"+dataIndex;
                upLoadData="fupLoadData"+dataIndex;
                isUpload="isUpload"+dataIndex;
                if (jsonData[isUpload]==1){
                    value=("重新上传")
                    var change="<input type='button' name='uploadButton' value='修改' style='float:right;' />"
                }
                else
                    value=("上传");
                companyStatementStr+="<input type='text' class='dataTypeId hidden' /><li id="+jsonData[dataTypeId]+jsonData[upLoadData]+" class='proof'>"+jsonData[dataTypeName]+"<input type='button' name='uploadButton' value='"+value+"' style='float:right;' />";
                companyStatementStr+="<input type='file' class='uploadFile hidden' style='float:right;' /></li>";
                $(".companyProof").empty().append(companyStatementStr);

            }

            var companyStatementStr=""/*声明的上传*/
            for(i=0,stateDataIndex=0;i<jsonData.lenStateDataType;stateDataIndex++,i++){
                dataTypeName="stateDataType"+stateDataIndex;
                dataTypeId="stateDataTypeId"+stateDataIndex;
                upLoadData="supLoadData"+stateDataIndex;
                stateIsUpload="stateIsUpload"+stateDataIndex;
                  if (jsonData[stateIsUpload]==1){
                    value=("重新上传");
                    var change="<input type='button' name='uploadButton' value='修改' style='float:right;' />";
                }
                else
                    value=("上传");
                companyStatementStr+="<input type='text' class='dataTypeId hidden' /><li id="+jsonData[dataTypeId]+jsonData[upLoadData]+" class='proof'>"+jsonData[dataTypeName]+"<input type='button' name='uploadButton' value='"+value+"' style='float:right;' />";
                companyStatementStr+="<input type='file' class='uploadFile hidden' /></li>";
                $(".resharpenProof").empty().append(companyStatementStr);
            }
            if(MateClass==2){
                heightA=document.getElementById("companyProof").offsetHeight;
                heightB=document.getElementById("resharpenProof").offsetHeight;
                var height=heightA+heightB;
                var troDeRight_down=document.getElementById("troDeRight_down");
                troDeRight_down.style.height=height+120+'px';
            }

            var inFor="";
            var changeInfo="";
            /*版式配置信息*/
            for (i=0,contentIndex=0;i<jsonData.leninformationContent;contentIndex++,i++){
                contentInfoId="informationContent"+contentIndex;
                informationContentName="informationContentName"+contentIndex;
                informationContentID="informationContentID"+contentIndex;
                inFor+="<div 'float:right;'>"+jsonData[informationContentName]+" : "+jsonData[contentInfoId]+"</div></br>";
                changeInfo+="<span>"+jsonData[informationContentName]+" :"+"</span>"+"<input type='text'class='num' value="+jsonData[contentInfoId]+" name="+jsonData[informationContentID]+" >"+"</br>"
            }
            $("#inFor").append(inFor);
            $("#inForChange").append(changeInfo);
        })
    })
}

$("body").on("click","input[name='uploadButton']",function(){
	var dataTypeId=$(this).parent(".proof").attr("id");        //li的id
	$(".proof").prev(".dataTypeId").attr("value",dataTypeId);   //li的id赋给.dataType
});
$("body").on("click","input[name='uploadButton']",function(){
	$(this).next(".uploadFile").click();  //上传按钮紧邻的下一个按钮
});

$("body").on("change",".uploadFile",function(){  //change事件时向后台传文件

	$(".uploadFile").removeAttr("name");           //去除所有的uploadFile的name
	$(this).attr("name","file");                  //给点击的上传按钮追加name
	$(".dataTypeId").removeAttr("name");          //去除所有的uploadFile的name
	$(this).parent(".proof").prev(".dataTypeId").attr("name","dataTypeId");         //给.dataType按钮追加name
	var file = $(this).val();
	if(/.(gif|jpg|jpeg|png|gif|jpg|png|doc|docx|pdf|txt)$/.test(file)){
        uploadFile();
        $(this).prev("input[name='uploadButton']").attr("value","重新上传");
	}
	else{
		alert("文件格式不正确，请上传docx或pdf或text格式文件！");
		return;
	}
});


//上传文件（企业出示证明和重刻原因证明）
function uploadFile(){
    $("#seal_form").attr("action","/ShoppingCart/ShoppingUploadFile");
	$.ajaxSetup({
          async : false,
    });
	$("#seal_form").ajaxSubmit({           //ajax异步表单提交
		async : false,
		resetForm:false,
		dataType:'html',                    //html而不是json
		success:function(data){            //jquery版本高于1.3时，dataType不是严谨的json，不执行success
			$("#userDataId").attr("value",data);
			alert("上传成功!");
			location.reload()
		},
		error: function(e) {
			alert("上传失败!");
		}
	});
}

/*点击右部分修改修改相关信息*/
function editB(){
    if ($("#orderState").val()=="-1")
       document.getElementById("sure").style.display="none"
    else
       document.getElementById("sure").style.display="inline"
    var colorName=document.getElementById("colorName");
    var colorNameB=document.getElementById("colorNameB");
    var fontName=document.getElementById("fontName");
    var fontNameB=document.getElementById("fontNameB");
    var number=document.getElementById("number");
    var numberB=document.getElementById("numberB");
    colorName.style.display="none";
    colorNameB.style.display="";
    fontName.style.display="none";
    fontNameB.style.display="";
    number.style.display="none";
    numberB.style.display="";
    color();
    font();
    if($("#mateClass").val()==2){
        document.getElementById("numberB").style.display="none"
        number.style.display="inline";
    }
}

/*点击修改后获取各项可修改下拉列表*/
function color(){      //颜色
    colorNames= $("#colorNames").val()
    colorId=$("#colorId").val()
    var str = "<option   selected='selected' value="+colorId+" id="+colorId+">"+colorNames+"</option>"
    $.post("/Seal/colorColor",{materialId:$("#materialId").val()},function(data){
        var jsonData = $.parseJSON(data);
        var i=0;
        times=jsonData.times;
        for (time=1;time<=times;time++){
            var colorIndex = "color"+time;
            var colorNameIndex="colorName"+time;
            str+="<option value='"+jsonData[colorIndex]+"'>"+jsonData[colorNameIndex]+"</option>";
        }
        $("#colorNameB").empty().append(str);
    })
}
function font(){      //字体
    var fontStr = "<option   selected='selected'   value="+$("#fontId").val()+" >"+$("#fontNames").val()+"</option>"
    $.post("../ShoppingCart/getSealInfo",{"sealId":$("#materialId").val()},function(data){
        var jsonData = $.parseJSON(data);
        for(var i in jsonData){
            for (var fontOne in jsonData[i].font){
				fontStr +="<option value="+fontOne+">"+jsonData[i]["font"][fontOne]+"</option>";
			}
        }
        $("#fontNameB").empty().append(fontStr);
    })
}


/*详情页面数量增减效果*/
$("#bookNum").keypress(function(b){
    var keyCode = b.keyCode ? b.keyCode : b.charCode;
    if (keyCode != 0 && (keyCode < 48 || keyCode > 57) && keyCode != 8 && keyCode != 37 && keyCode != 39) {
        return false;
    }
    else{
        return true;
    }
})
.keyup(function(e){
    var keyCode = e.keyCode ? e.keyCode : e.charCode;
    console.log(keyCode);
    if (keyCode != 8){
        var numVal = parseInt($("#bookNum").val()) || 0;
        numVal = numVal < 1 ? 1 : numVal;
        $("#bookNum").val(numVal);
    }
})
.blur(function(){
    var numVal = parseInt($("#bookNum").val()) || 0;
    numVal = numVal < 1 ? 1 : numVal;
    $("#bookNum").val(numVal);
});
//增加
$("#add").click(function(){
    var num = parseInt($("#bookNum").val()) || 0;
    $("#bookNum").val(num + 1);
    var price=document.getElementById('price').innerHTML;
    var amount=(num+1)*price;
    document.getElementById('amount').innerHTML = amount;
});
//减去
$("#sub").click(function(){
    var num = parseInt($("#bookNum").val()) || 0;
    num = num - 1;
    num = num < 1 ? 1 : num;
    $("#bookNum").val(num);
    var price=document.getElementById('price').innerHTML;
    var amount=num*price;
    document.getElementById('amount').innerHTML = amount;
});

//版式信息改变
$("#change").click(function(){
    document.getElementById("inForChange").style.display="block";
    document.getElementById("inFor").style.display="none";
    if ($("#orderState").val()=="-1")
       document.getElementById("sure").style.display="none"
    else
       document.getElementById("sure").style.display="inline"

})


//修改购物车
$("#sure,#changeback").click(function(){
    if ($("#mateClass").val()==3)//如果为其他类
       {if (colorName.style.display=="none")//如果发生修改行为
         {
         $.post("../ShoppingCart/changeOfShoppingCart",{"sealClass":"3","trolleyId":$("#trolleyId").val(),"number":$("#bookNum").val(),"colorId":$("#colorNameB").val(),"orderStatus":$("#orderState").val()},
                function(data){
                    if (data==1){
                            if ($("#orderState").val()=="-1")
                               {alert("提交成功")
                               location.reload();}
                            else
                               { alert("修改成功")
                               window.location='../ShoppingCart/trolley'}
                    }
                    else {
                    alert("提交失败")}
                }
           )
           }
        else{window.location='../Users/trolley'}
        }
    else  if($("#mateClass").val()==1||$("#mateClass").val()==2){//1为个人章，2为公章
        var num = $(".num")
        length=num.length
        var str=""
        for (i=0;i<length;i++){
            val=num.eq(i).val()
            id=num.eq(i).attr("name")
            str+=val+","+id+","
        }
        $.ajaxSetup({
            async : false
        });
        $.post("../ShoppingCart/changeOfShoppingCart",{"trolleyId":$("#trolleyId").val(),"sealNum":$("#bookNum").val(),"sealClass":$("#mateClass").val(),"fontId":$("#fontNameB").val(),"orderStatus":$("#orderState").val(),"colorId":$("#colorNameB").val(),"num":length,str},function(data){
            if (data==1){
                if ($("#orderState").val()=="-1")
                       {
                        alert("提交成功")
                       location.reload();
                       }
                else
                   {alert("修改成功")
                   window.location='../ShoppingCart/trolley'}
                     }
            else
                alert("提交失败")
        });
    }

})

/*详情页下单功能*/
$("#goB").on("click","",function(){
    if ($("#mateClass").val()==3)//如果为其他类
        if (colorName.style.display=="none")//如果发生修改行为
            $.post("../ShoppingCart/changeOfShoppingCart",{"sealClass":"3","trolleyId":$("#trolleyId").val(),"number":$("#bookNum").val(),"colorId":$("#colorNameB").val()},
                function(data){
                    if (data==1){
                        alert("修改成功")
                        window.location='../Users/trolley'
                        location.reload();
                    }
                    else {alert("修改失败")}
                }
           )
        else{window.location='../Users/trolley'}
    else  if($("#mateClass").val()==1||$("#mateClass").val()==2){//1为个人章，2为公章
        var num = $(".num")
        length=num.length
        var str=""
        for (i=0;i<length;i++){
            val=num.eq(i).val()
            id=num.eq(i).attr("name")
            str+=val+","+id+","
        }
        $.ajaxSetup({
            async : false
        });
        $.post("../ShoppingCart/changeOfShoppingCart",{"trolleyId":$("#trolleyId").val(),"sealNum":$("#bookNum").val(),"sealClass":$("#mateClass").val(),"fontId":$("#fontNameB").val(),"colorId":$("#colorNameB").val(),"num":length,str},function(data){
          if (data==1){
//                alert("在data=1这里停住了")
            }
        else
        { alert("修改失败")
            window.location="../Users/trolley"}
        });
    }
    var s=document.getElementById("trolleyId").value;
    var a=document.getElementById("mateClass").value;
    if(a==1||a==3){   //商品是个人章和其他类时直接下单
        window.location.href="/ShoppingCart/submitOrder?trollerId="+s;
    }
    if(a==2){   //商品为公章时判断附件是否全部上传
        $.post("../ShoppingCart/dataIsUpload",{"trolleyId":s,"mateClass":2},function(data){
            var jsonData=$.parseJSON(data);
            var val=0;
            $.each(jsonData, function (name, value) {
                val+= parseInt(value)
            })
            if(val>0)
                alert("所选商品上传资料不全，缺少"+val+"个附件，请先将资料上传完整")
            else
                window.location.href="/ShoppingCart/submitOrder?trollerId="+s;
            window.event.returnValue = false;
        })
    }
})