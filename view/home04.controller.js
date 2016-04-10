sap.ui.controller("com.zhenergy.pcbi.view.home04", {
    
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
	// 获取天气温度数据
	_loadData : function(){
	    var daytime = null;
		var weather = null;
		var temperature = null;
	    var place = null;
		var mParameters = {};
		mParameters['async'] = true;
	    
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_ID == 'KPI_WEA_M_0001'){  //温度
				    place = sRes.results[i].KPI_DESC;
				    weather = sRes.results[i].KPI_VALUE;
				    daytime = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_ID == 'KPI_TEM_H_0001'){  //天气
				    temperature = sRes.results[i].KPI_VALUE;
				}
			}
			this._loadDataInitial(daytime,weather,temperature,place);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_01_V01", mParameters);
	},
	_loadDailyPowerOutputData : function(){
	    var KPI_YEAR_V;
	    var KPI_DAY_V;
		var mParameters = {};
		mParameters['async'] = true;
	    
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			var date=new Date();
            var year=date.getFullYear(); 
            var month=date.getMonth()+1;
            var day = date.getDate() - 1;
            if(day == 0){
                var lastday = new Date(getCurrentMonthFirst().setDate(getCurrentMonthFirst().getDate()-1));
                day = lastday;
                month = month - 1;
            }
            month =(month<10 ? "0"+month:month); 
            day = (day<10 ? "0"+day:day); 
            var mydate = (year.toString()+month.toString() + day.toString());
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '年累计发电量' && sRes.results[i].KPI_DESC == '浙能电力'){
				    KPI_YEAR_V = sRes.results[i].KPI_VALUE;
				}
				if (sRes.results[i].KPI_TYPE == '日发电量' && sRes.results[i].KPI_DESC == '浙能电力' && sRes.results[i].KPI_DATE == mydate){  
				    KPI_DAY_V = sRes.results[i].KPI_VALUE;
				}
			}
			document.getElementById('PowerOutputFinishDate').innerHTML = year.toString() + '年' + month.toString() + '月' + day.toString() + '日';
			document.getElementById('powerOutputFinish').innerHTML = KPI_DAY_V;
			document.getElementById('yearPowerOutputFinish').innerHTML = '年度累计发电量:' + KPI_YEAR_V + '万千瓦时';
// 			this._loadDataInitial(daytime,weather,temperature,place);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_02_V02?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	_loadRunningStateData : function(){
	    var KPI_INC_V;
	    var KPI_INC_UP;
		var mParameters = {};
		mParameters['async'] = true;
	    
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			var date=new Date();
            var year=date.getFullYear(); 
            var month=date.getMonth()+1;
            var day = date.getDate() - 1;
            if(day == 0){
                var lastday = new Date(getCurrentMonthFirst().setDate(getCurrentMonthFirst().getDate()-1));
                day = lastday;
                month = month - 1;
            }
            month =(month<10 ? "0"+month:month); 
            day = (day<10 ? "0"+day:day); 
            var mydate = (year.toString()+month.toString() + day.toString());
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '装机容量' && sRes.results[i].KPI_DESC == '浙能电力'){
				    KPI_INC_V = sRes.results[i].KPI_VALUE;
				}
			}
			document.getElementById('runningStateDate').innerHTML = year.toString() + '年' + month.toString() + '月' + day.toString() + '日';
			document.getElementById('runningState').innerHTML = KPI_INC_V;
// 			this._loadDataInitial(daytime,weather,temperature,place);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_YWQK_01_V01?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	_loadDataInitial : function(daytime,weather,temperature,place){
	    var daytime01;
	    var daytime02;
	    var daytime03;
	    if (daytime != null) {
	       daytime01 = daytime.substring(0,4);
	       daytime02 = daytime.substring(4,6);
	       daytime03 = daytime.substring(6,8); 
	    }
	    switch(weather !== null){
	        case weather == "W001":
	             $('#home_weather').html("晴天");
	             $('#home_weather_img').attr('src',"img/0001-weather-05.png");
	             break;
	        case weather == "W002":
	             $('#home_weather').html("多云");
	             $('#home_weather_img').attr('src',"img/0001-weather-04.png");
	             break;
	        case weather == "W003":
	             $('#home_weather').html("阴天");
	             $('#home_weather_img').attr('src',"img/0001-weather-01.png");
	             break;
	        case weather == "W004":
	             $('#home_weather').html("雨");
	             $('#home_weather_img').attr('src',"img/0001-weather-02.png");
	             break;
	        case weather == "W005":
	             $('#home_weather').html("雷阵雨");
	             $('#home_weather_img').attr('src',"img/0001-weather-03.png");
	             break;
	        case weather == "W006":
	             $('#home_weather').html("雨夹雪");
	             $('#home_weather_img').attr('src',"img/0001-weather-07.png");
	             break;
	        case weather == "W007":
	             $('#home_weather').html("雾");
	             $('#home_weather_img').attr('src',"img/0001-weather-08.png");
	             break;
	        case weather == "W008":
	             $('#home_weather').html("风");
	             $('#home_weather_img').attr('src',"img/0001-weather-10.png");
	             break;
	        case weather == "W009":
	             $('#home_weather').html("雪");
	             $('#home_weather_img').attr('src',"img/0001-weather-06.png");
	             break;
	        case weather == "W010":
	             $('#home_weather').html("冰雹");
	             $('#home_weather_img').attr('src',"img/0001-weather-09.png");
	             break;
	    }
	    // 高温预警
        if (temperature > 38) {
            $('#home_temperature').css('color','red');
        }
	    $('#home_temperature').html(temperature);
	    $('#home_place').html(place);
	    if (daytime01 == undefined) {
	        daytime01 = '00';
	    }	    
	    if (daytime02 == undefined) {
	        daytime02 = '00';
	    }
	    if (daytime03 == undefined) {
	        daytime03 = '00';
	    }
	    $('#home_daytime').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
	    
	    var d = new Date();
	    var weekday=new Array(7);
        weekday[0]="周日";
        weekday[1]="周一";
        weekday[2]="周二";
        weekday[3]="周三";
        weekday[4]="周四";
        weekday[5]="周五";
        weekday[6]="周六";
        $('#home_Week').html(weekday[d.getDay()]);
    	if (isHome04Load == false) {
            if (busy) {
    			busy.close();
    		} 
    		changeTheSkinOfPage();
    		isHome04Load = true;
        }
	},
	// 加载发电量值
	_loadData_top : function(){
	    if (isHome04Load == false) {
            busy = new sap.m.BusyDialog({
				close: function(event) {}
			});
    		if (busy) {
    			busy.open();
    		} 
	    }
	    var allenergy = null;
	    var mom = null;
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_ID == 'KPI_TEC_V_0000'){  //全社会用电量
				    allenergy = sRes.results[i].KPI_VALUE;
				}
				if (sRes.results[i].KPI_ID == 'KPI_TEC_T_0000'){  //同比上升
				    mom = sRes.results[i].KPI_VALUE;
				}
				
			}
			this._loadData02(mom,allenergy);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_01_V02", mParameters);
	},
	// 设定全社会用电量和同比值
	_loadData02 : function(mom,allenergy){
	    if(mom < 0){
	        $('#mom_img').attr('src',"img/arrow-red2.png");
	        $('#mom').html("下降" + Math.abs(mom));
	    }else if(mom >= 0){
	        if (mom == 0) {
	            $('#mom_img').attr('src',"img/horizontal-green.png");
	            $('#mom').html(Math.abs(mom));	            
	        } else {
	            $('#mom_img').attr('src',"img/arrow-green2.png");
	            $('#mom').html("上升" + Math.abs(mom));
	        }
	    }
	    var allenergy_change = allenergy.substring(0,2);
	    $('#allenergy').html(allenergy_change);
	    
	},
	
	// 获取二级页面数据
	_loadData01 : function () {
        this._drawSwiper();
        this._loadData();
        this._loadData_top();
        this._loadDailyPowerOutputData();
        this._loadRunningStateData();
        // 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);  
	},
	onInit: function() {
        
	    this.getView().addEventDelegate({
			
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {

			    //AC-LOUWW 页面增加动态的时间日期标签
				var myDate=new Date() ;
				var timeLabel = myDate.getFullYear() + "年" + (myDate.getMonth()+1) +"月" + (myDate.getDate()-1)+'日'; //getMonth 1-12月对应0-11  myDate.getDate()-1
				document.getElementById("FuelStorageDate").innerHTML=timeLabel;
			    
                this._loadData01();
			}, this)
		});
	},
	onAfterRendering: function() {
        this._drawSwiper();
	}


});