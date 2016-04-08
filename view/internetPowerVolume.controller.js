sap.ui.controller("com.zhenergy.pcbi.view.internetPowerVolume", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.zhenergy.bi.view.powerPlantMap
	 */
	onInit: function() {

		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
			    //AC-Gates 更改 唯一标识，可以搜索chinaMap 找到后半部分字符串
			    var sIdentical = "InternetPowerVolume";
				//AC-Gates 动态插入MAP的div代码
				sap.ui.controller("com.zhenergy.pcbi.view.templates.dymcontents").onInsertMap(document,sIdentical);
			    //AC-Gates 页面增加动态的时间日期标签
				var myDate=new Date() ;
				var timeLabel = myDate.getFullYear() + "年" + (myDate.getMonth()+1) +"月"+(myDate.getDate()-1)+"日"; //getMonth 1-12月对应0-11  myDate.getDate()-1
				var naviDemo = document.getElementById("navi"+sIdentical);
		        naviDemo.innerHTML =  "<span id='demo' style='height:100%;'>"+
		        //AC-Gates 更改下面的文字和onclick方法
                                "<b onClick='dailyProfit()' style='cursor:pointer;'>浙能电力日利润</b> > <b>"+timeLabel+"平均上网电价</b>"+
                                "</span>";
				this.onAfterShow(evt);
			}, this)
		});
	},

	// eventment before show the page 
	onAfterShow: function() {

		document.getElementById('internetDetail').style.display = "none";
		document.getElementById('internetMain').style.display = "";
		// this.loadChart();
		this._loadData01();
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi, valueGDP, valueCPItongbi, valuePPItongbi, valuePMIproduce, valuePMInonProduce, valueGDPTotal);
	},
	// 获取三级页面数据
	_loadData01: function() {
		// TODO
		if (isInternetPowerVolumeLoad == false) {
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

			//设置数据
			var dc = new Array();
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_DESC != "集团本部" && sRes.results[i].KPI_DESC != "" && sRes.results[i].KPI_DESC != "浙能电力本部") {
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
					if (sRes.results[i].KPI_TYPE == '平均上网电价' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"averNetPrice":';
						tempJsonStrData += new Number(sRes.results[i].KPI_VALUE).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '发电量' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"normalPowerVolume":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '发电收入' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"normalIncome":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '合约电价' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"contractPrice":';
						tempJsonStrData += new Number(sRes.results[i].KPI_VALUE).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '合约电量' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"contractPowerVolume":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '合约收入' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"contractIncome":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '直供电价' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"directlyPrice":';
						tempJsonStrData += new Number(sRes.results[i].KPI_VALUE).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '直供电量' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"directlyPowerVolume":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '直供收入' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"directlyIncome":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '替代电价' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"replacePrice":';
						tempJsonStrData += new Number(sRes.results[i].KPI_VALUE).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '替代电量' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"replacePowerVolume":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '替代收入' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"replaceIncome":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '环比收入增长' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"huanbiIncomeUp":';
						tempJsonStrData += (sRes.results[i].KPI_VALUE * 100).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '合约收入环比增长' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"contractIncomeUp":';
						tempJsonStrData += (sRes.results[i].KPI_VALUE * 100).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '直供收入环比增长' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"directlyIncomeUp":';
						tempJsonStrData += (sRes.results[i].KPI_VALUE * 100).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '替代收入环比增长' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"replaceIncomUp":';
						tempJsonStrData += (sRes.results[i].KPI_VALUE * 100).toFixed(2);
						isFirst = false;
					}
				}
				tempJsonStrData += '}';

				if (powerPlantName == '凤台电厂') {
					if (isHuaiNanDataFirst != true) {
						huaiNan_dataStr += ',';
					}
					huaiNan_dataStr += tempJsonStrData;
					isHuaiNanDataFirst = false;
				} else if (powerPlantName == '阿克苏热电') {
					if (isAkesuDataFirst != true) {
						akesu_dataStr += ',';
					}
					akesu_dataStr += tempJsonStrData
					isAkesuDataFirst = false;
				} else if (powerPlantName == '枣泉发电') {
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
		sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_V03/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},

	// 获取平均电价值
	loadPriceChartData: function(chartDivId, priceChartName) {

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
			// 统计于时间
			var dataStatisticDate = '';
			// 电厂名
			var powerPlantName = new Array();

			// 获取当前年份
			var thisYear = new Date().getFullYear();
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_DESC != "浙能电力") {
					if (sRes.results[i].KPI_TYPE == '平均上网电价' && sRes.results[i].KPI_DATE.substring(0, 4) == thisYear) {
						dataThisYear.push(sRes.results[i].KPI_VALUE);
						powerPlantName.push(sRes.results[i].KPI_DESC);
					}
					if (sRes.results[i].KPI_TYPE == '去年同期平均上网电价') {
						dataLastYear.push(sRes.results[i].KPI_VALUE);
					}

					// 收入统计日期
					if (dataStatisticDate == '') {
						dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
							.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
					}
				}
			}
			// 统计于日期
// 			$('#internetPowerVolumeStatisticDate').html(dataStatisticDate);
			this.loadPriceChartdetail(chartDivId, priceChartName, dataThisYear, dataLastYear, powerPlantName);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("ZJEY_CL_JYYJ_04_VPJDJ/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 电价详细Chart
	loadPriceChartdetail: function(chartDivId, priceChartName, dataThisYear, dataLastYear, powerPlantName) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			var mychart = e.init(document.getElementById(chartDivId));
// 			if(document.getElementById('powerPlantName')
// .innerHTML=="集团"){
//   document.getElementById('profitName').innerHTML="浙能电力股份有限公司";
// }else{
// document.getElementById('profitName').innerHTML = document.getElementById('powerPlantName')
// .innerHTML;
// }
			document.getElementById('profitName').innerHTML = document.getElementById('powerPlantName').innerHTML;
			var fuelXaxisName = powerPlantName;
			//   if (document.getElementById('powerPlantName').innerHTML == '集团') {
			//       fuelXaxisName = ['电厂1', '电厂2', '电厂3', '电厂4'];
			//   } else {
			//       fuelXaxisName = ['机组1', '机组2', '机组3', '机组4'];
			//   }

			var option = {
				title: {
					text: priceChartName,
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					x: '50',
					y: '10'
				},
				legend: {
					orient: 'horizontal',
					x: '400',
					y: '20',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['当年', '去年']
				},
				color: specialColorArray,
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
						name: '元千瓦时',
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
						}
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
						}
                    }
                ],
				series: [
					{
						name: '当年',
						type: 'bar',
						smooth: true,
						barGap: '0%',
						barCategoryGap: '50%',
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: 'top',
									textStyle: {
										color: 'white'
									}
								}
							}
						},
						data: dataThisYear
                    },
					{
						name: '去年',
						type: 'bar',
						smooth: true,
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: 'top',
									textStyle: {
										color: 'white'
									}
								}
							}
						},
						data: dataLastYear

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
				'echarts/chart/bar',
				'echarts/chart/gauge'
            ],
			draw);

		function draw(e) {
			drawPowerDistribution(e);
		}

		function drawPowerDistribution(ec) {

			// event configure    
			var ecConfig = require('echarts/config');

// 			///////////////////////////////////中国地图/////////////////////////////////////			
// 			// 基于准备好的dom，初始化echarts图表
// 			myChart3 = ec.init(document.getElementById('chinaMap'));
// 			option3 = {
// 				tooltip: {
// 					trigger: 'item',
// 					formatter: '{b}'
// 				},
// 				series: [
// 					{
// 						name: '中国',
// 						type: 'map',
// 						mapType: 'china',
// 						selectedMode: 'multiple',
// 						itemStyle: {
// 							normal: {
// 								label: {
// 									show: false
// 								}
// 							},
// 							emphasis: {
// 								label: {
// 									show: true
// 								}
// 							}
// 						},
// 						data: [
// 							{
// 								name: '浙江',
// 								selected: true
// 							}
// 							]
// 						}
// 					]
// 			};
// 			// 为echarts对象加载数据 
// 			myChart3.setOption(option3);

			document.getElementById('powerPlantName').innerHTML = '浙能电力股份有限公司'
			//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			// 基于准备好的dom，初始化echarts图表
			myChart4 = ec.init(document.getElementById('powerPlantMapInternetPowerVolume'));
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
				// 			"浙能电力股份本部": [119.60, 30.10],
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

				document.getElementById('internetDetail').style.display = "none";
				document.getElementById('internetMain').style.display = "";

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
			myChart5 = ec.init(document.getElementById('huaiNanMapInternetPowerVolume'));

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

				document.getElementById('internetDetail').style.display = "none";
				document.getElementById('internetMain').style.display = "";

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
			myChart6 = ec.init(document.getElementById('akesuMapInternetPowerVolume'));
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

				document.getElementById('internetDetail').style.display = "none";
				document.getElementById('internetMain').style.display = "";

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
			myChart7 = ec.init(document.getElementById('zaoquanMapInternetPowerVolume'));
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

				document.getElementById('internetDetail').style.display = "none";
				document.getElementById('internetMain').style.display = "";

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

			// TODO
			if (isInternetPowerVolumeLoad == false) {
				if (busy) {
					busy.close();
				}
				changeTheSkinOfPage();
				isInternetPowerVolumeLoad = true;
			}
		}

		function drawpie(e, data1, data2, id) {
			var mychart = e.init(document.getElementById(id));
			var option = {
				// tooltip : {
				//     formatter: "{a} <br/>{b} : {c}%"
				// },
				series: [
					{
						min: -1,
						max: 1,
						name: '业务指标',
						type: 'gauge',
						splitNumber: 10, // 分割段数，默认为5
						axisLine: { // 坐标轴线
							lineStyle: { // 属性lineStyle控制线条样式
								color: [[0.2, '#FF4535'], [0.5, '#FFD400'], [1, '#34BC34']],
								width: 4
							}
						},
						axisTick: { // 坐标轴小标记
							splitNumber: 10, // 每份split细分多少段
							length: 0, // 属性length控制线长
							lineStyle: { // 属性lineStyle控制线条样式
								color: 'auto'
							}
						},
						axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
							show: false,
							textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								color: 'green'
							}
						},
						splitLine: { // 分隔线
							show: true, // 默认显示，属性show控制显示与否
							length: 0, // 属性length控制线长
							lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
								color: 'auto'
							}
						},
						pointer: {
							width: 2
						},
						title: {
							show: true,
							offsetCenter: [0, '18'], // x, y，单位px
							borderWidth: 1,
							textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontWeight: 'bolder',
								color: '#34BC34'
							}
						},
						detail: {
							formatter: '{value}%',
							offsetCenter: [0, '15'], // x, y，单位px
							textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								color: '#34BC34',
								fontWeight: '400',
								fontSize: 15
							}
						},
						data: [
							{
								value: data1,
								name: '环比'
                                  }
                                 ]
                        }
                    ]
			};
			mychart.setOption(option);
		}
		// 设置Chart的数据
		function setChartData(ec, mapSeries, dataIndex) {
			// get powerplantname by real name
			var powerPlantName = getPowerplantnameByRealName(mapSeries.markPoint.data[dataIndex].name);
			// 电厂名
		
			// 隐藏可点击箭头
			if (powerPlantName != "浙能电力") {
			    document.getElementById('powerPlantName').innerHTML = powerPlantName;
				document.getElementById('arrowInternetPowerVolume').style.display = "none";
			} else {
			    document.getElementById('powerPlantName').innerHTML = "浙能电力股份有限公司";
			    	
				document.getElementById('arrowInternetPowerVolume').style.display = "";
			}
			// 平均电价
			var internetAverPrice1 = mapSeries.markPoint.data[dataIndex].averNetPrice;
			if (internetAverPrice1 != undefined) {
				document.getElementById('internetAverPrice1').innerHTML = internetAverPrice1;
			} else {
				document.getElementById('internetAverPrice1').innerHTML = 0;
			}
			var powerVolume1 = mapSeries.markPoint.data[dataIndex].normalPowerVolume;
			if (powerVolume1 != undefined) {
				document.getElementById('powerVolume1').innerHTML = powerVolume1;
			} else {
				document.getElementById('powerVolume1').innerHTML = 0;
			}
			var normalIncome = mapSeries.markPoint.data[dataIndex].normalIncome;
			if (normalIncome != undefined) {
				document.getElementById('inputCash1').innerHTML = normalIncome;
			} else {
				document.getElementById('inputCash1').innerHTML = 0;
			}

			// 合约电价
			var internetAverPrice2 = mapSeries.markPoint.data[dataIndex].contractPrice;
			if (internetAverPrice2 != undefined) {
				document.getElementById('internetAverPrice2').innerHTML = internetAverPrice2;
			} else {
				document.getElementById('internetAverPrice2').innerHTML = 0;
			}

			var powerVolume2 = mapSeries.markPoint.data[dataIndex].contractPowerVolume;
			if (powerVolume2 != undefined) {
				document.getElementById('powerVolume2').innerHTML = powerVolume2;
			} else {
				document.getElementById('powerVolume2').innerHTML = 0;
			}

			var contractIncome = mapSeries.markPoint.data[dataIndex].contractIncome;
			if (contractIncome != undefined) {
				document.getElementById('inputCash2').innerHTML = contractIncome;
			} else {
				document.getElementById('inputCash2').innerHTML = 0;
			}
			// 直供电价
			var internetAverPrice3 = mapSeries.markPoint.data[dataIndex].directlyPrice;
			if (internetAverPrice3 != undefined) {
				document.getElementById('internetAverPrice3').innerHTML = internetAverPrice3;
			} else {
				document.getElementById('internetAverPrice3').innerHTML = 0;
			}
			var powerVolume3 = mapSeries.markPoint.data[dataIndex].directlyPowerVolume;
			if (powerVolume3 != undefined) {
				document.getElementById('powerVolume3').innerHTML = powerVolume3;
			} else {
				document.getElementById('powerVolume3').innerHTML = 0;
			}
			var directlyIncome = mapSeries.markPoint.data[dataIndex].directlyIncome;
			if (directlyIncome != undefined) {
				document.getElementById('inputCash3').innerHTML = directlyIncome;
			} else {
				document.getElementById('inputCash3').innerHTML = 0;
			}
			// 代替电价
			var internetAverPrice4 = mapSeries.markPoint.data[dataIndex].replacePrice;
			if (internetAverPrice4 != undefined) {
				document.getElementById('internetAverPrice4').innerHTML = internetAverPrice4;
			} else {
				document.getElementById('internetAverPrice4').innerHTML = 0;
			}
			var powerVolume4 = mapSeries.markPoint.data[dataIndex].replacePowerVolume;
			if (powerVolume4 != undefined) {
				document.getElementById('powerVolume4').innerHTML = powerVolume4;
			} else {
				document.getElementById('powerVolume4').innerHTML = 0;
			}
			var replaceIncome = mapSeries.markPoint.data[dataIndex].replaceIncome;
			if (replaceIncome != undefined) {
				document.getElementById('inputCash4').innerHTML = replaceIncome;
			} else {
				document.getElementById('inputCash4').innerHTML = 0;
			}

			var data1 = mapSeries.markPoint.data[dataIndex].huanbiIncomeUp;
			var data2 = mapSeries.markPoint.data[dataIndex].contractIncomeUp;
			var data3 = mapSeries.markPoint.data[dataIndex].directlyIncomeUp;
			var data4 = mapSeries.markPoint.data[dataIndex].replaceIncomUp;
			drawpie(ec, data1, 1, 'percentMap1');
			drawpie(ec, data2, 1, 'percentMap2');
			drawpie(ec, data3, 1, 'percentMap3');
			drawpie(ec, data4, 1, 'percentMap4');
		}
	}
});