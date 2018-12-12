function validCardSpecial(prdId){
	switch(prdId){
		
	case "32"://异常关爱女性A卡
		var idCard = $("#ISDIDNO").val();
		var tbAge = $.others.IdCard(idCard,3);
		var sex = $.others.IdCard(idCard,2);
		if(tbAge >= 18 && tbAge <=50 && sex === "女"){
			return true;
		}else{
			if(tbAge <18){
				mui.toast('投保年龄不得小于18');
			}else if(tbAge>50){
				mui.toast('投保年龄不得大于50');
			}else if(sex === "男"){
				mui.toast('被保人性别必须为女性');
			}
			return false;
		}
		
		break;
	case "16"://全家福120元
	    var flag = true;
		var bbr = $("#ISDIDNO").val();
		var $listPage2HiddenInput = $(".listPage2HiddenInput");
		$.each($listPage2HiddenInput, function(k,v) {
			var listPage2HiddenInputValueJson = JSON.parse($(v).val());
			var bbr_F = listPage2HiddenInputValueJson.ISDIDNO_F;
			if(bbr === bbr_F){
				mui.toast('主副被保人不能相同！');
				flag = false;
			}
		});
		
		return flag;
	case "17"://全家福240元
	    var flag = true;
		var bbr = $("#ISDIDNO").val();
		var $listPage2HiddenInput = $(".listPage2HiddenInput");
		$.each($listPage2HiddenInput, function(k,v) {
			var listPage2HiddenInputValueJson = JSON.parse($(v).val());
			var bbr_F = listPage2HiddenInputValueJson.ISDIDNO_F;
			if(bbr === bbr_F){
				mui.toast('主副被保人不能相同！');
				flag = false;
			}
		});
		
		return flag;
	case "18"://全家福3600元
	    var flag = true;
		var bbr = $("#ISDIDNO").val();
		var $listPage2HiddenInput = $(".listPage2HiddenInput");
		$.each($listPage2HiddenInput, function(k,v) {
			var listPage2HiddenInputValueJson = JSON.parse($(v).val());
			var bbr_F = listPage2HiddenInputValueJson.ISDIDNO_F;
			if(bbr === bbr_F){
				mui.toast('主副被保人不能相同！');
				flag = false;
			}
		});
		
		return flag;

	default:
	  return true;
	}
}
