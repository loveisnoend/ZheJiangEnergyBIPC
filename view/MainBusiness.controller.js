sap.ui.controller("com.zhenergy.pcbi.view.MainBusiness", {

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
	    if (isMainBusinessLoad == false) {
            busy = new sap.m.BusyDialog({
				close: function(event) {}
			});
    		if (busy) {
    			busy.open();
    		} 
	    }
	    var mParameters = {};
	    date = new Array();
		data1 = new Array();//发电收入
		data2 = new Array();//供热收入
		data3 = new Array();//劳务收入
		data4 = new Array();//其他收入
		data5 = new Array();// 主营业务收入
		// 数据类型，浙能电力数据还是电厂数据
		var dateTypeName = '';
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 收入同比
			var incomeTongbi;
			// 成本同比
			var costTongbi;
			// 日利润同比
			var dailyProfitTongbi;
			for (var i in sRes.results) {
			    
			    if (sRes.results[i].KPI_TYPE == '日利润-发电收入同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    incomeTongbi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '日利润-成本总计同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    costTongbi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '日利润同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    dailyProfitTongbi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入发电'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    date.push(sRes.results[i].KPI_DATE);
				    data1.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入供热'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){
				    data2.push(parseFloat(sRes.results[i].KPI_VALUE));     
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入劳务'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data3.push(parseFloat(sRes.results[i].KPI_VALUE));      
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入其他'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data4.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data5.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
			}
// 			alert('---data1---'+data1+'---data2---'+data2+'---data3----'+data3+'----data4---'+data4);
			this.loadChart();
			this.loadData(incomeTongbi, costTongbi, dailyProfitTongbi);
			// 设定头部跑马灯信息 common.js
			_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_02_V04/?$filter=(BNAME eq '" + usrid + "')", mParameters);
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

            //发电收入
            function drawswdl(e) {
                drawline(e, date, data1, '发电收入', 'green', 'powerChart', data1[data1.length - 1] + '亿千瓦时');
            }
            //供热收入
            function drawpjswdj(e) {
                drawline(e, date, data2, '供热收入', 'green', 'heatChart', data2[data2.length - 1] + '元/千瓦时');
            }
            //劳务收入
            function drawrlcb(e) {
                drawline(e, date, data3, '劳务收入', 'green', 'laborChart', data3[data3.length - 1] + '万元');
            }

            //其他收入
            function drawqtcb(e) {
                drawline(e, date, data4, '其他收入', 'green', 'othersChart', data4[data4.length - 1] + '万元');
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
            if (isMainBusinessLoad == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isMainBusinessLoad = true;
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
	loadData: function(incomeTongbi, costTongbi, dailyProfitTongbi) {
		var swdl_data = data1[data1.length - 1];
		var pjswdj_data = data2[data2.length - 1];
		var rlcb_data=data3[data3.length - 1];
		var qtcb_data=data4[data4.length-1];
		var a = 1;
    		
		//收入数据
		var sr_data = (swdl_data * pjswdj_data).toFixed(2);
		if (incomeTongbi == undefined) {
		    incomeTongbi = 0;
		}
		var sr_prec = incomeTongbi
		var sr_color="green";
		var sr_colorR01 = '';
		if (skinName == '夜间模式') {
	        sr_colorR01="green";
	    } else {
	        sr_colorR01="white";
	    }
		if(sr_prec>0){
            sr_color = "green";
		} else {
		    sr_color = "red";
		}

		//成本数据
		var cb_data=(rlcb_data+qtcb_data).toFixed(2);
		if (costTongbi == undefined) {
		    costTongbi = 0;
		}
		var cb_prec= costTongbi;
		var cb_color="green";
		var cb_colorR01 = '';
	    if (skinName == '夜间模式') {
	        cb_colorR01="green";
	    } else {
	        cb_colorR01="white";
	    }
		if(cb_prec>0){
		    cb_color = "green";
		} else {
		    cb_color = "red";
		}
		
		// 发电收入
		var powerIncome = data1[data1.length - 1];
		var powerIncomeImg="horizontal-green";
		var powerIncomeTongbi = 0;
		if(powerIncomeTongbi>0){
		    powerIncomeImg="arrow-green2";
		} else {
		    if (powerIncomeTongbi == 0) {
		        powerIncomeImg="horizontal-green";
		    } else {
		        powerIncomeImg="arrow-red2";
		    }
		}
		// 供热收入
		var heatIncome = data2[data2.length - 1];
		var heatIncomeImg="horizontal-green";
		var heatIncomeTongbi = 0;
		if(heatIncomeTongbi>0){
		    heatIncomeImg="arrow-green2";
		} else {
		    if (heatIncomeTongbi == 0) {
		        heatIncomeImg="horizontal-green";
		    } else {
		        heatIncomeImg="arrow-red2";
		    }
		}
		// 劳务收入
		var laborIncome = data3[data3.length - 1];
		var laborIncomeImg="horizontal-green";
		var laborIncomeTongbi = 0;
 		if(laborIncomeTongbi>0){
 		    laborIncomeImg="arrow-green2";
 		} else {
 		    if (laborIncomeTongbi == 0) {
 		        laborIncomeImg="horizontal-green";
 		    } else {
 		        laborIncomeImg="arrow-red2";
 		    }
 		}
		// 其他收入
		var othersIncome = data4[data4.length - 1];
		var othersIncomeImg="horizontal-green";
		var othersIncomeTongbi = 0;
 		if(othersIncomeTongbi>0){
 		    othersIncomeImg="arrow-green2";
 		} else {
 		    if (othersIncomeTongbi == 0) {
 		        othersIncomeImg="horizontal-green";
 		    } else {
 		        othersIncomeImg="arrow-red2";
 		    }
 		}
		var sr_innerhtml1=
		'<div class="MB-main_content_title_1"><span>发电收入<span style="font-size:15px;">(亿元)</span></span>'+
		'<span style="margin-left:120px;">供热收入<span style="font-size:15px;">(亿元)</span></span></div>'+
		'<div class="MB-main_content_sz" style="font-size:30px;font-weight:bold;color:'+sr_colorR01+'"><span style="width:50%;height:100%;float:left;text-align:center;"><b style="margin-left:180px;">'+ powerIncome +'</b></span><span style="width:50%;height:100%;float:left;text-align:center;font-weight:bold;color:'+cb_colorR01+'"><b style="margin-left:-180px;">'+heatIncome+'</b></span></div>'
		+'<div class="MB-main_content_sz"><div style="width:50%;height:100%;float:left;text-align:center;"><b style="margin-left:180px;">同比'+sr_prec+'%</b><img src="img/'+powerIncomeImg+'.png" class="content_img"/></div><div style="width:50%;height:100%;text-align:center;float:left;"><b style="margin-left:-180px;">同比'+cb_prec+'%</b><img src="img/'+laborIncomeImg+'.png" class="content_img"/></div></div>';

		var sr_innerhtml2=
		'<div class="MB-main_content_title_2">劳务收入<span><span style="font-size:15px;">(万元)</span></span>'+
		'<span style="margin-left:120px;">其他收入<span style="font-size:15px;">(万元)</span></span></div>'+
		'<div class="MB-main_content_sz" style="font-size:30px;font-weight:bold;color:'+sr_colorR01+'"><span style="width:50%;height:100%;float:left;text-align:center;"><b style="margin-left:180px;">'+ laborIncome +'</b></span><span style="width:50%;height:100%;float:left;text-align:center;font-weight:bold;color:'+cb_colorR01+'"><b style="margin-left:-180px;">'+othersIncome+'</b></span></div>'
		+'<div class="MB-main_content_sz"><div style="width:50%;height:100%;float:left;text-align:center;"><b style="margin-left:180px;">同比'+sr_prec+'%</b><img src="img/'+laborIncomeImg+'.png" class="content_img"/></div><div style="width:50%;height:100%;text-align:center;float:left;"><b style="margin-left:-180px;">同比'+cb_prec+'%</b><img src="img/'+othersIncomeImg+'.png" class="content_img"/></div></div>';

		//主营业收入数据
		var mainBusinessIncome = data5[data5.length - 1];
		var mainBusinessIncomeImg="horizontal-green";
		var mainBusinessIncomeTongbi = 0;
 		if(mainBusinessIncomeTongbi>0){
 		    mainBusinessIncomeImg="arrow-green2";
 		} else {
 		    if (mainBusinessIncomeTongbi == 0) {
 		        mainBusinessIncomeImg="horizontal-green";
 		    } else {
 		        mainBusinessIncomeImg="arrow-red2";
 		    }
 		}
 		
		var rlr_data=(sr_data-cb_data).toFixed(2);
		if (dailyProfitTongbi == undefined) {
		    dailyProfitTongbi = 0;
		}
		var rlr_prec = dailyProfitTongbi;
		var rlr_color="red";
		var rlr_colorR01 = "";
	    if (skinName == '夜间模式') {
	        rlr_colorR01="green";
	    } else {
	        rlr_colorR01="white";
	    }
		if(rlr_data>0){
            rlr_color = "green";
		} else {
		    rlr_color = "red";
		}
		var rlr_innerhtml='<div class="MB-main_content_title">主营业务收入<span style="font-size:20px;">(亿元)</span></div><div class="MB-main_content_sz" style="font-size:60px;font-weight:bold;color:'+rlr_colorR01+'">'+mainBusinessIncome+'</div><div class="MB-main_content_sz">同比'+rlr_prec+'%<img src="img/'+mainBusinessIncomeImg+'.png" class="content_img"/></div>';
               
		document.getElementById('srMB1').innerHTML = sr_innerhtml1;
		document.getElementById('srMB2').innerHTML = sr_innerhtml2;
		document.getElementById('rlrMB').innerHTML=rlr_innerhtml;
        document.getElementById('powerIncome').innerHTML=powerIncome+'亿元';
        document.getElementById('heatIncome').innerHTML=heatIncome+'亿元';
        document.getElementById('laborIncome').innerHTML=laborIncome+'万元';
        document.getElementById('othersIncome').innerHTML=othersIncome+'万元';


// 		document.getElementById('cb').innerHTML = cb_innerhtml;
	}
});