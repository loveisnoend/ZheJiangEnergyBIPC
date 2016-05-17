sap.ui.controller("com.zhenergy.pcbi.view.averPersonProfit", {
	onInit: function() {
        this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onBeforeShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
			    //AC-LOUWW 页面增加动态的时间日期标签
				var myDate= addMonths(-1);
				var timeLabel = myDate.getFullYear() + "年" + (myDate.getMonth()+1)  +"月"; //getMonth 1-12月对应0-11  myDate.getDate()-1
				var naviDemo = document.getElementById("idTimeLabelCenter");
		        naviDemo.innerHTML =  "<b>"+timeLabel+"</b>";
		        
				this.onAfterShow(evt);
			}, this)
		});
	},
    onBeforeShow: function(evt) {
        if (isAverPersonProfit == false) {
            this._loadData01();
            this._loadData02();
            this._loadData03(); 
            isAverPersonProfit = true;
        }
	},
	onAfterShow: function(evt) {
	},
	// 获取二级页面数据 人均工资/人均营业收入
	_loadData01 : function () {
        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		} 
	    var mParameters = {};

	    var KPI_JLR_V;
		var KPI_JLR_T;
		var KPI_OPP_V;
		var KPI_TOC_T;
		
	    date = new Array();
		data_AverPersonSalary = new Array();// 人均工资
		data_AverBusinessIncome = new Array();// 人均营业收入

		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			for (var i in sRes.results) {

				// 人均工资
				if (sRes.results[i].KPI_TYPE == '人均工资' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    date.push(sRes.results[i].KPI_DATE);
				    data_AverPersonSalary.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				// 人均营业收入
				if (sRes.results[i].KPI_TYPE == '人均营业收入' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data_AverBusinessIncome.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
			}

			// 设定头部跑马灯信息 common.js
			_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
			
			this.loadChart(data_AverBusinessIncome,data_AverPersonSalary,'','');
		    this.loadData(KPI_JLR_V, KPI_JLR_T, KPI_OPP_V, KPI_TOC_T);
    		if (busy) {
    			busy.close();
    		} 
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_FZBZ_02_V01/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取二级页面数据 员工类型
	_loadData02 : function () {
        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		} 
// 	    if (isAverPersonProfit == false) {
//             busy = new sap.m.BusyDialog({
// 				close: function(event) {}
// 			});
//     		if (busy) {
//     			busy.open();
//     		} 
// 	    }
	    
	    var mParameters = {};
        // 员工类型
        // 公司领导正职人数
        var KPI_GSLDZZ_V = 0;
        // 公司领导副职人数
        var KPI_GSLDFZ_V;
        // 中层正职人数
        var KPI_ZCZZ_V;
        // 中层副职人数
        var KPI_ZCFZ_V;
        // 普通员工人数
        var KPI_PTYG_V;

		var KPI_JLR_V;
		var KPI_JLR_T;
		var KPI_OPP_V;
		var KPI_TOC_T;
		
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			for (var i in sRes.results) {
                
                // 员工类型
				// 公司领导正职人数
				if (sRes.results[i].KPI_TYPE == '公司领导正职' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_GSLDZZ_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 公司领导副职人数
				if (sRes.results[i].KPI_TYPE == '公司领导副职' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_GSLDFZ_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 中层正职人数
				if (sRes.results[i].KPI_TYPE == '中层正职' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_ZCZZ_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 中层副职人数
				if (sRes.results[i].KPI_TYPE == '中层副职' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_ZCFZ_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 普通员工人数
				if (sRes.results[i].KPI_TYPE == '普通员工' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_PTYG_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
			}
			employeeTypeDataContent = [
                {value:KPI_GSLDZZ_V, name:'公司领导正职人数'},
                {value:KPI_GSLDFZ_V, name:'公司领导副职人数'},
                {value:KPI_ZCZZ_V, name:'中层正职人数'},
                {value:KPI_ZCFZ_V, name:'中层副职人数'},
                {value:KPI_PTYG_V, name:'普通员工人数'}
            ];
            this.loadChart('','','',employeeTypeDataContent);
    		if (busy) {
    			busy.close();
    		} 
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_FZBZ_02_V06/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
    // 获取二级页面数据 用工性质
	_loadData03 : function () {
        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
	    var mParameters = {};
        
        // 用工性质
        // 定编人数
        var KPI_QUANTITY_V;
        // 在岗职工
        var KPI_ZG_V;
        // 借用人员
        var KPI_JY_V;
        // 劳务派遣工
        var KPI_LWPQ_V;
        // 退休返聘员工
        var KPI_TXFP_V;
        // 不在岗职工
        var KPI_BZG_V;
        // 其他人员
        var KPI_QT_V;

		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			for (var i in sRes.results) {
                
                // 用工性质
				// 定编人数
				if (sRes.results[i].KPI_TYPE == '定编人数' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_QUANTITY_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 在岗职工
				if (sRes.results[i].KPI_TYPE == '在岗职工' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_ZG_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 借用人员
				if (sRes.results[i].KPI_TYPE == '借用人员' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_JY_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 劳务派遣工
				if (sRes.results[i].KPI_TYPE == '劳务派遣工' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_LWPQ_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 退休返聘员工
				if (sRes.results[i].KPI_TYPE == '退休返聘员工' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_TXFP_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 不在岗职工
				if (sRes.results[i].KPI_TYPE == '不在岗职工' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_BZG_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
				// 其他人员
				if (sRes.results[i].KPI_TYPE == '其他人员' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_QT_V = parseFloat(sRes.results[i].KPI_VALUE);    
				}
			}
			workerPropertyDataContent = [
                {value:KPI_QUANTITY_V, name:'定编人数'},
                {value:KPI_ZG_V, name:'在岗职工'},
                {value:KPI_JY_V, name:'借用人员'},
                {value:KPI_LWPQ_V, name:'劳务派遣工'},
                {value:KPI_TXFP_V, name:'退休返聘员工'},
                {value:KPI_BZG_V, name:'不在岗职工'},
                {value:KPI_QT_V, name:'其他人员'}
            ];
            this.loadChart('','',workerPropertyDataContent,'');
    		if (busy) {
    			busy.close();
    		}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_FZBZ_02_V07/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	loadChart: function(data_AverBusinessIncome,data_AverPersonSalary,workerPropertyDataContent,employeeTypeDataContent) {
	    require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/pie'
                ],
                draw);

            function draw(e) {
                drawswdl(e);
                // drawpjswdj(e);
                // drawrlcb(e);
                drawqtcb(e);
                // drawpie(e);
                //drawdetail01(e);
            }

            //员工类型
            function drawswdl(e) {
                var dataName = ['公司领导正职人数','公司领导副职人数','中层正职人数','中层副职人数','普通员工人数'];
                if (employeeTypeDataContent != '') {
                    drawpie(e,'employeeTypeChart',dataName,employeeTypeDataContent);
                }
            }
            // //营业收入
            // function drawpjswdj(e) {
            //     if (data_AverBusinessIncome != '') {
            //         drawline(e, date, data_AverBusinessIncome, '人均营业收入', 'green', 'businessIncomeChart', data_AverBusinessIncome[data_AverBusinessIncome.length - 1] + '万元');
            //     }
            // }
            // //人均工资
            // function drawrlcb(e) {
            //     if (data_AverPersonSalary != '') {
            //         drawline(e, date, data_AverPersonSalary, '人均工资', 'green', 'averSalaryChart', data_AverPersonSalary[data_AverPersonSalary.length - 1] + '万元');
            //     }
            // }
            //用工性质
            function drawqtcb(e) {
                var dataName = ['定编人数','在岗职工','借用人员','劳务派遣工','退休返聘员工','不在岗职工','其他人员'];
                if (workerPropertyDataContent != '') {
                    drawpie(e,'workerPropertyChart',dataName,workerPropertyDataContent);
                }
            }

	    //折线通用
        function drawline(e, date, data1, title, color, id, value) {
            
            if (skinName == '夜间模式') {
    	        color="green";
    	    } else {
    	        color="#FF4F4F";
    	    }
            mychart = e.init(document.getElementById(id));
            // var w = document.getElementById(id).clientWidth;
            // var h = document.getElementById(id).clientHeight;
            var option = {
                title: {
                    show: false,
                    text: value,
                    padding: 10,
                    x: 'center',
                    textStyle: {
                        color: '#FFF',
                        fontFamily: 'hiragino',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fontWeight: 'bold'
                    }
                },
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            position : 'top'
                        }
                    }  
                },
                tooltip: {
                    show: false,
                    trigger: 'axis'
                    // formatter: "Temperature : <br/>{b}km : {c}°C"
                },
                legend: {
                    show: false,
                    data: [title]
                },
                grid: {
                    x: '50px',
                    y: '30px',
                    x2: '40px',
                    y2: '40px'
                },
                xAxis: [
                    {
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#FFF'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#31536f',
                                width: 1
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#31536f'
                            }
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: date //['7/21', '7/22', '7/23', '7/24', '7/25', '7/26', '7/27']
                    }
                ],

                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ',
                            textStyle: {
                                color: '#FFF'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#31536f',
                                width: 1
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#31536f'
                            }
                        },
                        scale: true
                    }
                ],
                series: [{
                    name: title,
                    type: 'line',
                    smooth: true,
                    symbol:'emptyCircle',
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            // areaStyle: { type: 'default' },
                            color: color,
                            lineStyle: {
                                color: color
                            },
                            label : {
					            show :true,
					            position : 'top',
					            textStyle:{
					                color : 'white'
					            }
					        }
                        }
                    },
                    data: data1
                }]
            };
            mychart.setOption(option);
        }
        
        function drawpie(e,id,dataName,dataContent){
            mychart=e.init(document.getElementById(id));
            var option = {
                tooltip: {
                    show : true,
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    textStyle : {
                        color : '#ffffff',
                        fontSize : 20
                    }
                },
                legend: {
                    orient: 'vertical',
                    selectedMode: 'multiple',
                    textStyle:{
                        color:'white',
                        fontSize: 20
                    
                    },
                    x:'left',
                    data:dataName
                },
                series: [
                    {
                        type:'pie',
                        // roseType : 'radius',
                        radius: ['50%', '70%'],
                        center: ['60%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                textStyle: {
                                    fontSize: 20
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false,
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        data:dataContent
                    }
                ],
                color : ['#FF7F50','#87CEFA', '#DA70D6', '#32CD32', '#6495ED','#781D10',  '#241672']
            };
            mychart.setOption(option);
        //     if (isAverPersonProfit == false) {
        //         if (busy) {
        // 			busy.close();
        // 		} 
        // 		changeTheSkinOfPage();
        // 		isAverPersonProfit = true;
        //     }
        }
	},
	loadData: function(KPI_JLR_V, KPI_JLR_T, KPI_OPP_V, KPI_TOC_T) {
		
		// 员工类型
		var employeeType = '';//data1[data1.length - 1];
		// 营业收入
		var businessIncome = data_AverBusinessIncome[data_AverBusinessIncome.length - 1];
		// 人均工资
		var averSalary = data_AverPersonSalary[data_AverPersonSalary.length - 1];
		// 用工性质
		var workerProperty = '';//data4[data4.length - 1];
		
		//净利润
		var averPersonProfitResult = averPersonProfitDetailValue;
		var averPersonProfitResultImg="horizontal-green";
		var averPersonProfitResultTongbi = KPI_JLR_T;
 		if(averPersonProfitResultTongbi>0){
 		    averPersonProfitResultImg="arrow-green2";
 		} else {
 		    if (averPersonProfitResultTongbi == 0) {
 		        averPersonProfitResultImg="horizontal-green";
 		    } else {
 		        averPersonProfitResultImg="arrow-red2";
 		    }
 		}
 	
		if (averPersonProfitResultTongbi == undefined) {
		    averPersonProfitResultTongbi = 0;
		}
		var rlr_color="red";
		var rlr_colorR01 = "";
	    if (skinName == '夜间模式') {
	        rlr_colorR01="green";
	    } else {
	        rlr_colorR01="white";
	    }

		var rlr_innerhtml01='<div class="AP-main_content_title">人均利润<span style="font-size:20px;">(万元)</span></div><div class="AP-main_content_sz" style="font-size:60px;font-weight:bold;color:'+rlr_colorR01+'">'+averPersonProfitResult+'</div><div class="AP-main_content_sz">同比'+averPersonProfitResultTongbi+'%<img src="img/'+averPersonProfitResultImg+'.png" class="content_img"/></div>';
		document.getElementById('averPersonProfitResult').innerHTML=rlr_innerhtml01;
		
        document.getElementById('employeeType').innerHTML=employeeType;
        //AC-LOUWW  
        // document.getElementById('businessIncome').innerHTML=businessIncome+'万元';
        // document.getElementById('averSalary').innerHTML=averSalary+'万元';
        document.getElementById('workerProperty').innerHTML=workerProperty;


// 		document.getElementById('cb').innerHTML = cb_innerhtml;
	}

    
});