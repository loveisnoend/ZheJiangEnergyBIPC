sap.ui.controller("com.zhenergy.pcbi.view.pureProfit", {
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
				this.onAfterShow(evt);
			}, this)
		});
	},
    onBeforeShow: function(evt) {
        this._loadData01();
	},
	onAfterShow: function(evt) {
		// 		this.loadData();
	},
	// 获取二级页面数据
	_loadData01 : function () {
	    if (isPureProfit == false) {
            busy = new sap.m.BusyDialog({
				close: function(event) {}
			});
    		if (busy) {
    			busy.open();
    		} 
	    }
	    var mParameters = {};

	    date = new Array();
		data1 = new Array();//利润总额
		data2 = new Array();//所得税费用
		data3 = new Array();//营业总收入
		data4 = new Array();//营业总成本

		var dateTypeName = '';
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 收入同比
			var incomeTongbi;
			// 成本同比
			var costTongbi;
			// 日利润同比
			var dailyProfitTongbi;
			
			// 净利润
			var KPI_JLR_V;
			// 净利润同比
			var KPI_JLR_T;
			
			// 营业利润
			var KPI_OPP_V;
			// 营业利润同比
			var KPI_TOC_T;
			
			for (var i in sRes.results) {
			    
			    if (sRes.results[i].KPI_TYPE == '净利润'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    KPI_JLR_V = sRes.results[i].KPI_VALUE;
				}
				if (sRes.results[i].KPI_TYPE == '净利润同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    KPI_JLR_T = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '营业利润'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    KPI_OPP_V = sRes.results[i].KPI_VALUE;
				}
				if (sRes.results[i].KPI_TYPE == '营业利润同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    KPI_TOC_T = sRes.results[i].KPI_VALUE*100;
				}
				
				// 净利润和营业利润历史数据
				if (sRes.results[i].KPI_TYPE == '利润总额' && sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    date.push(sRes.results[i].KPI_DATE);
				    data1.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				if (sRes.results[i].KPI_TYPE == '所得税费用'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){
				    data2.push(parseFloat(sRes.results[i].KPI_VALUE));     
				}
				if (sRes.results[i].KPI_TYPE == '营业总收入'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data3.push(parseFloat(sRes.results[i].KPI_VALUE));      
				}
				if (sRes.results[i].KPI_TYPE == '营业总成本'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data4.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
			}
// 			alert('----date----'+date+'---data1---'+data1+'---data2---'+data2+'---data3----'+data3+'----data4---'+data4);
			this.loadChart();
			this.loadData(KPI_JLR_V, KPI_JLR_T, KPI_OPP_V, KPI_TOC_T);
			// 设定头部跑马灯信息 common.js
			_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_02_V05/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	loadChart: function() {
	    require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/pie'
                ],
                draw);

            function draw(e) {
                drawswdl(e);
                drawpjswdj(e);
                drawrlcb(e);
                drawqtcb(e);
                // drawpie(e);
                //drawdetail01(e);
            }

            //利润总额
            function drawswdl(e) {
                drawline(e, date, data1, '利润总额', 'green', 'profitSumChart', data1[data1.length - 1] + '万元');
            }
            //所得税费用
            function drawpjswdj(e) {
                drawline(e, date, data2, '所得税费用', 'green', 'taxFeeChart', data2[data2.length - 1] + '万元');
            }
            //营业总收入
            function drawrlcb(e) {
                drawline(e, date, data3, '营业总收入', 'green', 'businessSumIncomeChart', data3[data3.length - 1] + '亿元');
            }
            //营业总成本
            function drawqtcb(e) {
                drawline(e, date, data4, '营业总成本', 'green', 'businessSumCostChart', data4[data4.length - 1] + '亿元');
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
            if (isPureProfit == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isPureProfit = true;
            }
        }
        
        function drawpie(e){
            // mychart=e.init(document.getElementById('rlr_circle'));
            // var option = {
            //     title: {
            //         show:false,
            //         text: '日利润'
            //     },
            //     tooltip : {
            //         show: false
            //     },
            //     legend: {
            //         show:false,
            //         data:['日利润']
            //     },
            //     series : [
            //     {
            //         name:'1',
            //         type:'pie',
            //         radius : [95, 98],
            //         itemStyle : {
            //             normal:{
            //                 color:'red',
            //                 label: {show:false},
            //                 labelLine: {show:false}
            //             }
            //         },
            //         data:[
            //         {
            //             value:68,
            //             name:'日利润'
            //         },
            //         {
            //             value:32,
            //             name:'invisible',
            //             itemStyle : {
            //                 normal : {
            //                     color: 'rgba(0,0,0,0)',
            //                     label: {show:false},
            //                     labelLine: {show:false}
            //                 },
            //                 emphasis : {
            //                     color: 'rgba(0,0,0,0)'
            //                 }
            //             }
            //         }
            //         ]
            //     }
            //     ]
            // };
            // mychart.setOption(option);
        }
	},
	loadData: function(KPI_JLR_V, KPI_JLR_T, KPI_OPP_V, KPI_TOC_T) {
		
		// 利润总额
		var profitSum = data1[data1.length - 1];
		// 所得税费用
		var taxFee = data2[data2.length - 1];
		// 营业总收入
		var businessSumIncome = data3[data3.length - 1];
		// 营业总成本
		var businessSumCost = data4[data4.length - 1];
		
		//净利润
		var pureProfitResult = KPI_JLR_V
		var pureProfitResultImg="horizontal-green";
		var pureProfitResultTongbi = KPI_JLR_T;
 		if(pureProfitResultTongbi>0){
 		    pureProfitResultImg="arrow-green2";
 		} else {
 		    if (pureProfitResultTongbi == 0) {
 		        pureProfitResultImg="horizontal-green";
 		    } else {
 		        pureProfitResultImg="arrow-red2";
 		    }
 		}
 	
		if (pureProfitResultTongbi == undefined) {
		    pureProfitResultTongbi = 0;
		}
		var rlr_color="red";
		var rlr_colorR01 = "";
	    if (skinName == '夜间模式') {
	        rlr_colorR01="green";
	    } else {
	        rlr_colorR01="white";
	    }

		var rlr_innerhtml01='<div class="PP-main_content_title">净利润<span style="font-size:20px;">(万元)</span></div><div class="MB-main_content_sz" style="font-size:60px;font-weight:bold;color:'+rlr_colorR01+'">'+pureProfitResult+'</div><div class="MB-main_content_sz">同比'+pureProfitResultTongbi+'%<img src="img/'+pureProfitResultImg+'.png" class="content_img"/></div>';
		document.getElementById('pureProfitResult').innerHTML=rlr_innerhtml01;
		
		// 营业利润
		var businessProfitResult = KPI_OPP_V;
		var businessProfitResultImg="horizontal-green";
		var businessProfitResultTongbi = KPI_TOC_T;
 		if(businessProfitResultTongbi>0){
 		    businessProfitResultImg="arrow-green2";
 		} else {
 		    if (businessProfitResultTongbi == 0) {
 		        businessProfitResultImg="horizontal-green";
 		    } else {
 		        businessProfitResultImg="arrow-red2";
 		    }
 		}
 		
		if (businessProfitResultTongbi == undefined) {
		    businessProfitResultTongbi = 0;
		}
		var rlr_colorR02 = "";
	    if (skinName == '夜间模式') {
	        rlr_colorR02="green";
	    } else {
	        rlr_colorR02="white";
	    }
		var rlr_innerhtml02='<div class="PP-main_content_title_1">营业利润<span style="font-size:20px;">(亿元)</span></div><div class="MB-main_content_sz" style="font-size:60px;font-weight:bold;color:'+rlr_colorR02+'">'+businessProfitResult+'</div><div class="MB-main_content_sz">同比'+businessProfitResultTongbi+'%<img src="img/'+businessProfitResultImg+'.png" class="content_img"/></div>';
		document.getElementById('businessProfitResult').innerHTML=rlr_innerhtml02;		

        document.getElementById('profitSum').innerHTML=profitSum+'万元';
        document.getElementById('taxFee').innerHTML=taxFee+'万元';
        document.getElementById('businessSumIncome').innerHTML=businessSumIncome+'亿元';
        document.getElementById('businessSumCost').innerHTML=businessSumCost+'亿元';


// 		document.getElementById('cb').innerHTML = cb_innerhtml;
	}

    
});