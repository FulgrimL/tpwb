/*
 * 此js里面为卡单json里面的自定义方法
 */
function keyName2KeyValue(keyName,modelColumn){
	//console.log(modelColumn);
	for(var x in modelColumn ){
		if(modelColumn[x].keyName == keyName){
			console.log(modelColumn[x].value);
			var v = modelColumn[x].value;
			var vLen = v.length;
			var resV = v.substr(1,vLen-1);
			return resV;
		}
	}
}

//自定义解析方法
function copy(arr){
	var len = arr.length;
	for(var i = 0;i<len;i +=2){
		setKeyNameValue(arr[i],arr[i+1]);
	}
}

//自定义解析方法
function addDay(a,b){
	var startDate = $("#"+a).val();
	var duration = getKeyNameValue(b)[1];
	
	if (duration != "") {
		len = duration.length;
		var durationNum = parseInt(duration.substr(1,len-1));
		var dw = duration.substr(0,1);
		if(dw == "Y"){
			var d1 = new Date(startDate); 
			var d2 = new Date(d1); 
			d2.setFullYear(d2.getFullYear()+durationNum);
			d2.setDate(d2.getDate()-1); 
			var c = Global.DateUtil.formatDate(d2);

			return c;
		}else if(dw == "D"){
			var d = Global.DateUtil.addNDays(startDate,durationNum);
			var df = Global.DateUtil.formatDate(d);
			
			return df;
		}
		
	}else{
		return "";
	}
}

//自定义解析方法	
var changeValue = function(p,modelColumn){
	var keyValue = keyName2KeyValue(p,modelColumn);
	var args = keyValue.split(",");
	var count = args.length;
    var funcName = args[0];   
    var str = funcName+"(";
    for(var i =1;i<count;i++){     
		//eval(name+"('xia','li')");
		if(i!=count-1){
			str += "'"+args[i]+"',"
		}
		else{
			str += "'"+args[i]+"')"
		}
		
    }
	return eval(str);
}

var multiply = function(n,single){
	var a = parseInt(n);
	var b = parseInt(single);
	var c = (a*b).toFixed(2);
	
	return c;
}

//自定义解析方法
function setDate(dateStr){
	if (dateStr != "") {
		len = dateStr.length;
		var durationNum = parseInt(dateStr.substr(0,len-1));
		var dw = dateStr.substr(len-1,len);
		if(dw == "年"){
			var d1 = new Date(startDate); 
			var d2 = new Date(d1); 
			d2.setFullYear(d2.getFullYear()+durationNum); 
			d2.setDate(d2.getDate()-1); 
			var c = Global.DateUtil.formatDate(d2);

			return c;
		}else if(dw == "天"){
			var startDate = $.others.getDay(0);

			var d = Global.DateUtil.addNDays(startDate,durationNum);
			var df = Global.DateUtil.formatDate(d);
			
			return df;
		}
		
	}else{
		return "";
	}
}

function setTime(timeStr) {
	var myDate = new Date();
	var hh = myDate.getHours();
	hh = hh > 9 ? hh : "0" + hh;
	var mm = myDate.getMinutes();
	mm = mm > 9 ? mm : "0" + mm;
	var r = hh + ":" + mm;
	return r;
}

function setTime2(timeStr){
	if (timeStr != "") {
		len = timeStr.length;
		var durationNum = parseInt(timeStr.substr(0,len-1));
		var dw = timeStr.substr(len-1,len);
		if(dw == "时"){
			var d = new Date();
	    	var time = d.getTime();
	    	var newTime = time + durationNum *60 * 60 * 1000;
	    	var r = new Date(newTime);
			var df = Global.DateUtil.formatDate(r);
			var c = df.substr(11,5);

			return c;
		}else if(dw == "分"){
			var d = new Date();
	    	var time = d.getTime();
	    	var newTime = time + durationNum * 60 * 1000;
	    	var r = new Date(newTime);
			var df = r.Format("yyyy-MM-dd hh:mm:ss.S")
			var c = df.substr(11,5);
			return c;
		}
		
	}else{
		return "";
	}
}

function setIDInfo(idNumber,arr){
	var sex = $.others.IdCard(idNumber,2);
	if(sex == "男"){
		sex = "M";
	}else if(sex == "女"){
		sex = "F";
	}
	var birthday = $.others.IdCard(idNumber,1);
	var len = arr.length;
	var cardName = getKeyNameValue(arr[0])[0];
	if(cardName == "身份证"){		
		$("#"+arr[1]).val(birthday);
		$('input:radio[name='+arr[2]+'][value="'+sex+'"]').prop("checked",true);
	}
	
}

//自定义解析方法，用于场意保产品
//function setCYB(){
function getVersion(){
	var version = getKeyNameValue("VERSION")[1];
	var areaRange = getKeyNameValue("AREARANGE")[1];
	
	//console.log("调用接口获取产品编码，投保人数，保险费的值");
	//GetData("products/selectCYB",function(res){
    /*var url;
    if (getUrlParam('prdId') == 199){
        url = "products/getVersion"
    }else{
        url = "products/selectCYB"
    }
    GetData(url,function(res){*/
    GetData("products/getVersion",function(res){
		console.log(res);
		var insurePeoples = res.data.insurePeoples;
		var memo = res.data.memo;
		var prdprem = res.data.prdprem;
		var prdcode = res.data.prdcode;
		$("#PRDCODE").val(prdcode);
		$("#INSUREPEOPLES").val(insurePeoples);
		$("#PRDPREM").val(prdprem);
		$("#MEMO").html(memo);
		
	},{"productsId":prdId,"version":version,"areaRange":areaRange})
}

//自定义解析方法，用于场意保产品
function setCYB(){
    var version = getKeyNameValue("VERSION")[1];
    var areaRange = getKeyNameValue("AREARANGE")[1];
    GetData("products/selectCYB",function(res){
        console.log(res);
        var insurePeoples = res.data.insurePeoples;
        var memo = res.data.memo;
        var prdprem = res.data.prdprem;
        var prdcode = res.data.prdcode;
        $("#PRDCODE").val(prdcode);
        $("#INSUREPEOPLES").val(insurePeoples);
        $("#PRDPREM").val(prdprem);
        $("#MEMO").html(memo);

    },{"productsId":prdId,"version":version,"areaRange":areaRange})
}