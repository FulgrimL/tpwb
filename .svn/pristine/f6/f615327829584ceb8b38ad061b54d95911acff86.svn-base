/**
 * Created by THREESONG_XXX on 2017/6/15 0015.
 */
var prdTypeId = getUrlParam("prdTypeId");//card.js/955行植入
var signal_VALIDDATE ;
/*var create_date_plus = function(t,h,r,e,s){
    if(prdTypeId == '16' || signal_VALIDDATE == '16'){
        if(s == '1') {
            mui("body").on("tap", "#" + t, function () {
                 picker.dispose();
            })
            $('#' + t).attr('readonly', 'true');
        }
        $('#'+t).val(h);
        var resStr = changeValue(r,e);
        var endDate = document.getElementById(r);
        endDate.value = resStr;
    }
}*/
var create_date_plus = function(t,h,r,e,s){
    var valueStr = h;
    var arr1 = valueStr.split(",");
    var fnName = arr1[0];//--->@setDate
    if(prdTypeId == '16' || signal_VALIDDATE == '16') {
        if (fnName.indexOf("@") == -1) {
            if (s == '1') {
                mui("body").on("tap", "#" + t, function () {
                    picker.dispose();
                })
                $('#' + t).attr('readonly', 'true');
            }
            $('#' + t).val(h);
            var resStr = changeValue(r, e);
            var endDate = document.getElementById(r);
            endDate.value = resStr;
        }
    }
}
//gobackpage()调用
function check_back_status(){
    var check_signal = getUrlParam("prdTypeId");
    var Max = 0;
    var input = [];
    var tt = $("#curPage");
    if(check_signal == "16" || signal_VALIDDATE == '16'){
        //nextPageflag = true;
        //调用轮询检查是否为空方法
        $.each(productJson, function(k,v) {
            if(v.modelType == "nextPage"){
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k,v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn,function(k,v){
                        if(v.notNull == "Y"){
                            Max++;
                            console.log(Max)
                            var textValue = getSingleTextValue(v.keyName,v.type);
                            if(textValue != ""){
                                console.log(v.keyText+"不能为空");
                                //$("#"+v.keyName).parent().next(".tip").text(v.keyText+"不能为空").show();
                                input.push(textValue);
                                //nextPageflag = false;
                                //mui.alert('请填写完整的信息!');
                            }
                        }
                    });
                });
            }
        });
        if(input.length < Max && input.length > 1){
            mui.alert('请填写完整的信息!');
            //nextPageflag = false;
        }else if(input.length == 1 || input.length == Max){
            var btnArray = ['是', '否'];
            mui.confirm('是否返回？', '提示', btnArray, function(e) {
                if(e.index == 0) {
                    var c = tt.html();
                    var backDiv = $("#" + c).attr("last-page");
                    changePage(c, backDiv, 'last');
                }
            });
        }
    }else{
        var btnArray = ['是', '否'];
        mui.confirm('是否返回？', '提示', btnArray, function(e) {
            if(e.index == 0) {
                var c = tt.html();
                var backDiv = $("#" + c).attr("last-page");
                changePage(c, backDiv, 'last');
            } else {}
        });
    }
}

function check_to_fit(){
    if(prdTypeId =='16' || signal_VALIDDATE == '16'){
       submitJson = [];
    }
}

//植入补全提示框
function init_auto_complete(t,s) {
    if (t.readOnly == 0 || t.readOnly == undefined) {
        if (t.keyName == 'SCHOOL') {
            s += '<input type="text" placeholder="' + t.placeHolder + '" class="" id="' + t.keyName + '" value="' + showValue(t.value) + '"><div id="manual_auto_complete" class="xpx_invis"><ul></ul></div>';
        } else {
            s += '<input type="text" placeholder="' + t.placeHolder + '" class="" id="' + t.keyName + '" value="' + showValue(t.value) + '">';
        }
    } else if (t.readOnly == 1) {
        if (t.keyName == 'SCHOOL') {
            s += '<input type="text" placeholder="' + t.placeHolder + '" id="' + t.keyName + '" readonly="readonly" value="' + showValue(t.value) + '"><div id="manual_auto_complete" class="xpx_invis"><ul></ul></div>';
        } else {
            s += '<input type="text" placeholder="' + t.placeHolder + '" id="' + t.keyName + '" readonly="readonly" value="' + showValue(t.value) + '">';
        }
    }
    return s
}

function insert_init_schoolpicker(t){
    if (t.keyName == 'SCHOOL') {
        init_schoolpicker()
    }
}
//学校辅助输入
function init_schoolpicker(x){
    //var temp;
    //$$.parseUrlQuery(x).region != undefined?temp=$$.parseUrlQuery(x).region:temp='""';
    var string = '';
    var temp_array = [];
        $('#SCHOOL').bind('input', function() {
        //$('#SCHOOL').on('change',function(){
           var query = $(this).val();
           $('#manual_auto_complete ul li').remove();
           if (query != '') {
               $.ajax({
                   url: 'http://picclife.bxt189.com/gskd/xpx/selectSchool',
                   method: 'POST',
                   contentType: 'application/json',
                   //data:'{"schoolName":"'+query+'","region":'+temp+'}',
                   data: '{"schoolName":"' + query + '","region":""}',
                   success: function (data) {
                       temp_array = [];
                       string = '';
                       //data = JSON.parse(data);
                       var res = data.data;
                       console.log(res.length);
                       if (res.length > 0) {
                           $('#manual_auto_complete').removeClass('xpx_invis');
                           for (var i = 0; i < res.length; i++) {
                               if (res[i].schoolName.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                                   temp_array.push(res[i].schoolName)
                               }
                           }
                           console.log(temp_array);
                           $('#manual_auto_complete ul li').remove();
                           for (var i = 0; i < temp_array.length; i++) {
                               string += '<li onclick="response_test(this)">' + temp_array[i] + '</li>';
                           }
                           $('#manual_auto_complete').find('ul').append(string);
                           $('#SCHOOL').parent('div').css('overflow', 'visible');
                       } else {
                           $('#manual_auto_complete').addClass('xpx_invis');
                           $('#SCHOOL').parent('div').css('overflow', 'hidden');
                       }
                   }
               });
           } else {
               $('#manual_auto_complete').addClass('xpx_invis');
           }
       })
}

function response_test(obj){
    $("#SCHOOL").val($(obj).text());
    $('#manual_auto_complete').addClass('xpx_invis');
    $('#SCHOOL').parent('div').css('overflow','hidden');
}

/*edit_ocr THREESONG_XXX 2018/5/11*/

//获取图片
function getImage(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var image = new Image();
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        reader.onload = function (e) {
            image.src = reader.result;
        };
        image.onload = function () {
            var w = image.naturalWidth,
                h = image.naturalHeight;
            if(w>1280){
                var toSize = 1280;
                var w2 = toSize;
                var h2 = h / w * toSize;
            }else{
                w2 = w;
                h2 = h;
            }

            canvas.width = w2;
            canvas.height = h2;

            ctx.drawImage(image, 0, 0, w, h, 0, 0, w2, h2);
            //转base64
            var dataURL = canvas.toDataURL('image/jpeg',0.9);
            GetFormData(dataURL,'idCard1');  //请求接口

        };
        reader.readAsDataURL(input.files[0]);
    }else{// 判断是否图片
        mui.alert("请上传图片");
        return false;
    }
}
//表单提交
function GetFormData(uploadFiles,type) {
    /*showPop('正在上传照片...');*/
    $.loading.showLoading('识别中...');

    var timeStamp = gettimeStamp();
    //var AjaxURL= "/ocrService/upload";
    var AjaxURL = "http://o.bxt189.com/ocrService/upload"

    var data = {
        appId:'ctJRJD',
        timeStamp:timeStamp,
        authenticator:'cz4Qc9mqAgHEXR2zJ0OMHoiVsvTySfLK',
        flag:type,
        uploadFile:uploadFiles
    };

    var turnForm= new FormData();      // HTML5对象, IE11以下不支持
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            turnForm.append(key, data[key]);
        }
    }
    // console.log($('#formAjax').serialize());
    $.ajax({
        method: "POST",
        url: AjaxURL,
        data: turnForm,
        contentType: false,
        processData: false,
        success: function (result) {
            /*hidePop();*/
            $.loading.hideLoading();
            if(result.code==0){
                var data=result.data;
                //$('#ISDNAME').val(data.name);
                //$('#ISDIDNO').val(data.idNum);
                //$('#GRPNAME').val(data.name);
                //$('#ONTACTPSNIDNO').val(data.idNum);
                var x1 = {};
                x1.id = data.idNum;
                x1.name = data.name;
                console.warn($('.scanButton').eq(0).attr("alt"));
                var x2 = $('.scanButton').eq(0).attr("alt").split(",");
                setScanValue(x1, x2)
            }else{
                mui.alert("图片识别失败!请重新拍照/上传")
            }

        },
        error: function(data) {
            $.loading.hideLoading();
            mui.alert("图片识别失败!请重新拍照/上传");
        }
    });



    return false;
}

//时间戳
function gettimeStamp(){
    var t = new Date();
    var time = {
        y:t.getFullYear(),
        M:t.getMonth()+1,
        d:t.getDate(),
        H:t.getHours(),
        m:t.getMinutes(),
        s:t.getSeconds()
    };
    var month =time.M>=10 ? time.M : '0'+time.M;
    var date =time.d>=10 ? time.d : '0'+time.d;
    var hour =time.H>=10 ? time.H : '0'+time.H;
    var minutes =time.m>=10 ? time.m : '0'+time.m;
    var seconds =time.s>=10 ? time.s : '0'+time.s;
    var timeStamp = time.y.toString()+ month + date+hour+ minutes+ seconds;
    console.log(timeStamp);
    return timeStamp.substr(0,14);
}


