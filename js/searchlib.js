(function($, doc, $$) {
	var page1Num = 1;
	var page2Num = 1;
	var limit = 10;

	var deceleration = mui.os.ios?0.003:0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: false, //是否显示滚动条
		deceleration:deceleration
	});
	

	mui("body").on("tap",".openfileBtn",function(e){
		var _this = $$(this);
		var xzdm = _this.children().attr("data-filecode");
		var clauseType = _this.children().attr("data-filetype");
		
		//调用APP打开文档的方法
		openFile(xzdm,clauseType);

	});
			
	mui("body").on("tap",".search-icon",function(){
		var inputVal = $$(this).siblings("input").val();
		goSearch($$(this),inputVal);
		
		if(mui.os.ios){
			//收起键盘
			document.activeElement.blur();
		}else{
			$$(this).siblings("input").blur();
		}
	});
	
	
	
	//检测键盘点击回车
	$$(".search-input").keydown(function(event){
		var _this = $$(this);
		if (event.keyCode == 13) {
			console.log(1);
        	goSearch(_this,_this.val());
        	if(mui.os.ios){
				//收起键盘
				document.activeElement.blur();
			}else{
				$$(this).blur();
			}
   	 	}

	});
	
	var createDom = function(selector,me){
		var keyword = '';
		if($$("#item1mobile").hasClass("mui-active")){
			keyword = $$("#dxKeyword").val();	
			var data = {
				"keyword":keyword,
				"start": page1Num*limit,
				"limit":limit
			}
			GetData2("knowledge/selectDuanXian",function(result){
				page1Num++;
				if(result.data.length === 0){
					// 锁定，无数据
					//me.stopped = true;
					me.endPullUpToRefresh(true);
					return;
				}
	
				var shtml = '';
				if(result.data.length>0){
					var productList = result.data;
					$.each(productList,function(index,product){
						//haveSell "0"--现行条款 "1"--已停办
						if(product.haveSell == "0"){
							shtml += '<div class="search-content">';
						}else{
							shtml += '<div class="search-content stopped">';
						}
						
						shtml += '<div class="search-head">';
						shtml += '<div class="title">';
						shtml +=  '<span>'+product.xzmc+'</span>';
						shtml += '<label class="title-type">'+product.xzlx+'</label></div>';
						shtml += '<div class="openfileBtn">';
						//haveClause "0"--有条款 "1"--没有条款
						if(product.haveClause == "0"){
							shtml += '<lable class="openFileBtn" data-filecode="'+product.xzdm+'" data-filetype="'+product.clauseType+'">查看条款</lable>';
						}
						
						shtml += '</div></div>';
						shtml += '<div class="search-main">';
						shtml += '<p><span>险种代码：</span><span>'+product.xzdm+'</span></p>';
						shtml += '<p><span>子险代码：</span><span>'+product.zxzdm+'</span></p>';
						shtml += '<p><span>开办日期：</span><span>'+product.kbrq+'</span></p>';
						shtml += '<p><span>停办日期：</span><span>'+product.tbrq+'</span>';
						if(product.haveSell == "1"){
							shtml += '<span class="stopMark">已停办</span>';
						}else{
							shtml += '<span class="useMark">现行条款</span>';
						}
						
						shtml += '</p>';
						shtml += '<p><span>投保年龄：</span><span>'+product.tbnl+'</span></p>';
						shtml += '</div>';
						shtml += '</div>';
					});
					
					setTimeout(function() {
						$$(selector).append(shtml);
						me.endPullUpToRefresh();
					}, 500);
				}
			},data);
			
			
		}else{
			keyword = $$("#zcKeyword").val();
			var data = {
				"keyword":keyword,
				"start": page2Num*limit,
				"limit":limit
			}
			GetData2("knowledge/selectProfessionType",function(result){
				page2Num++;
				if(result.data.length === 0){
					// 锁定，无数据
					//me.stopped = true;
					me.endPullUpToRefresh(true);
					return;
				}
	
				var shtml = '';
				if(result.data.length>0){
					var productList = result.data;
					$.each(productList,function(index,product){
						shtml += '<li class="mui-table-view-cell mui-collapse">';
						shtml += '<a class="mui-navigate-right li-title" href="#"><span class="jobcode">'+product.zyxldm+'</span>'+product.zyxlmc+'</a>';
						shtml += '<div class="mui-collapse-content">';
						shtml += '<ul class="detail">';
						shtml += '<li>'+product.zydlmc+'-->'+product.zyzlmc+'-->'+product.zyxlmc+'</li>';
						shtml += '<li><span class="gray">寿险加费：</span><span class="orange">'+product.sxjf+'</span></li>';
						shtml += '<li><span class="gray">意外等级：</span><span class="orange">'+product.ywdj+'</span></li>';
						shtml += '</ul>';
						shtml += '</div>';
						shtml += '</li>';
	
					});
					
					setTimeout(function() {
						$$(selector).append(shtml);
						me.endPullUpToRefresh();
					}, 500);
				}
			},data);
		}
	}
	
	
	//搜索方法
	function goSearch(dom,inputVal){
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					contentrefresh:'<a><span class="mui-spinner"></span></a>'+'<span class="spinner-text">正在加载...</span>',
					contentinit: '',
					height:150,
					callback: function() {
						console.log("up");
						var self = this;
						var ul = self.element.querySelector('.mui-table-view');
						//ul.appendChild(createFragment(ul, index, 5));
						createDom(ul,self);
						//self.endPullUpToRefresh();
					}
				},
				down: {
				}
			});
		});
		
		var _this = dom;

		var data = {
			"keyword":inputVal,
			"start":0,
			"limit":limit
		}
		
		//点击输入框时重新启用上拉加载功能
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh().refresh(true);
		
		});
		
		if($$("#item1mobile").hasClass("mui-active")){
			page1Num = 1;
			$$("#scroll1 .mui-table-view").empty();
			//重置mui-scroll
			var scrollApi = mui('#scroll1').scroll();//获取插件对象
			scrollApi.refresh();//刷新
			scrollApi.scrollTo(0,0);//滚动至顶部
			
			//重置scorll
			//$$('#scroll1 .mui-scroll').css('transform',' translate3d(0,0,0) translateZ(0)');
		
			GetData2("knowledge/selectDuanXian",function(result){
				$$("#scroll1 .mui-pull-loading").text("上拉显示更多...");
				var shtml = '';
				if(result.data.length>0){
					$$("#item1mobile .search-begin").hide();
					$$("#item1mobile .search-nodata").hide();
					var productList = result.data;
					$.each(productList,function(index,product){
						//haveSell "0"--现行条款 "1"--已停办
						if(product.haveSell == "0"){
							shtml += '<div class="search-content">';
						}else{
							shtml += '<div class="search-content stopped">';
						}
						
						shtml += '<div class="search-head">';
						shtml += '<div class="title">';
						shtml +=  '<span>'+product.xzmc+'</span>';
						shtml += '<label class="title-type">'+product.xzlx+'</label></div>';
						shtml += '<div class="openfileBtn">';
						//haveClause "0"--有条款 "1"--没有条款
						if(product.haveClause == "0"){
							shtml += '<lable class="openFileBtn" data-filecode="'+product.xzdm+'" data-filetype="'+product.clauseType+'">查看条款</lable>';
						}
						
						shtml += '</div></div>';
						shtml += '<div class="search-main">';
						shtml += '<p><span>险种代码：</span><span>'+product.xzdm+'</span></p>';
						shtml += '<p><span>子险代码：</span><span>'+product.zxzdm+'</span></p>';
						shtml += '<p><span>开办日期：</span><span>'+product.kbrq+'</span></p>';
						shtml += '<p><span>停办日期：</span><span>'+product.tbrq+'</span>';
						if(product.haveSell == "1"){
							shtml += '<span class="stopMark">已停办</span>';
						}else{
							shtml += '<span class="useMark">现行条款</span>';
						}
						shtml += '</p>';
						shtml += '<p><span>投保年龄：</span><span>'+product.tbnl+'</span></p>';
						shtml += '</div>';
						shtml += '</div>';
					});
					$$("#scroll1 .search-content-wrapper").html(shtml);
					
				
					
				}else{
					$$("#scroll1 .search-content-wrapper").html("");
					$$("#item1mobile .search-begin").hide();
					$$("#item1mobile .search-nodata").show();
					$$("#scroll1 .mui-pull-loading").text("");
				}
			},data);
			
		}else{
			page2Num = 1;
			$$("#scroll2 ul.mui-table-view").empty();
			//重置scorll
			//$$('#scroll2 .mui-scroll').css('transform',' translate3d(0,0,0) translateZ(0)');
			var scrollApi = mui('#scroll2').scroll();//获取插件对象
			scrollApi.refresh();//刷新
			scrollApi.scrollTo(0,0);//滚动至顶部
		
			GetData2("knowledge/selectProfessionType",function(result){
				$$("#scroll2 .mui-pull-loading").text("上拉显示更多...");
				var shtml = '';
				if(result.data.length>0){
					$$("#item2mobile .search-begin").hide();
					$$("#item2mobile .search-nodata").hide();
					var productList = result.data;
					$.each(productList,function(index,product){
						shtml += '<li class="mui-table-view-cell mui-collapse">';
						shtml += '<a class="mui-navigate-right li-title" href="#"><span class="jobcode">'+product.zyxldm+'</span>'+product.zyxlmc+'</a>';
						shtml += '<div class="mui-collapse-content">';
						shtml += '<ul class="detail">';
						shtml += '<li>'+product.zydlmc+'-->'+product.zyzlmc+'-->'+product.zyxlmc+'</li>';
						shtml += '<li><span class="gray">寿险加费：</span><span class="orange">'+product.sxjf+'</span></li>';
						shtml += '<li><span class="gray">意外等级：</span><span class="orange">'+product.ywdj+'</span></li>';
						shtml += '</ul>';
						shtml += '</div>';
						shtml += '</li>';
					});
					$$("#scroll2 ul.mui-table-view").html(shtml);
				}else{
					$$("#scroll2 ul.mui-table-view").html("");
					$$("#item2mobile .search-begin").hide();
					$$("#item2mobile .search-nodata").show();
					$$("#scroll2 .mui-pull-loading").text("");
				}
			},data);
		}
	}
	
	//App打开文档方法
	function openFile(code,type){
		if(mui.os.android){
			
			window.androidx.showDoc(code,type);
			
		}else if(mui.os.ios){
			setupWebViewJavascriptBridge(function(bridge) {
			    bridge.registerHandler('testJSFunction', function(data, responseCallback) {
			        alert('JS方法被调用:'+data);
			        responseCallback('js执行过了');
			    })
			});
			
			WebViewJavascriptBridge.callHandler('showDoc',{"code":code,"type":type}, function(response) {
				console.log("add success!");
		   });
		}
	}

})(mui, document, jQuery);