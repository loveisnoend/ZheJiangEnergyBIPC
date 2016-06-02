sap.ui.controller("com.zhenergy.pcbi.view.home02", {

    /* initialize the swiper plugin*/
	_drawSwiper: function(visiableIds) {
	    require(
                [
                    'js/swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide: slide01PageNum,
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
			},
			onInit: function(mySwiper){
              //Swiper初始化了
              mySwiper.removeSlide(visiableIds);
            }
		});
	},
	// 加载宏观环境
	_loadDataMacroEnvironment : function(){
	    if (isHome02Load == false) {
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
		    
            // 全国工业增加值增长速度
            //当月
            var currentMonthUp = 0;
            //累计
            var industryUpSum = 0;

            // 浙能电力每股收益
            //当月
            var KPI_EPS_M_MGSY = 0;
            //累计
            var KPI_EPS_M_MGSYUP = 0;
            
            // 全社会用电量-浙江省
            // 省-社会用电量(当月)
            var KPI_TEC_M_0000 = 0;
            // 省-社会用电量同比(当月)
            var KPI_TEC_MT_0000 = 0;
            // 省-社会用电量(年度累计)
            var KPI_TEC_Y_0000 = 0;
            // 省-社会用电量同比(年度累计)
            var KPI_TEC_YT_0000 = 0;
            
            // 所有产业合计
            // 产业-社会用电量(当月)
            var KPI_TEC_M_SYCY = 0;
            // 产业-社会用电量同比(当月)
            var KPI_TEC_MT_SYCY = 0;
            // 产业-社会用电量(年度累计)
            var KPI_TEC_Y_SYCY = 0;
            // 产业-社会用电量同比(年度累计)
            var KPI_TEC_YT_SYCY = 0;

            // 全国发电量
            // 全国发电量(当月) 
            var KPI_FDL_M_TOTA = 0;
            // 全国发电量同比(当月)
            var KPI_FDL_MT_TOTA = 0;
            // 全国发电量(年度累计)
            var KPI_FDL_Y_TOTA = 0;
            // 全国发电量同比(年度累计)
            var KPI_FDL_YT_TOTA = 0;

            // 全国平均利用小时
            // 全国平均利用小时(当月) 
            var KPI_LYH_M_TOTA = 0;
            // 全国平均利用小时同比(当月)
            var KPI_LYH_MT_TOTA = 0;
            // 全国平均利用小时(年度累计)
            var KPI_LYH_Y_TOTA = 0;
            // 全国平均利用小时同比(年度累计)
            var KPI_LYH_YT_TOTA = 0;
            
            // 累计统调外购电量
            var KPI_WGD_Y_0000 = 0;
            // 累计统调外购电量-外省净送
            var KPI_WGD_Y_WSJS = 0;
            
            // 统调最高发电负荷
            var KPI_FHZ_Y_FDFH = 0;
            // 统调最高用电负荷
            var KPI_FHZ_Y_YDFH = 0;
            
            // 统计日期
            var daytime = null;
            // 所有产业合计
            var daytimeAllIndustryDate;
            // 
            var daytimeIndustryUpSumDate;
			for (var i in sRes.results) {
			    
			    // 浙能电力每股收益(当月)
				if (sRes.results[i].KPI_ID == 'KPI_EPS_M_MGSY'){  
				    KPI_EPS_M_MGSY = sRes.results[i].KPI_VALUE;
				    daytimeIndustryUpSumDate = sRes.results[i].KPI_DATE;
				}
				// 浙能电力每股收益(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_EPS_M_MGSY_UP'){  
				    KPI_EPS_M_MGSY_UP = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				
			    // 工业增加值(当月)
				if (sRes.results[i].KPI_ID == 'KPI_IAV_M_0000'){  
				    currentMonthUp = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				    daytime = sRes.results[i].KPI_DATE;
				}
				// 工业增加值(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_IAV_Y_0000'){  
				    industryUpSum = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				
				// 全社会用电量-浙江省
				// 省-社会用电量(当月)
				if (sRes.results[i].KPI_ID == 'KPI_TEC_M_0000'){  
				    daytimeSocialPowerVolumeDate001 = sRes.results[i].KPI_DATE;
				    KPI_TEC_M_0000 = sRes.results[i].KPI_VALUE;
				}
				// 省-社会用电量同比(当月)
				if (sRes.results[i].KPI_ID == 'KPI_TEC_MT_0000'){  
				    KPI_TEC_MT_0000 = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				// 省-社会用电量(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_TEC_Y_0000'){  
				    KPI_TEC_Y_0000 = sRes.results[i].KPI_VALUE;
				}
				// 省-社会用电量同比(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_TEC_YT_0000'){  
				    KPI_TEC_YT_0000 = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				
				// 所有产业合计
				// 产业-社会用电量(当月)
				if (sRes.results[i].KPI_ID == 'KPI_TEC_M_SYCY'){  
				    daytimeAllIndustryDate = sRes.results[i].KPI_DATE;
				    KPI_TEC_M_SYCY = sRes.results[i].KPI_VALUE;
				}
				// 产业-社会用电量同比(当月)
				if (sRes.results[i].KPI_ID == 'KPI_TEC_MT_SYCY'){  
				    KPI_TEC_MT_SYCY = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				// 产业-社会用电量(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_TEC_Y_SYCY'){  
				    KPI_TEC_Y_SYCY = sRes.results[i].KPI_VALUE;
				}
				// 产业-社会用电量同比(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_TEC_YT_SYCY'){  
				    KPI_TEC_YT_SYCY = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				
				// 全国发电量
				// 全国发电量(当月)
				if (sRes.results[i].KPI_ID == 'KPI_FDL_M_TOTA'){  
				    KPI_FDL_M_TOTA = sRes.results[i].KPI_VALUE;
				}
				// 全国发电量同比(当月)
				if (sRes.results[i].KPI_ID == 'KPI_FDL_MT_TOTA'){  
				    KPI_FDL_MT_TOTA = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				// 全国发电量(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_FDL_Y_TOTA'){  
				    KPI_FDL_Y_TOTA = sRes.results[i].KPI_VALUE;
				}
				// 全国发电量同比(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_FDL_YT_TOTA'){  
				    KPI_FDL_YT_TOTA = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				
				// Change to 浙江省煤电利用小时
				// 全国平均利用小时
				// 全国平均利用小时(当月)  浙江省煤电利用小时(当月)
				if (sRes.results[i].KPI_ID == 'KPI_LYH_M_ZJMD'){  
				    KPI_LYH_M_TOTA = sRes.results[i].KPI_VALUE;
				}
				// 全国平均利用小时同比(当月) 浙江省煤电利用小时(当月)同比
				if (sRes.results[i].KPI_ID == 'KPI_LYH_MT_ZJMD'){  
				    KPI_LYH_MT_TOTA = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				// 全国平均利用小时(年度累计) 浙江省煤电利用小时(年度累计)
				if (sRes.results[i].KPI_ID == 'KPI_LYH_Y_ZJMD'){  
				    KPI_LYH_Y_TOTA = sRes.results[i].KPI_VALUE;
				}
				// 全国平均利用小时同比(年度累计) 浙江省煤电利用小时(年度累计)同比
				if (sRes.results[i].KPI_ID == 'KPI_LYH_YT_ZJMD'){  
				    KPI_LYH_YT_TOTA = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				
				// 累计统调外购电量
				if (sRes.results[i].KPI_ID == 'KPI_WGD_Y_0000'){  
				    KPI_WGD_Y_0000 = sRes.results[i].KPI_VALUE
				}
                // 累计统调外购电量-外省净送
                if (sRes.results[i].KPI_ID == 'KPI_WGD_Y_WSJS'){  
				    KPI_WGD_Y_WSJS = sRes.results[i].KPI_VALUE
				}
				
				// 统调最高发电负荷
				if (sRes.results[i].KPI_ID == 'KPI_FHZ_Y_FDFH'){  
				    KPI_FHZ_Y_FDFH = sRes.results[i].KPI_VALUE
				}
                // 统调最高用电负荷
                if (sRes.results[i].KPI_ID == 'KPI_FHZ_Y_YDFH'){  
				    KPI_FHZ_Y_YDFH = sRes.results[i].KPI_VALUE
				}
			}
			// 工业增加值(当月)
			$('#currentMonthUp').html(currentMonthUp);
			// 工业增加值(年度累计)
			$('#industryUpSum').html(industryUpSum+'%');

			// 浙能电力每股收益(当月)
			$('#KPI_EPS_M_MGSY').html(KPI_EPS_M_MGSY);
			// 浙能电力每股收益(年度累计)
			$('#tongbiKPI_EPS_M_MGSYUp').html(0+'%');
			
			// 全社会用电量-浙江省
			// 省-社会用电量(当月)
			$('#socialPowerVolumeMonthUp001').html(KPI_TEC_M_0000);
			
			// 省-社会用电量同比(当月)
			$('#tongbiSocialPowerVolumeMonthUp').html(KPI_TEC_MT_0000);
			if (KPI_TEC_MT_0000 < 0) {
			    $("#tongbiSocialPowerVolumeMonthUpImg").attr("src","img/arrow-red2.png");
			}
			if (KPI_TEC_MT_0000 > 0) {
			    $("#tongbiSocialPowerVolumeMonthUpImg").attr("src","img/arrow-green2.png");
			}
			
			// 省-社会用电量(年度累计)
			$('#socialPowerVolumeSumUp').html(KPI_TEC_Y_0000+'亿千瓦时');
			// 省-社会用电量同比(年度累计)
			$('#huanbiSocialPowerVolumeSumUp').html(KPI_TEC_YT_0000);
			if (KPI_TEC_YT_0000 < 0) {
			    $("#huanbiSocialPowerVolumeSumUpImg").attr("src","img/arrow-red2.png");
			}
			if (KPI_TEC_YT_0000 > 0) {
			    $("#huanbiSocialPowerVolumeSumUpImg").attr("src","img/arrow-green2.png");
			}
			
			// 所有产业合计
			// 产业-社会用电量(当月)
			$('#allIndustryMonthUp').html(KPI_TEC_M_SYCY);
			// 产业-社会用电量同比(当月)
			$('#tongbiAllIndustryMonthUp').html(KPI_TEC_MT_SYCY);
			if (KPI_TEC_MT_SYCY < 0) {
			    $("#tongbiAllIndustryMonthUpImg").attr("src","img/arrow-red2.png");
			}
			if (KPI_TEC_MT_SYCY > 0) {
			    $("#tongbiAllIndustryMonthUpImg").attr("src","img/arrow-green2.png");
			}
			
			// 产业-社会用电量(年度累计)
			$('#allIndustrySumUp').html(KPI_TEC_Y_SYCY+'亿千瓦时');
			// 产业-社会用电量同比(年度累计)
			$('#huanbiAllIndustrySumUp').html(KPI_TEC_YT_SYCY);
			if (KPI_TEC_YT_0000 < 0) {
			    $("#huanbiAllIndustrySumUpImg").attr("src","img/arrow-red2.png");
			}
			if (KPI_TEC_YT_0000 > 0) {
			    $("#huanbiAllIndustrySumUpImg").attr("src","img/arrow-green2.png");
			}

			// 全国发电量
			// 全国发电量(当月)
			$('#wholeNationPowerVolumeMonthUp').html(KPI_FDL_M_TOTA);
			// 全国发电量同比(当月)
			$('#tongbiWholeNationPowerVolumeMonthUp').html(KPI_FDL_MT_TOTA);
			if (KPI_FDL_MT_TOTA < 0) {
			    $("#tongbiWholeNationPowerVolumeMonthUpImg").attr("src","img/arrow-red2.png");
			}
			if (KPI_TEC_MT_SYCY > 0) {
			    $("#tongbiWholeNationPowerVolumeMonthUpImg").attr("src","img/arrow-green2.png");
			}
			
			// 全国发电量(年度累计)
			$('#wholeNationPowerVolumeSumUp').html(KPI_FDL_Y_TOTA+'亿千瓦时');
			// 全国发电量同比(年度累计)
			$('#huanbiWholeNationPowerVolumeSumUp').html(KPI_FDL_YT_TOTA);
			if (KPI_FDL_YT_TOTA < 0) {
			    $("#huanbiWholeNationPowerVolumeSumUpImg").attr("src","img/arrow-red2.png");
			}
			if (KPI_FDL_YT_TOTA > 0) {
			    $("#huanbiWholeNationPowerVolumeSumUpImg").attr("src","img/arrow-green2.png");
			}

			// 全国平均利用小时
			// 全国平均利用小时(当月) 
			$('#averUsePerHourMonthUp001').html(KPI_LYH_M_TOTA);
			// 全国平均利用小时同比(当月)
			$('#tongbiAverUsePerHourMonthUp').html(KPI_LYH_MT_TOTA+'%');
			if (KPI_LYH_MT_TOTA < 0) {
			    $("#tongbiAverUsePerHourMonthUpImg").attr("src","img/arrow-red2.png");
			}
			if (KPI_LYH_MT_TOTA > 0) {
			    $("#tongbiAverUsePerHourMonthUpImg").attr("src","img/arrow-green2.png");
			}
			
			// 全国平均利用小时(年度累计)
			$('#averUsePerHourSumUp').html(KPI_LYH_Y_TOTA+'小时');
			// 全国平均利用小时同比(年度累计)
			$('#huanbiAverUsePerHourSumUp').html(KPI_LYH_YT_TOTA);
			if (KPI_LYH_YT_TOTA < 0) {
			    $("#huanbiAverUsePerHourSumUpImg").attr("src","img/arrow-red2.png");
			}
			if (KPI_LYH_YT_TOTA > 0) {
			    $("#huanbiAverUsePerHourSumUpImg").attr("src","img/arrow-green2.png");
			}
			
			// 累计统调外购电量
			$('#improtPowerSum').html(KPI_WGD_Y_0000);
			// 累计统调外购电量-外省净送
			$('#improtPowerSumOutProvince').html(KPI_WGD_Y_WSJS);
			
			// 统调最高发电负荷
			$('#highestProducePower').html(KPI_FHZ_Y_FDFH);
			// 统调最高用电负荷
			$('#highestUsePower').html(KPI_FHZ_Y_YDFH);
			
            var daytime01;
    	    var daytime02;
    	    var daytime03;
    	    if (daytime != null) {
    	       daytime01 = daytime.substring(0,4);
    	       daytime02 = daytime.substring(4,6);
    	       daytime03 = daytime.substring(6,8); 
    	    }
    	    // 浙能电力每股收益
	        $('#KPI_EPS_M_MGSYDate').html(daytime01 + "年" + daytime02 + "月");
	        
            // 全国工业增加值增长速度
    	    if (daytimeIndustryUpSumDate != null) {
    	       daytime01 = daytimeIndustryUpSumDate.substring(0,4);
    	       daytime02 = daytimeIndustryUpSumDate.substring(4,6);
    	       daytime03 = daytimeIndustryUpSumDate.substring(6,8); 
    	    }
	        $('#industryUpSumDate').html(daytime01 + "年" + daytime02 + "月");
	        
	        // 全社会用电量-浙江省
    	    if (daytimeSocialPowerVolumeDate001 != null) {
    	       daytime01 = daytimeSocialPowerVolumeDate001.substring(0,4);
    	       daytime02 = daytimeSocialPowerVolumeDate001.substring(4,6);
    	       daytime03 = daytimeSocialPowerVolumeDate001.substring(6,8); 
    	    }
	        $('#socialPowerVolumeDate001').html(daytime01 + "年" + daytime02 + "月");
	        
	        // 全社会用电量-所有产业
    	    if (daytimeAllIndustryDate != null) {
    	       daytime01 = daytimeAllIndustryDate.substring(0,4);
    	       daytime02 = daytimeAllIndustryDate.substring(4,6);
    	       daytime03 = daytimeAllIndustryDate.substring(6,8); 
    	    }
	        $('#allIndustryDate').html(daytime01 + "年" + daytime02 + "月");
	        // 全国发电量
	        $('#wholeNationPowerVolumeDate').html(daytime01 + "年" + daytime02 + "月");
	        // 全国平均利用小时
	        $('#averUsePerHourDate').html(daytime01 + "年" + daytime02 + "月");
	        // 累计统调外购电量
	        $('#improtPowerSumDate').html(daytime01 + "年" + daytime02 + "月");
	        // 累计统调外购电量-外省净送
	        $('#improtPowerSumOutProvinceDate').html(daytime01 + "年" + daytime02 + "月");
	        // 累计统调外购电量
	        $('#highestUsePowerDate').html(daytime01 + "年" + daytime02 + "月");
	        // 累计统调外购电量-外省净送
	        $('#highestProducePowerDate').html(daytime01 + "年" + daytime02 + "月");
	        
            if (isHome02Load == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isHome02Load = true;
            }
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("网络连接失败，请重试", {
				offset: '0 -110'
			});
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_01_V01", mParameters);
	},
	// 获取当前用户的可见功能ID
	_getTheVisiableIdOfCurrentUser : function(){
		var mParameters = {};
		var tabName = "MACROENVIRONMENT";
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
		    var visiableIds = new Array();
		    var isMacro01 = false;
		    var isMacro02 = false;
		    var isMacro03 = false;
		    var isMacro04 = false;
		    var isMacro05 = false;
		    var isMacro06 = false;
		    var isMacro07 = false;
		    var isMacro08 = false;
		    var isMacro09 = false;
			// 可见功能Ids
			for (var i in sRes.results) {
			    var visiableId = sRes.results[i].ZTABNAME;
                if (visiableId == 'MACRO01') {
                    isMacro01 = true;
                }
                if (visiableId == 'MACRO02') {
                    isMacro02 = true;
                }
                if (visiableId == 'MACRO03') {
                    isMacro03 = true;
                }
                if (visiableId == 'MACRO04') {
                    isMacro04 = true;
                }
                if (visiableId == 'MACRO05') {
                    isMacro05 = true;
                }
                if (visiableId == 'MACRO06') {
                    isMacro06 = true;
                }
                if (visiableId == 'MACRO07') {
                    isMacro07 = true;
                }
                if (visiableId == 'MACRO08') {
                    isMacro08 = true;
                }
                if (visiableId == 'MACRO09') {
                    isMacro09 = true;
                }
			}
            if (isMacro01 === false) {
                visiableIds.push(0);
            }
            if (isMacro02 === false) {
                visiableIds.push(1);
            }
            if (isMacro03 === false) {
                visiableIds.push(2);
            }
            if (isMacro04 === false) {
                visiableIds.push(3);
            }
            if (isMacro05 === false) {
                visiableIds.push(4);
            }
            if (isMacro06 === false) {
                visiableIds.push(5);
            }
            if (isMacro07 === false) {
                visiableIds.push(6);
            }
            if (isMacro08 === false){
                visiableIds.push(7);
            }
            if (isMacro09 === false) {
                visiableIds.push(8);
            }     
			this._drawSwiper(visiableIds);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZJEY_AUT_PC_TABPRI?$filter=(BNAME eq '" +usrid+ "')and(ZTOPICNAME eq '"+tabName+"')", mParameters);
	},
	// 获取二级页面数据
	_loadData01 : function () {
		this._getTheVisiableIdOfCurrentUser();
		// 设置宏观环境数据
		this._loadDataMacroEnvironment();
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.pcbi.view.home02
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
* @memberOf com.zhenergy.pcbi.view.home02
*/
// 	onBeforeRendering: function() {
// 	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.pcbi.view.home02
*/
	onAfterRendering: function() {
        this._drawSwiper();
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.pcbi.view.home02
*/
//	onExit: function() {
//
//	}

});