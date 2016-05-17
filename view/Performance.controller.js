sap.ui.controller("com.zhenergy.pcbi.view.Performance", {

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
			    //AC-Gates 更改 唯一标识，可以搜索chinaMap 找到后半部分字符串
			    var sIdentical = "Performance";
			    //AC-Gates 页面增加动态的时间日期标签
				var myDate = addDays(-1);
				var timeLabel = myDate.getFullYear() + "年" + (myDate.getMonth()+1) +"月"+myDate.getDate()+"日"; //getMonth 1-12月对应0-11  myDate.getDate()-1
				var naviDemo = document.getElementById("navi"+sIdentical);
		        naviDemo.innerHTML =  "<span id='demo' style='height:100%;'>"+
		        //AC-Gates 更改下面的文字和onclick方法
                                "<b onClick='doit2(0)' style='cursor:pointer;'>经营业绩</b> > <b>"+timeLabel+"浙能电力日利润</b>"+
                                "</span>";
				this.onAfterShow(evt);
			}, this)
		});
	},
	// 获取二级页面数据
	_loadData01 : function () {
	    if (isPerformaneceLoad == false) {
            busy = new sap.m.BusyDialog({
				close: function(event) {}
			});
    		if (busy) {
    			busy.open();
    		} 
	    }
	    var mParameters = {};
	    date = new Array();
		data1 = new Array();//上网电量
		data2 = new Array();//平均上网电价
		data3 = new Array();//燃料成本
		data4 = new Array();//其他成本
		
		KPI_RGL_V = new Array();//日利润-供热收入-供热量
		KPI_RGJ_V = new Array();//日利润-供热收入-单价
		KPI_GRC_V = new Array();// 供热燃料成本
		
		// 数据类型，集团数据还是电厂数据
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
				if (sRes.results[i].KPI_TYPE == '上网电量'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    date.push(sRes.results[i].KPI_DATE.substring(4,6)+"/"+sRes.results[i].KPI_DATE.substring(6,8));
				    data1.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				// 平均上网电价 到 发电收入
				if (sRes.results[i].KPI_TYPE == '日利润-发电收入'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){
				    data2.push(parseFloat(sRes.results[i].KPI_VALUE));     
				}
				if (sRes.results[i].KPI_TYPE == '燃料成本'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data3.push(parseFloat(sRes.results[i].KPI_VALUE));      
				}
				if (sRes.results[i].KPI_TYPE == '日利润-其他成本'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data4.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				
				//日利润-供热收入-供热量
				if (sRes.results[i].KPI_TYPE == '日利润-供热收入-供热量'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_RGL_V.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
		        //日利润-供热收入-单价 日利润-供热收入
		        if (sRes.results[i].KPI_TYPE == '日利润-供热收入'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_RGJ_V.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				//供热燃料成本
		        if (sRes.results[i].KPI_TYPE == '供热燃料成本'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    KPI_GRC_V.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
			}
// 			alert('---data1---'+data1+'---data2---'+data2+'---data3----'+data3+'----data4---'+data4+'--供热量--'+KPI_RGL_V+'---供热单价----'+KPI_RGJ_V);
			this.loadChart();
			this.loadData(incomeTongbi, costTongbi, dailyProfitTongbi);
			// 设定头部跑马灯信息 common.js
			_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);
	    sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_02_V03/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
    onBeforeShow: function(evt) {
        this._loadData01();
    },
	onAfterShow: function(evt) {
		// 		this.loadData();
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
                drawpie(e);
                //drawdetail01(e);
            }

            //上网电量
            function drawswdl(e) {
                drawline(e, date, data1, '上网电量', 'green', 'swdl', data1[data1.length - 1] + '亿千瓦时', KPI_RGL_V,'供热量','orange','auto','auto','auto','auto');
            }
            /*function drawdetail01{
                drawline(e, date01, data5, '上网电量', 'green', 'detail01', data1[data1.length - 1] + '亿千瓦时');
            }*/

            //平均上网电价 发电收入 供热收入
            function drawpjswdj(e) {
                drawline(e, date, data2, '发电收入', 'green', 'pjswdj', data2[data2.length - 1] + '万元', KPI_RGJ_V,'供热收入','orange','auto','auto',0,200);
            }
            //燃料成本
            function drawrlcb(e) {
                drawline(e, date, data3, '燃料成本', 'green', 'rlcb', data3[data3.length - 1] + '万元', KPI_GRC_V,'供热燃料成本','orange','auto','auto','auto','auto');
            }

            //其他成本
            function drawqtcb(e) {
                drawlineSecond(e, date, data4, '其他成本', 'green', 'qtcb', data4[data4.length - 1] + '万元', '','','orange','auto','auto','auto','auto');
            }

	    //折线通用
        function drawline(e, date, data1, title01, color01, id, value, data2, title02, color02,miny1,maxy1,miny2,maxy2) {
            mychart = e.init(document.getElementById(id));
            var w = document.getElementById(id).clientWidth;
            var h = document.getElementById(id).clientHeight;
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
                legend: {
                    show: true,
                    textStyle:{
                        color:'white'
                    },
                    selected: {
                        title01: true,
                        title02: true
                    },
                    data: [title01,title02]
                },
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            position : 'top'
                        }
                    }  
                },
                tooltip:{
                   show: true,
			       trigger:'axis' ,
			       alwaysShowContent : true,
			       backgroundColor:'rgb(234,234,234)',
			       textStyle:{
			           color:'rgb(0,0,0)',
			           fontSize : 12
			       },
			       axisPointer:{
			           type: 'none'
			       }
			    },
                grid: {
                    x: '50px',
                    y: '30px',
                    x2: '40px',
                    y2: '40px'
                },
                color: ['#FFB300', '#31536f'],
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
                        data: date,
                        splitNumber : 6
                    }
                ],
                yAxis: [
                    {
                        name : title01,
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ',
                            margin:2,
                            textStyle: {
                                color: color01
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
						max: maxy1,
						min: miny1,
						splitNumber: 4
                    },
                    {
						name: title02,
						type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#31536f',
                                width: 1
                            }
                        },
						axisLabel: {
							textStyle: {
								color: color02
							},
							formatter: '{value}',
                            margin:2
						},
						splitLine: {
							// 			show: false
							lineStyle: {
								color: 'rgba(64,64,64,0.5)'
							}
						},
						max: maxy2,
						min: miny2,
						splitNumber: 4
                    }
                ],
                // series: [
                //             {
                //                 name: '上网电量',
                //                 type: 'line',
                //                 smooth: true,
                //                 symbol:'emptyCircle',
                //                 symbolSize: 4,
                //                 itemStyle: {
                //                     normal: {
                //                         // areaStyle: { type: 'default' },
                //                         color: color,
                //                         lineStyle: {
                //                             color: color
                //                         },
                //                         label : {
            				// 	            show :true,
            				// 	            position : 'top',
            				// 	            textStyle:{
            				// 	                color : 'white'
            				// 	            }
            				// 	        }
                //                     }
                //                 },
                //                 data: data1
                //             },
                //             {
                //                 name: '供热量',
                //                 type: 'line',
                //                 smooth: true,
                //                 symbol:'emptyCircle',
                //                 symbolSize: 4,
                //                 itemStyle: {
                //                     normal: {
                //                         // areaStyle: { type: 'default' },
                //                         color: '#FFB300',
                //                         lineStyle: {
                //                             color: '#FFB300'
                //                         },
                //                         label : {
            				// 	            show :true,
            				// 	            position : 'top',
            				// 	            textStyle:{
            				// 	                color : 'white'
            				// 	            }
            				// 	        }
                //                     }
                //                 },
                //                 data: data2
                //             }
                //         ]
                series: [
				    {
                		name: title01,
                		type: 'line',
                		smooth: true,
        		        itemStyle: {
                            normal: {
                                color: color01,
                                lineStyle: {
                                    color: color01
                                },
                                label : {
    					            show :false,
    					            position : 'top',
    					            textStyle:{
    					                color : color01
    					            }
    					        }
                            }
                        },
                		data: data1
                    },
                	{
                		name: title02,
                		type: 'line',
                		smooth: true,
                		yAxisIndex: 1,
        		        itemStyle: {
                            normal: {
                                color: color02,
                                lineStyle: {
                                    color: color02
                                },
                                label : {
    					            show :false,
    					            position : 'top',
    					            textStyle:{
    					                color : color02
    					            }
    					        }
                            }
                        },
                		data: data2
                    }
                    ]
            };
//             var option = {
//                 color:['#ffb300','#33FF32'],
// 				title: {
// 					show: false,
// 					text: value,
// 					padding: 10,
// 					x: 'center',
// 					textStyle: {
// 						color: '#FFF',
// 						fontFamily: 'hiragino',
// 						fontSize: 18,
// 						fontStyle: 'normal',
// 						fontWeight: 'bold'
// 					}
// 				},
// 				tooltip: {
// 				    show:false,
// 					trigger: 'axis'
// 				},
// 				legend: {
// 					show: false,
// 					data: [title]
// 				},
// 				grid: {
// 					x: '30px',
// 					y: '20px',
// 					x2: '30px',
// 					y2: '40px'
// 				},
// 				xAxis: [
// 					{
// 						axisLabel: {
// 							textStyle: {
// 								color: '#FFF'
// 							}
// 						},
// 						axisLine: {
// 							lineStyle: {
// 								color: '#31536f',
// 								width: 1
// 							}
// 						},
// 						splitLine: {
// 							lineStyle: {
// 								color: '#31536f'
// 							}
// 						},
// 						type: 'category',
// 						data: date //['7/21', '7/22', '7/23', '7/24', '7/25', '7/26', '7/27']
//                     }
//                 ],
// 				yAxis: [
// 					{
// 						splitNumber: 5,
// 						type: 'value',
// 						axisLine: {
// 							show: false
// 						},
// 						axisLabel: {
// 							textStyle: {
// 								color: '#FFB300'
// 							},
// 							formatter: '{value}'
// 						},

// 						splitLine: {
// 							lineStyle: {
// 								color: 'rgba(64,64,64,0.5)'
// 							}
// 						}
//                     },
// 					{
// 						name: '',
// 						splitNumber: 5,
// 						type: 'value',
// 						axisLine: {
// 							show: false
// 						},
// 						axisLabel: {
// 							textStyle: {
// 								color: '#33FF32'
// 							},
// 							formatter: '{value}'
// 						},
// 						splitLine: {
// 							lineStyle: {
// 								color: 'rgba(64,64,64,0.5)'
// 							}
// 						}
//                     }
//                     ],
// 				series: [
// 				    {
//                 		name: '上网电量',
//                 		type: 'line',
//                 		smooth: true,
//                 		data: data1
//                     },
//                 	{
//                 		name: '供热量',
//                 		type: 'line',
//                 		smooth: true,
//                 		yAxisIndex: 1,
//                 		data: data2
//                     }
// 				]
// 			};
            mychart.setOption(option);
            if (isPerformaneceLoad == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isPerformaneceLoad = true;
            }
        }
 	    //折线通用 second
        function drawlineSecond(e, date, data1, title01, color01, id, value) {
            mychart = e.init(document.getElementById(id));
            var w = document.getElementById(id).clientWidth;
            var h = document.getElementById(id).clientHeight;
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
                legend: {
                    show: true,
                    textStyle:{
                        color:'white'
                    },
                    selected: {
                        title01: true
                    },
                    data: [title01]
                },
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            position : 'top'
                        }
                    }  
                },
                tooltip:{
                   show: true,
			       trigger:'axis' ,
			       alwaysShowContent : true,
			       backgroundColor:'rgb(234,234,234)',
			       textStyle:{
			           color:'rgb(0,0,0)',
			           fontSize : 12
			       },
			       axisPointer:{
			           type: 'none'
			       }
			    },
                grid: {
                    x: '50px',
                    y: '30px',
                    x2: '40px',
                    y2: '40px'
                },
                color: ['#FFB300', '#31536f'],
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
                        data: date,
                        splitNumber : 6
                    }
                ],
                yAxis: [
                    {
                        name : title01,
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ',
                            margin:2,
                            textStyle: {
                                color: color01
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
                        }
				// 		max: maxy1,
				// 		min: miny1,
				// 		splitNumber: 4
                    }
                ],
                series: [
				    {
                		name: title01,
                		type: 'line',
                		smooth: true,
        		        itemStyle: {
                            normal: {
                                color: color01,
                                lineStyle: {
                                    color: color01
                                },
                                label : {
    					            show :false,
    					            position : 'top',
    					            textStyle:{
    					                color : color01
    					            }
    					        }
                            }
                        },
                		data: data1
                    }
                    ]
            };
//             var option = {
//                 color:['#ffb300','#33FF32'],
// 				title: {
// 					show: false,
// 					text: value,
// 					padding: 10,
// 					x: 'center',
// 					textStyle: {
// 						color: '#FFF',
// 						fontFamily: 'hiragino',
// 						fontSize: 18,
// 						fontStyle: 'normal',
// 						fontWeight: 'bold'
// 					}
// 				},
// 				tooltip: {
// 				    show:false,
// 					trigger: 'axis'
// 				},
// 				legend: {
// 					show: false,
// 					data: [title]
// 				},
// 				grid: {
// 					x: '30px',
// 					y: '20px',
// 					x2: '30px',
// 					y2: '40px'
// 				},
// 				xAxis: [
// 					{
// 						axisLabel: {
// 							textStyle: {
// 								color: '#FFF'
// 							}
// 						},
// 						axisLine: {
// 							lineStyle: {
// 								color: '#31536f',
// 								width: 1
// 							}
// 						},
// 						splitLine: {
// 							lineStyle: {
// 								color: '#31536f'
// 							}
// 						},
// 						type: 'category',
// 						data: date //['7/21', '7/22', '7/23', '7/24', '7/25', '7/26', '7/27']
//                     }
//                 ],
// 				yAxis: [
// 					{
// 						splitNumber: 5,
// 						type: 'value',
// 						axisLine: {
// 							show: false
// 						},
// 						axisLabel: {
// 							textStyle: {
// 								color: '#FFB300'
// 							},
// 							formatter: '{value}'
// 						},

// 						splitLine: {
// 							lineStyle: {
// 								color: 'rgba(64,64,64,0.5)'
// 							}
// 						}
//                     },
// 					{
// 						name: '',
// 						splitNumber: 5,
// 						type: 'value',
// 						axisLine: {
// 							show: false
// 						},
// 						axisLabel: {
// 							textStyle: {
// 								color: '#33FF32'
// 							},
// 							formatter: '{value}'
// 						},
// 						splitLine: {
// 							lineStyle: {
// 								color: 'rgba(64,64,64,0.5)'
// 							}
// 						}
//                     }
//                     ],
// 				series: [
// 				    {
//                 		name: '上网电量',
//                 		type: 'line',
//                 		smooth: true,
//                 		data: data1
//                     },
//                 	{
//                 		name: '供热量',
//                 		type: 'line',
//                 		smooth: true,
//                 		yAxisIndex: 1,
//                 		data: data2
//                     }
// 				]
// 			};
            mychart.setOption(option);
            if (isPerformaneceLoad == false) {
                if (busy) {
        			busy.close();
        		} 
        		changeTheSkinOfPage();
        		isPerformaneceLoad = true;
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
		
		//日利润-供热收入-供热量
		var KPI_RGL_V_Value = KPI_RGL_V[KPI_RGL_V.length - 1];
        //日利润-供热收入-单价 供热收入
        var KPI_RGJ_V_Value = KPI_RGJ_V[KPI_RGJ_V.length - 1];
		// 供热燃料成本
		var KPI_GRC_V_Value = KPI_GRC_V[KPI_GRC_V.length - 1];
		var a = 1;
    		
		//收入数据
		var sr_data = (pjswdj_data+KPI_RGJ_V_Value).toFixed(2);
		if (incomeTongbi == undefined) {
		    incomeTongbi = 0;
		}
		var sr_prec = incomeTongbi
		var sr_color = "green";
		var sr_colorImg="horizontal-green";
		if(sr_prec>0){
		    sr_colorImg="arrow-green2";
		} else {
		    if (sr_prec == 0) {
		        sr_colorImg="horizontal-green";
		    } else {
		        sr_colorImg="arrow-red2";
		    }
		}

		//成本数据
		var cb_data=(rlcb_data+qtcb_data+KPI_GRC_V_Value).toFixed(2);
		if (costTongbi == undefined) {
		    costTongbi = 0;
		}
		var cb_prec= costTongbi;
		var cb_color = "green";
		var cb_colorImg="horizontal-green";
		if(cb_prec>0){
		    cb_colorImg="arrow-green2";
		} else {
		    if (cb_prec == 0) {
		        cb_colorImg="horizontal-green";
		    } else {
		        cb_colorImg="arrow-red2";
		    }
		}
		var sr_innerhtml=
		'<div class="main_content_title_1" style="padding-top:23%;"><span style="margin-left:5%;">收入<span style="font-size:15px;">(万元)</span></span>'+
		'<span style="margin-left:36%;">成本<span style="font-size:15px;">(万元)</span></span></div>'+
		'<div class="main_content_sz" style="font-size:30px;font-weight:bold;color:'+sr_color+'"><div style="width:60%;height:100%;float:left;text-align:center;">'+ sr_data +'</div><div style="width:20%;height:100%;float:left;text-align:center;font-weight:bold;color:'+cb_color+'">'+cb_data+'</div></div>'
		+'<div class="main_content_sz"><div style="width:60%;height:100%;float:left;text-align:center;">同比'+sr_prec+'%<img src="img/'+sr_colorImg+'.png" class="content_img"/></div><div style="width:20%;height:100%;float:left;text-align:center;">同比'+cb_prec+'%<img src="img/'+cb_colorImg+'.png" class="content_img"/></div></div>';

		//日利润数据
		var rlr_data=(sr_data-cb_data).toFixed(2);
		if (dailyProfitTongbi == undefined) {
		    dailyProfitTongbi = 0;
		}
		var rlr_prec = dailyProfitTongbi;
		var rlr_color = "green";
	    var rlr_coloImg ="horizontal-green";
		if(rlr_prec>0){
		    rlr_coloImg="arrow-green2";
		} else {
		    if (rlr_prec == 0) {
		        rlr_coloImg="horizontal-green";
		    } else {
		        rlr_coloImg="arrow-red2";
		    }
		}
		var rlr_innerhtml='<div class="main_content_title" style="padding-top:25%;padding-left:40%;"><div style="float:left;">日利润<span style="font-size:20px;">(万元)</div><div style="margin-left:0px;margin-top:5px;"><img height="35px" width="35px" src="img/iconfont-right.png"/></div></span></div><div class="main_content_sz" style="font-size:65px;font-weight:bold;color:'+rlr_color+'">'+rlr_data+'</div><div class="main_content_sz">同比'+rlr_prec+'%<img src="img/'+rlr_coloImg+'.png" class="content_img"/></div>';

                        
		document.getElementById('sr').innerHTML = sr_innerhtml;
		document.getElementById('rlr').innerHTML=rlr_innerhtml;
		// 供热量
		document.getElementById('gongreliang_span').innerHTML=KPI_RGL_V_Value+'(吨)';
		// 供热收入-单价 供热收入
		document.getElementById('gongreshouru_span').innerHTML=KPI_RGJ_V_Value+'(万元)';
		// 供热燃料成本
		document.getElementById('gongrechengben_span').innerHTML=KPI_GRC_V_Value+'(万元)';
		
        document.getElementById('swdl_span').innerHTML=swdl_data+'(万千瓦时)';
        // 平均上网电价 发电收入
        document.getElementById('pjswdj_span').innerHTML=pjswdj_data+'(万元)';
        document.getElementById('rlcb_span').innerHTML=rlcb_data+'(万元)';
        document.getElementById('qtcb_span').innerHTML=qtcb_data+'(万元)';


// 		document.getElementById('cb').innerHTML = cb_innerhtml;
	}
});