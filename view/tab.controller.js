sap.ui.controller("com.zhenergy.pcbi.view.tab", {
	onInit: function() {
		
	    this.getView().addEventDelegate({
			onBeforeShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
		this.getView().addEventDelegate({
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},
    onBeforeShow: function(evt) {
	    data_x3 = new Array("1.2", "1.1", "1.4", "1.15", "1.2", "1.15", "1.2");
 		data_x4 = new Array("0.015", "0.01", "0.04", "0.02", "0.025", "0.015", "0.025");
		var mychart001;
		var mychart002;
		var mychart003;
		var mychart004;
		var myChart3;
		var myChart4;
		var myChart5;
		var myChart6;
		var myChart7;
		//html参数
		tab_place = "杭州";
		tab_powerplant = "凤台发电";
		tab_usetime = "发电量";
	},
	onAfterShow: function(evt) {
	    
	    data01 = new Array();
	    data02 = new Array();
	    data03 = new Array();
	    data04= new Array();
	    dataXName = new Array();
	    // 全社会用电量默认地区（浙江）  发电厂（浙江）
	    this.loadChart01('金华','兰溪发电');
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
    },
    // 改变地区
    loadChart01 : function(cityName, defaultPowerPlant){
        tab_usetime = '发电量';
	    // 加载发电量和利用小时数据
	    this.loadData_v02(defaultPowerPlant,'发电量');
	    // 加载天气温度好全社会用电量数据
	    this.loadData_v01(cityName);
	},
	// 改变电厂
	loadChart02 : function(currentPlantName){
	    tab_usetime = '发电量';
	    // 加载发电量和利用小时数据
	    this.loadData_v02(currentPlantName,'发电量');
	    // 加载天气温度好全社会用电量数据
	    this.loadData_v01(place_v01);
	},
	// 改变发电量和利用小时
	loadChart03 : function(tab_usetime){
	    // 加载发电量和利用小时数据
	    this.loadData_v02(powerplant_v02, tab_usetime);
	    // 加载天气温度好全社会用电量数据
	    this.loadData_v01(place_v01);
	},
	loadData_v01 : function(cityName){
        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		} 
	    data01 = [];
	    data02 = [];
	    data03 = [];
	    data04= [];
	    dataXName = [];
	    place_v01 = cityName;

	    //定义当天的日期与7天前的日期 start
		var daytime = new Date();
		var date = new Date(daytime.getTime() - 7 * 24 * 3600 * 1000);
		var year = daytime.getFullYear();
		var month = daytime.getMonth();
		var month_true;
		if (month > 8) {
			month_true = month + 1;
		} else {
			month = month + 1;
			month_true = "0" + month;
		}
		var day = daytime.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		final_daytime = year + '' + month_true + '' + day + '';
		var year01 = date.getFullYear();
		var month01 = date.getMonth();
		var month_true_01;
		if (month01 > 8) {
			month_true_01 = month01 + 1;
		} else {
			month01 = month01 + 1;
			month_true_01 = "0" + month01;
		}
		var day01 = date.getDate();
		if (day01 < 10) {
			day01 = "0" + day01;
		}
		final_daytime01 = year01 + '' + month_true_01 + '' + day01 + '';
		
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
 
			//设置数据
			for (var i in sRes.results) {
			    // 按地市抓取数据
			    if (sRes.results[i].KPI_DESC == place_v01) {
			       if (sRes.results[i].KPI_TYPE == '地市-最高温度'&& final_daytime >= sRes.results[i].KPI_DATE && sRes.results[i].KPI_DATE >=final_daytime01){  //温度
    				    data01.push(sRes.results[i].KPI_VALUE); 
    				    var date_yuan = sRes.results[i].KPI_DATE;
    				    // 日期
    				    data04.push(date_yuan.substring(4,6)+"-"+date_yuan.substring(6,8));
    				    dataXName.push(date_yuan.substring(0,4)+'年'+date_yuan.substring(4,6)+"月"+date_yuan.substring(6,8)+'日');
    				}else if (sRes.results[i].KPI_TYPE == '地市-气象'&& final_daytime >= sRes.results[i].KPI_DATE && sRes.results[i].KPI_DATE >=final_daytime01 ){
    				    data02.push(sRes.results[i].KPI_VALUE);
    				}else if (sRes.results[i].KPI_TYPE == '地市-社会用电量'&& final_daytime >= sRes.results[i].KPI_DATE && sRes.results[i].KPI_DATE >=final_daytime01 ){
    				    data03.push(sRes.results[i].KPI_VALUE);
    				} 
			    }
			}
			this.loadChart('');
			this.loadData_weather(year,month_true,day);
    		if (busy) {
    			busy.close();
    		} 
    // 		alert('---cityName---'+cityName+'---xName----'+dataXName+'----温度----'+data01+'-----气象-----'+data02+'----社会用电量----'+data03);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_02_V01", mParameters);
	},
	
	// 发电量和利用小时chart加载
	loadData_v02 : function(currentPowerPlant, tab_usetime){
        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		} 
	    // 利用小时或发电量
        data02_01 = new Array();
        data02_02 = new Array();
        // 电厂区分值
        powerplant_v02 = currentPowerPlant;
        // 发电量和利用小时指标区分值
        usetime_v02 = tab_usetime;
        
        //定义当天的日期与7天前的日期 start
		var daytime = new Date();
		var date = new Date(daytime.getTime() - 7 * 24 * 3600 * 1000);
		var year = daytime.getFullYear();
		var month = daytime.getMonth();
		var month_true;
		if (month > 8) {
			month_true = month + 1;
		} else {
			month = month + 1;
			month_true = "0" + month;
		}
		var day = daytime.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		final_daytime = year + '' + month_true + '' + day + '';
		var year01 = date.getFullYear();
		var month01 = date.getMonth();
		var month_true_01;
		if (month01 > 8) {
			month_true_01 = month01 + 1;
		} else {
			month01 = month01 + 1;
			month_true_01 = "0" + month01;
		}
		var day01 = date.getDate();
		if (day01 < 10) {
			day01 = "0" + day01;
		}
		final_daytime01 = year01 + '' + month_true_01 + '' + day01 + '';

        var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			for (var i in sRes.results) {
			    
				if (sRes.results[i].KPI_DESC == powerplant_v02&& sRes.results[i].KPI_TYPE == usetime_v02 && final_daytime >= sRes.results[i].KPI_DATE && sRes.results[i].KPI_DATE >= final_daytime01){
				    data02_01.push(sRes.results[i].KPI_VALUE);    
				}
			}
			this.loadChart('发电量或利用小时');
			this.loadData_weather(year,month_true,day);
    		if (busy) {
    			busy.close();
    		} 
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
		if(window.cordova && appContext && !window.sap_webide_companion) {
            var usrid = appContext.registrationContext.user.toUpperCase();
		} else {
			var usrid = "ZS_BI_DATA_ORG_2080";
		}
		//this.getView().bindElement("/EE_PERSONPHOTO_SET('" + usrid + "')");
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_02_V02?$filter=(BNAME eq 'ERPTEST1')", mParameters);
    },
	loadData_weather : function(year,month,day){
            var d = new Date();
    	    var weekday=new Array(7);
            weekday[0]="周日";
            weekday[1]="周一";
            weekday[2]="周二";
            weekday[3]="周三";
            weekday[4]="周四";
            weekday[5]="周五";
            weekday[6]="周六";
            $('#tab_weekday').html(weekday[d.getDay()%7]);
            $('#tab_daytime').html(year + "年" + month + "月" + day + "日");

            $('#temperature0_date').html(data04[0]);
            $('#temperature1_date').html(data04[1]);
            $('#temperature2_date').html(data04[2]);
            $('#temperature3_date').html(data04[3]);
            $('#temperature4_date').html(data04[4]);
            $('#temperature5_date').html(data04[5]);
            if (data04[6] != undefined) {
                $('#temperature6_date').html(data04[6]);
            } else {
                $('#temperature6_date').html('00-00');
            }
            $('#temperature0').html(data01[0]);
            $('#temperature1').html(data01[1]);
            $('#temperature2').html(data01[2]);
            $('#temperature3').html(data01[3]);
            $('#temperature4').html(data01[4]);
            $('#temperature5').html(data01[5]);
            $('#temperature6').html(data01[6]);
            for(var i=0;i < 7;i ++){
            switch(data02[i] !== null){
                
    	        case data02[i] == "W001":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css('background-image','url("img/0001-weather-05.png")');
    	             break;
    	        case data02[i] == "W002":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css("background-image",'url("img/0001-weather-04.png")');
    	             break;
    	        case data02[i] == "W003":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css("background-image",'url("img/0001-weather-01.png")');
    	             break;
    	        case data02[i] == "W004":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css("background-image",'url("img/0001-weather-02.png")');
    	             break;
    	        case data02[i] == "W005":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css("background-image",'url("img/0001-weather-03.png")');
    	             break;
    	        case data02[i] == "W006":
    	            var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-07.png")');
    	             break;
    	        case data02[i] == "W007":
    	                var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-08.png")');
    	             break;
    	        case data02[i] == "W008":
    	            var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-10.png")');
    	             break;
    	        case data02[i] == "W009":
    	             var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-06.png")');
    	             break;
    	        case data02[i] == "W010":
    	             var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-09.png")');
    	             break;
	    }
    }
    },

	loadChart: function(lineType) {
	    // 温度
		var data_x1 = data01;
		var data_x2 = data01;
		// 全社会用电量
  	    data_x3 = data03;
  	    // 利用小时或发电量
 		data_x4 = data02_01;

 		// 横坐标名 日期
 		var data_xname = dataXName;
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
		function draw(e) {
            if (data_xname != '' && data_x1 != '') {
                drawline01(e);
            }
            if (data_xname != '' && data_x3 != '' && data_x4 != '') {
           		drawline02(e);	     
            }
		
			if (usetime_v02 == "发电量") {
			    $("#barplace").css("display","");
			  	drawbar01(e);
    			drawbar02(e);
    			drawbar03(e);
    			drawbar04(e);
    			drawbar05(e);
    			drawbar06(e);
    			drawbar07(e);  
			} else {
			    $("#barplace").css("display","none");
			}
		}

		function drawline01(e) {
			drawline(e, 'line01', data_x1, data_x2, data_xname, 40, 25, 40, 25, 3, 'white', 'white',usetime_v02);
		}

		function drawline02(e) {
		    var temY3;
		    var temY4;
			if (usetime_v02 == "发电量"){
			    temY3 = 50000;
			    temY4 = 1000;
			}else {
			    temY3 = 20;
			    temY4 = 0;
			}
			drawline(e, 'line02', data_x3, data_x4, data_xname, 20000, 5000, temY3, temY4, 4, '#FFB300', 'rgb(51,255,50)',usetime_v02);
		}

		function drawline(e, id, datax1, datax2, data_xname, y1, y2, y3, y4, n, color1, color2,usetime_v02) {
		  //  alert('---datax1----'+datax1+'---datax2---'+datax2+'---data_xname---'+data_xname);
			mychart = e.init(document.getElementById(id));
			var option="";
			if(id == "line02"){
    			option = {
      		// 		legend: {
        //               	orient:'vertical',
        //               	zlevel : 2,
        //               	x:'720',
        //               	y:'20',
        //               	textStyle:{
    				// 		color:'white',
    				// 		fontFamily:'微软雅黑'
    				// 	},
        //     			data:['社会用电量','发电量']
       	// 		 	},
    			    tooltip:{
    			       trigger:'axis' ,
    			       backgroundColor:'rgb(234,234,234)',
    			       textStyle:{
    			           color:'rgb(0,0,0)',
    			           baseline:'top'
    			       },
    			       axisPointer:{
    			           type: 'none'
    			       }
    			    },
    				color: [color1, color2],
    				grid: {
    					x: 50,
    					y: 20,
    					x2: 50,
    					y2: 20,
    					borderWidth: 0
    				},
    				xAxis: [
    					{
    						show: false,
    						type: 'category',
    						data: data_xname
    					}
                    ],
    				yAxis: [
    					{
    						name: '社会用电量',
    						type: 'value',
    						axisLine: {
    							show: false
    						},
    						axisLabel: {
    							textStyle: {
    								color: 'rgb(255,179,0)'
    							},
    							formatter: '{value}'
    						},
    						// 		splitLine: {
    						// 			show: false
    						// 		},
    						splitLine: {
    							// 			show: false
    							lineStyle: {
    								color: 'rgba(64,64,64,0.5)'
    							}
    						},
    						max: y1,
    						min: y2,
    						splitNumber: n
                        },
    					{
    						name: usetime_v02,
    						type: 'value',
    						axisLine: {
    							show: false
    						},
    						axisLabel: {
    							textStyle: {
    								color: 'rgb(51,255,50)'
    							},
    							formatter: '{value}'
    						},
    						splitLine: {
    							// 			show: false
    							lineStyle: {
    								color: 'rgba(64,64,64,0.5)'
    							}
    						},
    						max: y3,
    						min: y4,
    						splitNumber: n
                        }
                    ],
    				series: [
    					{
    						name: '社会用电量',
    						type: 'line',
    						smooth: true,
    						symbol:'emptyCircle',
    						symbolSize:5,
    						itemStyle: {
    						    normal: {
    						        label : {
    						            show :true,
    						            position : 'top',
    						            textStyle:{
    						                color : 'white'
    						            }
    						        }
    						    }
    						},
    						data: datax1
                        },
    					{
    						name: usetime_v02,
    						type: 'line',
    						smooth: true,
    						yAxisIndex: 1,
    						symbol:'emptyCircle',
    						symbolSize:5,
    						itemStyle: {
    						    normal: {
    						        label : {
    						            show :true,
    						            position : 'top',
    						            textStyle:{
    						                color : 'white'
    						            }
    						        }
    						    }
    						},
    						data: datax2
    
                        }
                    ]
    			};
			
			}else{
			   option = {
    			 //   legend: {
        //               	orient:'vertical',
        //               	zlevel : 2,
        //               	x:'720',
        //               	y:'20',
        //               	textStyle:{
    				// 		color:'white',
    				// 		fontFamily:'微软雅黑'
    				// 	},
        //     			data:['气温']
       	// 		 	},
    			 //   tooltip:{
    			 //      trigger:'axis' ,
    			 //      backgroundColor:'rgb(234,234,234)',
    			 //      textStyle:{
    			 //          color:'rgb(0,0,0)'
    			 //      },
    			       
    			 //      axisPointer:{
    			 //          type: 'none'
    			 //      }
    			 //   },
    				color: [color1, color2],
    				grid: {
    					x: 50,
    					y: 20,
    					x2: 50,
    					y2: 20,
    					borderWidth: 0
    				},
    				xAxis: [
    					{
    
    						show: false,
    						type: 'category',
    						data: data_xname
    					}
                    ],
    				yAxis: [
    					{
    						name: '',
    						type: 'value',
    						axisLine: {
    							show: false
    						},
    						axisLabel: {
    							textStyle: {
    								color: 'white'
    							},
    							formatter: '{value}'
    						},
    						// 		splitLine: {
    						// 			show: false
    						// 		},
    						splitLine: {
    							// 			show: false
    							lineStyle: {
    								color: 'rgba(64,64,64,0.5)'
    							}
    						}
    				// 		max: y1,
    				// 		min: y2,
    				// 		splitNumber: n
                        }
                        
                    ],
    				series: [
    					{
    						name: '气温',
    						type: 'line',
    						smooth: true,
    						symbol:'emptyCircle',
    						symbolSize:5,
    						itemStyle: {
    						    normal: {
    						        label : {
    						            show :true,
    						            position : 'top',
    						            textStyle:{
    						                color : 'white'
    						            }
    						        }
    						    }
    						},
    						data: datax1
                        }
                    ]
    			}; 
			}
			mychart.setOption(option);
		}

		function drawbar01(e) {
		    if (data_x4[0] != undefined && data_x3[0] != undefined) {
    		    var percentValue = ((data_x4[0]/(parseInt(data_x3[0])))*100).toFixed(2).toString()+'%';
    		    $('#percentbar01').html(percentValue);
		    } else {
		        $('#percentbar01').html('');
		    }
		    drawbar(e, data_x4[0], parseInt(data_x3[0]), 'bar01');
		}

		function drawbar02(e) {
		    if (data_x4[1] != undefined && data_x3[1] != undefined) {
    		    var percentValue = ((data_x4[1]/(parseInt(data_x3[1])))*100).toFixed(2).toString()+'%';
    		    $('#percentbar02').html(percentValue);
		    } else {
		        $('#percentbar02').html('');
		    }
		    drawbar(e, data_x4[1], parseInt(data_x3[1]), 'bar02');
		}

		function drawbar03(e) {
		    if (data_x4[2] != undefined && data_x3[2] != undefined) {
    		    var percentValue = ((data_x4[2]/(parseInt(data_x3[2])))*100).toFixed(2).toString()+'%';
    		    $('#percentbar03').html(percentValue);
		    } else {
		        $('#percentbar03').html('');
		    }
		    drawbar(e, data_x4[2], parseInt(data_x3[2]), 'bar03');
		}

		function drawbar04(e) {
		    if (data_x4[3] != undefined && data_x3[3] != undefined) {
    		    var percentValue = ((data_x4[3]/(parseInt(data_x3[3])))*100).toFixed(2).toString()+'%';
    		    $('#percentbar04').html(percentValue);
		    } else {
		        $('#percentbar04').html('');
		    }
		    drawbar(e, data_x4[3], parseInt(data_x3[3]), 'bar04');
		}

		function drawbar05(e) {
		    if (data_x4[4] != undefined && data_x3[4] != undefined) {
    		    var percentValue = ((data_x4[4]/(parseInt(data_x3[4])))*100).toFixed(2).toString()+'%';
    		    $('#percentbar05').html(percentValue);
		    } else {
		        $('#percentbar05').html('');
		    }
		    drawbar(e, data_x4[4], parseInt(data_x3[4]), 'bar05');
		}

		function drawbar06(e) {
		    if (data_x4[5] != undefined && data_x3[5] != undefined) {
    		    var percentValue = ((data_x4[5]/(parseInt(data_x3[5])))*100).toFixed(2).toString()+'%';
    		    $('#percentbar06').html(percentValue);
		    } else {
		        $('#percentbar06').html('');
		    }
		    drawbar(e, data_x4[5], parseInt(data_x3[5]), 'bar06');
		}

		function drawbar07(e) {
		    if (data_x4[6] != undefined && data_x3[6] != undefined) {
    		    var percentValue = ((data_x4[6]/(parseInt(data_x3[6])))*100).toFixed(2).toString()+'%';
    		    $('#percentbar07').html(percentValue);
		    } else {
                $('#percentbar07').html('');
		    }
		    drawbar(e, data_x4[6], parseInt(data_x3[6]), 'bar07');
		}

		function drawbar(e, data1, data2, id) {
			mychart = e.init(document.getElementById(id));
			var option = {
			    clickable : false,
			    tooltip:{
			      show : false  
			    },
				grid: {
					x: 0,
					y: 0,
					x2: 0,
					y2: 0,
					borderWidth: 0

				},
				color: ['#33FF32','#FFB300'],

				xAxis: [
					{
						show: false,
						type: 'value'
							}
						],
				yAxis: [
					{
						show: false,
						type: 'category',
						data: ['周一']
							}
						],
				series: [
    					{
    						name: '社会用电量',
    						type: 'bar',
    						stack: '总量',
    						itemStyle: {
    							normal: {
    								label: {
    									show: false,
    									position: 'insideRight'
    								}
    							}
    						},
    						data: [data1]
    				//         legendHoverLink : false,
    				// 		markPoint : {
    				// 		    symbol : 'droplet',
    				// 		    symbolSize : 20,
    				// 		    itemStyle:{
    				// 		      normal:{
    				// 		          color:'#FF5B00'                                                
    				// 		      }
    				// 		    },
    				// 		    effect : {
    				// 		        show : false
    				// 		    },
        //                         data : [
        //                             {type : 'max', name: '最大值'}
        //                         ]
        //                     },
        //                     markline : {
        //                         clickable : false
        //                     }
						},
    					{
    						name: '发电量',
    						type: 'bar',
    						stack: '总量',
    						itemStyle: {
    							normal: {
    								label: {
    									show: false,
    									position: 'insideRight'
    								}
    							}
    						},
    
    						data: [data2]
    					}
    				]
			};
			mychart.setOption(option);
		}
	}
});