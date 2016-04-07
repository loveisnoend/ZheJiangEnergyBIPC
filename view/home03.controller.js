sap.ui.controller("com.zhenergy.pcbi.view.home03", {
    
    /* initialize the swiper plugin*/
	_drawSwiper: function() {

	    require(
                [
                    'js/swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide: slide03PageNum,
			speed: 50,
			loop: false,
			freeMode: false,
			threshold: 0,
			// freeModeMomentum : true,
			// freeModeMomentumRatio : 1,
			// freeModeMomentumBounce : false,
			// freeModeMomentumBounceRatio : 1,
			freeModeSticky: true,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			centeredSlides: true,
			effect: 'coverflow',
			grabCursor: true,
			slideToClickedSlide: true,
			slidesPerView: 3,
			coverflow: {
				rotate: 0,
				stretch: 0,
				depth: 0,
				modifier: 1,
				slideShadows: false
			}
		});
	},
	// 加载资产值
	_loadData_Property : function(){
	    if (isHome03Load == false) {
            busy = new sap.m.BusyDialog({
				close: function(event) {}
			});
    		if (busy) {
    			busy.open();
    		} 
	    }
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    // 净资产同比值
            var purePropertyTongBi = '';
            // 净资产环比值
            var purePropertyHuanBi = '';
            // 统计日期
            var daytime = null;
			//设置数据
			var purePropertyValue=0;
			
			// 总资产同比值
            var sumPropertyTongBi = '';
            // 总资产环比值
            var sumPropertyHuanBi = '';
            // 统计日期
            var daytimeSum = null;
			//设置数据
			var sumPropertyValue=0;
			
			for (var i in sRes.results) {
			    // 净资产
				if (sRes.results[i].KPI_TYPE == '净资产' && sRes.results[i].KPI_DESC == '集团'){  
				    purePropertyValue = purePropertyValue+parseFloat(sRes.results[i].KPI_VALUE);
				    daytime = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '净资产环比' && sRes.results[i].KPI_DESC == '集团'){  
				    purePropertyHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '净资产同比' && sRes.results[i].KPI_DESC == '集团'){  
				    purePropertyTongBi = (sRes.results[i].KPI_VALUE*100).toFixed(0);
				}
				// 总资产
				if (sRes.results[i].KPI_TYPE == '总资产' && sRes.results[i].KPI_DESC == '集团'){  
				    sumPropertyValue = sumPropertyValue+parseFloat(sRes.results[i].KPI_VALUE);
				    daytimeSum = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '总资产环比' && sRes.results[i].KPI_DESC == '集团'){  
				    sumPropertyHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '总资产同比' && sRes.results[i].KPI_DESC == '集团'){  
				    sumPropertyTongBi = (sRes.results[i].KPI_VALUE*100).toFixed(0);
				}
			}
			
			// 净资产
			var rlr_color="red";
    		if(purePropertyValue>0){
    		    if (skinName == '夜间模式') {
    		        rlr_color="green";
    		    } else {
    		        rlr_color="white";
    		    }
    		}
    		$('#pureProperty').css('color',rlr_color);
    		$('#pureProperty').css('font-size','75px');
			$('#pureProperty').html(purePropertyValue);
            if (purePropertyTongBi != undefined) {
                $('#purePropertyUpValue').html(purePropertyTongBi);    
            }
            if (purePropertyTongBi > 0) {
                $("#purePropertyUpImg").attr("src","img/arrow-green2.png");
            } else {
                if (purePropertyTongBi == 0) {
                    $("#purePropertyUpImg").attr("src","img/horizontal-green.png"); 
                } else {
                    $("#purePropertyUpImg").attr("src","img/arrow-red2.png"); 
                }
            }
            var daytime01;
    	    var daytime02;
    	    var daytime03;
    	    if (daytime != null) {
    	       daytime01 = daytime.substring(0,4);
    	       daytime02 = daytime.substring(4,6);
    	       daytime03 = daytime.substring(6,8); 
    	    }
            // 净资产统计日期
	        $('#purePropertyDate').html(daytime01 + "年" + daytime02 + "月");//  + daytime03 + "日"
	        
	        // 总资产
			var sumrlr_color="red";
    		if(sumPropertyValue>0){
    		    if (skinName == '夜间模式') {
    		        sumrlr_color="green";
    		    } else {
    		        sumrlr_color="white";
    		    }
    		}
    		$('#sumProperty').css('color',sumrlr_color);
    		$('#sumProperty').css('font-size','65px');
			$('#sumProperty').html(sumPropertyValue);
            if (sumPropertyTongBi != undefined) {
                $('#sumPropertyUpValue').html(sumPropertyTongBi);    
            }
            if (sumPropertyTongBi > 0) {
                $("#sumPropertyUpImg").attr("src","img/arrow-green2.png");
            } else {
                if (sumPropertyTongBi == 0) {
                    $("#sumPropertyUpImg").attr("src","img/horizontal-green.png");
                } else {
                    $("#sumPropertyUpImg").attr("src","img/arrow-red2.png");
                }
            }
            var daytime01Sum;
    	    var daytime02Sum;
    	    var daytime03Sum;
    	    if (daytimeSum != null) {
    	       daytime01Sum = daytimeSum.substring(0,4);
    	       daytime02Sum = daytimeSum.substring(4,6);
    	       daytime03Sum = daytimeSum.substring(6,8); 
    	    }
            // 总资产统计日期
	        $('#sumPropertyDate').html(daytime01Sum + "年" + daytime02Sum + "月");//  + daytime03Sum + "日"
	        if (isHome03Load == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        // 		isHome03Load = true;
            }
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_ZCQK_01_V01?$filter=(BNAME eq '" +usrid+ "')", mParameters);
	},
	// 获取二级页面数据
	_loadData01 : function () {
	    this._drawSwiper();
	    this._loadData_Property();
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.pcbi.view.home03
*/
	onInit: function() {
        
	    this.getView().addEventDelegate({
			
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {
                this._loadData01();
			}, this)
		});
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.pcbi.view.home03
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.pcbi.view.home03
*/
	onAfterRendering: function() {
        this._drawSwiper();
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.pcbi.view.home03
*/
//	onExit: function() {
//
//	}

});