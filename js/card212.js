function goBackUndoPage() {
    if (mui.os.android) {
        window.androidx.back();
    } else if (mui.os.ios) {
        iosGoBack();
    }
}

//返回方法
// function goBackPage() {
//     var $curPage = $("#curPage");
//     if ($curPage.html() == "page1") {

//         if ($("#page1").attr("last-page") == "confirmPage") {
//             changePage("page1", "confirmPage", 'next');
//         } else {
//             console.log("这是第一个页面无法返回");
//             window.history.back(-1);
//         }

//     } else if ($curPage.html() == "confirmPage") {
//         var btnArray = ['是', '否'];
//         mui.confirm('是否保存订单？', '提示', btnArray, function(e) {
//             if (e.index == 0) {
//                 if (orderCode) {
//                     //调用订单保存接口
//                     var prdId = getUrlParam("prdId");
//                     GetData("orders/addorupdateorder", function(res) {
//                         //mui.alert('调用app方法返回未完成订单页');
//                         goBackUndoPage();
//                     }, { "prdId": prdId, "orderCode": orderCode, "json": BASE64.encoder(JSON.stringify(submitJson)) });
//                 } else {
//                     //调用生成订单接口
//                     var prdId = getUrlParam("prdId");
//                     GetData("orders/addorupdateorder", function(res) {
//                         history.go(-1);
//                     }, { "prdId": prdId, "orderCode": "", "json": BASE64.encoder(JSON.stringify(submitJson)) });
//                 }

//             } else {
//                 if (orderCode) {
//                     //mui.alert('调用app方法返回未完成订单页');
//                     goBackUndoPage();
//                 } else {
//                     history.go(-1);
//                 }
//             }
//         });
//     } else if ($curPage.html() == "page2" || $curPage.html() == "listPage1" || $curPage.html() == "listPage2" || $curPage.html() == "listPage3") {
//         var btnArray = ['是', '否'];
//         mui.confirm('是否返回？', '提示', btnArray, function(e) {
//             if (e.index == 0) {
//                 var c = $curPage.html();
//                 var backDiv = $("#" + c).attr("last-page");
//                 changePage(c, backDiv, 'last');

//             } else {

//             }
//         });
//     } else if ($curPage.html() == "jobSelect") {
//         var selCurPage = $("#jobSelect").find(".cur");
//         if (selCurPage.attr("id") == "jobLevel3") {
//             setTimeout(function() {
//                 $("#jobLevel2").addClass("cur").siblings(".jobpage").removeClass("cur");
//                 $("#jobLevel3 ul").html("");
//                 var titleStr = $("#jobLevel1 ul li.selected").find(".li-text").text();
//                 setWebviewTitle(titleStr);
//             }, 100);
//         } else if (selCurPage.attr("id") == "jobLevel2") {
//             setTimeout(function() {
//                 $("#jobLevel1").addClass("cur").siblings(".jobpage").removeClass("cur");
//                 $("#jobLevel2 ul").html("");
//                 setWebviewTitle("职业选择");
//             }, 100);
//         } else if (selCurPage.attr("id") == "jobLevel1") {
//             var lastPage = $("#jobSelect").attr("last-page");
//             changePage("jobSelect", lastPage, "last");
//             setWebviewTitle(sessionStorage.pageTitle);

//             $("#jobLevel1").addClass("cur").siblings(".jobpage").removeClass("cur");
//         }
//     } else {
//         var c = $curPage.html();
//         var backDiv = $("#" + c).attr("last-page");
//         changePage(c, backDiv, 'last');
//     }
// }

function goBackPage() {
    //alert(101)
    var index = getUrlParam("FormIndex");
    var $curPage = $("#curPage");
    setTimeout(function() {
        setWebviewTitle("我要投保");
    }, 100)

    if ($curPage.html() == "page1") {



        if ($("#page1").attr("last-page") == "confirmPage") {
            changePage("page1", "confirmPage", 'next');
            setTimeout(function() {
                setWebviewTitle("我要投保");
            }, 100)
        } else if (mui.os.android) {
            if (window.androidx.shareXb != undefined) {
                window.androidx.back();

            } else {
                history.back();
            }
            setTimeout(function() {
                setWebviewTitle("我要投保");
            }, 100)
        } else {
            console.log("这是第一个页面无法返回");
            if (index == "oringalPage") {
                iosGoBack();
            } else {
                window.history.back(-1);

            }
        }

    } else if ($curPage.html() == "confirmPage") {
        var btnArray = ['是', '否'];
        mui.confirm('是否保存订单？', '提示', btnArray, function(e) {
            if (e.index == 0) {
                if (orderCode) {
                    //调用订单保存接口
                    var prdId = getUrlParam("prdId");
                    GetData("orders/addorupdateorder", function(res) {
                        //mui.alert('调用app方法返回未完成订单页');
                        goBackUndoPage();
                    }, { "prdId": prdId, "orderCode": orderCode, "json": BASE64.encoder(JSON.stringify(submitJson)) });
                } else {
                    //调用生成订单接口
                    var prdId = getUrlParam("prdId");
                    GetData("orders/addorupdateorder", function(res) {
                        if (mui.os.ios) {
                            iosGoBack()
                        } else {
                            history.go(-1);

                        }
                    }, { "prdId": prdId, "orderCode": "", "json": BASE64.encoder(JSON.stringify(submitJson)) });
                }

            } else {
                if (orderCode) {
                    //mui.alert('调用app方法返回未完成订单页');
                    goBackUndoPage();
                } else {
                    if (mui.os.ios) {
                        iosGoBack()
                    } else {
                        history.go(-1);

                    }

                }
            }
        });
    } else if ($curPage.html() == "page2" || $curPage.html() == "listPage1" || $curPage.html() == "listPage2" || $curPage.html() == "listPage3") {
        check_back_status();
        setTimeout(function() {
                setWebviewTitle("我要投保");
            }, 100)
            /*var btnArray = ['是', '否'];
            mui.confirm('是否返回？', '提示', btnArray, function(e) {
            	if(e.index == 0) {
            		var c = $curPage.html();
            		var backDiv = $("#" + c).attr("last-page");
            		changePage(c, backDiv, 'last');

            	} else {
            		
            	}
            });*/
    } else if ($curPage.html() == "jobSelect") {
        var selCurPage = $("#jobSelect").find(".cur");
        if (selCurPage.attr("id") == "jobLevel3") {
            setTimeout(function() {
                $("#jobLevel2").addClass("cur").siblings(".jobpage").removeClass("cur");
                $("#jobLevel3 ul").html("");
                var titleStr = $("#jobLevel1 ul li.selected").find(".li-text").text();
                setWebviewTitle(titleStr);
            }, 100);
        } else if (selCurPage.attr("id") == "jobLevel2") {
            setTimeout(function() {
                $("#jobLevel1").addClass("cur").siblings(".jobpage").removeClass("cur");
                $("#jobLevel2 ul").html("");
                setWebviewTitle("职业选择");
            }, 100);
        } else if (selCurPage.attr("id") == "jobLevel1") {
            var lastPage = $("#jobSelect").attr("last-page");
            changePage("jobSelect", lastPage, "last");
            setWebviewTitle(sessionStorage.pageTitle);

            $("#jobLevel1").addClass("cur").siblings(".jobpage").removeClass("cur");
        }
    } else {
        var c = $curPage.html();
        var backDiv = $("#" + c).attr("last-page");
        changePage(c, backDiv, 'last');
        setTimeout(function() {
            setWebviewTitle("我要投保");
        }, 100)
    }
}


function setScanValue(res, arr) {
    var sex = $.others.IdCard(res.id, 2);
    if (sex == "男") {
        sex = "M";
    } else if (sex == "女") {
        sex = "F";
    }
    var birthday = $.others.IdCard(res.id, 1);

    $("#" + arr[0]).val(res.name);
    $("#" + arr[0]).trigger('blur');
    $("#" + arr[1]).val(res.id);
    $("#" + arr[1]).trigger('blur');
    $("#" + arr[2]).val(birthday);
    $('input:radio[name=' + arr[3] + '][value="' + sex + '"]').prop("checked", true);
}

//判断DOM元素是否存在
function judgeType(div) {
    if ($(div).length && $(div).length > 0) {
        return true;
    } else {
        return false;
    }
}

//客户管理

function setPhoneCustomer(arr, index) {

    // mui.alert(arr);
    console.info(arr);
    var sex = arr.sex,
        name = arr.customerName,
        idNo = arr.certificationNo,
        idType = arr.certificationType,
        telNo = arr.cellphoneNumber,
        birthDate = arr.birthDate,
        email = arr.email;
    idType = Number(idType);

    isGroup = getUrlParam("prdId");
    // 驾乘险系列
    if (isGroup == "9" || isGroup == "13" || isGroup == "81" || isGroup == "86" || isGroup == "87") {
        console.log("1");
        // mui.alert("1");
        if (judgeType("#GRPNAME")) {
            $("#GRPNAME").val(name).trigger("blur");
            $("#GRPNAME").val(name).trigger("keyup");
            switch (idType) {
                case 1:
                    $("#GRPIDTYPE").html("身份证").attr("value", "O");
                    break;
                case 2:
                    $("#GRPIDTYPE").html("护照").attr("value", "O");
                    break;
                case 3:
                    $("#GRPIDTYPE").html("军人证").attr("value", "O");
                    break;
            }
            console.log("1");
            $("#ONTACTPSNIDNO").val(idNo).trigger("keyup");
            console.log("1");
            $("#PSNBIRTH").val(birthDate);
            console.log("1");
            $('input:radio[name=PSNGENDER][value="' + sex + '"]').prop("checked", true);
            console.log("1");
            $("#PSNTELEPHONE").val(telNo).trigger("keyup");
            console.log("1");
            $("#PSNEMAILADDRESS").val(email).trigger("keyup");
        }
    } else {
        // mui.alert("false");
        if (index == 0) {
            if (judgeType("#CONTACTPSN")) {
                $("#CONTACTPSN").val(name).trigger("keyup");
                $("#ONTACTPSNIDNO").val(idNo).trigger("keyup");
                $("#PSNBIRTH").val(birthDate);
                $('input:radio[name=PSNGENDER][value="' + sex + '"]').prop("checked", true);
                $("#PSNTELEPHONE").val(telNo).trigger("keyup");
                $("#PSNEMAILADDRESS").val(email).trigger("keyup");
                console.log("aaa");
            } else {
                $("#ISDNAME").val(name).trigger("blur");
                $("#ISDNAME").val(name).trigger("keyup");
                console.log("222");
                switch (idType) {
                    case 1:
                        $("#ISDIDTYPE").html("身份证").attr("value", "I");
                        break;
                    case 2:
                        $("#ISDIDTYPE").html("护照").attr("value", "P");
                        break;
                    case 3:
                        $("#ISDIDTYPE").html("军人证").attr("value", "S");
                        break;
                }
                $("#ISDIDNO").val(idNo).trigger("keyup");
                $("#ISDBIRTH").val(birthDate);
                $('input:radio[name=ISDGENDER][value="' + sex + '"]').prop("checked", true);
                $("#ISDMOBILE").val(telNo).trigger("keyup");
                $("#ISDEMAIL").val(email).trigger("keyup");
            }

        } else if (index == 1) {
            $("#APPNAME").val(name).trigger("keyup");
            switch (idType) {
                case 1:
                    console.log("1");
                    $("#APPIDTYPE").html("身份证").attr("value", "I");
                    break;
                case 2:
                    console.log("2");

                    $("#APPIDTYPE").html("护照").attr("value", "P");
                    break;
                case 3:
                    console.log("3");

                    $("#APPIDTYPE").html("军人证").attr("value", "S");
                    break;
            }
            $("#APPIDNO").val(idNo).trigger("keyup");
            $("#APPBIRTH").val(birthDate);
            $('input:radio[name=APPGENDER][value="' + sex + '"]').prop("checked", true);
            $("#APPMOBILE").val(telNo).trigger("keyup");
            $("#APPEMAIL").val(email).trigger("keyup");
        } else if (index == 2) {
            if (judgeType("#ISDNAME_F")) {
                console.log("222");
                $("#ISDNAME_F").val(name).trigger("keyup");
                switch (idType) {
                    case 1:
                        $("#ISDIDTYPE_F").html("身份证").attr("value", "I");
                        break;
                    case 2:
                        $("#ISDIDTYPE_F").html("护照").attr("value", "P");
                        break;
                    case 3:
                        $("#ISDIDTYPE_F").html("军人证").attr("value", "S");
                        break;
                }
                $("#ISDIDNO_F").val(idNo).trigger("keyup");
                $("#ISDBIRTH_F").val(birthDate);
                $('input:radio[name=ISDGENDER_F][value="' + sex + '"]').prop("checked", true);
                $("#ISDMOBILE_F").val(telNo).trigger("keyup");
                $("#ISDEMAIL_F").val(email).trigger("keyup");
            } else {
                console.log("223");
                $("#BNFNAME").val(name).trigger("keyup");
                switch (idType) {
                    case 1:
                        console.log("1");
                        $("#BNFIDTYPE").html("身份证").attr("value", "I");
                        break;
                    case 2:
                        console.log("2");

                        $("#BNFIDTYPE").html("护照").attr("value", "P");
                        break;
                    case 3:
                        console.log("3");

                        $("#BNFIDTYPE").html("军人证").attr("value", "S");
                        break;
                }
                $("#BNFIDNO").val(idNo).trigger("keyup");
                $("#BNFBIRTH").val(birthDate);
                $('input:radio[name=BNFGENDER][value="' + sex + '"]').prop("checked", true);
                $("#BNFMOBILE").val(telNo).trigger("keyup");
                $("#BNFEMAIL").val(email).trigger("keyup");
            }

        }
    }

}



//ios客户管理
function setIosCustomer(arrTxt, iosindex) {
    // mui.alert(arrTxt);
    // mui.alert("111");
    // mui.alert(iosindex);
    var b = arrTxt;
    var arrTxt1 = JSON.parse(arrTxt);
    // mui.alert(arrTxt1);

    var sex = arrTxt1.sex,
        name = arrTxt1.customerName,
        idNo = arrTxt1.certificationNo,
        idType = arrTxt1.certificationType,
        telNo = arrTxt1.cellphoneNumber,
        birthDate = arrTxt1.birthDate,
        email = arrTxt1.email;
    // mui.alert("1");
    idType = Number(idType);
    isGroup = getUrlParam("prdId");

    var index = iosindex;
    // mui.alert(iosindex);
    if (isGroup == "9" || isGroup == "13" || isGroup == "81" || isGroup == "86" || isGroup == "87") {
        if (judgeType("#GRPNAME")) {

            $("#GRPNAME").val(name).trigger("keyup");
            switch (idType) {
                case 1:
                    $("#GRPIDTYPE").html("身份证").attr("value", "O");
                    break;
                case 2:
                    $("#GRPIDTYPE").html("护照").attr("value", "O");
                    break;
                case 3:
                    $("#GRPIDTYPE").html("军人证").attr("value", "O");
                    break;
            }

            $("#ONTACTPSNIDNO").val(idNo).trigger("keyup");
            $("#PSNBIRTH").val(birthDate);
            $('input:radio[name=PSNGENDER][value="' + sex + '"]').prop("checked", true);
            $("#PSNTELEPHONE").val(telNo).trigger("keyup");
            $("#PSNEMAILADDRESS").val(email).trigger("keyup");
        }
    } else {
        if (index == "0") {

            if (judgeType("#CONTACTPSN")) {
                $("#CONTACTPSN").val(name).trigger("keyup");
                $("#ONTACTPSNIDNO").val(idNo).trigger("keyup");
                $("#PSNBIRTH").val(birthDate);
                $('input:radio[name=PSNGENDER][value="' + sex + '"]').prop("checked", true);
                $("#PSNTELEPHONE").val(telNo).trigger("keyup");
                $("#PSNEMAILADDRESS").val(email).trigger("keyup");
                console.log("aaa");
            } else {
                $("#ISDNAME").val(name).trigger("keyup");
                console.log("222");
                switch (idType) {
                    case 1:
                        $("#ISDIDTYPE").html("身份证").attr("value", "I");
                        break;
                    case 2:
                        $("#ISDIDTYPE").html("护照").attr("value", "P");
                        break;
                    case 3:
                        $("#ISDIDTYPE").html("军人证").attr("value", "S");
                        break;
                }
                $("#ISDIDNO").val(idNo).trigger("keyup");
                $("#ISDBIRTH").val(birthDate);
                $('input:radio[name=ISDGENDER][value="' + sex + '"]').prop("checked", true);
                $("#ISDMOBILE").val(telNo).trigger("keyup");
                $("#ISDEMAIL").val(email).trigger("keyup");
            }

        } else if (index == "1") {

            $("#APPNAME").val(name).trigger("keyup");
            switch (idType) {
                case 1:
                    console.log("1");
                    $("#APPIDTYPE").html("身份证").attr("value", "I");
                    break;
                case 2:
                    console.log("2");

                    $("#APPIDTYPE").html("护照").attr("value", "P");
                    break;
                case 3:
                    console.log("3");

                    $("#APPIDTYPE").html("军人证").attr("value", "S");
                    break;
            }
            $("#APPIDNO").val(idNo).trigger("keyup");
            $("#APPBIRTH").val(birthDate);
            $('input:radio[name=APPGENDER][value="' + sex + '"]').prop("checked", true);
            $("#APPMOBILE").val(telNo).trigger("keyup");
            $("#APPEMAIL").val(email).trigger("keyup");
        } else if (index == "2") {

            if (judgeType("#ISDNAME_F")) {
                console.log("222");
                $("#ISDNAME_F").val(name).trigger("keyup");
                switch (idType) {
                    case 1:
                        $("#ISDIDTYPE_F").html("身份证").attr("value", "I");
                        break;
                    case 2:
                        $("#ISDIDTYPE_F").html("护照").attr("value", "P");
                        break;
                    case 3:
                        $("#ISDIDTYPE_F").html("军人证").attr("value", "S");
                        break;
                }
                $("#ISDIDNO_F").val(idNo).trigger("keyup");
                $("#ISDBIRTH_F").val(birthDate);
                $('input:radio[name=ISDGENDER_F][value="' + sex + '"]').prop("checked", true);
                $("#ISDMOBILE_F").val(telNo).trigger("keyup");
                $("#ISDEMAIL_F").val(email).trigger("keyup");
            } else {
                console.log("223");
                $("#BNFNAME").val(name).trigger("keyup");
                switch (idType) {
                    case 1:
                        console.log("1");
                        $("#BNFIDTYPE").html("身份证").attr("value", "I");
                        break;
                    case 2:
                        console.log("2");

                        $("#BNFIDTYPE").html("护照").attr("value", "P");
                        break;
                    case 3:
                        console.log("3");

                        $("#BNFIDTYPE").html("军人证").attr("value", "S");
                        break;
                }
                $("#BNFIDNO").val(idNo).trigger("keyup");
                $("#BNFBIRTH").val(birthDate);
                $('input:radio[name=BNFGENDER][value="' + sex + '"]').prop("checked", true);
                $("#BNFMOBILE").val(telNo).trigger("keyup");
                $("#BNFEMAIL").val(email).trigger("keyup");
            }

        }
    }

}

function setScanValueForIos() {
    var sex = $.others.IdCard(ios_res.id, 2);
    if (sex == "男") {
        sex = "M";
    } else if (sex == "女") {
        sex = "F";
    }
    var birthday = $.others.IdCard(ios_res.id, 1);

    $("#" + ios_arr[0]).val(ios_res.name);
    $("#" + ios_arr[0]).trigger('blur');
    $("#" + ios_arr[1]).val(ios_res.id);
    $("#" + ios_arr[1]).trigger('blur');
    $("#" + ios_arr[2]).val(birthday);
    $('input:radio[name=' + ios_arr[3] + '][value="' + sex + '"]').prop("checked", true);

}

//根据keyName查找其对应的值
function getKeyNameValue(keyName) {
    var arr = [];
    $.each(productJson, function(k, v) {
        var modelColumn = v.modelColumn;
        $.each(modelColumn, function(k, v) {
            var groupColumn = v.groupColumn;
            $.each(groupColumn, function(k, v) {
                if (v.keyName == keyName) {
                    var type = v.type;
                    if (type == "select") {
                        var selValue = $("#" + keyName).attr("value");
                        var selText = $("#" + keyName).text();
                        arr.push(selText);
                        arr.push(selValue);

                    } else if (type == "job") {
                        var jobValue = $("#" + keyName).attr("data-val");
                        var jobText = $("#" + keyName).val();
                        var jobType = $("#" + keyName).attr("data-type");
                        arr.push(jobValue);
                        arr.push(jobText);
                        arr.push(jobType);
                    } else if (type == "radio") {
                        var val = $('input:radio[name=' + keyName + ']:checked').val();
                        arr.push(val);
                    } else if (type == "textarea") {
                        var val = $("#" + keyName).text();
                        arr.push(val);
                    }
                    //else if(type == "numeric" || type == "text" || type == "date" || type == "time"){
                    else {
                        var val = $("#" + keyName).val();
                        arr.push(val);
                    }
                }
            });
        });
    });
    return arr;
}

//根据keyName查找其对应的type
function getKeyNameType(keyName) {
    var type;
    $.each(productJson, function(k, v) {
        var modelColumn = v.modelColumn;
        $.each(modelColumn, function(k, v) {
            var groupColumn = v.groupColumn;
            $.each(groupColumn, function(k, v) {
                if (v.keyName == keyName) {
                    type = v.type;
                    //console.log(keyName+"_TYPE:"+type);
                }

            });
        });
    });
    return type;
}

//根据keyName查找其对应的type
function getKeyNameEvent(keyName) {
    var evt;
    $.each(productJson, function(k, v) {
        var modelColumn = v.modelColumn;
        $.each(modelColumn, function(k, v) {
            var groupColumn = v.groupColumn;
            $.each(groupColumn, function(k, v) {
                if (v.keyName == keyName) {
                    evt = v.event;
                    //console.log(keyName+"_TYPE:"+type);
                }

            });
        });
    });
    return evt;
}

//根据keyName查找其对应的type
function getKeyNameModeltype(keyName) {
    var mt;
    $.each(productJson, function(k, v) {
        var modelColumn = v.modelColumn;
        var modelType = v.modelType;
        $.each(modelColumn, function(k, v) {
            var groupColumn = v.groupColumn;
            $.each(groupColumn, function(k, v) {
                if (v.keyName == keyName) {
                    mt = modelType;
                }

            });
        });
    });
    return mt;
}

//根据keyName查找其对应的notNull
function getKeyNameNotnull(keyName) {
    var evt;
    $.each(productJson, function(k, v) {
        var modelColumn = v.modelColumn;
        $.each(modelColumn, function(k, v) {
            var groupColumn = v.groupColumn;
            $.each(groupColumn, function(k, v) {
                if (v.keyName == keyName) {
                    evt = v.notNull;
                    //console.log(keyName+"_TYPE:"+type);
                }

            });
        });
    });
    return evt;
}

//将一个keyName页面对应的值拷贝到另外一个keyName对应的值里面
function setKeyNameValue(toKeyName, fromKeyName) {
    var fromKeyNameValue = getKeyNameValue(fromKeyName);
    var toKeyNameType = getKeyNameType(toKeyName);
    if (toKeyNameType == "select") {
        $("#" + toKeyName).html(fromKeyNameValue[0]);
        $("#" + toKeyName).attr("value", fromKeyNameValue[1]);
    } else if (toKeyNameType == "radio") {
        $('input:radio[name=' + toKeyName + '][value="' + fromKeyNameValue[0] + '"]').attr("checked", true);
    } else if (toKeyNameType == "label" || toKeyNameType == "numeric") {
        $("#" + toKeyName).text(fromKeyNameValue[0]);
    } else {
        $("#" + toKeyName).val(fromKeyNameValue[0]);
    }

}

function getTextValue(obj, selectId, type) {

    if (type == "select") {
        obj[selectId + "_TEXT"] = $("#" + selectId).html();
        obj[selectId] = $("#" + selectId).attr("value");
    } else if (type == "radio") {
        //obj[selectId] = $('input:radio[name='+selectId+']:checked').val();
        obj[selectId + "_TEXT"] = $('input:radio[name=' + selectId + ']:checked').siblings("label").text();
        obj[selectId] = $('input:radio[name=' + selectId + ']:checked').val();
    } else if (type == "textarea") {
        obj[selectId] = $("#" + selectId).text();
    } else if (type == "job") {
        var typeStr = selectId.replace(/CODE/, "TYPE");
        var textStr = selectId.replace(/CODE/, "TEXT");
        obj[selectId] = $("#" + selectId).attr("data-val");
        obj[typeStr] = $("#" + selectId).attr("data-type");
        obj[textStr] = $("#" + selectId).val();
    }
    //else if(type == "numeric" || type == "text" || type == "date" || type == "time"){
    else {
        obj[selectId] = $("#" + selectId).val();
    }

}

function clearTextValue(selectId, type, value) {
    if (type == "select") {
        $("#" + selectId).html("");
        for (var x in value) {
            if (value[x].checked) {
                $("#" + selectId).html(value[x].text);
                $("#" + selectId).attr("value", value[x].value);
            }

        }
    } else if (type == "radio") {

    }
    //else if(type == "numeric" || type == "text" || type == "date" || type == "time"){
    else {
        $("#" + selectId).val("");
    }
}

function setTextValue(obj, selectId, type) {
    if (type == "select") {
        $("#" + selectId).html(obj[selectId + "_TEXT"]);
        $("#" + selectId).attr("value", obj[selectId]);
    } else if (type == "radio") {
        var radioVal = obj[selectId];
        //$('input:radio[name='+selectId+'][value="'+radioVal+'"]').attr("checked",true);
        $('input:radio[name=' + selectId + '][value="' + radioVal + '"]').trigger("click");
    } else if (type == "job") {
        var typeStr = selectId.replace(/CODE/, "TYPE");
        var textStr = selectId.replace(/CODE/, "TEXT");
        $("#" + selectId).val(obj[textStr]);
        $("#" + selectId).attr("data-val", obj[selectId]);
        $("#" + selectId).attr("data-type", obj[typeStr]);
    } else {
        $("#" + selectId).val(obj[selectId]);
    }
}

function clearAll(proJson) {
    var nextPageNum = 1;
    $.each(proJson, function(k, v) {
        switch (v.modelType) {
            case "home":
                if (v.xmlNode != "AGREEMENT") {
                    $.each(v.modelColumn, function(k, v) {
                        var groupColumn = v.groupColumn;
                        $.each(groupColumn, function(k, v) {
                            clearTextValue(v.keyName, v.type, v.value);
                        });
                    });
                }

                break;
            case "nextPage":
                nextPageNum++;
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        clearTextValue(v.keyName, v.type, v.value);
                    });
                });
                $(".page" + nextPageNum + "HiddenInput").remove();
                break;
            case "listPage1":
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        clearTextValue(v.keyName, v.type, v.value);
                    });
                });
                $(".listPage1HiddenInput").remove();
                break;
            case "listPage2":
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        clearTextValue(v.keyName, v.type, v.value);
                    });
                });
                $(".listPage2HiddenInput").remove();
                break;
            case "listPage3":
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        clearTextValue(v.keyName, v.type, v.value);
                    });
                });
                $(".listPage3HiddenInput").remove();
                break;
            case "listPage4":
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        clearTextValue(v.keyName, v.type, v.value);
                    });
                });
                $(".listPage4HiddenInput").remove();
                break;
            default:
                break;
        }
    });
}

function showValue(text) {
    if (text != "" && text != undefined && text.substr(0, 1) == "=") {
        return "";
    } else {
        return text;
    }
}

//只允许输入数字
function numericKeyup(obj) {
    obj.value = obj.value.replace(/\D/g, '');
}

function idCardKeyup(obj, flagName) {
    console.log(obj.value.length);
    var $this = $(obj);
    var thisVal = $this.val();
    var thisText = $this.siblings("label").text();
    var mt = flagName;
    var eventStr = getKeyNameEvent($this.attr("id"));
    var arr1 = eventStr.split(",");
    var fnName = arr1[0];
    var cardTypeName = arr1[1];
    var cardTypeValue = $("#" + cardTypeName).attr("value");
    var cardTypeCnName = $("#" + cardTypeName).text();

    if (cardTypeCnName == "身份证") {
        if (thisVal.length == 18) {
            $this.parent().next(".tip").text("").hide();


            if (fnName.indexOf("@") == 0) {
                fnName = fnName.substr(1);
                //console.log("执行copy方法");
                var arr2 = arr1.splice(1, arr1.length);
                //console.log(arr2);
                if (!$.valid.isIdCard2(thisVal)) {
                    //console.log("buhefa");

                    $this.parent().next(".tip").text(thisText + "不合法").show();
                    var mt = getKeyNameModeltype($this.attr("id"));
                    eval(mt + "flag=false");

                } else {
                    //copy(arr2);
                    eval(mt + "flag=true");
                    $this.parent().next(".tip").hide();
                    $this.parent().next(".tip").next().next(".tip").hide();
                    eval(fnName + "(thisVal,arr2);");
                }

            }
        } else {
            eval(flagName + "flag=false;");
            $this.parent().next(".tip").text(thisText + "不合法").show();
        }
    } else {

    }


}

function idPhoneKeyup(obj, flagName) {
    obj.value = obj.value.replace(/\D/g, '');
    var $this = $(obj);
    var thisVal = $this.val();
    var thisText = $this.siblings("label").text();
    var mt = flagName;

    if (thisVal.length == 11) {
        if (!$.valid.isPhoneNumber(thisVal)) {
            $this.parent().next(".tip").text(thisText + "不合法").show();
            var mt = getKeyNameModeltype($this.attr("id"));
            eval(mt + "flag=false");

        } else {
            //copy(arr2);
            eval(mt + "flag=true");
            $this.parent().next(".tip").hide();

        }
    } else if (thisVal.length == 0) {
        var keyName = $this.attr("id");
        var notNull = getKeyNameNotnull(keyName);
        if (notNull == "Y") {
            eval(flagName + "flag=false;");
            $this.parent().next(".tip").text(thisText + "不合法").show();
        } else {
            eval(mt + "flag=true");
            $this.parent().next(".tip").hide();
        }
    } else {
        eval(flagName + "flag=false;");
        $this.parent().next(".tip").text(thisText + "不合法").show();
    }
}

function createJob($parentCotroller, textJson) {
    var mt = getKeyNameModeltype(textJson.keyName);
    if (textJson.notNull == "Y") {
        var textHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/xing8.png"><label>' + textJson.keyText + '</label>';
    } else {
        var textHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/null.png"><label>' + textJson.keyText + '</label>';
    }
    textHtml += '<span class="mui-icon mui-icon-arrowright" style="font-size:17px;height:32px;width:30px;line-height:35px;color:#bbb;text-align:left;"></span>'
    textHtml += '<input type="text" placeholder="' + textJson.placeHolder + '" class="" readonly="readonly" id="' + textJson.keyName + '" data-val=""  value="">';
    textHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(textHtml);
    $("#" + textJson.keyName).click(function() {
        var _this = $(this);
        //$(".pt-page-current").hide();
        //$("#jobSelect").show();
        var curPage = $("#curPage").text();
        changePage(curPage, "jobSelect", "next");
        $("#jobSelect").attr("last-page", curPage);
        setWebviewTitle("职业选择");
        $(window).scrollTop(0);
        //调接口，根据value进行职业查询
        GetData("profession/selectCode", function(res) {
            var liStr = "";
            $.each(res.data, function(k, v) {
                if (_this.val() != "" && _this.attr("data-val").substr(0, 2) == v.professionCode) {
                    liStr += '<li data-val="' + v.professionCode + '"><span class="li-text">' + v.professionName + '</span><span class="mui-icon mui-icon-checkmarkempty"></span></li>';
                } else {
                    liStr += '<li data-val="' + v.professionCode + '"><span class="li-text">' + v.professionName + '</span></li>';
                }

            });
            $("#jobLevel1 ul").html(liStr);

            $("#jobLevel1 li").unbind("click");
            $("#jobLevel1 li").click(function() {
                var $this = $(this);
                $this.addClass("selected").siblings().removeClass("selected");
                $this.append('<span class="mui-icon mui-icon-checkmarkempty"></span>');
                $this.siblings().find("span.mui-icon-checkmarkempty").remove();
                //$("#jobLevel2 .jobLiTitle").text($this.text());

                GetData("profession/selectCode", function(res) {
                    var liStr = "";
                    $.each(res.data, function(k, v) {
                        if (_this.val() != "" && _this.attr("data-val").substr(0, 4) == v.professionCode) {
                            liStr += '<li data-val="' + v.professionCode + '"><span class="li-text">' + v.professionName + '</span><span class="mui-icon mui-icon-checkmarkempty"></span></li>';
                        } else {
                            liStr += '<li data-val="' + v.professionCode + '"><span class="li-text">' + v.professionName + '</span></li>';
                        }

                    });
                    $("#jobLevel2 ul").html(liStr);

                    $("#jobLevel2 li").unbind("click");
                    $("#jobLevel2 li").click(function() {
                        var $this = $(this);
                        $this.addClass("selected").siblings().removeClass("selected");
                        $this.append('<span class="mui-icon mui-icon-checkmarkempty"></span>');
                        $this.siblings().find("span.mui-icon-checkmarkempty").remove();
                        //$("#jobLevel3 .jobLiTitle").text($this.text());


                        GetData("profession/selectCode", function(res) {
                            var liStr = "";
                            $.each(res.data, function(k, v) {
                                if (_this.val() != "" && _this.attr("data-val").substr(0, 6) == v.professionCode) {
                                    liStr += '<li data-val="' + v.professionCode + '" data-type="' + v.accidentLevel + '"><span class="li-text">' + v.professionName + '</span><span class="mui-icon mui-icon-checkmarkempty"></span></li>';
                                } else {
                                    liStr += '<li data-val="' + v.professionCode + '" data-type="' + v.accidentLevel + '"><span class="li-text">' + v.professionName + '</span></li>';
                                }

                            });
                            $("#jobLevel3 ul").html(liStr);
                            $("#jobLevel3 li").unbind("click");
                            $("#jobLevel3 li").click(function() {
                                var jobkey = $("#jobSelect").attr("data-keyName");
                                var $this = $(this);
                                $this.addClass("selected").siblings().removeClass("selected");
                                $this.append('<span class="mui-icon mui-icon-checkmarkempty"></span>');
                                $this.siblings().find("span.mui-icon-checkmarkempty").remove();

                                setTimeout(function() {
                                    //清空重置初始状态
                                    $(".jobpage ul").html("");
                                    $("#jobLevel1").addClass("cur").siblings(".jobpage").removeClass("cur");
                                    _this.parent(".mui-input-row").next(".tip").hide();
                                    setWebviewTitle(document.title);


                                    changePage("jobSelect", curPage, "last");
                                    $("#" + jobkey).val($this.text());
                                    $("#" + jobkey).attr("data-val", $this.attr("data-val"));
                                    $("#" + jobkey).attr("data-type", $this.attr("data-type"));
                                }, 500);

                            })
                        }, { "professionCode": $(this).attr("data-val") }, false);

                        setTimeout(function() {
                            $("#jobLevel3").addClass("cur").siblings(".jobpage").removeClass("cur");
                            setWebviewTitle($this.text());
                        }, 500);
                    });

                }, { "professionCode": $(this).attr("data-val") }, false);

                setTimeout(function() {
                    $("#jobLevel2").addClass("cur").siblings(".jobpage").removeClass("cur");
                    setWebviewTitle($this.text());
                }, 500);
            })
        }, { "professionCode": "" }, false);
        var jobCode = $(this).attr("data-val");
        $("#jobSelect").attr("data-keyName", textJson.keyName);

    });
}

function createText($parentCotroller, textJson) {
    var mt = getKeyNameModeltype(textJson.keyName);
    if (textJson.hidden == true) {
        var textHtml = '<div class="mui-input-row" style="display:none;">';
    } else {
        var textHtml = '<div class="mui-input-row">';
    }
    if (textJson.notNull == "Y") {
        textHtml += '<img class="xing" src="../images/product/xing8.png"><label>' + textJson.keyText + '</label>';
    } else {
        textHtml += '<img class="xing" src="../images/product/null.png"><label>' + textJson.keyText + '</label>';
    }
    if (textJson.keyText == "姓名") {
        // textHtml += '<span id = "phonebook">OXOX</span>';
        textHtml += '<img class = "phonebook" src="../images/user.png"></img>';

    } else {

    }
    if (textJson.keyText == "车牌号") {

    } else {

    }

    if (textJson.readOnly == 0 || textJson.readOnly == undefined) {

        textHtml += '<input type="text" placeholder="' + textJson.placeHolder + '" class="" id="' + textJson.keyName + '" value="' + showValue(textJson.value) + '">';
    } else if (textJson.readOnly == 1) {
        textHtml += '<input type="text" placeholder="' + textJson.placeHolder + '" id="' + textJson.keyName + '" readonly="readonly" value="' + showValue(textJson.value) + '">';
    }
    textHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(textHtml);
    $("#" + textJson.keyName).blur(function() {
        if (textJson.notNull == "Y") {
            if ((prdId == "13") || (prdId == "9")) {
                // if (textJson.keyName == "GRPIDNO") {
                //     if (CarNumflag == true) {
                //         eval(mt + "flag=true");

                //         $("#" + textJson.keyName).parent().next(".tip").text("").hide();

                //     } else {
                //         $("#" + textJson.keyName).parent().next(".tip").text(textJson.keyText + "信息有误").show();
                //         eval(mt + "flag=false");
                //     }

                // }
                if ($(this).val() == "") {
                    $("#" + textJson.keyName).parent().next(".tip").text(textJson.keyText + "不能为空").show();
                    eval(mt + "flag=false");
                } else {
                    eval(mt + "flag=true");
                    $("#" + textJson.keyName).parent().next(".tip").text("").hide();
                }
            } else if ($(this).val() == "") {
                $("#" + textJson.keyName).parent().next(".tip").text(textJson.keyText + "不能为空").show();
                eval(mt + "flag=false");
            } else {
                eval(mt + "flag=true");
                $("#" + textJson.keyName).parent().next(".tip").text("").hide();
            }
        }

    });
}

function createPhoneNumber($parentCotroller, textJson) {
    var mt = getKeyNameModeltype(textJson.keyName);
    if (textJson.notNull == "Y") {
        var textHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/xing8.png"><label>' + textJson.keyText + '</label>';
    } else {
        var textHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/null.png"><label>' + textJson.keyText + '</label>';
    }
    if (textJson.readOnly == 0 || textJson.readOnly == undefined) {

        textHtml += '<input type="tel" placeholder="' + textJson.placeHolder + '" class="" id="' + textJson.keyName + '" value="' + showValue(textJson.value) + '" onkeyup="idPhoneKeyup(this,\'' + mt + '\')">';
    } else if (textJson.readOnly == 1) {
        textHtml += '<input type="tel" placeholder="' + textJson.placeHolder + '" id="' + textJson.keyName + '" readonly="readonly" value="' + showValue(textJson.value) + '" onkeyup="idPhoneKeyup(this,\'' + mt + '\')">';
    }
    textHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(textHtml);
}

function createIdCard($parentCotroller, textJson) {
    var mt = getKeyNameModeltype(textJson.keyName);
    if (textJson.notNull == "Y") {
        var textHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/xing8.png"><label>' + textJson.keyText + '</label>';
    } else {
        var textHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/null.png"><label>' + textJson.keyText + '</label>';
    }
    if (textJson.readOnly == 0 || textJson.readOnly == undefined) {

        textHtml += '<input type="text" placeholder="' + textJson.placeHolder + '" class="mui-input-clear1" id="' + textJson.keyName + '" value="' + showValue(textJson.value) + '" onchange="idCardKeyup(this,\'' + mt + '\')"  onkeyup="idCardKeyup(this,\'' + mt + '\')">';
    } else if (textJson.readOnly == 1) {
        textHtml += '<input type="text" placeholder="' + textJson.placeHolder + '" id="' + textJson.keyName + '" readonly="readonly" value="' + showValue(textJson.value) + '" onchange="idCardKeyup(this,\'' + mt + '\')"  onkeyup="idCardKeyup(this,\'' + mt + '\')">';
    }
    textHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(textHtml);
}

function createEmail($parentCotroller, textJson) {
    if (textJson.notNull == "Y") {
        var textHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/xing8.png"><label>' + textJson.keyText + '</label>';
    } else {
        var textHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/null.png"><label>' + textJson.keyText + '</label>';
    }
    if (textJson.readOnly == 0 || textJson.readOnly == undefined) {
        textHtml += '<input type="text" placeholder="' + textJson.placeHolder + '" class="mui-input-clear" id="' + textJson.keyName + '" value="' + showValue(textJson.value) + '">';
    } else if (textJson.readOnly == 1) {
        textHtml += '<input type="text" placeholder="' + textJson.placeHolder + '" id="' + textJson.keyName + '" readonly="readonly" value="' + showValue(textJson.value) + '">';
    }
    textHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(textHtml);

    emailAssit(textJson.keyName);
}

function createTextarea($parentCotroller, textareaJson) {
    var textareaHtml = '<div><ul class="mui-table-view">' +
        '<li class="mui-table-view-cell mui-collapse mui-collapse">' +
        '<a class="mui-navigate-right" href="#">' + textareaJson.keyText + '</a>' +
        '<div class="mui-collapse-content">' +
        '<p id="' + textareaJson.keyName + '">' + textareaJson.value + '</p>' +
        '</div></li></ul></div>';
    $parentCotroller.append(textareaHtml);
}

function createNumeric($parentCotroller, numericJson, dw) {
    if (numericJson.notNull == "Y") {
        var numericHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/xing8.png"><label>' + numericJson.keyText + '</label>';
    } else {
        var numericHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/null.png"><label>' + numericJson.keyText + '</label>';
    }
    //var numericHtml = '<div class="mui-input-row"><label>'+numericJson.keyText+'</label>';
    numericHtml += '<label class="dw">' + dw + '</label>';
    if (numericJson.readOnly == 0 || numericJson.readOnly == undefined) {
        numericHtml += '<input type="text" value="' + numericJson.value + '" placeholder="' + numericJson.placeHolder + '" class="mui-input-clear" id="' + numericJson.keyName + '"  onkeyup="numericKeyup(this)">';
    } else if (numericJson.readOnly == 1) {
        numericHtml += '<input type="text" value="' + numericJson.value + '" placeholder="' + numericJson.placeHolder + '" id="' + numericJson.keyName + '" readonly="readonly" onkeyup="numericKeyup(this)">';
    }
    numericHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(numericHtml);
    $("#" + numericJson.keyName).blur(function() {
        if ($(this).val() == "" && numericJson.notNull == "Y") {
            $("#" + numericJson.keyName).parent().next(".tip").text(numericJson.keyText + "不能为空").show();
            var mt = getKeyNameModeltype(numericJson.keyName);
            eval(mt + "flag=false");
        } else {
            eval(mt + "flag=true");
            $("#" + numericJson.keyName).parent().next(".tip").text("").hide();
        }
    });
}

function createDate($parentCotroller, dateJson, option) {
    var dateHtml = '<div class="mui-input-row">';
    if (dateJson.notNull == "Y") {
        dateHtml += '<img class="xing" src="../images/product/xing8.png"><label>' + dateJson.keyText + '</label>';
    } else {
        dateHtml += '<img class="xing" src="../images/product/null.png"><label>' + dateJson.keyText + '</label>';
    }

    dateHtml += '<input style="width:6em" id="' + dateJson.keyName + '" class="dtPicker" placeholder="' + dateJson.placeHolder + '" readonly/>';

    dateHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(dateHtml);
    var dateEvent = dateJson.event;

    if (dateJson.readOnly == 0) {
        $("#" + dateJson.keyName).before('<button class="addOneDayBtn"></button>');
        $("#" + dateJson.keyName).after('<button class="minusOneDayBtn"></button>');
        $(".addOneDayBtn").unbind("click");
        $(".minusOneDayBtn").unbind("click");
        $(".addOneDayBtn").click(function() {

            var a = $(this).siblings("input").val();
            if (a != "") {
                var r = Global.DateUtil.addNDays(a, 1);
                r = Global.DateUtil.formatDate(r);
                var todayStr = (new Date()).Format("yyyy-MM-dd");
                var timeR = Date.parse(new Date(r));
                var todayR = Date.parse(new Date());


                var thisId = $(this).siblings("input").attr("id");
                var endDate = getKeyNameEvent(thisId);
                //如果endDate为空表示是用在出生日期这里，否则是用在生效日期这里
                if (endDate != '' && endDate != undefined) {
                    $(this).siblings("input").val(r);
                    var b = $("#" + endDate).val();
                    var c = Global.DateUtil.addNDays(b, 1);
                    c = Global.DateUtil.formatDate(c);
                    $("#" + endDate).val(c);
                } else {
                    if (timeR >= todayR) {
                        $(this).siblings("input").val(todayStr);
                    } else {
                        $(this).siblings("input").val(r);
                    }
                }


            }

        });
        $(".minusOneDayBtn").click(function() {

            var a = $(this).siblings("input").val();
            if (a != "") {
                var r = Global.DateUtil.addNDays(a, -1);
                r = Global.DateUtil.formatDate(r);
                $(this).siblings("input").val(r);
                var thisId = $(this).siblings("input").attr("id");
                var endDate = getKeyNameEvent(thisId);
                var b = $("#" + endDate).val();
                var c = Global.DateUtil.addNDays(b, -1);
                c = Global.DateUtil.formatDate(c);
                $("#" + endDate).val(c);
            }

        });
    }


    var dtPicker = document.getElementById(dateJson.keyName);

    if (dateJson.event == "") {
        mui("body").on("tap", "#" + dateJson.keyName, function() {
            if (option == "" || option == undefined) {
                var picker = new mui.DtPicker({
                    type: "date", //设置日历初始视图模式
                    endDate: new Date(),
                    beginYear: 1900
                });
            } else {
                var picker = new mui.DtPicker(option);
            }
            picker.show(function(items) {
                $("#" + dateJson.keyName).parent().next(".tip").text("").hide();
                dtPicker.value = items.value;
                picker.dispose();
            });
        }, false);
    }
}

function createTime($parentCotroller, timeJson, option) {
    var timeHtml = '<div class="mui-input-row">';
    console.log(timeJson);
    console.log(option);

    if (timeJson.notNull == "Y") {
        timeHtml += '<img class="xing" src="../images/product/xing8.png"><label>' + timeJson.keyText + '</label>';
    } else {
        timeHtml += '<img class="xing" src="../images/product/null.png"><label>' + timeJson.keyText + '</label>';
    }
    timeHtml += '<input placeholder="请选择时间" id="' + timeJson.keyName + '">';
    timeHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(timeHtml);

    var startTime = document.getElementById(timeJson.keyName);
    mui("body").on("tap", "#" + timeJson.keyName, function() {
        var picker = new mui.DtPicker({
            type: "time", //设置日历初始视图模式
        });
        if (option == "" || option == undefined) {
            var picker = new mui.DtPicker({
                type: "time", //设置日历初始视图模式
            });
        } else {
            var picker = new mui.DtPicker(option);
        }
        picker.show(function(rs) {
            startTime.value = rs.text;
            picker.dispose();
        });
    });

    if (timeJson.value != "") {
        var valueStr = timeJson.value;
        var arr1 = valueStr.split(",");
        var fnName = arr1[0];
        if (fnName.indexOf("@") == 0) {
            fnName = fnName.substr(1);
            //console.log("执行copy方法");
            var arr2 = arr1.splice(1, arr1.length);
            //console.log(arr2);
            //copy(arr2);
            var kk = eval(fnName + "(arr2[0]);");
            startTime.value = kk;
        } else {
            startTime.value = valueStr;
        }
    }
}

function createRadio($parentCotroller, radioJson) {
    if (radioJson.notNull == "Y") {
        var radioHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/xing8.png"><label>' + radioJson.keyText + '</label>';
    } else {
        var radioHtml = '<div class="mui-input-row"><img class="xing" src="../images/product/null.png"><label>' + radioJson.keyText + '</label>';
    }
    var radioStr = "";
    var name = radioJson.keyName;
    var value = radioJson.value;
    $.each(value, function(k, v) {
        radioStr += '<div class="mui-radio mui-left">';
        radioStr += '<label>' + v.text + '</label>';
        if (v.checked) {
            radioStr += '<input name="' + name + '" type="radio" checked value="' + v.value + '">';
        } else {
            radioStr += '<input name="' + name + '" type="radio" value="' + v.value + '">';
        }

        radioStr += '</div>';

    });
    radioHtml += radioStr;
    radioHtml += '</div>';
    $parentCotroller.append(radioHtml);
}

function createSelect($parentCotroller, selectJson) {

    if (selectJson.hidden == true) {
        var selectHtml = '<div class="mui-input-row" style="display:none;">';
    } else {
        var selectHtml = '<div class="mui-input-row">';
    }

    if (selectJson.notNull == "Y") {
        selectHtml += '<img class="xing" src="../images/product/xing8.png"><label>' + selectJson.keyText + '</label>';
    } else {
        selectHtml += '<img class="xing" src="../images/product/null.png"><label>' + selectJson.keyText + '</label>';
    }

    selectHtml += '<span class="select" value="" id="' + selectJson.keyName + '">请选择</span>';
    selectHtml += '</div><div class="tip"></div>';
    $parentCotroller.append(selectHtml);
    var selectDom = document.getElementById(selectJson.keyName);
    var selectPickerData = selectJson.value;
    var noStr = selectJson.keyName.replace(/TYPE/, "NO");
    if (selectJson.event == "") {
        selectDom.addEventListener('tap', function() {

            var selectPicker = new mui.PopPicker();
            selectPicker.setData(selectPickerData);

            selectPicker.show(function(items) {
                $("#" + selectJson.keyName).parent().next(".tip").text("").hide();
                selectDom.innerText = items[0].text;
                selectDom.setAttribute("value", items[0].value);
                if (selectJson.keyName == "ISDIDTYPE" || selectJson.keyName == "APPIDTYPE" || selectJson.keyName == "BNFIDTYPE" || selectJson.keyName == "ISDIDTYPE_F") {
                    $("#" + noStr).parent().next(".tip").text("").hide();
                    $("#" + noStr).trigger("keyup");
                }
                selectPicker.dispose();
            });
        }, false);

    }
    for (var x in selectPickerData) {
        if (selectPickerData[x].checked) {
            $("#" + selectJson.keyName).html(selectPickerData[x].text);
            $("#" + selectJson.keyName).attr("value", selectPickerData[x].value);
        }

    }

}

function validCurPage(validJson) {
    var result = true;
    $.each(validJson, function(k, v) {
        var groupColumn = v.groupColumn;
        $.each(groupColumn, function(k, v) {
            if (v.type != "select" && v.type != "radio" && v.notNull == "Y") {
                if ($("#" + v.keyName).val() == "") {
                    mui.alert(v.keyText + "不能为空");
                    result = false;
                    return false;
                }
            }
            /*if(v.keyName == "APPIDNO"){
            	if(!$.valid.isIdCard($("#"+v.keyName).val())){
            		mui.alert("您输入的身份证不合法");
            		result = false;
            		return false;
            	}
            }*/

        });
    });
    return result;
}

//根据所给json创建页面
function createPage(productJson) {
    $.each(productJson, function(k, v) {

        switch (v.modelType) {

            case "home":
                var xmlNode = v.xmlNode;
                if ($("#page1Submit").length == 0) {
                    var btnHtml = '<div class="buttonBlock">' +
                        '<button type="button" class="mui-btn mui-btn-block card-button" id="page1Submit">确定</button>' +
                        '</div>';
                    $("#page1 .pt-triggers").append(btnHtml);
                }

                var section = '<div class="mui-input-group section"></div>';
                $("#page1 .buttonBlock").before(section);
                var kk = k;

                $.each(v.modelColumn, function(k, v) {
                    var cpxxJson = v.groupColumn;

                    var titleHtml;
                    if (v.type == "label") {
                        titleHtml = '<div class="mui-input-row row-title expand">' +
                            '<div class="row-title-text">' + v.groupName + '</div>';
                        if (kk == 0) {
                            titleHtml += '<div class="shareS" style=""  prdId="' + prdId + '"><img src="../images/icon_share.png"></div>'
                                // if (isFavorited) {
                                //     titleHtml += '<div class="favorite" data-value="1" data-prdId="' + prdId + '"><img src="../images/favor-icon.png"></div>';
                                // } else {
                                //     titleHtml += '<div class="favorite" data-value="0" data-prdId="' + prdId + '"><img src="../images/favor-icon3.png"></div>';
                                // }
                        }


                        titleHtml += '</div>';
                    } else if (v.type == "scan") {
                        titleHtml = '<div class="mui-input-row row-title expand">' +
                            '<div class="row-title-text">' + v.groupName + '</div>' +
                            '<img src="../images/scan.png" class="scanButton" alt="' + v.event + '">' +
                            '</div>';
                    }
                    $("#page1 .pt-triggers .section").eq(homeNum).append(titleHtml);

                    $(".favorite").unbind("click");
                    $(".favorite").click(function() {
                        var _this = $(this);
                        var isFavor = parseInt(_this.attr("data-value"));
                        var prdId = _this.attr("data-prdId");
                        GetData("favorite/set", function(res) {
                            console.log(res);
                            if (isFavor) {
                                _this.attr("data-value", 0);
                                _this.children("img").attr("src", "../images/favor-icon3.png");
                                mui.toast('您已取消收藏');
                                mui.alert('您已取消收藏');

                            } else {
                                _this.attr("data-value", 1);
                                _this.children("img").attr("src", "../images/favor-icon.png");
                                mui.toast('收藏成功');
                                mui.alert('收藏成功');

                            }

                        }, { "prdId": prdId, "type": isFavor }, false);

                    });

                    var prdId = getUrlParam("prdId");
                    var userID;
                    if (mui.os.android) {
                        var userInfoStr = window.androidx.getUserInfo("");
                        var userInfo = JSON.parse(userInfoStr);
                        userID = userInfo.userId;
                        userID = String(userID);
                        var push_data = {
                            "productId": prdId,
                            "userId": userID
                        };
                        setTimeout(function() {
                            $.ajax({
                                url: renewserverLocation + 'shareProduct/showproducts',
                                type: 'POST',
                                data: JSON.stringify(push_data),
                                contentType: "application/json",
                                dataType: 'json',
                                success: function(data) {
                                    console.log("sharesucess");
                                    if (data.code == '0') {
                                        console.log(data.data);
                                        var shareText = data.data.shareText;
                                        var shareTitle = data.data.shareTitle;
                                        var sharePictureUrl = httpLocation + "/gskdh6/app" + data.data.sharePictureUrl.substring(2);
                                        console.log(sharePictureUrl);
                                        var url = httpLocation + "/gskdh6/app/views/Wxshow.html?prdId=" + prdId + "&userId=" + userID;
                                        var appurl = httpLocation + "/gskdh6/app/views/Wxshowapp.html?prdId=" + prdId + "&userId=" + userID;

                                        console.log(url);

                                        var telNu = '';
                                        // 产品分享

                                        $.ajax({
                                            type: "POST",
                                            url: renewserverLocation + "support/shortUrl",
                                            cache: false,
                                            async: true,
                                            data: {
                                                url: encodeURIComponent(url),
                                            },
                                            beforeSend: function(xhr) {
                                                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                                                xhr.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With");
                                                xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
                                            },
                                            success: function(data) {
                                                sUrl = String(data);
                                                console.log(sUrl)
                                                contentText1 = shareText;

                                                console.log(contentText1);
                                                andJson = {
                                                    title: shareTitle,
                                                    contentText: contentText1,
                                                    url: url,
                                                    introUrl: appurl,
                                                    imageUrl: sharePictureUrl,
                                                    prdId: prdId
                                                }

                                                if (mui.os.android) {
                                                    window.androidx.sendJsData(JSON.stringify(andJson));
                                                } else if (mui.os.ios) {
                                                    sendCardShareJsData(JSON.stringify(andJson));
                                                } else {
                                                    mui.alert("sucess");
                                                }
                                                $(".shareS").unbind("click");

                                                $(".shareS").click(function() {

                                                    if (mui.os.android) {
                                                        window.androidx.shareProduct(shareTitle, contentText1, url, sharePictureUrl)

                                                    } else if (mui.os.ios) {
                                                        cardShare(shareTitle, contentText1, url, sharePictureUrl)


                                                    } else {
                                                        console.log(contentText1);
                                                    }
                                                });
                                            }
                                        })




                                        // if (mui.os.android) {

                                        // } else if (mui.os.ios) {

                                        // } else {
                                        //     // window.location.href = "Wxshow.html?prdId=" + prdId + "&userId=" + userID;
                                        // }

                                    } else {
                                        var andJson = {
                                            title: "",
                                            contentText: "",
                                            url: "",
                                            introUrl: "",
                                            imageUrl: "",
                                            prdId: prdId
                                        }

                                        if (mui.os.android) {
                                            window.androidx.sendJsData(JSON.stringify(andJson));
                                        } else if (mui.os.ios) {
                                            sendCardShareJsData(JSON.stringify(andJson));
                                        } else {}
                                        $(".shareS").unbind("click");

                                        $(".shareS").click(function() {

                                            if (mui.os.android) {
                                                mui.alert("此产品暂不支持分享！")
                                            } else if (mui.os.ios) {
                                                mui.alert("此产品暂不支持分享！")
                                            } else {
                                                console.log("contentText1");

                                            }
                                        });
                                    }
                                },
                                error: function(xhr, status) {
                                    // mask.close(); //关闭蒙层
                                    // myApp.hidePreloader();
                                    mui.alert('分享失败！');
                                }
                            });
                        }, 500)


                    } else if (mui.os.ios) {
                        setupWebViewJavascriptBridge(function(bridge) {});
                        WebViewJavascriptBridge.callHandler('getUserInfo', {
                            'url': 'url'
                        }, function(response) {
                            var userInfo = JSON.parse(response);
                            userID = userInfo.userId;
                            var push_data = {
                                "productId": prdId,
                                "userId": userID
                            };
                            setTimeout(function() {
                                    $.ajax({
                                        url: renewserverLocation + 'shareProduct/showproducts',
                                        type: 'POST',
                                        data: JSON.stringify(push_data),
                                        contentType: "application/json",
                                        dataType: 'json',
                                        success: function(data) {
                                            console.log("sharesucess");
                                            if (data.code == '0') {
                                                console.log(data.data);
                                                var shareText = data.data.shareText;
                                                var shareTitle = data.data.shareTitle;
                                                var sharePictureUrl = httpLocation + "/gskdh6/app" + data.data.sharePictureUrl.substring(2);
                                                console.log(sharePictureUrl);
                                                var url = httpLocation + "/gskdh6/app/views/Wxshow.html?prdId=" + prdId + "&userId=" + userID;
                                                var appurl = httpLocation + "/gskdh6/app/views/Wxshowapp.html?prdId=" + prdId + "&userId=" + userID;

                                                console.log(url);

                                                var telNu = '';
                                                // 产品分享

                                                $.ajax({
                                                    type: "POST",
                                                    url: renewserverLocation + "support/shortUrl",
                                                    cache: false,
                                                    async: true,
                                                    data: {
                                                        url: encodeURIComponent(url),
                                                    },
                                                    beforeSend: function(xhr) {
                                                        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                                                        xhr.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With");
                                                        xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
                                                    },
                                                    success: function(data) {
                                                        sUrl = String(data);
                                                        console.log(sUrl)
                                                        contentText1 = shareText;

                                                        console.log(contentText1);
                                                        andJson = {
                                                            title: shareTitle,
                                                            contentText: contentText1,
                                                            url: url,
                                                            introUrl: appurl,
                                                            imageUrl: sharePictureUrl,
                                                            prdId: prdId
                                                        }

                                                        if (mui.os.android) {
                                                            window.androidx.sendJsData(JSON.stringify(andJson));
                                                        } else if (mui.os.ios) {
                                                            sendCardShareJsData(JSON.stringify(andJson));
                                                        } else {
                                                            mui.alert("sucess");
                                                        }
                                                        $(".shareS").unbind("click");

                                                        $(".shareS").click(function() {

                                                            if (mui.os.android) {
                                                                window.androidx.shareProduct(shareTitle, contentText1, url, sharePictureUrl)

                                                            } else if (mui.os.ios) {
                                                                cardShare(JSON.stringify(andJson))

                                                            } else {
                                                                console.log(contentText1);
                                                            }
                                                        });
                                                    }
                                                })
                                            } else {
                                                var andJson = {
                                                    title: "",
                                                    contentText: "",
                                                    url: "",
                                                    introUrl: "",
                                                    imageUrl: "",
                                                    prdId: prdId
                                                }

                                                if (mui.os.android) {
                                                    window.androidx.sendJsData(JSON.stringify(andJson));
                                                } else if (mui.os.ios) {
                                                    sendCardShareJsData(JSON.stringify(andJson));
                                                } else {}
                                                $(".shareS").unbind("click");

                                                $(".shareS").click(function() {

                                                    if (mui.os.android) {
                                                        mui.alert("此产品暂不支持分享！")
                                                    } else if (mui.os.ios) {
                                                        mui.alert("此产品暂不支持分享！")
                                                    } else {
                                                        console.log("contentText1");

                                                    }
                                                });
                                            }
                                        },
                                        error: function(xhr, status) {
                                            // mask.close(); //关闭蒙层
                                            // myApp.hidePreloader();
                                            mui.alert('分享失败！');
                                        }
                                    });
                                }, 500)
                                // mui.alert("111");
                        });
                    } else {
                        userID = getUrlParam("cardNo");
                    }
                    $.each(cpxxJson, function(k, v) {
                        switch (v.type) {
                            case "text":
                                if (v.keyText == "姓名") {
                                    createText($("#page1 .pt-triggers .section").eq(homeNum), v);

                                } else if (v.keyText == "车牌号") {
                                    createText($("#page1 .pt-triggers .section").eq(homeNum), v);
                                } else {
                                    createText($("#page1 .pt-triggers .section").eq(homeNum), v);

                                };

                                break;
                            case "job":
                                createJob($("#page1 .pt-triggers .section").eq(homeNum), v);
                                break;
                            case "phoneNumber":
                                createPhoneNumber($("#page1 .pt-triggers .section").eq(homeNum), v);
                                break;
                            case "idcard":
                                createIdCard($("#page1 .pt-triggers .section").eq(homeNum), v);
                                break;
                            case "email":
                                createEmail($("#page1 .pt-triggers .section").eq(homeNum), v);
                                break;
                            case "textarea":
                                createTextarea($("#page1 .pt-triggers .section").eq(homeNum), v);
                                break;
                            case "numeric":
                                createNumeric($("#page1 .pt-triggers .section").eq(homeNum), v, "元");
                                break;
                            case "date":
                                if (xmlNode == "AGREEMENT") {
                                    var myDate = new Date();
                                    var yyyy = myDate.getFullYear();
                                    var mm = myDate.getMonth();
                                    var dd = myDate.getDate();
                                    createDate($("#page1 .pt-triggers .section").eq(homeNum), v, {
                                        type: "date", //设置日历初始视图模式
                                        beginYear: 2016,
                                        endYear: 2050
                                    });
                                } else {
                                    createDate($("#page1 .pt-triggers .section").eq(homeNum), v, {
                                        type: "date", //设置日历初始视图模式
                                        endDate: new Date(),
                                        beginYear: 1900,
                                        value: "1990-01-01"
                                    });
                                }


                                break;
                            case "time":
                                createTime($("#page1 .pt-triggers .section").eq(homeNum), v);
                                break;
                            case "radio":

                                createRadio($("#page1 .pt-triggers .section").eq(homeNum), v)
                                break;
                            case "select":

                                createSelect($("#page1 .pt-triggers .section").eq(homeNum), v);
                                break;

                            default:
                                break;
                        }
                    });
                });

                homeNum++;

                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    //二次遍历，为一些文本绑定计算公式
                    $.each(groupColumn, function(k, v) {
                        if (v.event != "") {
                            if (v.type == "date") {
                                var dtPicker = document.getElementById(v.keyName);

                                if (v.value != "") {
                                    var valueStr = v.value;
                                    var arr1 = valueStr.split(",");
                                    var fnName = arr1[0];
                                    if (fnName.indexOf("@") == 0) {
                                        fnName = fnName.substr(1);
                                        //console.log("执行copy方法");
                                        var arr2 = arr1.splice(1, arr1.length);
                                        //console.log(arr2);

                                        //copy(arr2);
                                        var kk = eval(fnName + "(arr2[0]);");
                                        dtPicker.value = kk;

                                        var resStr = changeValue(v.event, groupColumn);
                                        var endDate = document.getElementById(v.event);
                                        endDate.value = resStr;
                                    }
                                }

                                mui("body").on("tap", "#" + v.keyName, function() {
                                    var myDate = new Date();
                                    var yyyy = myDate.getFullYear();
                                    var mm = myDate.getMonth();
                                    var dd = myDate.getDate();
                                    var picker = new mui.DtPicker({
                                        type: "date", //设置日历初始视图模式
                                        endYear: "2050"
                                    });

                                    picker.show(function(items) {
                                        $("#" + v.keyName).parent().next(".tip").text("").hide();
                                        dtPicker.value = items.value;
                                        var resStr = changeValue(v.event, groupColumn);
                                        var endDate = document.getElementById(v.event);
                                        endDate.value = resStr;

                                        picker.dispose();
                                    });
                                }, false);
                            }
                            if (v.type == "select") {
                                var selectDom = document.getElementById(v.keyName);
                                var selectPickerData = v.value;

                                selectDom.addEventListener('tap', function() {
                                    var selectPicker = new mui.PopPicker();
                                    selectPicker.setData(selectPickerData);

                                    selectPicker.show(function(items) {
                                        $("#" + v.keyName).parent().next(".tip").text("").hide();
                                        selectDom.innerText = items[0].text;
                                        selectDom.setAttribute("value", items[0].value);
                                        var eventStr = v.event;
                                        var arr1 = eventStr.split(",");
                                        var fnName = arr1[0];
                                        if (selectDom.innerText == "本人" && fnName == "@copy") {
                                            fnName = fnName.substr(1);
                                            var arr2 = arr1.splice(1, arr1.length);
                                            eval(fnName + "(arr2);");
                                        }
                                        //THX---2017/10/23
                                        if (fnName == "@setCYB" || fnName == "@getVersion") {
                                            fnName = fnName.substr(1);
                                            eval(fnName + "();");
                                        }
                                        selectPicker.dispose();
                                    });
                                }, false);
                            }
                        }
                    });
                })

                break;
            case "nextPage":
                pageNum++;

                var secListHtml;
                var showText = v.showText;
                if ($(".secList").length == 0) {
                    secListHtml = '<div class="mui-input-group section secList">' +
                        '<ul class="mui-table-view">' +
                        '<li class="mui-table-view-cell">' +
                        '<a class="mui-navigate-right" id="' + v.xmlNode + '">' +
                        v.modelName +
                        '<span class="nextPageTip" id="nextPageTip' + pageNum + '"></span></a>' +
                        '</li></ul></div>';
                    $("#page1 .buttonBlock").before(secListHtml);
                } else {
                    $("#page1 .secList ul").append('<li class="mui-table-view-cell"><a class="mui-navigate-right" id="' + v.xmlNode + '">' + v.modelName + '<span class="nextPageTip" id="nextPageTip' + pageNum + '"></span></a></li>');
                }

                //生成nextpage页面
                $("#pt-main").append('<div class="pt-page" id="page' + pageNum + '" last-page="page1"><div class="pt-triggers"><div class="row-group section info"></div></div></div>');
                //生成提交按钮
                if ($("#page" + pageNum + "Submit").length == 0) {
                    var btnHtml = '<div class="buttonBlock">' +
                        '<button type="button" class="mui-btn mui-btn-block card-button" id="page' + pageNum + 'Submit">确定</button>' +
                        '</div>';
                    $("#page" + pageNum + " .pt-triggers").append(btnHtml);
                }

                var $thisPage = $("#page" + pageNum);
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    if (v.type == "label") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/baseinfo.png" class="title-row-icon">' +
                            v.groupName +
                            '</div>';

                    } else if (v.type == "scan") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/businessman.png" class="title-row-icon">' +
                            v.groupName +
                            '<img src="../images/scan.png" class="scanButton" alt="' + v.event + '">' +
                            '</div>';
                    }

                    $thisPage.find(".section").append(headHtml);
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        switch (v.type) {
                            case "text":
                                createText($thisPage.find(".section"), v);
                                break;
                            case "job":
                                createJob($thisPage.find(".section"), v);
                                break;
                            case "phoneNumber":
                                createPhoneNumber($thisPage.find(".section"), v);
                                break;
                            case "idcard":
                                createIdCard($thisPage.find(".section"), v);
                                break;
                            case "email":
                                createEmail($thisPage.find(".section"), v);
                                break;
                            case "select":
                                createSelect($thisPage.find(".section"), v);
                                break;
                            case "date":
                                createDate($thisPage.find(".section"), v, {
                                    type: "date", //设置日历初始视图模式
                                    beginYear: 1900,
                                    endDate: new Date()
                                });
                                break;
                            case "radio":
                                createRadio($thisPage.find(".section"), v);
                                break;
                            default:
                                break;
                        }
                    });
                });


                $("#page" + pageNum + "Submit").click(function() {
                    //nextPageflag = true;//重置标志位
                    //confirmStatus = "edit";

                    //1.将填写的信息收集
                    var nextPageObj = {};
                    $.each(modelColumn, function(k, v) {
                        var groupColumn = v.groupColumn;
                        $.each(groupColumn, function(k, v) {
                            getTextValue(nextPageObj, v.keyName, v.type);
                        });
                    });

                    //2.判断是否已经存在input，存在则修改，不存在则创建

                    if ($(".page" + pageNum + "HiddenInput").length == 0) {
                        $("#page" + pageNum).append("<input type='text' value='" + JSON.stringify(nextPageObj) + "' class='page" + pageNum + "HiddenInput'>");
                    } else {
                        $(".page" + pageNum + "HiddenInput").val(JSON.stringify(nextPageObj));

                    }

                    var t = nextPageObj[showText];
                    $("#nextPageTip" + pageNum).html(t);

                    //console.log(JSON.stringify(nextPageObj));
                    //3.跳转到上一页
                    if (validPage('page' + pageNum) && validNull("nextPage")) {
                        changePage("page" + pageNum, "page1", "last");
                    }

                });


                //点投保人事件
                $("#" + v.xmlNode).on("click", function() {
                    if ($(".page" + pageNum + "HiddenInput").length == 0) {
                        //1.请空投保人
                        $.each(productJson, function(k, v) {
                            var npm = 1;
                            if (v.modelType == "nextPage") {
                                npm++;
                                $.each(v.modelColumn, function(k, v) {
                                    var groupColumn = v.groupColumn;
                                    $.each(groupColumn, function(k, v) {
                                        clearTextValue(v.keyName, v.type, v.value);
                                    });
                                });
                                $(".page" + npm + "HiddenInput").remove();
                            }
                        });

                        //2.跳转
                        changePage("page1", "page" + pageNum, "next");
                    } else {
                        var tbrJson = {};
                        //获取对应的json
                        if ($(".page" + pageNum + "HiddenInput").length == 0) {
                            tbrJson = submitJson[editConfirmNo].APPLICANT;

                            $(".page" + pageNum + "HiddenInput").val(JSON.stringify(tbrJson));
                        } else {
                            tbrJson = JSON.parse($(".page" + pageNum + "HiddenInput").val());
                        }


                        $.each(productJson, function(k, v) {
                            if (v.modelType == "nextPage") {
                                $.each(v.modelColumn, function(k, v) {
                                    var groupColumn = v.groupColumn;
                                    $.each(groupColumn, function(k, v) {
                                        setTextValue(tbrJson, v.keyName, v.type);
                                    });
                                });
                            }
                        });
                        //2.跳转
                        changePage("page1", "page" + pageNum, "next");
                    }

                });

                //二次遍历，为一些文本绑定计算公式
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.event != "") {
                            if (v.type == "select") {

                                var selectDom = document.getElementById(v.keyName);
                                var selectPickerData = v.value;

                                selectDom.addEventListener('tap', function() {
                                    var selectPicker = new mui.PopPicker();
                                    selectPicker.setData(selectPickerData);

                                    selectPicker.show(function(items) {
                                        $("#" + v.keyName).parent().next(".tip").text("").hide();
                                        selectDom.innerText = items[0].text;
                                        selectDom.setAttribute("value", items[0].value);
                                        var eventStr = v.event;
                                        var arr1 = eventStr.split(",");
                                        var fnName = arr1[0];
                                        if (selectDom.innerText == "本人" && fnName == "@copy") {
                                            //console.log("执行本人方法");	
                                            fnName = fnName.substr(1);
                                            //console.log("执行copy方法");
                                            var arr2 = arr1.splice(1, arr1.length);
                                            //console.log(arr2);										
                                            //copy(arr2);
                                            eval(fnName + "(arr2);");
                                            validNull("nextPage");
                                        }
                                        selectPicker.dispose();
                                    });
                                }, false);
                            }
                        }
                    });
                });
                break;

            case "confirm":
                //<div class="mui-input-group section">
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    var type = v.type;

                    if (type == "label") {
                        var $conSec = $("#confirmPage .section").eq(0);
                        var conTitleHtml = '<div class="mui-input-row"><label class="green">' + v.groupName + '</label></div>';
                        $conSec.append(conTitleHtml);
                        $.each(groupColumn, function(k, v) {
                            var type = v.type;
                            var conLiHtml = "";
                            if (type == "numeric") {
                                conLiHtml = '<div class="mui-input-row"><label>' + v.keyText + '</label><label class="dw">元</label><span id="' + v.keyName + '"></span></div>';
                            } else {
                                conLiHtml = '<div class="mui-input-row"><label>' + v.keyText + '</label><span id="' + v.keyName + '">' + v.value + '</span></div>';
                            }

                            $conSec.append(conLiHtml);
                        });
                    }

                    if (type == "list") {

                        var confirmLiNo = $(".confirm-li").length + 1;
                        var confirmListLi = '<div class="row-title">' +
                            '<span>' + v.groupName + '</span>'
                            //+'<span class="confirm-num">总人数：<label>0</label></span>'
                            +
                            '</div>' +
                            '<div class="confirm-li">'
                            //+'<p><label class="confirm-li-no">'+confirmLiNo+'</label>'
                            +
                            '<label class="confirm-name">' + '<span id="conf_ISDNAME"></span>' + '</label><label class="confirm-sex">' + '<span id="conf_ISDNAME"></span>' + '</label></p>' +
                            '<p style="font-size:17px;">证件号：<label class="confirm-idno">' + '<span id="conf_ISDIDNO"></span>' + '</label></p>'
                            //+'<img src="../images/product/delete.png" class="confirm-delBtn">'
                            +
                            '</div>';

                        $("#confirmList").append(confirmListLi);
                    }

                })
                break;

            case "listPage1":
                var secListHtml;
                if ($(".secList").length == 0) {
                    secListHtml = '<div class="mui-input-group section secList">' +
                        '<ul class="mui-table-view">' +
                        '<li class="mui-table-view-cell">' +
                        '<a class="mui-navigate-right" id="' + v.xmlNode + '">' +
                        v.modelName +
                        '<span class="listPageTip" id="listPageTip1"></span></a>' +
                        '</li></ul></div>';
                    $("#page1 .buttonBlock").before(secListHtml);
                } else {
                    $("#page1 .secList ul").append('<li class="mui-table-view-cell"><a class="mui-navigate-right" id="' + v.xmlNode + '">' + v.modelName + '<span class="listPageTip" id="listPageTip1"></span></a></li>');
                }

                //生成listPage1页面
                $("#pt-main").append('<div class="pt-page" id="listPage1" last-page="page1"><div class="pt-triggers"><div class="row-group section info"></div></div></div>');
                //生成cardPage
                var cardPageHtml = '<div class="pt-page" id="cardPage" last-page="page1">' +
                    '<div class="pt-triggers">'

                +'<div class="buttonBlock">' +
                '<button type="button" class="mui-btn mui-btn-block card-button" id="cardAddBtn">添加</button>' +
                '<button type="button" class="mui-btn mui-btn-block card-button" id="cardSaveBtn">保存</button>' +
                '</div></div></div>';
                $("#pt-main").append(cardPageHtml);
                //生成提交按钮
                if ($("#listPage1Submit").length == 0) {
                    var btnHtml = '<div class="buttonBlock">' +
                        '<button type="button" class="mui-btn mui-btn-block card-button" id="listPage1Submit">保存</button>' +
                        '</div>';
                    $("#listPage1 .pt-triggers").append(btnHtml);
                }
                var $thisPage = $("#listPage1");
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    if (v.type == "label") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/baseinfo.png" class="title-row-icon">' +
                            v.groupName +
                            '</div>';

                    } else if (v.type == "scan") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/businessman.png" class="title-row-icon">' +
                            v.groupName +
                            '<img src="../images/scan.png" class="scanButton" alt="' + v.event + '">' +
                            '</div>';
                    }
                    $thisPage.find(".section").append(headHtml);
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        switch (v.type) {
                            case "text":
                                createText($thisPage.find(".section"), v);

                                break;
                            case "job":
                                createJob($thisPage.find(".section"), v);
                                break;
                            case "phoneNumber":
                                createPhoneNumber($thisPage.find(".section"), v);

                                break;
                            case "idcard":
                                createIdCard($thisPage.find(".section"), v);

                                break;
                            case "email":
                                createEmail($thisPage.find(".section"), v);

                                break;
                            case "numeric":
                                createNumeric($thisPage.find(".section"), v, "%");
                                break;
                            case "select":
                                createSelect($thisPage.find(".section"), v);
                                break;
                            case "date":
                                createDate($thisPage.find(".section"), v, {
                                    type: "date", //设置日历初始视图模式
                                    beginYear: 1900,
                                    endDate: new Date()
                                });
                                break;
                            case "radio":
                                createRadio($thisPage.find(".section"), v);
                                break;
                            default:
                                break;
                        }
                    });


                });

                $("#listPage1Submit").click(function() {
                    //mui.alert("listpage1");
                    //console.log(modelColumn);
                    listPage1flag = true; //重置标志位

                    //1.先判断是添加还是修改状态
                    if (cardStatus == "add") {
                        //跳转页面之前先校验
                        if (validNull("listPage1") && validBNF() && validPage('listPage1')) {
                            changePage("listPage1", "cardPage", "last");
                        }
                        if (validPage('listPage1')) {
                            var listPageObj = {};
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    getTextValue(listPageObj, v.keyName, v.type);
                                });
                            });

                            $("#listPage1").append("<input type='text' value='" + JSON.stringify(listPageObj) + "' class='listPage1HiddenInput'>");
                            //生成card页面基本信息
                            var cardHtml = '<div class="row-group section cardinfo"><div class="card-row">' +
                                '<label class="cardName">' + listPageObj.BNFNAME + '</label>' +
                                '<label class="cardRelationship" value="' + listPageObj.BNFISDRLT + '">' + listPageObj.BNFISDRLT_TEXT + '</label>' +
                                '<img src="../images/product/delete.png" class="deleteCardBtn">' +
                                '</div>' +
                                '<div class="card-row">' +
                                '<span class="card-row-6">受益人序号：<label class="green cardXuhao" value="' + listPageObj.BNFORDER + '">' + listPageObj.BNFORDER_TEXT + '</label></span>' +
                                '<span class="card-row-7">受益份额：<label class="green cardFene">' + listPageObj.BNFSHAREPCENT + '</label><label class="green">/100</label></span>' +
                                '</div>' +
                                '<div class="card-row">' +
                                '证件号：<label class="cardIdno">' + listPageObj.BNFIDNO + '</label>' +
                                '</div></div>';

                            $("#cardPage .buttonBlock").before(cardHtml);
                        }



                        $(".cardinfo").off("click");
                        //修改card方法
                        $(".cardinfo").on("click", function() {

                            var cardIndex = $(this).index();


                            var cardJson = JSON.parse($(".listPage1HiddenInput").eq(cardIndex).val());
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    setTextValue(cardJson, v.keyName, v.type);
                                });
                            });
                            //修改card状态
                            cardStatus = "edit";
                            editCardNo = cardIndex;

                            //修改上一页的地址
                            $("#cardPage").attr("last-page", "page1");
                            $("#listPage1").attr("last-page", "cardPage");

                            //2.跳转到前一页
                            changePage("cardPage", "listPage1", "next");
                            console.log(cardJson);
                        });

                        $(".deleteCardBtn").off("click");
                        //删除card方法
                        $(".deleteCardBtn").on("click", function() {

                            var cardIndex = $(this).parents(".cardinfo").index();

                            $(".cardinfo").eq(cardIndex).remove();
                            $(".listPage1HiddenInput").eq(cardIndex).remove();
                        });




                        //console.log(JSON.stringify(listPageObj));
                    } else if (cardStatus == "edit") {

                        if (validNull("listPage1") && validBNF() && validPage('listPage1')) {
                            changePage("listPage1", "cardPage", "last");
                        }
                        if (validPage('listPage1')) {
                            var listPageObj = {};
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    getTextValue(listPageObj, v.keyName, v.type);
                                });
                            });

                            //1.修改input的值
                            $(".listPage1HiddenInput").eq(editCardNo).val(JSON.stringify(listPageObj));

                            //2. 修改card页面对应card的值
                            $(".cardName").eq(editCardNo).html(listPageObj.BNFNAME);
                            $(".cardRelationship").eq(editCardNo).html(listPageObj.BNFISDRLT_TEXT);
                            $(".cardXuhao").eq(editCardNo).html(listPageObj.BNFORDER_TEXT);
                            $(".cardFene").eq(editCardNo).html(listPageObj.BNFSHAREPCENT);
                            $(".cardIdno").eq(editCardNo).html(listPageObj.BNFIDNO);
                        }
                    }
                    //添加card方法
                    $("#cardAddBtn").unbind("click");
                    $("#cardAddBtn").click(function() {
                        //1.先将前一个页面填写的内容清空
                        $.each(modelColumn, function(k, v) {
                            var groupColumn = v.groupColumn;
                            $.each(groupColumn, function(k, v) {
                                clearTextValue(v.keyName, v.type, v.value);
                            });
                        });

                        //修改card状态
                        cardStatus = "add";
                        //2.跳转到前一页
                        changePage("cardPage", "listPage1", "next");
                    });

                    //添加card保持方法
                    $("#cardSaveBtn").unbind("click");
                    $("#cardSaveBtn").click(function() {
                        //1.先将前一个页面填写的内容清空
                        $.each(modelColumn, function(k, v) {
                            var groupColumn = v.groupColumn;
                            $.each(groupColumn, function(k, v) {
                                clearTextValue(v.keyName, v.type, v.value);
                            });
                        });

                        var t = $("#cardPage").find(".section").length;

                        if (validBNFSum()) {
                            $(".listPageTip").html(t);
                            $(".cardinfo").remove();

                            //修改card状态
                            cardStatus = "add";
                            //2.跳转到前一页
                            changePage("cardPage", "page1", "last");
                        }


                    });
                });

                //点“受益人”事件
                $("#" + v.xmlNode).on("click", function() {
                    //1.判断是否已经存在card,存在则跳转到card页，不存在则跳转到填写页
                    if ($(".listPage1HiddenInput").length == 0) {
                        //修改card状态
                        cardStatus = "add";
                        changePage("page1", "listPage1", "next");

                    } else {
                        //修改card页面
                        $("#cardPage .buttonBlock").siblings(".cardinfo").remove();
                        for (var i = 0; i < $(".listPage1HiddenInput").length; i++) {
                            var listPageObj = JSON.parse($(".listPage1HiddenInput").eq(i).val());
                            //生成card页面基本信息
                            var cardHtml = '<div class="row-group section cardinfo"><div class="card-row">' +
                                '<label class="cardName">' + listPageObj.BNFNAME + '</label>' +
                                '<label class="cardRelationship" value="' + listPageObj.BNFISDRLT + '">' + listPageObj.BNFISDRLT_TEXT + '</label>' +
                                '<img src="../images/product/delete.png" class="deleteCardBtn">' +
                                '</div>' +
                                '<div class="card-row">' +
                                '<span class="card-row-6">受益人序号：<label class="green cardXuhao" value="' + listPageObj.BNFORDER + '">' + listPageObj.BNFORDER_TEXT + '</label></span>' +
                                '<span class="card-row-7">受益份额：<label class="green cardFene">' + listPageObj.BNFSHAREPCENT + '</label><label class="green">/100</label></span>' +
                                '</div>' +
                                '<div class="card-row">' +
                                '证件号：<label class="cardIdno">' + listPageObj.BNFIDNO + '</label>' +
                                '</div></div>';

                            $("#cardPage .buttonBlock").before(cardHtml);
                            $(".cardinfo").off("click");
                            //修改card方法
                            $(".cardinfo").on("click", function() {
                                var cardIndex = $(this).index();

                                var cardJson = JSON.parse($(".listPage1HiddenInput").eq(cardIndex).val());
                                $.each(modelColumn, function(k, v) {
                                    var groupColumn = v.groupColumn;
                                    $.each(groupColumn, function(k, v) {
                                        setTextValue(cardJson, v.keyName, v.type);
                                    });
                                });
                                //修改card状态
                                cardStatus = "edit";
                                editCardNo = cardIndex;

                                //修改上一页的地址
                                $("#cardPage").attr("last-page", "page1");
                                $("#listPage1").attr("last-page", "cardPage");

                                //2.跳转到前一页
                                changePage("cardPage", "listPage1", "next");
                                console.log(cardJson);
                            });

                            $(".deleteCardBtn").off("click");
                            //删除card方法
                            $(".deleteCardBtn").on("click", function() {

                                var cardIndex = $(this).parents(".cardinfo").index();

                                $(".cardinfo").eq(cardIndex).remove();
                                $(".listPage1HiddenInput").eq(cardIndex).remove();
                            });
                        }
                        changePage("page1", "cardPage", "next");
                    }

                });


                //二次遍历，为一些文本绑定计算公式
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.event != "") {
                            if (v.type == "select") {

                                var selectDom = document.getElementById(v.keyName);
                                var selectPickerData = v.value;

                                selectDom.addEventListener('tap', function() {
                                    var selectPicker = new mui.PopPicker();
                                    selectPicker.setData(selectPickerData);

                                    selectPicker.show(function(items) {
                                        $("#" + v.keyName).parent().next(".tip").text("").hide();
                                        selectDom.innerText = items[0].text;
                                        selectDom.setAttribute("value", items[0].value);
                                        if (selectDom.innerText == "本人") {
                                            //console.log("执行本人方法");
                                            var eventStr = v.event;
                                            var arr1 = eventStr.split(",");
                                            var fnName = arr1[0];
                                            if (fnName.indexOf("@") == 0) {
                                                fnName = fnName.substr(1);
                                                //console.log("执行copy方法");
                                                var arr2 = arr1.splice(1, arr1.length);
                                                //console.log(arr2);

                                                //copy(arr2);
                                                eval(fnName + "(arr2);");
                                            }

                                        }
                                        selectPicker.dispose();
                                    });
                                }, false);
                            }
                        }
                    });
                });


                break;

            case "listPage2":
                var secListHtml;
                if ($(".secList").length == 0) {
                    secListHtml = '<div class="mui-input-group section secList">' +
                        '<ul class="mui-table-view">' +
                        '<li class="mui-table-view-cell">' +
                        '<a class="mui-navigate-right" id="' + v.xmlNode + '">' +
                        v.modelName +
                        '<span class="listPageTip" id="listPageTip2"></span></a>' +
                        '</li></ul></div>';
                    $("#page1 .buttonBlock").before(secListHtml);
                } else {
                    $("#page1 .secList ul").append('<li class="mui-table-view-cell"><a class="mui-navigate-right" id="' + v.xmlNode + '">' + v.modelName + '<span class="listPageTip" id="listPageTip2"></span></a></li>');
                }

                //生成listPage1页面
                $("#pt-main").append('<div class="pt-page" id="listPage2" last-page="page1"><div class="pt-triggers"><div class="row-group section info"></div></div></div>');
                //生成cardPage
                var cardPageHtml = '<div class="pt-page" id="cardPage2" last-page="page1">' +
                    '<div class="pt-triggers">'

                +'<div class="buttonBlock">' +
                '<button type="button" class="mui-btn mui-btn-block card-button" id="card2AddBtn">添加</button>' +
                '<button type="button" class="mui-btn mui-btn-block card-button" id="card2SaveBtn">保存</button>' +
                '</div></div></div>';
                $("#pt-main").append(cardPageHtml);
                //生成提交按钮
                if ($("#listPage2Submit").length == 0) {
                    var btnHtml = '<div class="buttonBlock">' +
                        '<button type="button" class="mui-btn mui-btn-block card-button" id="listPage2Submit">保存</button>' +
                        '</div>';
                    $("#listPage2 .pt-triggers").append(btnHtml);
                }
                var $thisPage = $("#listPage2");
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    if (v.type == "label") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/baseinfo.png" class="title-row-icon">' +
                            v.groupName +
                            '</div>';

                    } else if (v.type == "scan") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/businessman.png" class="title-row-icon">' +
                            v.groupName +
                            '<img src="../images/scan.png" class="scanButton" alt="' + v.event + '">' +
                            '</div>';
                    }
                    $thisPage.find(".section").append(headHtml);
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        switch (v.type) {
                            case "text":
                                createText($thisPage.find(".section"), v);

                                break;
                            case "job":
                                createJob($thisPage.find(".section"), v);
                                break;
                            case "phoneNumber":
                                createPhoneNumber($thisPage.find(".section"), v);

                                break;
                            case "idcard":
                                createIdCard($thisPage.find(".section"), v);

                                break;
                            case "email":
                                createEmail($thisPage.find(".section"), v);

                                break;
                            case "numeric":
                                createNumeric($thisPage.find(".section"), v, "%");
                                break;
                            case "select":
                                createSelect($thisPage.find(".section"), v);
                                break;
                            case "date":
                                createDate($thisPage.find(".section"), v, {
                                    type: "date", //设置日历初始视图模式
                                    endDate: new Date(),
                                    beginYear: 1900
                                });
                                break;
                            case "radio":
                                createRadio($thisPage.find(".section"), v);
                                break;
                            default:
                                break;
                        }
                    });


                });

                $("#listPage2Submit").click(function() {

                    //1.先判断是添加还是修改状态
                    if (cardStatus2 == "add") {
                        //跳转页面之前先校验
                        if (validNull("listPage2") && validPage('listPage2')) {
                            changePage("listPage2", "cardPage2", "last");
                        }
                        if (validPage('listPage2')) {
                            var listPageObj = {};
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    getTextValue(listPageObj, v.keyName, v.type);
                                });
                            });

                            $("#listPage2").append("<input type='text' value='" + JSON.stringify(listPageObj) + "' class='listPage2HiddenInput'>");
                            //生成card页面基本信息
                            var cardHtml = '<div class="row-group section cardinfo2"><div class="card-row">' +
                                '<label class="cardName2">' + listPageObj.ISDNAME_F + '</label>' +
                                '<label class="cardRelationship2" value="' + listPageObj.APPRLT_F + '">' + listPageObj.APPRLT_F_TEXT + '</label>' +
                                '<img src="../images/product/delete.png" class="deleteCardBtn">' +
                                '</div>' +
                                '<div class="card-row">' +
                                '证件号：<label class="cardIdno2">' + listPageObj.ISDIDNO_F + '</label>' +
                                '</div></div>';

                            $("#cardPage2 .buttonBlock").before(cardHtml);
                        }



                        $(".cardinfo2").off("click");
                        //修改card方法
                        $(".cardinfo2").on("click", function() {

                            var cardIndex = $(this).index();
                            var cardJson = JSON.parse($(".listPage2HiddenInput").eq(cardIndex).val());
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    setTextValue(cardJson, v.keyName, v.type);
                                });
                            });
                            //修改card状态
                            cardStatus2 = "edit";
                            editCardNo2 = cardIndex;

                            //修改上一页的地址
                            $("#listPage2").attr("last-page", "cardPage2");
                            $("#cardPage2").attr("last-page", "page1");

                            //2.跳转到前一页
                            changePage("cardPage2", "listPage2", "next");
                            console.log(cardJson);
                        });

                        $(".deleteCardBtn").off("click");
                        //删除card方法
                        $(".deleteCardBtn").on("click", function() {

                            var cardIndex = $(this).parents(".cardinfo2").index();

                            $(".cardinfo2").eq(cardIndex).remove();
                            $(".listPage2HiddenInput").eq(cardIndex).remove();
                        });
                        //console.log(JSON.stringify(listPageObj));
                    } else if (cardStatus2 == "edit") {
                        //跳转card页面
                        if (validNull("listPage2") && validPage('listPage2')) {
                            changePage("listPage2", "cardPage2", "last");
                        }
                        if (validPage('listPage2')) {
                            var listPageObj = {};
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    getTextValue(listPageObj, v.keyName, v.type);
                                });
                            });

                            //1.修改input的值
                            $(".listPage2HiddenInput").eq(editCardNo2).val(JSON.stringify(listPageObj));

                            //2. 修改card页面对应card的值
                            $(".cardName2").eq(editCardNo2).html(listPageObj.ISDNAME_F);
                            $(".cardRelationship2").eq(editCardNo2).html(listPageObj.APPRLT_TEXT);
                            //$(".cardXuhao2").eq(editCardNo).html(listPageObj.BNFORDER_TEXT);
                            //$(".cardFene2").eq(editCardNo).html(listPageObj.BNFSHAREPCENT);
                            $(".cardIdno2").eq(editCardNo2).html(listPageObj.ISDIDNO_F);
                        }
                    }
                    //添加card方法
                    $("#card2AddBtn").unbind("click");
                    $("#card2AddBtn").click(function() {
                        //1.先将前一个页面填写的内容清空
                        $.each(modelColumn, function(k, v) {
                            var groupColumn = v.groupColumn;
                            $.each(groupColumn, function(k, v) {
                                clearTextValue(v.keyName, v.type, v.value);
                            });
                        });

                        //修改card状态
                        cardStatus2 = "add";
                        //重置下拉框的值
                        $("#APPRLT_F").attr("value", "");
                        //2.跳转到前一页
                        if (validPeopleSum()) {
                            changePage("cardPage2", "listPage2", "next");
                        }
                    });

                    //添加card保持方法
                    $("#card2SaveBtn").unbind("click");
                    $("#card2SaveBtn").click(function() {
                        //1.先将前一个页面填写的内容清空
                        $.each(modelColumn, function(k, v) {
                            var groupColumn = v.groupColumn;
                            $.each(groupColumn, function(k, v) {
                                clearTextValue(v.keyName, v.type, v.value);
                            });
                        });

                        var t = $("#cardPage2").find(".section").length;

                        $("#listPageTip2").html(t);
                        $(".cardinfo2").remove();

                        //修改card状态
                        cardStatus2 = "add";
                        //2.跳转到前一页
                        changePage("cardPage2", "page1", "last");

                    });
                });

                //点“福被保人”事件
                $("#" + v.xmlNode).on("click", function() {
                    //1.判断是否已经存在card,存在则跳转到card页，不存在则跳转到填写页
                    if ($(".listPage2HiddenInput").length == 0) {
                        //修改card状态
                        cardStatus2 = "add";
                        changePage("page1", "listPage2", "next");

                    } else {
                        //修改card页面
                        $("#cardPage2 .buttonBlock").siblings(".cardinfo2").remove();
                        for (var i = 0; i < $(".listPage2HiddenInput").length; i++) {
                            var listPageObj = JSON.parse($(".listPage2HiddenInput").eq(i).val());
                            //生成card页面基本信息
                            var cardHtml = '<div class="row-group section cardinfo2"><div class="card-row">' +
                                '<label class="cardName2">' + listPageObj.ISDNAME_F + '</label>' +
                                '<label class="cardRelationship2" value="' + listPageObj.APPRLT_F + '">' + listPageObj.APPRLT_F_TEXT + '</label>' +
                                '<img src="../images/product/delete.png" class="deleteCardBtn">' +
                                '</div>' +
                                '<div class="card-row">' +
                                '证件号：<label class="cardIdno2">' + listPageObj.ISDIDNO_F + '</label>' +
                                '</div></div>';

                            $("#cardPage2 .buttonBlock").before(cardHtml);
                            $(".cardinfo2").off("click");
                            //修改card方法
                            $(".cardinfo2").on("click", function() {
                                var cardIndex = $(this).index();

                                var cardJson = JSON.parse($(".listPage2HiddenInput").eq(cardIndex).val());
                                $.each(modelColumn, function(k, v) {
                                    var groupColumn = v.groupColumn;
                                    $.each(groupColumn, function(k, v) {
                                        setTextValue(cardJson, v.keyName, v.type);
                                    });
                                });
                                //修改card状态
                                cardStatus2 = "edit";
                                editCardNo2 = cardIndex;

                                //修改上一页的地址								
                                $("#listPage2").attr("last-page", "cardPage2");
                                $("#cardPage2").attr("last-page", "page1");

                                //2.跳转到前一页
                                changePage("cardPage2", "listPage2", "next");
                                console.log(cardJson);
                            });

                            $(".deleteCardBtn").off("click");
                            //删除card方法
                            $(".deleteCardBtn").on("click", function() {

                                var cardIndex = $(this).parents(".cardinfo2").index();

                                $(".cardinfo2").eq(cardIndex).remove();
                                $(".listPage2HiddenInput").eq(cardIndex).remove();
                            });
                        }
                        changePage("page1", "cardPage2", "next");
                    }

                });


                //二次遍历，为一些文本绑定计算公式
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.event != "") {
                            if (v.type == "select") {

                                var selectDom = document.getElementById(v.keyName);
                                var selectPickerData = v.value;

                                selectDom.addEventListener('tap', function() {
                                    var selectPicker = new mui.PopPicker();
                                    selectPicker.setData(selectPickerData);

                                    selectPicker.show(function(items) {
                                        $("#" + v.keyName).parent().next(".tip").text("").hide();
                                        selectDom.innerText = items[0].text;
                                        selectDom.setAttribute("value", items[0].value);
                                        if (selectDom.innerText == "本人") {
                                            //console.log("执行本人方法");
                                            var eventStr = v.event;
                                            var arr1 = eventStr.split(",");
                                            var fnName = arr1[0];
                                            if (fnName.indexOf("@") == 0) {
                                                fnName = fnName.substr(1);
                                                //console.log("执行copy方法");
                                                var arr2 = arr1.splice(1, arr1.length);
                                                //console.log(arr2);

                                                //copy(arr2);
                                                eval(fnName + "(arr2);");
                                            }

                                        }
                                        selectPicker.dispose();
                                    });
                                }, false);
                            }
                        }
                    });
                });


                break;


            case "listPage3":
                var secListHtml;
                if ($(".secList").length == 0) {
                    secListHtml = '<div class="mui-input-group section secList">' +
                        '<ul class="mui-table-view">' +
                        '<li class="mui-table-view-cell">' +
                        '<a class="mui-navigate-right" id="' + v.xmlNode + '">' +
                        v.modelName +
                        '<span class="listPageTip" id="listPageTip3"></span></a>' +
                        '</li></ul></div>';
                    $("#page1 .buttonBlock").before(secListHtml);
                } else {
                    $("#page1 .secList ul").append('<li class="mui-table-view-cell"><a class="mui-navigate-right" id="' + v.xmlNode + '">' + v.modelName + '<span class="listPageTip" id="listPageTip3"></span></a></li>');
                }

                //生成listPage1页面
                $("#pt-main").append('<div class="pt-page" id="listPage3" last-page="page1"><div class="pt-triggers"><div class="row-group section info"></div></div></div>');
                //生成cardPage
                var cardPageHtml = '<div class="pt-page" id="cardPage3" last-page="page1">' +
                    '<div class="pt-triggers">'

                +'<div class="buttonBlock">' +
                '<button type="button" class="mui-btn mui-btn-block card-button" id="card3AddBtn">添加</button>' +
                '<button type="button" class="mui-btn mui-btn-block card-button" id="card3SaveBtn">保存</button>' +
                '</div></div></div>';
                $("#pt-main").append(cardPageHtml);
                //生成提交按钮
                if ($("#listPage3Submit").length == 0) {
                    var btnHtml = '<div class="buttonBlock">' +
                        '<button type="button" class="mui-btn mui-btn-block card-button" id="listPage3Submit">保存</button>' +
                        '</div>';
                    $("#listPage3 .pt-triggers").append(btnHtml);
                }
                var $thisPage = $("#listPage3");
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    if (v.type == "label") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/baseinfo.png" class="title-row-icon">' +
                            v.groupName +
                            '</div>';

                    } else if (v.type == "scan") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/businessman.png" class="title-row-icon">' +
                            v.groupName +
                            '<img src="../images/scan.png" class="scanButton" alt="' + v.event + '">' +
                            '</div>';
                    }
                    $thisPage.find(".section").append(headHtml);
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        switch (v.type) {
                            case "text":
                                createText($thisPage.find(".section"), v);

                                break;
                            case "job":
                                createJob($thisPage.find(".section"), v);
                                break;
                            case "phoneNumber":
                                createPhoneNumber($thisPage.find(".section"), v);

                                break;
                            case "idcard":
                                createIdCard($thisPage.find(".section"), v);

                                break;
                            case "email":
                                createEmail($thisPage.find(".section"), v);

                                break;
                            case "numeric":
                                createNumeric($thisPage.find(".section"), v, "%");
                                break;
                            case "select":
                                createSelect($thisPage.find(".section"), v);
                                break;
                            case "date":
                                createDate($thisPage.find(".section"), v, {
                                    type: "date", //设置日历初始视图模式
                                    endDate: new Date(),
                                    beginYear: 1900
                                });
                                break;
                            case "radio":
                                createRadio($thisPage.find(".section"), v);
                                break;
                            default:
                                break;
                        }
                    });
                });

                $("#listPage3Submit").click(function() {
                    //listPage3flag = true;//重置标志位

                    //1.先判断是添加还是修改状态
                    if (cardStatus3 == "add") {
                        //跳转页面之前先校验
                        if (validNull("listPage3") && validPage('listPage3')) {
                            changePage("listPage3", "cardPage3", "last");
                        }
                        if (validPage('listPage3')) {
                            var listPageObj = {};
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    getTextValue(listPageObj, v.keyName, v.type);
                                });
                            });

                            $("#listPage3").append("<input type='text' value='" + JSON.stringify(listPageObj) + "' class='listPage3HiddenInput'>");
                            //生成card页面基本信息
                            var cardHtml = '<div class="row-group section cardinfo3"><div class="card-row3">' +
                                '<img src="../images/product/card-icon.png" class="card3-icon">' +
                                '<label class="cardName3">' + listPageObj.ISDNAME + '</label>' +
                                '<img src="../images/product/delete.png" class="deleteCardBtn" style="top:15px;right:10px;">' +
                                '</div>' +
                                '<div class="card-row" style="font-size:15px;padding-left:45px;">' +
                                '证件号：<label class="cardIdno3">' + listPageObj.ISDIDNO + '</label>' +
                                '</div></div>';

                            $("#cardPage3 .buttonBlock").before(cardHtml);
                        }

                        $(".cardinfo3").off("click");
                        //修改card方法
                        $(".cardinfo3").on("click", function() {
                            var cardIndex = $(this).index();
                            var cardJson = JSON.parse($(".listPage3HiddenInput").eq(cardIndex).val());
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    setTextValue(cardJson, v.keyName, v.type);
                                });
                            });
                            //修改card状态
                            cardStatus3 = "edit";
                            editCardNo3 = cardIndex;

                            //修改上一页的地址
                            $("#cardPage3").attr("last-page", "page1");
                            $("#listPage3").attr("last-page", "cardPage3");

                            //3.跳转到前一页
                            changePage("cardPage3", "listPage3", "next");
                            console.log(cardJson);
                        });

                        $(".deleteCardBtn").off("click");
                        //删除card方法
                        $(".deleteCardBtn").on("click", function() {

                            var cardIndex = $(this).parents(".cardinfo3").index();

                            $(".cardinfo3").eq(cardIndex).remove();
                            $(".listPage3HiddenInput").eq(cardIndex).remove();
                        });


                        //console.log(JSON.stringify(listPageObj));
                    } else if (cardStatus3 == "edit") {
                        //跳转card页面
                        if (validNull("listPage3") && validPage('listPage3')) {
                            changePage("listPage3", "cardPage3", "last");
                        }
                        if (validPage('listPage3')) {
                            var listPageObj = {};
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    getTextValue(listPageObj, v.keyName, v.type);
                                });
                            });

                            //1.修改input的值
                            $(".listPage3HiddenInput").eq(editCardNo3).val(JSON.stringify(listPageObj));

                            //2. 修改card页面对应card的值
                            $(".cardName3").eq(editCardNo3).html(listPageObj.BNFNAME);
                            /*$(".cardRelationship3").eq(editCardNo).html(listPageObj.BNFISDRLT_TEXT);
                            $(".cardXuhao3").eq(editCardNo).html(listPageObj.BNFORDER_TEXT);
                            $(".cardFene3").eq(editCardNo).html(listPageObj.BNFSHAREPCENT);*/
                            $(".cardIdno3").eq(editCardNo3).html(listPageObj.BNFIDNO);
                        }

                    }


                    //添加card方法
                    $("#card3AddBtn").unbind("click");
                    $("#card3AddBtn").click(function() {
                        //1.先将前一个页面填写的内容清空
                        $.each(modelColumn, function(k, v) {
                            var groupColumn = v.groupColumn;
                            $.each(groupColumn, function(k, v) {
                                clearTextValue(v.keyName, v.type, v.value);
                            });
                        });

                        //修改card状态
                        cardStatus3 = "add";

                        //2.跳转到前一页
                        changePage("cardPage3", "listPage3", "next");
                    });

                    //添加card保持方法
                    $("#card3SaveBtn").unbind("click");
                    $("#card3SaveBtn").click(function() {
                        //1.先将前一个页面填写的内容清空
                        $.each(modelColumn, function(k, v) {
                            var groupColumn = v.groupColumn;
                            $.each(groupColumn, function(k, v) {
                                clearTextValue(v.keyName, v.type, v.value);
                            });
                        });

                        var t = $("#cardPage3").find(".section").length;


                        $(".listPageTip3").html(t);
                        $(".cardinfo3").remove();

                        //修改card状态
                        cardStatus3 = "add";
                        //2.跳转到前一页
                        changePage("cardPage3", "page1", "last");

                    });
                });

                //点“受益人”事件
                $("#" + v.xmlNode).on("click", function() {
                    //1.判断是否已经存在card,存在则跳转到card页，不存在则跳转到填写页
                    if ($(".listPage3HiddenInput").length == 0) {
                        //修改card状态
                        cardStatus3 = "add";
                        changePage("page1", "listPage3", "next");

                    } else {
                        //修改card页面
                        $("#cardPage3 .buttonBlock").siblings(".cardinfo3").remove();
                        for (var i = 0; i < $(".listPage3HiddenInput").length; i++) {
                            var listPageObj = JSON.parse($(".listPage3HiddenInput").eq(i).val());
                            //生成card页面基本信息
                            var cardHtml = '<div class="row-group section cardinfo3"><div class="card-row3">' +
                                '<img src="../images/product/card-icon.png" class="card3-icon">' +
                                '<label class="cardName3">' + listPageObj.ISDNAME + '</label>' +
                                '<img src="../images/product/delete.png" class="deleteCardBtn" style="top:15px;right:10px;">' +
                                '</div>' +
                                '<div class="card-row" style="font-size:15px;padding-left:45px;">' +
                                '证件号：<label class="cardIdno3">' + listPageObj.ISDIDNO + '</label>' +
                                '</div></div>';

                            $("#cardPage3 .buttonBlock").before(cardHtml);
                            $(".cardinfo3").off("click");
                            //修改card方法
                            $(".cardinfo3").on("click", function() {
                                var cardIndex = $(this).index();

                                var cardJson = JSON.parse($(".listPage3HiddenInput").eq(cardIndex).val());
                                $.each(modelColumn, function(k, v) {
                                    var groupColumn = v.groupColumn;
                                    $.each(groupColumn, function(k, v) {
                                        setTextValue(cardJson, v.keyName, v.type);
                                    });
                                });
                                //修改card状态
                                cardStatus3 = "edit";
                                editCardNo3 = cardIndex;

                                //修改上一页的地址
                                $("#cardPage3").attr("last-page", "page1");
                                $("#listPage3").attr("last-page", "cardPage3");

                                //2.跳转到前一页
                                changePage("cardPage3", "listPage3", "next");
                                console.log(cardJson);
                            });

                            $(".deleteCardBtn").off("click");
                            //删除card方法
                            $(".deleteCardBtn").on("click", function() {

                                var cardIndex = $(this).parents(".cardinfo3").index();

                                $(".cardinfo3").eq(cardIndex).remove();
                                $(".listPage3HiddenInput").eq(cardIndex).remove();
                            });
                        }
                        changePage("page1", "cardPage3", "next");
                    }

                });


                //二次遍历，为一些文本绑定计算公式
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.event != "") {
                            if (v.type == "select") {

                                var selectDom = document.getElementById(v.keyName);
                                var selectPickerData = v.value;

                                selectDom.addEventListener('tap', function() {
                                    var selectPicker = new mui.PopPicker();
                                    selectPicker.setData(selectPickerData);

                                    selectPicker.show(function(items) {
                                        selectDom.innerText = items[0].text;
                                        selectDom.setAttribute("value", items[0].value);
                                        if (selectDom.innerText == "本人") {
                                            //console.log("执行本人方法");
                                            var eventStr = v.event;
                                            var arr1 = eventStr.split(",");
                                            var fnName = arr1[0];
                                            if (fnName.indexOf("@") == 0) {
                                                fnName = fnName.substr(1);
                                                //console.log("执行copy方法");
                                                var arr2 = arr1.splice(1, arr1.length);
                                                //console.log(arr2);

                                                //copy(arr2);
                                                eval(fnName + "(arr2);");
                                            }

                                        }
                                        selectPicker.dispose();
                                    });
                                }, false);
                            }
                        }
                    });
                });


                break;

            case "listPage4":
                var secListHtml;

                // 被保人模块是否存在
                if ($(".secList").length == 0) {
                    secListHtml = '<div class="mui-input-group section secList">' +
                        '<ul class="mui-table-view">' +
                        '<li class="mui-table-view-cell">' +
                        '<a class="mui-navigate-right" id="' + v.xmlNode + '">' +
                        v.modelName +
                        '<span class="listPageTip" id="listPageTip2"></span></a>' +
                        '</li></ul></div>';
                    $("#page1 .buttonBlock").before(secListHtml);
                } else {
                    $("#page1 .secList ul").append('<li class="mui-table-view-cell"><a class="mui-navigate-right" id="' + v.xmlNode + '">' + v.modelName + '<span class="listPageTip" id="listPageTip2"></span></a></li>');
                }

                //生成listPage页面  具体职业姓名等详细信息
                $("#pt-main").append('<div class="pt-page" id="listPage2" last-page="page1"><div class="pt-triggers"><div class="row-group section info"></div></div></div>');




                //生成cardPage   整个名单列表
                var cardPageHtml = '<div class="pt-page" id="cardPage2" last-page="page1">' +
                    '<div class="pt-triggers">' + '<div class="buttonBlock">' + '<button type="button" class="mui-btn mui-btn-block card-button" id="card2AddBtn">添加</button>' +
                    '<button type="button" class="mui-btn mui-btn-block card-button" id="card2SaveBtn">保存</button>' +
                    '</div></div></div>';
                $("#pt-main").append(cardPageHtml);


                var cardPageHtml2 = '<li class="mui-card"><ul><li><a id=icon-close><span class="mui-icon mui-icon-close"></span></a><span id=num>1</span><div class=comtent><p><span>姓名</span><span>张三</span></p><p><span>身份证</span><span>330382198607226940</span></p></div><li><a id=icon-close><span class="mui-icon mui-icon-close"></span></a><span id=num>1</span><div class=comtent><p><span>姓名</span><span>张三</span></p><p><span>身份证</span><span>330382198607226940</span></p></div><li><a id=icon-close><span class="mui-icon mui-icon-close"></span></a><span id=num>1</span><div class=comtent><p><span>姓名</span><span>张三</span></p><p><span>身份证</span><span>330382198607226940</span></p></div></ul></li>';
                $(".secList .mui-table-view").append(cardPageHtml2);


                //生成首页模块中的名单列表




                //生成提交按钮  listpage中的保存按钮  无需修改
                if ($("#listPage2Submit").length == 0) {
                    var btnHtml = '<div class="buttonBlock">' +
                        '<button type="button" class="mui-btn mui-btn-block card-button" id="listPage2Submit">保存</button>' +
                        '</div>';
                    $("#listPage2 .pt-triggers").append(btnHtml);
                }


                var $thisPage = $("#listPage2");


                var modelColumn = v.modelColumn;







                $.each(modelColumn, function(k, v) {
                    if (v.type == "label") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/baseinfo.png" class="title-row-icon">' +
                            v.groupName +
                            '</div>';

                    } else if (v.type == "scan") {
                        var headHtml = '<div class="title-row">' +
                            '<img src="../images/product/businessman.png" class="title-row-icon">' +
                            v.groupName +
                            '<img src="../images/scan.png" class="scanButton" alt="' + v.event + '">' +
                            '</div>';
                    }
                    $thisPage.find(".section").append(headHtml);
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        switch (v.type) {
                            case "text":
                                createText($thisPage.find(".section"), v);

                                break;
                            case "job":
                                createJob($thisPage.find(".section"), v);
                                break;
                            case "phoneNumber":
                                createPhoneNumber($thisPage.find(".section"), v);

                                break;
                            case "idcard":
                                createIdCard($thisPage.find(".section"), v);

                                break;
                            case "email":
                                createEmail($thisPage.find(".section"), v);

                                break;
                            case "numeric":
                                createNumeric($thisPage.find(".section"), v, "%");
                                break;
                            case "select":
                                createSelect($thisPage.find(".section"), v);
                                break;
                            case "date":
                                createDate($thisPage.find(".section"), v, {
                                    type: "date", //设置日历初始视图模式
                                    endDate: new Date(),
                                    beginYear: 1900
                                });
                                break;
                            case "radio":
                                createRadio($thisPage.find(".section"), v);
                                break;
                            default:
                                break;
                        }
                    });


                });


                //  listpage中的保存按钮  点击事件
                $("#listPage2Submit").click(function() {

                    //1.先判断是添加还是修改状态
                    if (cardStatus2 == "add") {
                        //跳转页面之前先校验
                        if (validNull("listPage2") && validPage('listPage2')) {
                            changePage("listPage2", "cardPage2", "last");
                        }
                        if (validPage('listPage2')) {
                            var listPageObj = {};
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    getTextValue(listPageObj, v.keyName, v.type);
                                });
                            });

                            $("#listPage2").append("<input type='text' value='" + JSON.stringify(listPageObj) + "' class='listPage2HiddenInput'>");
                            //生成card页面基本信息   被保人列表页
                            var cardHtml = '<div class="row-group section cardinfo2"><div class="card-row">' +
                                '<label class="cardName2">' + listPageObj.ISDNAME_F + '</label>' +
                                '<label class="cardRelationship2" value="' + listPageObj.APPRLT_F + '">' + listPageObj.APPRLT_F_TEXT + '</label>' +
                                '<img src="../images/product/delete.png" class="deleteCardBtn">' +
                                '</div>' +
                                '<div class="card-row">' +
                                '证件号：<label class="cardIdno2">' + listPageObj.ISDIDNO_F + '</label>' +
                                '</div></div>';

                            $("#cardPage2 .buttonBlock").before(cardHtml);
                        }



                        $(".cardinfo2").off("click");
                        //修改card方法
                        $(".cardinfo2").on("click", function() {

                            var cardIndex = $(this).index();
                            var cardJson = JSON.parse($(".listPage2HiddenInput").eq(cardIndex).val());
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    setTextValue(cardJson, v.keyName, v.type);
                                });
                            });
                            //修改card状态
                            cardStatus2 = "edit";
                            editCardNo2 = cardIndex;

                            //修改上一页的地址
                            $("#listPage2").attr("last-page", "cardPage2");
                            $("#cardPage2").attr("last-page", "page1");

                            //2.跳转到前一页
                            changePage("cardPage2", "listPage2", "next");
                            console.log(cardJson);
                        });

                        $(".deleteCardBtn").off("click");
                        //删除card方法
                        $(".deleteCardBtn").on("click", function() {

                            var cardIndex = $(this).parents(".cardinfo2").index();

                            $(".cardinfo2").eq(cardIndex).remove();
                            $(".listPage2HiddenInput").eq(cardIndex).remove();
                        });
                        //console.log(JSON.stringify(listPageObj));
                    } else if (cardStatus2 == "edit") {
                        //跳转card页面
                        if (validNull("listPage2") && validPage('listPage2')) {
                            changePage("listPage2", "cardPage2", "last");
                        }
                        if (validPage('listPage2')) {
                            var listPageObj = {};
                            $.each(modelColumn, function(k, v) {
                                var groupColumn = v.groupColumn;
                                $.each(groupColumn, function(k, v) {
                                    getTextValue(listPageObj, v.keyName, v.type);
                                });
                            });

                            //1.修改input的值
                            $(".listPage2HiddenInput").eq(editCardNo2).val(JSON.stringify(listPageObj));

                            //2. 修改card页面对应card的值
                            $(".cardName2").eq(editCardNo2).html(listPageObj.ISDNAME_F);
                            $(".cardRelationship2").eq(editCardNo2).html(listPageObj.APPRLT_TEXT);
                            //$(".cardXuhao2").eq(editCardNo).html(listPageObj.BNFORDER_TEXT);
                            //$(".cardFene2").eq(editCardNo).html(listPageObj.BNFSHAREPCENT);
                            $(".cardIdno2").eq(editCardNo2).html(listPageObj.ISDIDNO_F);
                        }
                    }
                    //添加card方法
                    $("#card2AddBtn").unbind("click");
                    $("#card2AddBtn").click(function() {
                        //1.先将前一个页面填写的内容清空
                        $.each(modelColumn, function(k, v) {
                            var groupColumn = v.groupColumn;
                            $.each(groupColumn, function(k, v) {
                                clearTextValue(v.keyName, v.type, v.value);
                            });
                        });

                        //修改card状态
                        cardStatus2 = "add";
                        //重置下拉框的值
                        $("#APPRLT_F").attr("value", "");
                        //2.跳转到前一页
                        if (validPeopleSum()) {
                            changePage("cardPage2", "listPage2", "next");
                        }
                    });

                    //添加card保持方法
                    $("#card2SaveBtn").unbind("click");
                    $("#card2SaveBtn").click(function() {
                        //1.先将前一个页面填写的内容清空
                        $.each(modelColumn, function(k, v) {
                            var groupColumn = v.groupColumn;
                            $.each(groupColumn, function(k, v) {
                                clearTextValue(v.keyName, v.type, v.value);
                            });
                        });

                        var t = $("#cardPage2").find(".section").length;

                        $("#listPageTip2").html(t);
                        $(".cardinfo2").remove();

                        //修改card状态
                        cardStatus2 = "add";
                        //2.跳转到前一页
                        changePage("cardPage2", "page1", "last");

                    });
                });


                //点“福被保人”事件
                $("#" + v.xmlNode).on("click", function() {
                    //1.判断是否已经存在card,存在则跳转到card页，不存在则跳转到填写页
                    if ($(".listPage2HiddenInput").length == 0) {
                        //修改card状态
                        cardStatus2 = "add";
                        changePage("page1", "listPage2", "next");

                    } else {
                        //修改card页面
                        $("#cardPage2 .buttonBlock").siblings(".cardinfo2").remove();
                        for (var i = 0; i < $(".listPage2HiddenInput").length; i++) {
                            var listPageObj = JSON.parse($(".listPage2HiddenInput").eq(i).val());
                            //生成card页面基本信息
                            var cardHtml = '<div class="row-group section cardinfo2"><div class="card-row">' +
                                '<label class="cardName2">' + listPageObj.ISDNAME_F + '</label>' +
                                '<label class="cardRelationship2" value="' + listPageObj.APPRLT_F + '">' + listPageObj.APPRLT_F_TEXT + '</label>' +
                                '<img src="../images/product/delete.png" class="deleteCardBtn">' +
                                '</div>' +
                                '<div class="card-row">' +
                                '证件号：<label class="cardIdno2">' + listPageObj.ISDIDNO_F + '</label>' +
                                '</div></div>';

                            $("#cardPage2 .buttonBlock").before(cardHtml);
                            $(".cardinfo2").off("click");
                            //修改card方法
                            $(".cardinfo2").on("click", function() {
                                var cardIndex = $(this).index();

                                var cardJson = JSON.parse($(".listPage2HiddenInput").eq(cardIndex).val());
                                $.each(modelColumn, function(k, v) {
                                    var groupColumn = v.groupColumn;
                                    $.each(groupColumn, function(k, v) {
                                        setTextValue(cardJson, v.keyName, v.type);
                                    });
                                });
                                //修改card状态
                                cardStatus2 = "edit";
                                editCardNo2 = cardIndex;

                                //修改上一页的地址								
                                $("#listPage2").attr("last-page", "cardPage2");
                                $("#cardPage2").attr("last-page", "page1");

                                //2.跳转到前一页
                                changePage("cardPage2", "listPage2", "next");
                                console.log(cardJson);
                            });

                            $(".deleteCardBtn").off("click");
                            //删除card方法
                            $(".deleteCardBtn").on("click", function() {

                                var cardIndex = $(this).parents(".cardinfo2").index();

                                $(".cardinfo2").eq(cardIndex).remove();
                                $(".listPage2HiddenInput").eq(cardIndex).remove();
                            });
                        }
                        changePage("page1", "cardPage2", "next");
                    }

                });


                //二次遍历，为一些文本绑定计算公式
                $.each(v.modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.event != "") {
                            if (v.type == "select") {

                                var selectDom = document.getElementById(v.keyName);
                                var selectPickerData = v.value;

                                selectDom.addEventListener('tap', function() {
                                    var selectPicker = new mui.PopPicker();
                                    selectPicker.setData(selectPickerData);

                                    selectPicker.show(function(items) {
                                        $("#" + v.keyName).parent().next(".tip").text("").hide();
                                        selectDom.innerText = items[0].text;
                                        selectDom.setAttribute("value", items[0].value);
                                        if (selectDom.innerText == "本人") {
                                            //console.log("执行本人方法");
                                            var eventStr = v.event;
                                            var arr1 = eventStr.split(",");
                                            var fnName = arr1[0];
                                            if (fnName.indexOf("@") == 0) {
                                                fnName = fnName.substr(1);
                                                //console.log("执行copy方法");
                                                var arr2 = arr1.splice(1, arr1.length);
                                                //console.log(arr2);

                                                //copy(arr2);
                                                eval(fnName + "(arr2);");
                                            }

                                        }
                                        selectPicker.dispose();
                                    });
                                }, false);
                            }
                        }
                    });
                });
                break;




            default:
                break;
        }
    });

}

function getSingleTextValue(selectId, type) {
    var res = "";
    if (type == "select") {
        res = $("#" + selectId).attr("value");
    } else if (type == "radio") {
        res = $('input:radio[name=' + selectId + ']:checked').val();
    } else if (type == "textarea") {
        res = $("#" + selectId).text();
    } else {
        res = $("#" + selectId).val();
    }
    return res;
}

var homeflag = true; //验证全局变量
var homeNullFlag = true; //验证全局变量
var nextPageflag = true; //验证全局变量
var listPage1flag = true; //验证全局变量
var listPage2flag = true; //验证全局变量
var listPage3flag = true; //验证全局变量
function validNull(pageName) {
    homeNullFlag = true;
    if (pageName == "home") {
        $.each(productJson, function(k, v) {
            if (v.modelType == "home") {
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.notNull == "Y") {
                            var textValue = getSingleTextValue(v.keyName, v.type);
                            if (textValue == "") {
                                console.log(v.keyText + "不能为空");
                                $("#" + v.keyName).parent().next(".tip").text(v.keyText + "不能为空").show();
                                homeNullFlag = false;
                            } else {
                                console.log("false")
                                homeNullFlag = true;
                                console.log(homeNullFlag);
                                // $("#" + v.keyName).parent().next(".tip").hide();

                            }
                        }
                    });
                });

            }
        });
        return homeNullFlag;
    } else if (pageName == "nextPage") {
        nextPageflag = true;
        $.each(productJson, function(k, v) {
            if (v.modelType == "nextPage") {
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.notNull == "Y") {
                            var textValue = getSingleTextValue(v.keyName, v.type);
                            if (textValue == "") {
                                console.log(v.keyText + "不能为空");
                                $("#" + v.keyName).parent().next(".tip").text(v.keyText + "不能为空").show();
                                nextPageflag = false;
                            } else {
                                $("#" + v.keyName).parent().next(".tip").hide();
                            }
                        }
                    });
                });

            }
        });
        return nextPageflag;
    } else if (pageName == "listPage1") {
        listPage1flag = true;
        $.each(productJson, function(k, v) {
            if (v.modelType == "listPage1") {
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.notNull == "Y") {
                            var textValue = getSingleTextValue(v.keyName, v.type);
                            if (textValue == "") {
                                console.log(v.keyText + "不能为空");
                                $("#" + v.keyName).parent().next(".tip").text(v.keyText + "不能为空").show();
                                listPage1flag = false;
                            } else {
                                $("#" + v.keyName).parent().next(".tip").hide();
                            }
                        }
                    });
                });
            }
        });
        return listPage1flag;
    } else if (pageName == "listPage2") {
        listPage2flag = true;
        $.each(productJson, function(k, v) {
            if (v.modelType == "listPage2") {
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.notNull == "Y") {
                            var textValue = getSingleTextValue(v.keyName, v.type);
                            if (textValue == "") {
                                console.log(v.keyText + "不能为空");
                                $("#" + v.keyName).parent().next(".tip").text(v.keyText + "不能为空").show();
                                listPage2flag = false;
                            } else {
                                $("#" + v.keyName).parent().next(".tip").hide();
                            }
                        }
                    });
                });
            }
        });
        return listPage2flag;
    } else if (pageName == "listPage3") {
        listPage3flag = true;
        $.each(productJson, function(k, v) {
            if (v.modelType == "listPage3") {
                var modelColumn = v.modelColumn;
                $.each(modelColumn, function(k, v) {
                    var groupColumn = v.groupColumn;
                    $.each(groupColumn, function(k, v) {
                        if (v.notNull == "Y") {
                            var textValue = getSingleTextValue(v.keyName, v.type);
                            if (textValue == "") {
                                console.log(v.keyText + "不能为空");
                                $("#" + v.keyName).parent().next(".tip").text(v.keyText + "不能为空").show();
                                listPage3flag = false;
                            } else {
                                $("#" + v.keyName).parent().next(".tip").hide();
                            }
                        }
                    });
                });
            }
        });
        return listPage3flag;
    }

}


function validBNF() {
    var bnfFlag = true;
    var $bnf = $("#BNFSHAREPCENT");
    var bnfLen = $bnf.length;
    if (bnfLen > 0) {
        if (parseInt($bnf.val()) > 100) {
            $bnf.parent().next(".tip").text("受益份额不能超过100").show();
            bnfFlag = false;
        }
    }
    return bnfFlag;
}

function validBNFSum() {
    var listPage1Len = $("#listPage1").length;
    if (listPage1Len == 0) {
        return true;
    } else {
        var listPage1HiddenInput = $(".listPage1HiddenInput");
        if (listPage1HiddenInput.length == 0) {
            return true;
        } else {
            var sum = 0;
            $.each(listPage1HiddenInput, function(k, v) {
                var valJson = JSON.parse(v.value);
                var fene = parseInt(valJson.BNFSHAREPCENT)
                sum = sum + fene;
            });
            if (sum != 100) {
                mui.alert("受益人份额之和应该为100");
                return false;

            } else {
                return true;
            }
        }

    }

}

function validPeopleSum() {
    var cardinfo2Len = $(".cardinfo2").length;
    if (cardinfo2Len >= 4) {
        mui.alert("最多为4个副被保人");
        return false;
    } else {
        return true;
    }

}

function validVALIDDATE() {
    var el = $("#VALIDDATE");
    var today = $.others.getDay(0);
    if (el.length > 0) {
        console.log(today);
        var elVal = el.val();
        if (elVal > today) {
            return true;
        } else {
            mui.toast("投保日期必须大于当前日期", { duration: 90000, type: 'div' });
            return false;
        }
    } else {
        return true;
    }
}

function validPage(pageName) {
    var flag = true;
    var tip = $("#" + pageName).find(".tip");
    $.each(tip, function(k, v) {
        if ($(v).css("display") == "block") {
            flag = false;
        }
    })

    return flag;
}

function setWebviewTitle(str) {
    if (mui.os.android) {
        // mui.alert("title");
        try {
            if ((window.androidx.setTitle) && typeof(window.androidx.setTitle) == "function") {
                window.androidx.setTitle(str);
            }
        } catch (e) {
            console.log("方法不存在");
        }

    } else if (mui.os.ios) {
        setupWebViewJavascriptBridge(function(bridge) {
            bridge.registerHandler('testJSFunction', function(data, responseCallback) {
                alert('JS方法被调用:' + data);
                responseCallback('js执行过了');
            })
        });

        WebViewJavascriptBridge.callHandler('setTitle', str, function(response) {

        });
    }
}

function sc() {
    $(".favorite").click()
}