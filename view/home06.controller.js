sap.ui.controller("com.zhenergy.pcbi.view.home06", {
    
    /* initialize the swiper plugin*/
	_drawSwiper: function() {

	    require(
                [
                    'js/swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide: slide06PageNum,
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
    // 加载资金情况
	_loadData_CashRate : function(){
	    if (isHome06Load == false) {
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
		    // 销售现金比率同比值
            var salesCashRateTongBi = '';
            // 销售现金比率环比值
            var salesCashRateHuanBi = '';
            // 统计日期
            var daytime = null;
			//设置数据
			var salesCashRateValue=0;
			
			// 资产现金回收率同比值
            var propertyCashBackRateTongBi = '';
            // 资产现金回收率环比值
            var propertyCashBackRateHuanBi = '';
            // 统计日期
            var daytimeSum = null;
			//设置数据
			var propertyCashBackRateValue=0;
			
			for (var i in sRes.results) {
			    // 销售现金比率
				if (sRes.results[i].KPI_TYPE == '销售现金比率' && sRes.results[i].KPI_DESC == '集团'){  
				    salesCashRateValue = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				    daytime = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '销售现金比率环比' && sRes.results[i].KPI_DESC == '集团'){  
				    salesCashRateHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '销售现金比率_同比' && sRes.results[i].KPI_DESC == '集团'){  
				    salesCashRateTongBi = sRes.results[i].KPI_VALUE*100;
				}
				// 资产现金回收率
				if (sRes.results[i].KPI_TYPE == '资产现金回收率' && sRes.results[i].KPI_DESC == '集团'){  
				    propertyCashBackRateValue = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				    daytimeSum = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '资产现金回收率环比' && sRes.results[i].KPI_DESC == '集团'){  
				    propertyCashBackRateHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '资产现金回收率_同比' && sRes.results[i].KPI_DESC == '集团'){  
				    propertyCashBackRateTongBi = sRes.results[i].KPI_VALUE*100;
				}
			}
			// 销售现金比率
			var rlr_color="red";
    		if(salesCashRateValue>0){
    		    if (skinName == '夜间模式') {
    		        rlr_color="green";
    		    } else {
    		        rlr_color="white";
    		    }
    		}
    		$('#salesCashRate').css('color',rlr_color);
    		$('#salesCashRate').css('font-size','75px');
			$('#salesCashRate').html(salesCashRateValue);
            if (salesCashRateTongBi != undefined) {
                $('#tongbiSalesCashRate').html(salesCashRateTongBi);    
            }
            if (salesCashRateTongBi > 0) {
                $("#tongbiSalesCashRateImg").attr("src","img/arrow-green2.png");
            } else {
                if (salesCashRateTongBi < 0) {
                    $("#tongbiSalesCashRateImg").attr("src","img/arrow-red2.png");
                } else {
                    $("#tongbiSalesCashRateImg").attr("src","img/horizontal-green.png");
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
            // 销售现金比率统计日期
	        $('#salesCashRateDate').html(daytime01 + "年" + daytime02 + "月");//  + daytime03 + "日"
	        
	        // 资产现金回收率
			var sumrlr_color="red";
    		if(propertyCashBackRateValue>0){
    		    if (skinName == '夜间模式') {
    		        sumrlr_color="green";
    		    } else {
    		        sumrlr_color="white";
    		    }
    		}
    		$('#propertyCashBackRate').css('color',sumrlr_color);
    		$('#propertyCashBackRate').css('font-size','65px');
			$('#propertyCashBackRate').html(propertyCashBackRateValue);
            if (propertyCashBackRateTongBi != undefined) {
                $('#tongbiPropertyCashBackRate').html(propertyCashBackRateTongBi);    
            }
            if (propertyCashBackRateTongBi > 0) {
                $("#tongbiPropertyCashBackRateImg").attr("src","img/arrow-green2.png");
            } else {
                if (propertyCashBackRateTongBi < 0) {
                    $("#tongbiPropertyCashBackRateImg").attr("src","img/arrow-red2.png");
                } else {
                    $("#tongbiPropertyCashBackRateImg").attr("src","img/horizontal-green.png");
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
            // 资产现金回收率统计日期
	        $('#propertyCashBackRateDate').html(daytime01Sum + "年" + daytime02Sum + "月");//  + daytime03Sum + "日"
	        if (isHome06Load == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isHome06Load = true;
            }
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_ZJQK_01_V01?$filter=(BNAME eq '" +usrid+ "')", mParameters);
	},
	// 获取二级页面数据
	_loadData01 : function () {
		this._loadData_CashRate();
	    this._drawSwiper();
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.pcbi.view.home06
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
* @memberOf com.zhenergy.pcbi.view.home06
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.pcbi.view.home06
*/
	onAfterRendering: function() {
         this._drawSwiper();
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.pcbi.view.home06
*/
//	onExit: function() {
//
//	}

});