sap.ui.controller("com.zhenergy.pcbi.view.home07", {
    /* initialize the swiper plugin*/
	_drawSwiper: function() {

	    require(
                [
                    'js/swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide: slide07PageNum,
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
	
	// get data by new method of OData
	_getDataByDifferentDate : function(currentDate){
	    
	    var mParameters = "/AT_ZSCREEN_FXKZ_01_V01.xsodata/PARAMETER(PUR_NAME='"+usrid+"',PUR_DATE='"+currentDate+"')/Results?&$format=json";

	    var mResults = makeCorsRequest(mParameters);

	    if (mResults != '') {
            var sResAll = JSON.parse(mResults);
            var sRes = sResAll.d;

            // 统计日期
            var daytime = null;
			//设置数据
			var safeProduceDays=0;
			for (var i in sRes.results) {
			    
				if (sRes.results[i].KPI_TYPE == '电厂安全日天数' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    safeProduceDays = safeProduceDays+parseFloat(sRes.results[i].KPI_VALUE);
				    daytime = sRes.results[i].KPI_DATE;
				}
			}
			var rlr_color="red";
    		if(safeProduceDays>0){
    		    if (skinName == '夜间模式') {
    		        rlr_color="green";
    		    } else {
    		        rlr_color="white";
    		    }
    		}
    		$('#safeProduceDays').css('color',rlr_color);
    		$('#safeProduceDays').css('font-size','75px');
			$('#safeProduceDays').html(safeProduceDays);
            var daytime01;
    	    var daytime02;
    	    var daytime03;
    	    if (daytime != null) {
    	       daytime01 = daytime.substring(0,4);
    	       daytime02 = daytime.substring(4,6);
    	       daytime03 = daytime.substring(6,8); 
    	    }
            // 电厂安全日天数日期
	        $('#safeProduceDaysDate').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
	        if (isHomeLoad == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isHomeLoad = true;
            }
	    } else {
	        alert('The Result Is Empty');
	    }
	},
	
// 	// 加载电厂安全日天数值
// 	_loadSafeProduceDays : function(){
// 	    var mParameters = {};
// 		mParameters['async'] = true;
// 		mParameters['success'] = jQuery.proxy(function(sRes) {
//             // 统计日期
//             var daytime = null;
// 			//设置数据
// 			var safeProduceDays=0;
// 			for (var i in sRes.results) {
// 				if (sRes.results[i].KPI_TYPE == '电厂安全日天数' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    safeProduceDays = safeProduceDays+parseFloat(sRes.results[i].KPI_VALUE);
// 				    daytime = sRes.results[i].KPI_DATE;
// 				}
// 			}
// 			var rlr_color="red";
//     		if(safeProduceDays>0){
//     		    if (skinName == '夜间模式') {
//     		        rlr_color="green";
//     		    } else {
//     		        rlr_color="white";
//     		    }
//     		}
//     		$('#safeProduceDays').css('color',rlr_color);
//     		$('#safeProduceDays').css('font-size','75px');
// 			$('#safeProduceDays').html(safeProduceDays);
//             var daytime01;
//     	    var daytime02;
//     	    var daytime03;
//     	    if (daytime != null) {
//     	       daytime01 = daytime.substring(0,4);
//     	       daytime02 = daytime.substring(4,6);
//     	       daytime03 = daytime.substring(6,8); 
//     	    }
//             // 电厂安全日天数日期
// 	        $('#safeProduceDaysDate').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
// 	        if (isHomeLoad == false) {
//                 if (busy) {
//         			busy.close();
//         		} 
//         		changeTheSkinOfPage();
//         		isHomeLoad = true;
//             }
// 		}, this);
// 		mParameters['error'] = jQuery.proxy(function(eRes) {
// 			sap.m.MessageToast.show("网络连接失败，请重试", {
// 				offset: '0 -110'
// 			});
// 		}, this);
// 	    sap.ui.getCore().getModel().read("SCREEN_FXKZ_01_V01?$filter=(BNAME eq '" +usrid+ "')", mParameters);
// 	},
	// 加载电厂一二类缺陷总数
	_loadTotalDefects : function(){
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
            // 统计日期
            var daytime = null;
            
			// 净现金流量同比
            var pureCashFluxRealRateTongBi = 0;
            // 净现金流量环比
            var pureCashFluxRealRateHuanBi = '';
            // 统计日期
            var daytimePureCashFluxReal = null;
			//设置数据
			var pureCashFluxRealRateValue=0;
			//设置数据
			var iTotalDefects=0;
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '缺陷总数' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    iTotalDefects = iTotalDefects+parseFloat(sRes.results[i].KPI_VALUE);
				    daytime = sRes.results[i].KPI_DATE;
				}
				
				// 净现金流量 Real
				if (sRes.results[i].KPI_TYPE == '净现金流量' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    pureCashFluxRealRateValue = sRes.results[i].KPI_VALUE;
				    daytimePureCashFluxReal = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '净现金流量环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    pureCashFluxRealRateHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '净现金流量_同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    pureCashFluxRealRateTongBi = sRes.results[i].KPI_VALUE*100;
				}
			}
			var rlr_color="green";
    		if(iTotalDefects>0){
    		    if (skinName == '夜间模式') {
    		        rlr_color="red";
    		    } else {
    		        rlr_color="white";
    		    }
    		}
    		$('#TotalDefects').css('color',rlr_color);
    		$('#TotalDefects').css('font-size','75px');
			$('#TotalDefects').html(iTotalDefects);
            var daytime01;
    	    var daytime02;
    	    var daytime03;
    	    if (daytime != null) {
    	       daytime01 = daytime.substring(0,4);
    	       daytime02 = daytime.substring(4,6);
    	       daytime03 = daytime.substring(6,8); 
    	    }
            // 电厂安全日天数日期
	        $('#TotalDefectsDate').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
	        
	        // 净现金流量
			var pureCashFluxReal_color="red";
    		if(pureCashFluxRealRateValue>0){
    		    if (skinName == '夜间模式') {
    		        pureCashFluxReal_color="green";
    		    } else {
    		        pureCashFluxReal_color="white";
    		    }
    		}
    		$('#pureCashFluxReal').css('color',pureCashFluxReal_color);
    		$('#pureCashFluxReal').css('font-size','65px');
			$('#pureCashFluxReal').html(pureCashFluxRealRateValue);
            if (pureCashFluxRealRateTongBi != undefined) {
                $('#tongbiPureCashFluxReal').html(pureCashFluxRealRateTongBi);    
            }
            if (pureCashFluxRealRateTongBi > 0) {
                $("#tongbiPureCashFluxRealImg").attr("src","img/arrow-green2.png");
            } else {
                if (pureCashFluxRealRateTongBi < 0) {
                    $("#tongbiPureCashFluxRealImg").attr("src","img/arrow-red2.png");
                } else {
                    $("#tongbiPureCashFluxRealImg").attr("src","img/horizontal-green.png");
                }
            }
            var daytime01PureCashFluxReal;
    	    var daytime02PureCashFluxReal;
    	    var daytime03PureCashFluxReal;
    	    if (daytimePureCashFluxReal != null) {
    	       daytime01PureCashFluxReal = daytimePureCashFluxReal.substring(0,4);
    	       daytime02PureCashFluxReal = daytimePureCashFluxReal.substring(4,6);
    	       daytime03PureCashFluxReal = daytimePureCashFluxReal.substring(6,8); 
    	    }
            // 资产现金回收率统计日期
	        $('#pureCashFluxRealDate').html(daytime01PureCashFluxReal + "年" + daytime02PureCashFluxReal + "月");//  + daytime03Sum + "日"
	        
	        if (isHomeLoad == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isHomeLoad = true;
            }
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("网络连接失败，请重试", {
				offset: '0 -110'
			});
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_FXKZ_01_V01?$filter=(BNAME eq '" +usrid+ "')", mParameters);
	},
	// 获取净资产负债率
	_loadPurePerportyPercent : function(){
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
            // 统计日期
            var daytime = null;
            
			// 资产负债率同比
            var purePerportyPercentRateTongBi = 0;
            // 资产负债率环比
            var purePerportyPercentRateHuanBi = '';
            // 统计日期
            var daytimepurePerportyPercent = null;
			//设置数据
			var purePerportyPercentRateValue=0;

			for (var i in sRes.results) {
				
				// 资产负债率 Real
				if (sRes.results[i].KPI_TYPE == '资产负债率' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    purePerportyPercentRateValue = sRes.results[i].KPI_VALUE*100;
				    daytimepurePerportyPercent = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '资产负债率环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    purePerportyPercentRateHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '资产负债率_同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    purePerportyPercentRateTongBi = sRes.results[i].KPI_VALUE*100;
				}
			}
	        
	        // 资产负债率
			var purePerportyPercent_color="red";
    		if(purePerportyPercentRateValue>0){
    		    if (skinName == '夜间模式') {
    		        purePerportyPercent_color="green";
    		    } else {
    		        purePerportyPercent_color="white";
    		    }
    		}
    		$('#purePerportyPercent').css('color',purePerportyPercent_color);
    		$('#purePerportyPercent').css('font-size','65px');
			$('#purePerportyPercent').html(purePerportyPercentRateValue);
            if (purePerportyPercentRateTongBi != undefined) {
                $('#tongbipurePerportyPercent').html(purePerportyPercentRateTongBi);    
            }
            if (purePerportyPercentRateTongBi > 0) {
                $("#tongbipurePerportyPercentImg").attr("src","img/arrow-green2.png");
            } else {
                if (purePerportyPercentRateTongBi < 0) {
                    $("#tongbipurePerportyPercentImg").attr("src","img/arrow-red2.png");
                } else {
                    $("#tongbipurePerportyPercentImg").attr("src","img/horizontal-green.png");
                }
            }
            var daytime01purePerportyPercent;
    	    var daytime02purePerportyPercent;
    	    var daytime03purePerportyPercent;
    	    if (daytimepurePerportyPercent != null) {
    	       daytime01purePerportyPercent = daytimepurePerportyPercent.substring(0,4);
    	       daytime02purePerportyPercent = daytimepurePerportyPercent.substring(4,6);
    	       daytime03purePerportyPercent = daytimepurePerportyPercent.substring(6,8); 
    	    }
            // 资产现金回收率统计日期
	        $('#purePerportyPercentDate').html(daytime01purePerportyPercent + "年" + daytime02purePerportyPercent + "月");//  + daytime03Sum + "日"
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("网络连接失败，请重试", {
				offset: '0 -110'
			});
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_ZCQK_01_V01?$filter=(BNAME eq '" +usrid+ "')", mParameters);
	},
	// 获取二级页面数据
	_loadData01 : function (currentDate) {
	    
	   // var currentDate;
	   // if (currentDate == '') {
	   //     var alreadySetDate = document.getElementById("safeProduceDaysDateId").value;
	   //     if (alreadySetDate != '') {
	   //         currentDate = alreadySetDate.replace(/\-/g,'');
	   //     } else {
    //         	var datetime = new Date();
    //             currentDate = toSimpleDateString(datetime,'date');  
	   //     }
	   // } else {
    //         currentDate = currentDate.replace(/\-/g,'');
	   // }
	    // get data by different date
	   // this._getDataByDifferentDate(currentDate);
	    
		this._drawSwiper();
	   // this._loadSafeProduceDays();
	   // 加载一二类缺陷及净现金流量数据
	    this._loadTotalDefects();
	    // 加载净资产负债率数据
	    this._loadPurePerportyPercent();
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.pcbi.view.home07
*/
	onInit: function() {
        
	    this.getView().addEventDelegate({
			
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {
                this._loadData01('');
			}, this)
		});
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.pcbi.view.home07
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.pcbi.view.home07
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.pcbi.view.home07
*/
//	onExit: function() {
//
//	}

});