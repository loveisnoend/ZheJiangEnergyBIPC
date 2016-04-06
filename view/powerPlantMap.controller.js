sap.ui.controller("com.zhenergy.pcbi.view.powerPlantMap", {

	/**
	 * Called when a controller detail_01 instantiated and its View controls (if available) are already created.
	 * Can be used to modify thdetail_01e View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.zhenergy.bi.view.powerPlantMap
	 */
	onInit: function() {
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},

	// eventment before show the page 
	onAfterShow: function() {

		document.getElementById('mj_hid').style.display = "none";
		document.getElementById("detail_another").style.display = "none";
		document.getElementById('rlcb_detail').style.display = "";
		this._loadData01();
		// this.loadChart();
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi, valueGDP, valueCPItongbi, valuePPItongbi, valuePMIproduce, valuePMInonProduce, valueGDPTotal);
	},
	// 获取三级页面数据
	_loadData01: function() {
		// if (isPowerPlantMapLoad == false) {
		busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// }
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			//设置数据
			var dc = new Array();
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_DESC != "集团本部" && sRes.results[i].KPI_DESC != "") {
					if (dc == null || dc.length == 0) {
						dc.push(sRes.results[i].KPI_DESC);
					} else {
						if (dc.toString().indexOf(sRes.results[i].KPI_DESC) > -1) {} else {
							dc.push(sRes.results[i].KPI_DESC);
						}
					}
				}
			}

			// TODO New Ddded
			var zhejiang_dataStr = '[';
			var huaiNan_dataStr = '[';
			var akesu_dataStr = '[';
			var zhaoquan_dataStr = '[';

			var isZhejiangDataFirst = true;
			var isHuaiNanDataFirst = true;
			var isAkesuDataFirst = true;
			var isZaoquanDataFirst = true;
			for (var j in dc) {

				// get real area name by power plant name
				var powerPlantName = getRealNameByPowerplantname(dc[j]);

				var tempJsonStrData = '{';
				tempJsonStrData += '"name":"';
				tempJsonStrData += powerPlantName;
				tempJsonStrData += '",';
				var isFirst = true;
				for (var i in sRes.results) {

					// 平均运价
					if (sRes.results[i].KPI_TYPE == '运输价格' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"aveShipPrice":';
						tempJsonStrData += sRes.results[i].KPI_VALUE.toString().substring(0, sRes.results[i].KPI_VALUE.toString().indexOf(".") + 3);
						isFirst = false;
					}
					// 标准煤
					if (sRes.results[i].KPI_TYPE == '标煤耗' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"standardCoalCost":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					// 300煤耗
					if (sRes.results[i].KPI_TYPE == '标煤耗30' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"coalCost300":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					// 600煤耗
					if (sRes.results[i].KPI_TYPE == '标煤耗60' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"coalCost600":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					// 燃料成本
					if (sRes.results[i].KPI_TYPE == '单位燃料成本' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"fuelCost":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					// 燃料成本-同比增长
					if (sRes.results[i].KPI_TYPE == '燃料成本-同比增长' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"fuelCostUp":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					// 平均电价
					if (sRes.results[i].KPI_TYPE == '煤炭价格' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"averCoalPrice":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
				}
				tempJsonStrData += '}';

				if (powerPlantName == '淮南') {
					if (isHuaiNanDataFirst != true) {
						huaiNan_dataStr += ',';
					}
					huaiNan_dataStr += tempJsonStrData;
					isHuaiNanDataFirst = false;
				} else if (powerPlantName == '浙能阿克苏热电有限公司') {
					if (isAkesuDataFirst != true) {
						akesu_dataStr += ',';
					}
					akesu_dataStr += tempJsonStrData
					isAkesuDataFirst = false;
				} else if (powerPlantName == '宁夏枣泉发电有限责任公司') {
					if (isZaoquanDataFirst != true) {
						zhaoquan_dataStr += ',';
					}
					zhaoquan_dataStr += tempJsonStrData
					isZaoquanDataFirst = false;
				} else {
					if (isZhejiangDataFirst != true) {
						zhejiang_dataStr += ',';
					}
					zhejiang_dataStr += tempJsonStrData
					isZhejiangDataFirst = false;
				}
			}
						zhejiang_dataStr += ']';
						huaiNan_dataStr += ']';
						akesu_dataStr += ']';
						zhaoquan_dataStr += ']';
huaiNan_dataStr = '[{"name":"凤台电厂","inputPlanValue":""}]';
    akesu_dataStr = '[{"name":"阿克苏热电","inputPlanValue":""}]';
    zhaoquan_dataStr = '[{"name":"枣泉发电","inputPlanValue":""}]';
			var zhejiang_JsonData = JSON.parse(zhejiang_dataStr)
			var huaiNan_JsonData = JSON.parse(huaiNan_dataStr);
			var akesu_JsonData = JSON.parse(akesu_dataStr);
			var zhaoquan_JsonData = JSON.parse(zhaoquan_dataStr);
			this.loadChart(zhejiang_JsonData, huaiNan_JsonData, akesu_JsonData, zhaoquan_JsonData);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_V01/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取煤价数据
	loadCoalPriceChartData: function(calorieType, divId, powerPlantName) {

		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}

		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			if (powerPlantName == '集团') {
				powerPlantName = '集团';
			} else if (powerPlantName == '台二电厂') {
				powerPlantName = '台二发电';
			} else if (powerPlantName == '兰溪电厂') {
				powerPlantName = '兰溪发电';
			} else if (powerPlantName == '凤台电厂') {
				powerPlantName = '凤台发电';
			}
			// 煤价大卡分类
			var reallyType = calorieType + '煤价';
			var qinGangType = '秦皇岛港挂牌煤价' + calorieType;

			//设置数据
			// 实际采购价格
			var reallyPrice = new Array();
			var qinGangPrice = new Array();

			//统计于日期
			var dataStatisticDate = '';

			// 日期
			var date = new Array();
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == reallyType && sRes.results[i].KPI_DESC == powerPlantName) {
					reallyPrice.push(sRes.results[i].KPI_VALUE);
				}
				if (sRes.results[i].KPI_TYPE == qinGangType && sRes.results[i].KPI_DESC == powerPlantName) {
					qinGangPrice.push(sRes.results[i].KPI_VALUE);
					date.push(sRes.results[i].KPI_DATE);
				}

				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}

			// 统计于日期
<<<<<<< HEAD
// 			$('#powerPlantStatisticDate').html(dataStatisticDate);
=======
			$('#powerPlantStatisticDate').html(dataStatisticDate);
>>>>>>> 7537a2a9c84d7b71694b62609a96a761e97ae447
			this.loadmjChart(divId, reallyPrice, qinGangPrice, date);

			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("ZJEY_CL_JYYJ_04_MTJG/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	loadmjChart: function(divId, reallyPrice, qinGangPrice, date) {
		require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar'
        ],
			draw);

		function draw(e) {
// 		    if(document.getElementById('powerPlantMainDetailTitle')
// .innerHTML=="集团"){
//   document.getElementById('caloriPowerPlantName').innerHTML="电力股份公司";
// }else{
// document.getElementById('caloriPowerPlantName').innerHTML = document.getElementById('powerPlantMainDetailTitle')
// .innerHTML;
// }
			document.getElementById('caloriPowerPlantName').innerHTML = document.getElementById('powerPlantMainDetailTitle').innerHTML;
			var mychart = e.init(document.getElementById(divId));
			var option = {
				title: {
					text: '煤炭价格变化',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					x: '20',
					y: '20'
				},
				legend: {
					orient: 'horizontal',
					x: '250',
					y: '30',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['实际采购价格', '秦港煤价']
				},
				tooltip: {
					trigger: 'axis',
					backgroundColor: 'rgb(234,234,234)',
					textStyle: {
						color: 'rgb(0,0,0)',
						baseline: 'top'
					},
					axisPointer: {
						type: 'none'
					}
				},
				color: ['#2DE630', '#E52DE6', 'white'],
				grid: {
					x: 60,
					y: 70
				},
				xAxis: [
					{
						//show: false,
						type: 'category',
						axisLabel: {
							textStyle: {
								color: 'white'
							},
							formatter: '{value}'
						},
						data: date
                    }
                ],
				yAxis: [
					{
						name: '单位:元/吨',
						type: 'value',
						axisLine: {
							show: true
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
						},
						splitNumber: 13
                    },
					{
						name: '单位:元/吨',
						type: 'value',
						axisLine: {
							show: true
						},
						axisLabel: {
							textStyle: {
								color: 'white'
							},
							formatter: '{value}%'
						},
						splitLine: {
							// 			show: false
							lineStyle: {
								//color: 'rgba(64,64,64,0.5)',
							}
						},
						splitNumber: 13
                    }
                ],
				series: [
					{
						name: '实际采购价格',
						type: 'line',
						smooth: true,
						barGap: '0%',
						barCategoryGap: '50%',
						itemStyle: {
							normal: {
								label: {
									show: true
									// position: 'insideRight'
								}
							}
						},
						data: reallyPrice
                    },
					{
						name: '秦港煤价',
						type: 'line',
						smooth: true,
						itemStyle: {
							normal: {
								label: {
									show: true
									// position: 'insideRight'
								}
							}
						},
						data: qinGangPrice

                    }
                ]
			};
			mychart.setOption(option);
		}

	},
	// 获取单位燃料成本值
	loadFuelCostChartData: function() {
		document.getElementById("rlcb_detail").style.display = "none";
		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			//设置数据
			var dc = new Array();
			var dataThisYear = new Array();
			var dataLastYear = new Array();
			var dataUpPercent = new Array();
			var tempDate = new Date();
			var thisYear = tempDate.getFullYear();

			// 统计于日期
			//  var dataStatisticDate = '';

			// 电厂名
			var powerPlantName = new Array();

			for (var i in sRes.results) {
				if (sRes.results[i].KPI_DESC != '集团') {
					if (sRes.results[i].KPI_TYPE == '单位燃料成本') {
						if (sRes.results[i].KPI_DATE.toString().substring(0, 4) == thisYear) {
							dataThisYear.push(sRes.results[i].KPI_VALUE);
							powerPlantName.push(sRes.results[i].KPI_DESC);
						} else {
							dataLastYear.push(sRes.results[i].KPI_VALUE);
						}
					}
					if (sRes.results[i].KPI_TYPE == '单位燃料成本同比') {
						dataUpPercent.push(sRes.results[i].KPI_VALUE);
					}
				}
				// if (dataStatisticDate == '') {
				//     dataStatisticDate = sRes.results[i].KPI_DATE.substring(0,4)+'.'+sRes.results[i].KPI_DATE.substring(4,6)+"."+sRes.results[i].KPI_DATE.substring(6,8);
				// }
			}

			// 统计于日期
			// 			$('#othersCostStatisticDate').html(dataStatisticDate);
			if (busy) {
				busy.close();
			}
			this.loadChartdetail(dataThisYear, dataLastYear, dataUpPercent, powerPlantName);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("ZJEY_CL_JYYJ_04_DWCB/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	//大圆圈点进去的chart
	loadChartdetail: function(dataThisYear, dataLastYear, dataUpPercent, powerPlantName) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			mychart = e.init(document.getElementById('detail_another_01'));
// 			if(document.getElementById('powerPlantMainDetailTitle')
// .innerHTML=="集团"){
//   document.getElementById('bigCircleDetailTitle').innerHTML="电力股份公司";
// }else{
// document.getElementById('bigCircleDetailTitle').innerHTML = document.getElementById('powerPlantMainDetailTitle')
// .innerHTML;
// }
			document.getElementById('bigCircleDetailTitle').innerHTML = document.getElementById('powerPlantMainDetailTitle').innerHTML;

			var fuelXaxisName = powerPlantName;
			//   if (document.getElementById('bigCircleDetailTitle').innerHTML == '集团') {
			//       fuelXaxisName = ['电厂1', '电厂2', '电厂3', '电厂4'];
			//   } else {
			//       fuelXaxisName = ['机组1', '机组2', '机组3', '机组4'];
			//   }
			var option = {
				title: {
					text: '单位燃料成本',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					x: '50',
					y: '10'
				},
				legend: {
					orient: 'horizontal',
					x: '300',
					y: '20',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['当前单位成本', '去年同期', '涨幅']
				},
				color: ['#2DE630', '#E52DE6', 'white'],
				grid: {
					y1: 100,
					y2: 100
				},
				xAxis: [
					{

						//show: false,
						type: 'category',
						axisLabel: {
							textStyle: {
								color: 'white'
							},
							formatter: '{value}',
							show: true,
							interval: 'auto',
							inside: false,
							rotate: 30,
							margin: 8
						},
						data: fuelXaxisName
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
						},
						splitNumber: 13
                        },
					{
						name: '同比增长',
						type: 'value',
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: 'white'
							},
							formatter: '{value}%'
						},
						splitLine: {
							// 			show: false
							lineStyle: {
								//color: 'rgba(64,64,64,0.5)',
							}
						},
						min: 0,
						max: 1
                        }
                    ],
				series: [
					{
						name: '当前单位成本',
						type: 'bar',
						smooth: true,
						barGap: '0%',
						barCategoryGap: '50%',
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: dataThisYear
                        },
					{
						name: '去年同期',
						type: 'bar',
						smooth: true,

						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: dataLastYear

                        },
					{
						name: '涨幅',
						type: 'line',
						smooth: true,

						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: dataUpPercent

                        }
                    ]
			};
			mychart.setOption(option);
		}
	},
	//30KW and 60 kw
	loadChartdetail02: function(machineType) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {

			var machineTypeName = '';
			if (machineType == '30') {
				machineTypeName = '单位燃料成本--30瓦及以上机组';
			}
			if (machineType == '60') {
				machineTypeName = '单位燃料成本--60瓦及以上机组';
			}

			mychart = e.init(document.getElementById('detail_another_02'));
// 			if(document.getElementById('powerPlantMainDetailTitle')
// .innerHTML=="集团"){
//   document.getElementById('bigCircleDetailTitle002').innerHTML="电力股份公司";
// }else{
// document.getElementById('bigCircleDetailTitle002').innerHTML = document.getElementById('powerPlantMainDetailTitle')
// .innerHTML;
// }
			document.getElementById('bigCircleDetailTitle002').innerHTML = document.getElementById('powerPlantMainDetailTitle').innerHTML;

			var fuelXaxisName = '';
			if (document.getElementById('bigCircleDetailTitle002').innerHTML == '集团') {
				fuelXaxisName = ['电厂1', '电厂2', '电厂3', '电厂4'];
			} else {
				fuelXaxisName = ['机组1', '机组2', '机组3', '机组4'];
			}
			var option = {
				title: {
					text: machineTypeName,
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					x: '50',
					y: '10'
				},
				legend: {
					orient: 'horizontal',
					x: '330',
					y: '20',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['当前单位成本', '去年同期', '涨幅']
				},
				color: ['#2DE630', '#E52DE6', 'white'],
				grid: {
					y1: 100,
					y2: 100
				},
				xAxis: [
					{

						//show: false,
						type: 'category',
						axisLabel: {
							textStyle: {
								color: 'white'
							},
							formatter: '{value}'
						},
						data: fuelXaxisName
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
						},
						max: 0.65,
						min: 0,
						splitNumber: 13
                        },
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
							formatter: '{value}%'
						},
						splitLine: {
							// 			show: false
							lineStyle: {
								//color: 'rgba(64,64,64,0.5)',
							}
						},
						max: 8.5,
						min: 2.0,
						splitNumber: 13
                        }
                    ],
				series: [
					{
						name: '当前单位成本',
						type: 'bar',
						smooth: true,
						barGap: '0%',
						barCategoryGap: '50%',
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.18', '0.50', '0.18', '0.37']
                        },
					{
						name: '去年同期',
						type: 'bar',
						smooth: true,

						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.12', '0.43', '0.20', '0.30']

                        },
					{
						name: '涨幅',
						type: 'line',
						smooth: true,

						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.12', '0.43', '0.20', '0.30']

                        }
                    ]
			};
			mychart.setOption(option);
		}
	},
	// load the chart map
	loadChart: function(map1Data, map2Data, map3Data, map4Data) {
		var skinColor = '';
		if (skinName == '夜间模式') {
			skinColor = 'Black';
		} else {
			skinColor = '#1717E9';
		}
		var myChart3
		var myChart4;
		var myChart5;
		// 新疆阿克苏
		var myChart6;
		// 宁夏枣泉
		var myChart7;
		// 使用
		require(
            [
                'echarts',
                'echarts/chart/map', // 使用柱状状图就加载bar模块，按需加载
				'echarts/chart/pie',
				'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			drawPowerDistribution(e);

			//   drawpie01(e);
			// 			drawbar01(e);
			// 			drawbar02(e);
			// 			drawbar03(e);
			// 			drawbar04(e);
		}

		function drawPowerDistribution(ec) {

			document.getElementById('mj_hid').style.display = "none";
			document.getElementById('rlcb_detail').style.display = "";
			// event configure    
			var ecConfig = require('echarts/config');

			///////////////////////////////////中国地图/////////////////////////////////////			
			// 基于准备好的dom，初始化echarts图表
			myChart3 = ec.init(document.getElementById('chinaMap1'));
			option3 = {
				tooltip: {
					trigger: 'item',
					formatter: '{b}'
				},
				series: [
					{
						name: '中国',
						type: 'map',
						mapType: 'china',
						selectedMode: 'multiple',
						itemStyle: {
							normal: {
								label: {
									show: false
								}
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						data: [
							{
								name: '浙江',
								selected: true
							}
							]
						}
					]
			};
			// 为echarts对象加载数据 
			myChart3.setOption(option3);

			document.getElementById('powerPlantMainDetailTitle').innerHTML = '电力股份公司'
			//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			// 基于准备好的dom，初始化echarts图表
			var myChart4 = ec.init(document.getElementById('powerPlantMap1'));
			var allPowerData = map1Data;
			var option4 = {

				title: {
					text: '',
					subtext: '',
					sublink: '',
					x: 'center'
				},
				calculable: false,
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>{c}',
					position: [200, 0]
				},
				series: [
					{
						itemStyle: {
							normal: {
								label: {
									show: true,
									textStyle: {
										color: '#00FF00'
									}
								},
								areaStyle: {
									color: skinColor,
									type: 'default'
								},
								borderColor: 'white',
								borderWidth: 2
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						name: '浙能XXX电厂',
						type: 'map',
						mapType: '浙江',
						hoverable: false,
						roam: false,
						data: [],
						mapLocation: {
							x: "center",
							y: "center"
							//width: "500px",
							//height: "500px"
						},
						clickable: false,
						marikline: {
							itemStyle: {
								normal: {
									lable: {
										show: false
									}
								},
								emphasis: {
									lable: {
										show: false
									}
								}
							}
						},
						markPoint: {
							clickable: true,
							symbol: 'star50',
							symbolSize: 6, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							effect: {
								show: false,
								type: 'scale',
								scaleSize: 7,
								loop: true,
								period: 10
							},
							itemStyle: {
								normal: {
									color: '#00FF00', // 标点颜色值
									borderColor: '#00ff00',
									borderWidth: 1, // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor: '#FFFFFF',
									borderWidth: 1,
									label: {
										show: false
									}
								},
								large: true
							},
							data: allPowerData
						},
						geoCoord: {
							// 杭州
							"萧山发电厂": [119.50, 29.63],
							"浙能电力股份本部": [119.60, 30.10],
							"浙能电力股份有限公司": [119.50, 30],
							// 嘉兴
							"浙江浙能嘉兴发电有限公司": [120.58, 30.60],
							"浙江嘉源电力工程有限公司": [120.88, 30.85],
							"浙江浙能嘉华发电有限公司": [120.88, 30.40],
							"平湖市滨海热力有限公司": [121.20, 30.60],
							// 绍兴
							"浙江华隆电力工程有限公司": [120.58, 29.90],
							"浙江浙能绍兴滨海热电有限责任公司": [120.58, 29.60],
							"浙江浙能钱清发电有限责任公司": [120.28, 29.60],
							"浙江浙能绍兴滨海热力有限公司": [120.88, 29.60],
							// 湖州
							"浙江浙能长兴发电有限公司": [119.80, 30.95],
							"浙江长兴东南热力有限责任公司": [120, 30.60],
							// 金华
							"浙江浙能兰溪发电有限责任公司": [119.64, 29.12],
							"浙江浙能金华燃机发电有限责任公司": [120.35, 29.12],
							//衢州
							"浙江浙能常山天然气发电有限公司": [118.70, 29],
							// 舟山
							"浙江浙能中煤舟山煤电有限责任公司": [122.20, 30.40],
							// 宁波
							"浙江浙能镇海发电有限责任公司": [121.20, 30.20],
							"宁波市镇海热力有限责任公司": [121.40, 30],
							"宁波发电工程有限公司": [121.60, 29.80],
							"浙江浙能镇海联合发电有限公司": [121.70, 29.50],
							"浙江浙能北仑发电有限公司": [122.10, 29.10],
							"浙江浙能镇海天然气发电有限责任公司": [121.50, 29.30],
							"浙江浙能镇海燃气热电有限责任公司": [121.90, 29.30],
							// 温州
							"浙江浙能温州发电有限公司": [120.68, 28.30],
							"乐清市瓯越电力工程检修有限公司": [120.68, 28],
							"乐清市嘉隆供热有限公司": [120.68, 27.60],
							"浙江浙能乐清发电有限责任公司": [120.38, 27.60],
							"温州燃机发电有限公司": [120.10, 27.60],
							"浙江温州特鲁莱发电有限责任公司": [120.98, 27.60],
							// 台州
							"浙江浙能台州第二发电有限责任公司": [121.50, 28.65],
							"台州市海天电力工程有限公司": [121.50, 28.85],
							"台州市联源热力有限公司": [121.12, 28.85],
							"台州发电厂": [121.50, 28.40],
							// TODO
							"上海": [3000, 3000]
						}
					},
					{
						name: 'Top3',
						type: 'map',
						mapType: '浙江',
						data: [],
						markPoint: {
							normal: {
								label: {
									show: false
								}
							},
							symbol: 'star50',
							effect: {
								show: true,
								type: 'scale',
								scaleSize: 2,
								loop: true,
								shadowColor: '#00FF00',
								period: 10
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								}
							},
							data: [
								    // {name: "金华", value: 300},
								    // {name: "台州", value: 300}
								    // {name: "浙江浙能电力股份有限公司萧山发电厂", value: 300},
								    // {name: "浙江华隆电力工程有限公司", value: 300}
								    ]
						}
						}
					]
			};
			myChart4.on(ecConfig.EVENT.CLICK, function(param) {

				document.getElementById('mj_hid').style.display = "none";
				document.getElementById('rlcb_detail').style.display = "";
				document.getElementById("detail_another").style.display = "none";
				document.getElementById("detail_another002").style.display = "none";

				var mapSeries = option4.series[0];

				var selectedData = {
					name: mapSeries.markPoint.data[param.dataIndex].name,
					value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue
				};

				option4.series[1].markPoint.data = [];
				option4.series[1].markPoint.data[0] = selectedData;
				option4.series[1].markPoint.data[1] = {
					name: '上海',
					value: 0
				};
				option4.series[1].markPoint.data[2] = {
					name: '上海',
					value: 0
				};
				myChart4.setOption(option4);

				option5.series[1].markPoint.data = [{
					name: '上海',
					value: 0
				}];
				myChart5.setOption(option5);

				option6.series[1].markPoint.data = [{
					name: '上海',
					value: 0
				}];
				myChart6.setOption(option6);

				option7.series[1].markPoint.data = [{
					name: '上海',
					value: 0
				}];
				myChart7.setOption(option7);
				setChartData(ec, mapSeries, param.dataIndex);
			});
			// 默认图表显示数据
			var mapSeries = option4.series[0];
			setChartData(ec, mapSeries, 0);

			// 默认集团数据显示
			var selectedData = {
				name: mapSeries.markPoint.data[0].name,
				value: mapSeries.markPoint.data[0].inputPlanValue
			};
			option4.series[1].markPoint.data[0] = selectedData;
			option4.series[1].markPoint.data[1] = {
				name: '上海',
				value: 0
			};
			option4.series[1].markPoint.data[2] = {
				name: '上海',
				value: 0
			};

			// 为echarts对象加载数据 
			myChart4.setOption(option4);
			///////////////////////////////安徽淮南市地图////////////////////////////////////////////
			// 基于准备好的dom，初始化echarts图表
			myChart5 = ec.init(document.getElementById('huaiNanMap1'));

			var allPowerData2 = map2Data;
			var option5 = {
				title: {
					text: '',
					subtext: '',
					sublink: '',
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>{c}',
					position: [200, 0]
				},
				calculable: false,
				series: [
					{
						itemStyle: {
							normal: {
								label: {
									show: true,
									textStyle: {
										color: '#00FF00'
									}
								},
								areaStyle: {
									color: skinColor,
									type: 'default'
								},
								borderColor: 'white',
								borderWidth: 2
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						name: '安徽',
						type: 'map',
						mapType: '安徽|淮南市',
						hoverable: false,
						roam: false,
						data: [],
						clickable: false,
						markPoint: {
							clickable: true,
							symbol: 'star50',
							symbolSize: 6, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									color: '#00FF00', // 标点颜色值
									borderColor: 'white',
									borderWidth: 1, // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor: 'white',
									borderWidth: 1,
									label: {
										show: false
									}
								},
								effect: {
									show: true,
									type: 'scale',
									scaleSize: 2,
									loop: true,
									period: 10
								}
							},
							data: allPowerData2
						},
						geoCoord: {
							"凤台电厂": [116.73, 32.80],
							"上海": [3000, 3000]
						}
					},
					{
						name: 'Top3',
						type: 'map',
						mapType: '安徽|淮南市',
						data: [],
						markPoint: {
							symbol: 'star50',
							effect: {
								show: true,
								type: 'scale',
								scaleSize: 2,
								loop: true,
								shadowColor: '#00FF00',
								period: 10
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								}
							},
							data: [{
								name: "凤台电厂",
								value: 300
							}]
						}
						}
					]
			};
			myChart5.on(ecConfig.EVENT.CLICK, function(param) {

				document.getElementById('mj_hid').style.display = "none";
				document.getElementById('rlcb_detail').style.display = "";
				document.getElementById("detail_another").style.display = "none";
				document.getElementById("detail_another002").style.display = "none";

				var mapSeries = option5.series[0];

				var selectedData = {
					name: mapSeries.markPoint.data[param.dataIndex].name,
					value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue
				};
				option5.series[1].markPoint.data[0] = selectedData;
				myChart5.setOption(option5);

				option4.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				option4.series[1].markPoint.data[1] = {
					name: '上海',
					value: 0
				};
				option4.series[1].markPoint.data[2] = {
					name: '上海',
					value: 0
				};
				myChart4.setOption(option4);

				option6.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				myChart6.setOption(option6);

				option7.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				myChart7.setOption(option7);
				setChartData(ec, mapSeries, param.dataIndex);
			});
			option5.series[1].markPoint.data[0] = {
				name: '上海',
				value: 0
			};
			// 为echarts对象加载数据 
			myChart5.setOption(option5);

			///////////////////////////////新疆阿克苏地图////////////////////////////////////////////
			// 基于准备好的dom，初始化echarts图表
			myChart6 = ec.init(document.getElementById('akesuMapPowerPlant'));
			var allPowerData3 = map3Data;
			var option6 = {
				title: {
					text: '',
					subtext: '',
					sublink: '',
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>{c}',
					position: [200, 0]
				},
				calculable: false,
				series: [
					{
						itemStyle: {
							normal: {
								label: {
									show: true,
									textStyle: {
										color: '#00FF00',
										fontSize: 12
									},
								},
								areaStyle: {
									color: skinColor,
									type: 'default'
								},
								borderColor: 'white',
								borderWidth: 2
							},
							emphasis: {
								label: {
									show: true
								}
							},
						},
						name: '新疆',
						type: 'map',
						mapType: '新疆|阿克苏地区',
						hoverable: false,
						roam: false,
						data: [],
						clickable: false,
						markPoint: {
							clickable: true,
							symbol: 'star50',
							symbolSize: 6, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									color: '#00FF00', // 标点颜色值
									borderColor: 'white',
									borderWidth: 1, // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor: 'white',
									borderWidth: 1,
									label: {
										show: false
									}
								},
								effect: {
									show: true,
									type: 'scale',
									scaleSize: 2,
									loop: true,
									period: 10
								}
							},
							data: allPowerData3
						},
						geoCoord: {
							"阿克苏热电": [80.22, 41.17],
							"上海": [3000, 3000]
						}
					},
					{
						name: 'Top3',
						type: 'map',
						mapType: '新疆|阿克苏地区',
						data: [],
						markPoint: {
							symbol: 'star50',
							effect: {
								show: true,
								type: 'scale',
								scaleSize: 2,
								loop: true,
								shadowColor: '#00FF00',
								period: 10
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								}
							},
							data: [{
								name: "阿克苏热电",
								value: 300
							}]
						}
						}
					]
			};
			myChart6.on(ecConfig.EVENT.CLICK, function(param) {

				document.getElementById('mj_hid').style.display = "none";
				document.getElementById('rlcb_detail').style.display = "";
				document.getElementById("detail_another").style.display = "none";
				document.getElementById("detail_another002").style.display = "none";

				var mapSeries = option6.series[0];

				var selectedData = {
					name: mapSeries.markPoint.data[param.dataIndex].name,
					value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue
				};
				option6.series[1].markPoint.data[0] = selectedData;
				myChart6.setOption(option6);

				option4.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				option4.series[1].markPoint.data[1] = {
					name: '上海',
					value: 0
				};
				option4.series[1].markPoint.data[2] = {
					name: '上海',
					value: 0
				};
				myChart4.setOption(option4);

				option5.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				myChart5.setOption(option5);

				option7.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				myChart7.setOption(option7);
				setChartData(ec, mapSeries, param.dataIndex);
			});
			option6.series[1].markPoint.data[0] = {
				name: '上海',
				value: 0
			};
			// 为echarts对象加载数据 
			myChart6.setOption(option6);

			///////////////////////////////宁夏枣泉地图////////////////////////////////////////////
			// 基于准备好的dom，初始化echarts图表
			myChart7 = ec.init(document.getElementById('zaoquanMapPowerPlant'));
			var allPowerData4 = map4Data;
			var option7 = {
				title: {
					text: '',
					subtext: '',
					sublink: '',
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>{c}',
					position: [200, 0]
				},
				calculable: false,
				series: [
					{
						itemStyle: {
							normal: {
								label: {
									show: true,
									textStyle: {
										color: '#00FF00',
										fontSize: 12
									},
								},
								areaStyle: {
									color: skinColor,
									type: 'default'
								},
								borderColor: 'white',
								borderWidth: 2
							},
							emphasis: {
								label: {
									show: true
								}
							},
						},
						name: '宁夏',
						type: 'map',
						mapType: '宁夏|银川市',
						hoverable: false,
						roam: false,
						data: [],
						clickable: false,
						markPoint: {
							clickable: true,
							symbol: 'star50',
							symbolSize: 6, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									color: '#00FF00', // 标点颜色值
									borderColor: 'white',
									borderWidth: 1, // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor: 'white',
									borderWidth: 1,
									label: {
										show: false
									}
								},
								effect: {
									show: true,
									type: 'scale',
									scaleSize: 2,
									loop: true,
									period: 10
								}
							},
							data: allPowerData4
						},
						geoCoord: {
							"枣泉发电": [106.27, 38.47],
							"上海": [3000, 3000]
						}
					},
					{
						name: 'Top3',
						type: 'map',
						mapType: '宁夏|银川市',
						data: [],
						markPoint: {
							symbol: 'star50',
							effect: {
								show: true,
								type: 'scale',
								scaleSize: 2,
								loop: true,
								shadowColor: '#00FF00',
								period: 10
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								}
							},
							data: [{
								name: "枣泉发电",
								value: 300
							}]
						}
						}
					]
			};
			myChart7.on(ecConfig.EVENT.CLICK, function(param) {

				document.getElementById('mj_hid').style.display = "none";
				document.getElementById('rlcb_detail').style.display = "";
				document.getElementById("detail_another").style.display = "none";
				document.getElementById("detail_another002").style.display = "none";

				var mapSeries = option7.series[0];

				var selectedData = {
					name: mapSeries.markPoint.data[param.dataIndex].name,
					value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue
				};
				option7.series[1].markPoint.data[0] = selectedData;
				myChart7.setOption(option7);

				option4.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				option4.series[1].markPoint.data[1] = {
					name: '上海',
					value: 0
				};
				option4.series[1].markPoint.data[2] = {
					name: '上海',
					value: 0
				};
				myChart4.setOption(option4);

				option5.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				myChart5.setOption(option5);

				option6.series[1].markPoint.data[0] = {
					name: '上海',
					value: 0
				};
				myChart6.setOption(option6);
				setChartData(ec, mapSeries, param.dataIndex);
			});
			option7.series[1].markPoint.data[0] = {
				name: '上海',
				value: 0
			};
			// 为echarts对象加载数据 
			myChart7.setOption(option7);

			// if (isPowerPlantMapLoad == false) {
			if (busy) {
				busy.close();
			}
			changeTheSkinOfPage();
			// 		isPowerPlantMapLoad = true;
			//     } 
		}

		function drawpie(e, data1, data2, id) {
			var mychart = e.init(document.getElementById(id));
			var option = {
				title: {
					show: false,
					text: '日利润'
				},
				tooltip: {
					show: false
				},
				legend: {
					show: false,
					data: ['日利润']
				},
				series: [
					{
						zlevel: 0,
						name: '1',
						type: 'pie',
						// 		center: ['34%','33.9%'],
						radius: [175, 180],
						startAngle: 0,
						itemStyle: {
							normal: {
								color: '#33FE33',
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							}
						},
						data: [
							{
								value: data1,
								name: '日利润'
                            },
							{
								value: data2,
								name: 'invisible',
								itemStyle: {
									normal: {
										color: 'rgba(0,0,0,0)',
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									},
									emphasis: {
										color: 'rgba(0,0,0,0)'
									}
								}
                                }
                                ]
                            }
                            ]
			};
			mychart.setOption(option);
		}

		function drawbar(e, data1, data2, id) {
			var mychart = e.init(document.getElementById(id));
			var option = {
				grid: {
					x: 0,
					y: 0,
					x2: 0,
					y2: 0,
					borderWidth: 0

				},
				color: ['#1E871E', '#080809'],

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
						name: '直接访问',
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
							},
					{
						name: '邮件营销',
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

		function drawpie01(e) {
			drawpie(e, 3, 4, 'detail_pie');
		}

		function drawbar01(e) {
			drawbar(e, 4, 6, 'detail_01');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'detail_02');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'detail_03');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'detail_04');
		}
		// 设置Chart的数据
		function setChartData(ec, mapSeries, dataIndex) {

			// get powerplantname by real name
			var powerPlantName = getPowerplantnameByRealName(mapSeries.markPoint.data[dataIndex].name);
			// 隐藏可点击箭头
			if (powerPlantName != "集团") {
			    document.getElementById('powerPlantMainDetailTitle').innerHTML = powerPlantName;
				document.getElementById('arrowPowerPlantMap').style.display = "none";
			} else {
			    document.getElementById('powerPlantMainDetailTitle').innerHTML = "电力股份公司";
				document.getElementById('arrowPowerPlantMap').style.display = "";
			}
			// 单位燃料成本
			var fuelCost = mapSeries.markPoint.data[dataIndex].fuelCost
			if (fuelCost != undefined) {
				document.getElementById('fuelCost').innerHTML = fuelCost;
			} else {
				document.getElementById('fuelCost').innerHTML = 0;
			}
			// 单位燃料成本下降百分比
			var fuelCostUp = mapSeries.markPoint.data[dataIndex].fuelCostUp;
			if (fuelCostUp != undefined) {
				document.getElementById('fuelDownPercent').innerHTML = fuelCostUp;
			} else {
				document.getElementById('fuelDownPercent').innerHTML = 0;
				fuelCostUp = 0;
			}
			// 运价
			var travelPrice = mapSeries.markPoint.data[dataIndex].aveShipPrice;
			if (travelPrice != undefined) {
				document.getElementById('travelPrice').innerHTML = travelPrice;
			} else {
				document.getElementById('travelPrice').innerHTML = 0;
			}
			// 煤价
			var averCoalPrice = mapSeries.markPoint.data[dataIndex].averCoalPrice;
			if (averCoalPrice != undefined) {
				document.getElementById('coalPrice').innerHTML = averCoalPrice
			} else {
				document.getElementById('coalPrice').innerHTML = 0;
			}
			// 标准煤耗
			var coalCost = mapSeries.markPoint.data[dataIndex].standardCoalCost;
			if (coalCost != undefined) {
				document.getElementById('coalCost').innerHTML = coalCost
			} else {
				document.getElementById('coalCost').innerHTML = 0;
			}
			// 30万kw
			var coalCost300 = mapSeries.markPoint.data[dataIndex].coalCost300;
			if (coalCost300 != undefined) {
				document.getElementById('watt1').innerHTML = coalCost300;
			} else {
				document.getElementById('watt1').innerHTML = 0;
			}
			// 60万kw
			var coalCost600 = mapSeries.markPoint.data[dataIndex].coalCost600;
			if (coalCost600 != undefined) {
				document.getElementById('watt2').innerHTML = coalCost600.toString().substring(0, coalCost600.toString().indexOf(".") + 3);
			} else {
				document.getElementById('watt2').innerHTML = 0;
			}

			var data1 = 0;
			var data2 = 0;
			drawpie(ec, fuelCostUp + 50, 50, 'detail_pie');

			// drawbar(ec, data1, data2, 'detail_01');
			// drawbar(ec, data1, data2, 'detail_02');
			// drawbar(ec, data1, data2, 'detail_03');
			// drawbar(ec, data1, data2, 'detail_04');
		}
	}
});