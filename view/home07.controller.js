sap.ui.controller("com.zhenergy.pcbi.view.home07", {
    /* initialize the swiper plugin*/
	_drawSwiper: function() {

	    require(
                [
                    'js/swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide: 0,
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
	    
	    var mParameters = "/SCREEN_FXKZ_01_V01.xsodata/PARAMETER(PUR_NAME='"+usrid+"',PUR_DATE='"+currentDate+"')/Results?&$format=json";

	    var mResults = makeCorsRequest(mParameters);

	    if (mResults != '') {
            var sResAll = JSON.parse(mResults);
            var sRes = sResAll.d;

            // 统计日期
            var daytime = null;
			//设置数据
			var safeProduceDays=0;
			for (var i in sRes.results) {
			    
				if (sRes.results[i].KPI_TYPE == '电厂安全日天数' && sRes.results[i].KPI_DESC == '集团'){  
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
	
	// 加载电厂安全日天数值
	_loadSafeProduceDays : function(){
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
            // 统计日期
            var daytime = null;
			//设置数据
			var safeProduceDays=0;
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '电厂安全日天数' && sRes.results[i].KPI_DESC == '集团'){  
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
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("网络连接失败，请重试", {
				offset: '0 -110'
			});
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_FXKZ_01_V01?$filter=(BNAME eq '" +usrid+ "')", mParameters);
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
	    this._loadSafeProduceDays();
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