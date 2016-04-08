sap.ui.controller("com.zhenergy.pcbi.view.home08", {

    /* initialize the swiper plugin*/
	_drawSwiper: function() {
	    require(
                [
                    'js/swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide: slide08PageNum,
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
	// 人均营业收入值
	_loadData_AverBusinessIncome : function(){
	    if (isHome08Load == false) {
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
		    
		    // 人均营业收入同比值
            var AverBusinessIncomeTongBi = '';
            // 人均营业收入环比值
            var AverBusinessIncomeHuanBi = '';
            // 统计日期
            var daytime = null;
			// 人均营业收入值
			var AverBusinessIncomeValue=0;

			// 人均利润同比值
            var averPersonProfitTongBi = '';
            // 人均利润环比值
            var averPersonProfitHuanBi = '';
			// 人均利润值
			var averPersonProfit=0;
			
			// 单位万千瓦员工数同比值
            var workerCountsPerKWTongBi = '';
            // 单位万千瓦员工数环比值
            var workerCountsPerKWHuanBi = '';
            // 统计日期
            var daytimeWorkerCountsPerKW = null;
			// 单位万千瓦员工数值
			var workerCountsPerKW=0;
			
			// 发电生产率同比值
            var workerCountsPerKWHourTongBi = '';
            // 发电生产率环比值
            var workerCountsPerKWHourHuanBi = '';
            // 统计日期
            var daytimeWorkerCountsPerKWHour = null;
			// 发电生产率值
			var workerCountsPerKWHour=0;
			
			// 单位万千瓦人工成本同比值
            var workerCostPerKWTongBi = '';
            // 单位万千瓦人工成本环比值
            var workerCostPerKWHuanBi = '';
            // 统计日期
            var daytimeWorkerCostPerKW = null;
			// 单位万千瓦人工成本值
			var workerCostPerKW=0;
			
			// 单位万千瓦时人工成本同比值
            var workerCostPerKWHourTongBi = '';
            // 单位万千瓦时人工成本环比值
            var workerCostPerKWHourHuanBi = '';
            // 统计日期
            var daytimeWorkerCostPerKWHour = null;
			// 单位万千瓦时人工成本值
			var workerCostPerKWHour=0;
			
			for (var i in sRes.results) {
			    // 人均营业收入
				if (sRes.results[i].KPI_TYPE == '人均营业收入' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    AverBusinessIncomeValue = AverBusinessIncomeValue+parseFloat(sRes.results[i].KPI_VALUE);
				    daytime = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '人均营业收入环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    AverBusinessIncomeHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '人均营业收入同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    AverBusinessIncomeTongBi = sRes.results[i].KPI_VALUE*100;
				}
				
				
			    // 人均利润
				if (sRes.results[i].KPI_TYPE == '人均利润' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    averPersonProfit = averPersonProfit+parseFloat(sRes.results[i].KPI_VALUE);
				    averPersonProfitDetailValue = averPersonProfit;
				    daytimeNO5 = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '人均利润环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    averPersonProfitHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '人均利润同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    averPersonProfitTongBi = sRes.results[i].KPI_VALUE*100;
				}
				
				// 单位千瓦员工人数
				if (sRes.results[i].KPI_TYPE == '单位万千瓦员工数' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCountsPerKW = workerCountsPerKW+parseFloat(sRes.results[i].KPI_VALUE);
				    daytimeNO1 = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '单位万千瓦员工数环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCountsPerKWHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '单位万千瓦员工数同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCountsPerKWTongBi = sRes.results[i].KPI_VALUE*100;
				}
				// 单位万千瓦时员工人数
				if (sRes.results[i].KPI_TYPE == '发电生产率' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCountsPerKWHour = workerCountsPerKWHour+parseFloat(sRes.results[i].KPI_VALUE);
				    daytimeNO2 = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '发电生产率环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCountsPerKWHourHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '发电生产率同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCountsPerKWHourTongBi = sRes.results[i].KPI_VALUE*100;
				}
			    // 单位万千瓦人工成本
				if (sRes.results[i].KPI_TYPE == '单位万千瓦人工成本' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCostPerKW = workerCostPerKW+parseFloat(sRes.results[i].KPI_VALUE);
				    daytimeNO3 = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '单位万千瓦人工成本环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCostPerKWHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '单位万千瓦人工成本同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCostPerKWTongBi = sRes.results[i].KPI_VALUE*100;
				} 
				// 单位万千瓦时人工成本
				if (sRes.results[i].KPI_TYPE == '单位万千瓦时人工成本' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCostPerKWHour = workerCostPerKWHour+parseFloat(sRes.results[i].KPI_VALUE);
				    daytimeNO4 = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '单位万千瓦时人工成本环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCostPerKWHourHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '单位万千瓦时人工成本同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
				    workerCostPerKWHourTongBi = sRes.results[i].KPI_VALUE*100;
				}
			}
			
			// 人均营业收入
			var rlr_color="red";
    		if(AverBusinessIncomeValue>0){
    		    if (skinName == '夜间模式') {
                    rlr_color="green";
    		    } else {
    		        rlr_color="white";
    		    }
    		}
    		$('#averBusinessIncome').css('color',rlr_color);
    		$('#averBusinessIncome').css('font-size','75px');
			$('#averBusinessIncome').html(AverBusinessIncomeValue);
// 			if (AverBusinessIncomeHuanBi != undefined) {
// 			    $('#huanbiAverBusinessIncome').html(AverBusinessIncomeHuanBi);
// 			}
//             if (AverBusinessIncomeHuanBi > 0) {
//                 $("#huanbiAverBusinessIncomeImg").attr("src","img/arrow-green2.png");
//             } else {
//                 $("#huanbiAverBusinessIncomeImg").attr("src","img/arrow-red2.png");
//             }
            if (typeof(AverBusinessIncomeTongBi) !== "undefined") {
                $('#tongbiAverBusinessIncome').html(AverBusinessIncomeTongBi);    
            }
            if (AverBusinessIncomeTongBi > 0) {
                $("#tongbiAverBusinessIncomeImg").attr("src","img/arrow-green2.png");
            } else {
                if (AverBusinessIncomeTongBi < 0) {
                    $("#tongbiAverBusinessIncomeImg").attr("src","img/arrow-red2.png"); 
                } else {
                    $("#tongbiAverBusinessIncomeImg").attr("src","img/horizontal-green.png");  
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
            // 人均营业收入日期
	        $('#averBusinessIncomeDate').html(daytime01 + "年" + daytime02 + "月");//  + daytime03 + "日"
	        
	        // 单位千瓦员工人数
			var workerCountsPerKW_color="red";
    		if(workerCountsPerKW>0){
    		    if (skinName == '夜间模式') {
    		        workerCountsPerKW_color="green";
    		    } else {
    		        workerCountsPerKW_color="white";
    		    }
    		}
    		$('#workerCountsPerKW').css('color',workerCountsPerKW_color);
    		$('#workerCountsPerKW').css('font-size','65px');
			$('#workerCountsPerKW').html(workerCountsPerKW);
			// 同比值
            if (workerCountsPerKWTongBi != undefined) {
                $('#tongbiWorkerCountsPerKW').html(workerCountsPerKWTongBi);    
            }
            if (workerCountsPerKWTongBi > 0) {
                $("#tongbiWorkerCountsPerKWImg").attr("src","img/arrow-green2.png");
            } else {
                if (workerCountsPerKWTongBi < 0) {
                    $("#tongbiWorkerCountsPerKWImg").attr("src","img/arrow-red2.png");
                } else {
                    $("#tongbiWorkerCountsPerKWImg").attr("src","img/horizontal-green.png");
                }
            }
            var daytime01NO1;
    	    var daytime02NO1;
    	    var daytime03NO1;
    	    if (daytimeNO1 != null) {
    	       daytime01NO1 = daytimeNO1.substring(0,4);
    	       daytime02NO1 = daytimeNO1.substring(4,6);
    	       daytime03NO1 = daytimeNO1.substring(6,8); 
    	    }
            // 单位千瓦员工人数统计日期
	        $('#workerCountsPerKWDate').html(daytime01NO1 + "年" + daytime02NO1 + "月");//  + daytime03NO1 + "日"
	        
	        // 单位千瓦时员工人数
			var workerCountsPerKWHour_color="red";
    		if(workerCountsPerKWHour>0){
    		    if (skinName == '夜间模式') {
    		        workerCountsPerKWHour_color="green";
    		    } else {
    		        workerCountsPerKWHour_color="white";
    		    }
    		}
    		$('#workerCountsPerKWHour').css('color',workerCountsPerKWHour_color);
    		$('#workerCountsPerKWHour').css('font-size','65px');
			$('#workerCountsPerKWHour').html(workerCountsPerKWHour);
			// 同比值
            if (workerCountsPerKWHourTongBi != undefined) {
                $('#tongbiWorkerCountsPerKWHour').html(workerCountsPerKWHourTongBi);    
            }
            if (workerCountsPerKWHourTongBi > 0) {
                $("#tongbiWorkerCountsPerKWHourImg").attr("src","img/arrow-green2.png");
            } else {
                if (workerCountsPerKWHourTongBi < 0) {
                    $("#tongbiWorkerCountsPerKWHourImg").attr("src","img/arrow-red2.png");   
                } else {
                    $("#tongbiWorkerCountsPerKWHourImg").attr("src","img/horizontal-green.png");  
                }
            }
            var daytime01NO2;
    	    var daytime02NO2;
    	    var daytime03NO2;
    	    if (daytimeNO2 != null) {
    	       daytime01NO2 = daytimeNO2.substring(0,4);
    	       daytime02NO2 = daytimeNO2.substring(4,6);
    	       daytime03NO2 = daytimeNO2.substring(6,8); 
    	    }
            // 单位千瓦时员工人数统计日期
	        $('#workerCountsPerKWHourDate').html(daytime01NO2 + "年" + daytime02NO2 + "月");//  + daytime03NO2 + "日"
	        
	        // 单位万千瓦人工成本
			var workerCostPerKW_color="red";
    		if(workerCostPerKW>0){
    		    if (skinName == '夜间模式') {
                    workerCostPerKW_color="green";
    		    } else {
    		        workerCostPerKW_color="white";
    		    }
    		}
    		$('#workerCostPerKW').css('color',workerCostPerKW_color);
    		$('#workerCostPerKW').css('font-size','65px');
			$('#workerCostPerKW').html(workerCostPerKW);
			// 同比值
            if (workerCostPerKWTongBi != undefined) {
                $('#tongbiworkerCostPerKW').html(workerCostPerKWTongBi);    
            }
            if (workerCostPerKWTongBi > 0) {
                $("#tongbiworkerCostPerKWImg").attr("src","img/arrow-green2.png");
            } else {
                if (workerCostPerKWTongBi < 0) {
                    $("#tongbiworkerCostPerKWImg").attr("src","img/arrow-red2.png");
                } else {
                    $("#tongbiworkerCostPerKWImg").attr("src","img/horizontal-green.png");
                }
            }
            var daytime01NO3;
    	    var daytime02NO3;
    	    var daytime03NO3;
    	    if (daytimeNO3 != null) {
    	       daytime01NO3 = daytimeNO3.substring(0,4);
    	       daytime02NO3 = daytimeNO3.substring(4,6);
    	       daytime03NO3 = daytimeNO3.substring(6,8); 
    	    }
            // 单位万千瓦人工成本统计日期
	        $('#workerCostPerKWDate').html(daytime01NO3 + "年" + daytime02NO3 + "月");//  + daytime03NO3 + "日"
	        
	        // 单位万千瓦时人工成本
			var workerCostPerKWHour_color="red";
    		if(workerCostPerKWHour>0){
    		    if (skinName == '夜间模式') {
    		        workerCostPerKWHour_color="green";
    		    } else {
    		        workerCostPerKWHour_color="white";
    		    }
    		}
    		$('#workerCostPerKWHour').css('color',workerCostPerKWHour_color);
    		$('#workerCostPerKWHour').css('font-size','65px');
			$('#workerCostPerKWHour').html(workerCostPerKWHour);
			// 同比值
            if (workerCostPerKWHourTongBi != undefined) {
                $('#tongbiworkerCostPerKWHour').html(workerCostPerKWHourTongBi);    
            }
            if (workerCostPerKWHourTongBi > 0) {
                $("#tongbiworkerCostPerKWHourImg").attr("src","img/arrow-green2.png");
            } else {
                if (workerCostPerKWHourTongBi < 0) {
                    $("#tongbiworkerCostPerKWHourImg").attr("src","img/arrow-red2.png");
                } else {
                    $("#tongbiworkerCostPerKWHourImg").attr("src","img/horizontal-green.png");
                }
            }
            var daytime01NO4;
    	    var daytime02NO4;
    	    var daytime03NO4;
    	    if (daytimeNO4 != null) {
    	       daytime01NO4 = daytimeNO4.substring(0,4);
    	       daytime02NO4 = daytimeNO4.substring(4,6);
    	       daytime03NO4 = daytimeNO4.substring(6,8); 
    	    }
            // 单位万千瓦时人工成本统计日期
            // TODO wait for new method of getting data
	        $('#workerCostPerKWHourDate').html(daytime01NO4 + "年" + daytime02NO4 + "月");//  + daytime03NO4 + "日"
	        
	        // 人均利润
			var averPersonProfit_color="red";
    		if(averPersonProfit>0){
    		    if (skinName == '夜间模式') {
    		        averPersonProfit_color="green";
    		    } else {
    		        averPersonProfit_color="white";
    		    }
    		}
    		$('#averPersonProfit08').css('color',averPersonProfit_color);
    		$('#averPersonProfit08').css('font-size','65px');
			$('#averPersonProfit08').html(averPersonProfit);
			// 同比值
            if (averPersonProfitTongBi != undefined) {
                $('#tongbiAverPersonProfit').html(averPersonProfitTongBi);    
            }
            if (averPersonProfitTongBi > 0) {
                $("#tongbiAverPersonProfitImg").attr("src","img/arrow-green2.png");
            } else {
                if (averPersonProfitTongBi < 0) {
                    $("#tongbiAverPersonProfitImg").attr("src","img/arrow-red2.png");
                } else {
                    $("#tongbiAverPersonProfitImg").attr("src","img/horizontal-green.png");
                }
            }
            var daytime01NO5;
    	    var daytime02NO5;
    	    var daytime03NO5;
    	    if (daytimeNO5 != null) {
    	       daytime01NO5 = daytimeNO5.substring(0,4);
    	       daytime02NO5 = daytimeNO5.substring(4,6);
    	       daytime03NO5 = daytimeNO5.substring(6,8); 
    	    }
            // 人均利润统计日期
	        $('#averPersonProfitDate08').html(daytime01NO5 + "年" + daytime02NO5 + "月");//  + daytime03NO5 + "日"
	        
	        if (isHome08Load == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isHome08Load = true;
            }
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_FZBZ_01_V01?$filter=(BNAME eq '" +usrid+ "')", mParameters);
	},
	
// 	// get data by new method of OData
// 	_getDataByDifferentDate : function(currentDate){
	    
// 	    if (isHome08Load == false) {
//             busy = new sap.m.BusyDialog({
// 				close: function(event) {}
// 			});
//     		if (busy) {
//     			busy.open();
//     		} 
// 	    }
// 	    var mParameters = "/SCREEN_FZBZ_01_V01.xsodata/PARAMETER(PUR_NAME='"+usrid+"',PUR_MONTH='"+currentDate+"')/Results?&$format=json";

// 	    var mResults = makeCorsRequest(mParameters);
        
// 	    if (mResults != '') {
//             var sResAll = JSON.parse(mResults);
//             var sRes = sResAll.d;

// 		    // 人均营业收入同比值
//             var AverBusinessIncomeTongBi = '';
//             // 人均营业收入环比值
//             var AverBusinessIncomeHuanBi = '';
//             // 统计日期
//             var daytime = null;
// 			// 人均营业收入值
// 			var AverBusinessIncomeValue=0;
			
// 			// 人均利润同比值
//             var averPersonProfitTongBi = '';
//             // 人均利润环比值
//             var averPersonProfitHuanBi = '';
// 			// 人均利润值
// 			var averPersonProfit=0;
			
// 			// 单位万千瓦员工数同比值
//             var workerCountsPerKWTongBi = '';
//             // 单位万千瓦员工数环比值
//             var workerCountsPerKWHuanBi = '';
//             // 统计日期
//             var daytimeWorkerCountsPerKW = null;
// 			// 单位万千瓦员工数值
// 			var workerCountsPerKW=0;
			
// 			// 发电生产率同比值
//             var workerCountsPerKWHourTongBi = '';
//             // 发电生产率环比值
//             var workerCountsPerKWHourHuanBi = '';
//             // 统计日期
//             var daytimeWorkerCountsPerKWHour = null;
// 			// 发电生产率值
// 			var workerCountsPerKWHour=0;
			
// 			// 单位万千瓦人工成本同比值
//             var workerCostPerKWTongBi = '';
//             // 单位万千瓦人工成本环比值
//             var workerCostPerKWHuanBi = '';
//             // 统计日期
//             var daytimeWorkerCostPerKW = null;
// 			// 单位万千瓦人工成本值
// 			var workerCostPerKW=0;
			
// 			// 单位万千瓦时人工成本同比值
//             var workerCostPerKWHourTongBi = '';
//             // 单位万千瓦时人工成本环比值
//             var workerCostPerKWHourHuanBi = '';
//             // 统计日期
//             var daytimeWorkerCostPerKWHour = null;
// 			// 单位万千瓦时人工成本值
// 			var workerCostPerKWHour=0;
			
// 			for (var i in sRes.results) {
// 			    // 人均营业收入
// 				if (sRes.results[i].KPI_TYPE == '人均营业收入' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    AverBusinessIncomeValue = AverBusinessIncomeValue+parseFloat(sRes.results[i].KPI_VALUE);
// 				    daytime = sRes.results[i].KPI_DATE;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '人均营业收入环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    AverBusinessIncomeHuanBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '人均营业收入同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    AverBusinessIncomeTongBi = sRes.results[i].KPI_VALUE*100;
// 				}
				
// 			    // 人均利润
// 				if (sRes.results[i].KPI_TYPE == '人均利润' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    averPersonProfit = averPersonProfit+parseFloat(sRes.results[i].KPI_VALUE);
// 				}
// 				if (sRes.results[i].KPI_TYPE == '人均利润环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    averPersonProfitHuanBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '人均利润同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    averPersonProfitTongBi = sRes.results[i].KPI_VALUE*100;
// 				}
				
// 				// 单位千瓦员工人数
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦员工数' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCountsPerKW = workerCountsPerKW+parseFloat(sRes.results[i].KPI_VALUE);
// 				    daytimeNO1 = sRes.results[i].KPI_DATE;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦员工数环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCountsPerKWHuanBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦员工数同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCountsPerKWTongBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 				// 单位万千瓦时员工人数
// 				if (sRes.results[i].KPI_TYPE == '发电生产率' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCountsPerKWHour = workerCountsPerKWHour+parseFloat(sRes.results[i].KPI_VALUE);
// 				    daytimeNO2 = sRes.results[i].KPI_DATE;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '发电生产率环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCountsPerKWHourHuanBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '发电生产率同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCountsPerKWHourTongBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 			    // 单位万千瓦人工成本
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦人工成本' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCostPerKW = workerCostPerKW+parseFloat(sRes.results[i].KPI_VALUE);
// 				    daytimeNO3 = sRes.results[i].KPI_DATE;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦人工成本环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCostPerKWHuanBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦人工成本同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCostPerKWTongBi = sRes.results[i].KPI_VALUE*100;
// 				} 
// 				// 单位万千瓦时人工成本
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦时人工成本' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCostPerKWHour = workerCostPerKWHour+parseFloat(sRes.results[i].KPI_VALUE);
// 				    daytimeNO4 = sRes.results[i].KPI_DATE;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦时人工成本环比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCostPerKWHourHuanBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 				if (sRes.results[i].KPI_TYPE == '单位万千瓦时人工成本同比' && sRes.results[i].KPI_DESC == '浙能电力'){  
// 				    workerCostPerKWHourTongBi = sRes.results[i].KPI_VALUE*100;
// 				}
// 			}
			
// 			// 人均营业收入
// 			var rlr_color="red";
//     		if(AverBusinessIncomeValue>0){
//     		    if (skinName == '夜间模式') {
//                     rlr_color="green";
//     		    } else {
//     		        rlr_color="white";
//     		    }
//     		}
//     		$('#averBusinessIncome').css('color',rlr_color);
//     		$('#averBusinessIncome').css('font-size','75px');
// 			$('#averBusinessIncome').html(AverBusinessIncomeValue);
// // 			if (AverBusinessIncomeHuanBi != undefined) {
// // 			    $('#huanbiAverBusinessIncome').html(AverBusinessIncomeHuanBi);
// // 			}
// //             if (AverBusinessIncomeHuanBi > 0) {
// //                 $("#huanbiAverBusinessIncomeImg").attr("src","img/arrow-green2.png");
// //             } else {
// //                 $("#huanbiAverBusinessIncomeImg").attr("src","img/arrow-red2.png");
// //             }
//             if (typeof(AverBusinessIncomeTongBi) !== "undefined") {
//                 $('#tongbiAverBusinessIncome').html(AverBusinessIncomeTongBi);    
//             }
//             if (AverBusinessIncomeTongBi > 0) {
//                 $("#tongbiAverBusinessIncomeImg").attr("src","img/arrow-green2.png");
//             } else {
//                 if (AverBusinessIncomeTongBi < 0) {
//                     $("#tongbiAverBusinessIncomeImg").attr("src","img/arrow-red2.png"); 
//                 } else {
//                     $("#tongbiAverBusinessIncomeImg").attr("src","img/horizontal-green.png");  
//                 }
//             }
            
//             var daytime01;
//     	    var daytime02;
//     	    var daytime03;
//     	    if (daytime != null) {
//     	       daytime01 = daytime.substring(0,4);
//     	       daytime02 = daytime.substring(4,6);
//     	       daytime03 = daytime.substring(6,8); 
//     	    }
//             // 人均营业收入日期
// 	        $('#averBusinessIncomeDate').html(daytime01 + "年" + daytime02 + "月");//  + daytime03 + "日"
	        
// 	        // 单位千瓦员工人数
// 			var workerCountsPerKW_color="red";
//     		if(workerCountsPerKW>0){
//     		    if (skinName == '夜间模式') {
//     		        workerCountsPerKW_color="green";
//     		    } else {
//     		        workerCountsPerKW_color="white";
//     		    }
//     		}
//     		$('#workerCountsPerKW').css('color',workerCountsPerKW_color);
//     		$('#workerCountsPerKW').css('font-size','65px');
// 			$('#workerCountsPerKW').html(workerCountsPerKW);
// 			// 同比值
//             if (workerCountsPerKWTongBi != undefined) {
//                 $('#tongbiWorkerCountsPerKW').html(workerCountsPerKWTongBi);    
//             }
//             if (workerCountsPerKWTongBi > 0) {
//                 $("#tongbiWorkerCountsPerKWImg").attr("src","img/arrow-green2.png");
//             } else {
//                 if (workerCountsPerKWTongBi < 0) {
//                     $("#tongbiWorkerCountsPerKWImg").attr("src","img/arrow-red2.png");
//                 } else {
//                     $("#tongbiWorkerCountsPerKWImg").attr("src","img/horizontal-green.png");
//                 }
//             }
//             var daytime01NO1;
//     	    var daytime02NO1;
//     	    var daytime03NO1;
//     	    if (daytimeNO1 != null) {
//     	       daytime01NO1 = daytimeNO1.substring(0,4);
//     	       daytime02NO1 = daytimeNO1.substring(4,6);
//     	       daytime03NO1 = daytimeNO1.substring(6,8); 
//     	    }
//             // 单位千瓦员工人数统计日期
// 	        $('#workerCountsPerKWDate').html(daytime01NO1 + "年" + daytime02NO1 + "月");//  + daytime03NO1 + "日"
	        
// 	        // 单位千瓦时员工人数
// 			var workerCountsPerKWHour_color="red";
//     		if(workerCountsPerKWHour>0){
//     		    if (skinName == '夜间模式') {
//     		        workerCountsPerKWHour_color="green";
//     		    } else {
//     		        workerCountsPerKWHour_color="white";
//     		    }
//     		}
//     		$('#workerCountsPerKWHour').css('color',workerCountsPerKWHour_color);
//     		$('#workerCountsPerKWHour').css('font-size','65px');
// 			$('#workerCountsPerKWHour').html(workerCountsPerKWHour);
// 			// 同比值
//             if (workerCountsPerKWHourTongBi != undefined) {
//                 $('#tongbiWorkerCountsPerKWHour').html(workerCountsPerKWHourTongBi);    
//             }
//             if (workerCountsPerKWHourTongBi > 0) {
//                 $("#tongbiWorkerCountsPerKWHourImg").attr("src","img/arrow-green2.png");
//             } else {
//                 if (workerCountsPerKWHourTongBi < 0) {
//                     $("#tongbiWorkerCountsPerKWHourImg").attr("src","img/arrow-red2.png");   
//                 } else {
//                     $("#tongbiWorkerCountsPerKWHourImg").attr("src","img/horizontal-green.png");  
//                 }
//             }
//             var daytime01NO2;
//     	    var daytime02NO2;
//     	    var daytime03NO2;
//     	    if (daytimeNO2 != null) {
//     	       daytime01NO2 = daytimeNO2.substring(0,4);
//     	       daytime02NO2 = daytimeNO2.substring(4,6);
//     	       daytime03NO2 = daytimeNO2.substring(6,8); 
//     	    }
//             // 单位千瓦时员工人数统计日期
// 	        $('#workerCountsPerKWHourDate').html(daytime01NO2 + "年" + daytime02NO2 + "月");//  + daytime03NO2 + "日"
	        
// 	        // 单位万千瓦人工成本
// 			var workerCostPerKW_color="red";
//     		if(workerCostPerKW>0){
//     		    if (skinName == '夜间模式') {
//                     workerCostPerKW_color="green";
//     		    } else {
//     		        workerCostPerKW_color="white";
//     		    }
//     		}
//     		$('#workerCostPerKW').css('color',workerCostPerKW_color);
//     		$('#workerCostPerKW').css('font-size','65px');
// 			$('#workerCostPerKW').html(workerCostPerKW);
// 			// 同比值
//             if (workerCostPerKWTongBi != undefined) {
//                 $('#tongbiworkerCostPerKW').html(workerCostPerKWTongBi);    
//             }
//             if (workerCostPerKWTongBi > 0) {
//                 $("#tongbiworkerCostPerKWImg").attr("src","img/arrow-green2.png");
//             } else {
//                 if (workerCostPerKWTongBi < 0) {
//                     $("#tongbiworkerCostPerKWImg").attr("src","img/arrow-red2.png");
//                 } else {
//                     $("#tongbiworkerCostPerKWImg").attr("src","img/horizontal-green.png");
//                 }
//             }
//             var daytime01NO3;
//     	    var daytime02NO3;
//     	    var daytime03NO3;
//     	    if (daytimeNO3 != null) {
//     	       daytime01NO3 = daytimeNO3.substring(0,4);
//     	       daytime02NO3 = daytimeNO3.substring(4,6);
//     	       daytime03NO3 = daytimeNO3.substring(6,8); 
//     	    }
//             // 单位万千瓦人工成本统计日期
// 	        $('#workerCostPerKWDate').html(daytime01NO3 + "年" + daytime02NO3 + "月");//  + daytime03NO3 + "日"
	        
// 	        // 单位万千瓦时人工成本
// 			var workerCostPerKWHour_color="red";
//     		if(workerCostPerKWHour>0){
//     		    if (skinName == '夜间模式') {
//     		        workerCostPerKWHour_color="green";
//     		    } else {
//     		        workerCostPerKWHour_color="white";
//     		    }
//     		}
//     		$('#workerCostPerKWHour').css('color',workerCostPerKWHour_color);
//     		$('#workerCostPerKWHour').css('font-size','65px');
// 			$('#workerCostPerKWHour').html(workerCostPerKWHour);
// 			// 同比值
//             if (workerCostPerKWHourTongBi != undefined) {
//                 $('#tongbiworkerCostPerKWHour').html(workerCostPerKWHourTongBi);    
//             }
//             if (workerCostPerKWHourTongBi > 0) {
//                 $("#tongbiworkerCostPerKWHourImg").attr("src","img/arrow-green2.png");
//             } else {
//                 if (workerCostPerKWHourTongBi < 0) {
//                     $("#tongbiworkerCostPerKWHourImg").attr("src","img/arrow-red2.png");
//                 } else {
//                     $("#tongbiworkerCostPerKWHourImg").attr("src","img/horizontal-green.png");
//                 }
//             }
//             var daytime01NO4;
//     	    var daytime02NO4;
//     	    var daytime03NO4;
//     	    if (daytimeNO4 != null) {
//     	       daytime01NO4 = daytimeNO4.substring(0,4);
//     	       daytime02NO4 = daytimeNO4.substring(4,6);
//     	       daytime03NO4 = daytimeNO4.substring(6,8); 
//     	    }
//             // 单位万千瓦时人工成本统计日期
//             // TODO wait for new method of getting data
// 	        $('#workerCostPerKWHourDate').html(daytime01NO4 + "年" + daytime02NO4 + "月");//  + daytime03NO4 + "日"
	        
// 	        // 人均利润
// 			var averPersonProfit_color="red";
//     		if(averPersonProfit>0){
//     		    if (skinName == '夜间模式') {
//     		        averPersonProfit_color="green";
//     		    } else {
//     		        averPersonProfit_color="white";
//     		    }
//     		}
//     		$('#averPersonProfit').css('color',averPersonProfit_color);
//     		$('#averPersonProfit').css('font-size','65px');
// 			$('#averPersonProfit').html(averPersonProfit);
// 			// 同比值
//             if (averPersonProfitTongBi != undefined) {
//                 $('#tongbiaverPersonProfit').html(averPersonProfitTongBi);    
//             }
//             if (averPersonProfitTongBi > 0) {
//                 $("#tongbiaverPersonProfitImg").attr("src","img/arrow-green2.png");
//             } else {
//                 if (averPersonProfitTongBi < 0) {
//                     $("#tongbiaverPersonProfitImg").attr("src","img/arrow-red2.png");
//                 } else {
//                     $("#tongbiaverPersonProfitImg").attr("src","img/horizontal-green.png");
//                 }
//             }
//             var daytime01NO5;
//     	    var daytime02NO5;
//     	    var daytime03NO5;
//     	    if (daytimeNO5 != null) {
//     	       daytime01NO5 = daytimeNO5.substring(0,4);
//     	       daytime02NO5 = daytimeNO5.substring(4,6);
//     	       daytime03NO5 = daytimeNO5.substring(6,8); 
//     	    }
//             // 人均利润统计日期
// 	        $('#averPersonProfitDate').html(daytime01NO5 + "年" + daytime02NO5 + "月");//  + daytime03NO5 + "日"
	        
// 	        if (isHome08Load == false) {
//                 if (busy) {
//         			busy.close();
//         		} 
//         		changeTheSkinOfPage();
//         		isHome08Load = true;
//             }
// 	    } else {
// 	        alert('The Result Is Empty');
// 	    }
// 	},
	
	// 获取二级页面数据
	_loadData01 : function (currentDate) {
	    
	   // $('.magicFocus').focus();
	    
	   // var currentDate;
	   // if (currentDate == '') {
	   //     var alreadySetDate = document.getElementById("workerCostPerKWDateId").value;
	   //     if (alreadySetDate != '') {
	   //         currentDate = alreadySetDate.replace(/\-/g,'');
	   //     } else {
    //         	var datetime = new Date();
    //             currentDate = toSimpleDateString(datetime,'month');  
	   //     }
	   // } else {
    //         currentDate = currentDate.replace(/\-/g,'');
	   // }
	   // // get data by different date
	   // this._getDataByDifferentDate(currentDate);
	    
		this._drawSwiper();
	    this._loadData_AverBusinessIncome();
	    
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.pcbi.view.home08
*/
	onInit: function() {
        
	    this.getView().addEventDelegate({
			
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {
                this._loadData01('');
			}, this)
		});
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.pcbi.view.home08
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.pcbi.view.home08
*/
	onAfterRendering: function() {
        this._drawSwiper();
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.pcbi.view.home08
*/
//	onExit: function() {
//
//	}

});