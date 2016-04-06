sap.ui.controller("com.zhenergy.pcbi.view.othersCost", {

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

		document.getElementById('othersCostDetail2').style.display = "none";
		document.getElementById('othersCost_detail').style.display = "";
		// this.loadChart();
		this._loadData01();
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi, valueGDP, valueCPItongbi, valuePPItongbi, valuePMIproduce, valuePMInonProduce, valueGDPTotal);
	},
	// 获取三级页面数据
	_loadData01: function() {
		if (isOthersCostLoad == false) {
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

			// // TODO
			// dc.push('萧山电厂');
			// dc.push('华隆电力');
			// dc.push('台州电厂');
			// dc.push('海天电力工程');
			// dc.push('台州联源热力');
			// dc.push('绍兴滨海热电');
			// dc.push('钱清发电');
			// dc.push('绍兴滨海热力'); 

			// // 嘉兴
			// dc.push('嘉兴发电');
			// dc.push('嘉源电力');
			// dc.push('平湖市滨海热力');
			// dc.push('嘉华发电');

			// // 湖州市
			// dc.push('长兴发电');
			// dc.push('长兴东南热力');

			// // 宁波
			// dc.push('镇海发电');
			// dc.push('镇海热力');
			// dc.push('宁波发电工程');
			// dc.push('镇海联合');
			// dc.push('北仑发电');
			// dc.push('镇海燃气');
			// dc.push('镇海燃热');

			// // 温州
			// dc.push('温州发电');
			// dc.push('瓯越电力');
			// dc.push('嘉隆供热');
			// dc.push('乐清发电');
			// dc.push('温州燃机发电');
			// dc.push('特鲁莱发电');

			// // 舟山
			// dc.push('中煤舟山煤电');

			// // 金华
			// dc.push('金华燃机发电');

			// // 衢州
			// dc.push('常山天然气发电');

			// // 新疆
			// dc.push('阿克苏热电'); 

			// // 宁夏
			// dc.push('枣泉发电'); 

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

				//      // TODO
				//   if (dc[j] == '萧山电厂' || 
				//       dc[j] == '华隆电力' || 
				//       dc[j] == '台州电厂' || 
				//       dc[j] == '海天电力工程' || 
				//       dc[j] == '台州联源热力' || 
				//       dc[j] == '绍兴滨海热电' ||
				//       dc[j] == '钱清发电' ||
				//       dc[j] == '绍兴滨海热力' ||
				//       dc[j] == '嘉兴发电' ||
				//       dc[j] == '嘉源电力' ||
				//       dc[j] == '平湖市滨海热力' ||
				//       dc[j] == '嘉华发电' ||
				//       dc[j] == '长兴发电' ||
				//       dc[j] == '长兴东南热力' ||
				//       dc[j] == '镇海发电' ||
				//       dc[j] == '镇海热力' ||
				//       dc[j] == '宁波发电工程' ||
				//       dc[j] == '镇海联合' ||
				//       dc[j] == '北仑发电' ||
				//       dc[j] == '镇海燃气' ||
				//       dc[j] == '镇海燃热' ||
				//       dc[j] == '温州发电' ||
				//       dc[j] == '瓯越电力' ||
				//       dc[j] == '嘉隆供热' ||
				//       dc[j] == '乐清发电' ||
				//       dc[j] == '温州燃机发电' ||
				//       dc[j] == '特鲁莱发电' ||
				//       dc[j] == '中煤舟山煤电' ||
				//       dc[j] == '金华燃机发电' ||
				//       dc[j] == '常山天然气发电' ||
				//       dc[j] == '阿克苏热电' ||
				//       dc[j] == '枣泉发电') {

				//       tempJsonStrData += '"useCostFee":';
				//     			tempJsonStrData += 0;
				//                 tempJsonStrData += ',';

				//       tempJsonStrData += '"repairCost":';
				//     			tempJsonStrData += 0;
				//                 tempJsonStrData += ',';

				//     			tempJsonStrData += '"peopleCost":';
				//     			tempJsonStrData += 0;
				//                 tempJsonStrData += ',';

				//     			tempJsonStrData += '"financeManCost":';
				//     			tempJsonStrData += 0;
				//                 tempJsonStrData += ',';

				//     			tempJsonStrData += '"otherRunningCost":';
				//     			tempJsonStrData += 0;
				//                 tempJsonStrData += ',';

				//     			tempJsonStrData += '"otherRunningCostUP":';
				//     			tempJsonStrData += 0;
				//   }

				for (var i in sRes.results) {

					if (sRes.results[i].KPI_TYPE == '折旧费' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"useCostFee":';
						tempJsonStrData += sRes.results[i].KPI_VALUE; ///10000).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '人工成本' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"peopleCost":';
						tempJsonStrData += sRes.results[i].KPI_VALUE; ///10000).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '修理费' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"repairCost":';
						tempJsonStrData += sRes.results[i].KPI_VALUE; ///10000).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '财务管理费' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"financeManCost":';
						tempJsonStrData += sRes.results[i].KPI_VALUE; ///10000).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '其他营业成本' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"otherRunningCost":';
						tempJsonStrData += sRes.results[i].KPI_VALUE; ///10000).toFixed(2);
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '其他营业成本同比' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"otherRunningCostUP":';
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
		sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_V02/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	loadmjChart: function(divId) {
		require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar'
        ],
			draw);

		function draw(e) {
			document.getElementById('caloriPowerPlantNameCost').innerHTML = document.getElementById('powerPlantMainDetailTitleCost').innerHTML;
			var mychart = e.init(document.getElementById(divId));
			var option = {
				title: {
					text: '煤炭价格变化',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					x: '50',
					y: '10'
				},
				legend: {
					orient: 'horizontal',
					x: '350',
					y: '15',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['实际采购价格', '秦港煤价']
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
						data: ['7/23', '7/24', '7/25', '7/26', '7/27', '7/28', '7/29', '7/30']
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
						name: '实际采购价格',
						type: 'line',
						smooth: true,
						barGap: '0%',
						barCategoryGap: '50%',
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.50', '0.18', '0.37', '0.18', '0.50', '0.18', '0.50', '0.18', '0.18', '0.37', '0.18']
                },
					{
						name: '秦港煤价',
						type: 'line',
						smooth: true,

						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.30', '0.14', '0.34', '0.13', '0.40', '0.12', '0.40', '0.08', '0.15', '0.27', '0.14']

                }
            ]
			};
			mychart.setOption(option);
		}

	},
	// 获取各电厂各种费用
	loadOthersCostEachCostChartData: function(chartDivId, priceChartName) {

		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 折旧费 人工成本 修理费 财务管理费
			var eachCostData = new Array();
			// 各电厂名
			var eachPowerPlantName = new Array();
<<<<<<< HEAD
=======
			// 统计于日期
			var dataStatisticDate = '';

			for (var i in sRes.results) {
				if (sRes.results[i].KPI_DESC != "集团") {
					if (sRes.results[i].KPI_TYPE == priceChartName) {
						var tempCost = sRes.results[i].KPI_VALUE; //10000).toFixed(2);
						eachCostData.push(tempCost);
						eachPowerPlantName.push(sRes.results[i].KPI_DESC);
					}
					if (dataStatisticDate == '') {
						dataStatisticDate = sRes.results[i].KPI_DATE.substring(0, 4) + '.' + sRes.results[i].KPI_DATE.substring(4, 6) + "." + sRes.results[
							i].KPI_DATE.substring(6, 8);
					}
				}
			}

>>>>>>> 7537a2a9c84d7b71694b62609a96a761e97ae447
			// 统计于日期
<<<<<<< HEAD
			var dataStatisticDate = '';

			for (var i in sRes.results) {
				if (sRes.results[i].KPI_DESC != "集团") {
					if (sRes.results[i].KPI_TYPE == priceChartName) {
						var tempCost = sRes.results[i].KPI_VALUE; //10000).toFixed(2);
						eachCostData.push(tempCost);
						eachPowerPlantName.push(sRes.results[i].KPI_DESC);
					}
					if (dataStatisticDate == '') {
						dataStatisticDate = sRes.results[i].KPI_DATE.substring(0, 4) + '.' + sRes.results[i].KPI_DATE.substring(4, 6) + "." + sRes.results[
							i].KPI_DATE.substring(6, 8);
					}
				}
			}

			// 统计于日期
// 			$('#othersCostStatisticDate').html(dataStatisticDate);
=======
			$('#othersCostStatisticDate').html(dataStatisticDate);
>>>>>>> 7537a2a9c84d7b71694b62609a96a761e97ae447

			this.loadEachCostChartdetail(chartDivId, priceChartName, eachPowerPlantName, eachCostData);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("ZJEY_CL_JYYJ_04_VQTCB/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 电价详细Chart
	loadEachCostChartdetail: function(chartDivId, priceChartName, eachPowerPlantName, eachCostData) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			var mychart = e.init(document.getElementById(chartDivId));
// 			if(document.getElementById('powerPlantMainDetailTitleCost')
// .innerHTML=="集团"){
//   document.getElementById('othersCostName').innerHTML="电力股份公司";
// }else{
// document.getElementById('othersCostName').innerHTML = document.getElementById('powerPlantMainDetailTitleCost')
// .innerHTML;
// }
			document.getElementById('othersCostName').innerHTML = document.getElementById('powerPlantMainDetailTitleCost').innerHTML;
			var fuelXaxisName = '';
			fuelXaxisName = eachPowerPlantName;

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
					show: false,
					x: '400',
					y: '20',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['其他成本']
				},
				color: ['#2DE630'],
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
						name: '单位:万元',
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
								color: 'white'
							}
						}
                    }
                ],
				series: [
					{
						name: '其他成本',
						type: 'bar',
						smooth: true,
						barGap: '0%',
						barCategoryGap: '50%',
						itemStyle: {
							normal: {
								//  color: 'green',
								label: {
									show: true,
									position: 'top',
									textStyle: {
										color: 'white'
									}
								}
								//  areaStyle: {type: 'default'}
							}
						},
						data: eachCostData
                    }
                ]
			};
			mychart.setOption(option);
		}
	},
	// 获取其他营业成本值
	loadOthersCostChartData: function(chartDivId, priceChartName) {

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

			// 统计于日期
			var dataStatisticDate = '';

			// 电厂名
			var powerPlantName = new Array();

			for (var i in sRes.results) {
				if (sRes.results[i].KPI_DESC != '集团') {
					if (sRes.results[i].KPI_TYPE == '其他营业成本') {
						dataThisYear.push(sRes.results[i].KPI_VALUE); ///10000).toFixed(2));
						powerPlantName.push(sRes.results[i].KPI_DESC);
					}
					if (sRes.results[i].KPI_TYPE == '其他营业成本同比') {
						dataLastYear.push(sRes.results[i].KPI_VALUE); ///10000).toFixed(2));
					}
				}
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[i].KPI_DATE.substring(0, 4) + '.' + sRes.results[i].KPI_DATE.substring(4, 6) + "." + sRes.results[i]
						.KPI_DATE.substring(6, 8);
				}
			}

			// 统计于日期
<<<<<<< HEAD
// 			$('#othersCostStatisticDate').html(dataStatisticDate);
=======
			$('#othersCostStatisticDate').html(dataStatisticDate);
>>>>>>> 7537a2a9c84d7b71694b62609a96a761e97ae447

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
		sap.ui.getCore().getModel().read("ZJEY_CL_JYYJ_04_VQTCB/?$filter=(BNAME eq '" + usrid + "')", mParameters);
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
// 			if(document.getElementById('powerPlantMainDetailTitleCost')
// .innerHTML=="集团"){
//   document.getElementById('othersCostName').innerHTML="电力股份公司";
// }else{
// document.getElementById('othersCostName').innerHTML = document.getElementById('powerPlantMainDetailTitleCost')
// .innerHTML;
// }
			document.getElementById('othersCostName').innerHTML = document.getElementById('powerPlantMainDetailTitleCost').innerHTML;
			var fuelXaxisName = powerPlantName;
			//   if (document.getElementById('powerPlantMainDetailTitleCost').innerHTML == '集团') {
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
						name: '单位:万元',
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
                    }
				// 	{
				// 		name: '单位:万元',
				// 		type: 'value',
				// 		axisLine: {
				// 			show: false
				// 		},
				// 		axisLabel: {
				// 			textStyle: {
				// 				color: 'white'
				// 			},
				// 			formatter: '{value}%'
				// 		},
				// 		splitLine: {
				// 			// 			show: false
				// 			lineStyle: {
				// 				//color: 'rgba(64,64,64,0.5)',
				// 			}
				// 		}
    //                 }
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

			// event configure    
			var ecConfig = require('echarts/config');

			///////////////////////////////////中国地图/////////////////////////////////////			
			// 基于准备好的dom，初始化echarts图表
			myChart3 = ec.init(document.getElementById('chinaMap3'));
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

			document.getElementById('powerPlantMainDetailTitleCost').innerHTML = '电力股份公司'
			//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			// 基于准备好的dom，初始化echarts图表
			var myChart4 = ec.init(document.getElementById('powerPlantMap3'));
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

				document.getElementById('othersCostDetail2').style.display = "none";
				document.getElementById('othersCost_detail').style.display = "";

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
			myChart5 = ec.init(document.getElementById('huaiNanMap3'));

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

				document.getElementById('othersCostDetail2').style.display = "none";
				document.getElementById('othersCost_detail').style.display = "";

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
			myChart6 = ec.init(document.getElementById('akesuMap'));
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

				document.getElementById('othersCostDetail2').style.display = "none";
				document.getElementById('othersCost_detail').style.display = "";

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
			myChart7 = ec.init(document.getElementById('zaoquanMap'));
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

				document.getElementById('othersCostDetail2').style.display = "none";
				document.getElementById('othersCost_detail').style.display = "";

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

			if (isOthersCostLoad == false) {
				if (busy) {
					busy.close();
				}
				changeTheSkinOfPage();
				isOthersCostLoad = true;
			}
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
						// 		center: ['31%','36%'],
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
			drawpie(e, 3, 4, 'detail_pieCost');
		}

		function drawbar01(e) {
			drawbar(e, 4, 6, 'detail_01Cost');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'detail_02Cost');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'detail_03Cost');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'detail_04Cost');
		}
		// 设置Chart的数据
		function setChartData(ec, mapSeries, dataIndex) {

			// get powerplantname by real name
			var powerPlantName = getPowerplantnameByRealName(mapSeries.markPoint.data[dataIndex].name);
			
			// 隐藏可点击箭头
			// 隐藏可点击箭头
			if (powerPlantName != "集团") {
			    document.getElementById('powerPlantMainDetailTitleCost').innerHTML = powerPlantName;
				document.getElementById('arrowOthersCost01').style.display = "none";
				document.getElementById('arrowOthersCost02').style.display = "none";
				document.getElementById('arrowOthersCost03').style.display = "none";
				document.getElementById('arrowOthersCost04').style.display = "none";
				document.getElementById('arrowOthersCost05').style.display = "none";
			} else {
			    document.getElementById('powerPlantMainDetailTitleCost').innerHTML = "电力股份公司";
				document.getElementById('arrowOthersCost01').style.display = "";
				document.getElementById('arrowOthersCost02').style.display = "";
				document.getElementById('arrowOthersCost03').style.display = "";
				document.getElementById('arrowOthersCost04').style.display = "";
				document.getElementById('arrowOthersCost05').style.display = "";
			}
			// 其他营业成本
			var otherRunningCost = mapSeries.markPoint.data[dataIndex].otherRunningCost;
			if (otherRunningCost != undefined) {
				document.getElementById('other_fuelCost').innerHTML = otherRunningCost;
			} else {
				document.getElementById('other_fuelCost').innerHTML = 0;
			}
			// 其他营业成本同比
			var otherRunningCostUP = mapSeries.markPoint.data[dataIndex].otherRunningCostUP;
			if (otherRunningCostUP != undefined) {
				document.getElementById('fuelDownPercentCost').innerHTML = otherRunningCostUP;
			} else {
				document.getElementById('fuelDownPercentCost').innerHTML = 0;
				otherRunningCostUP = 0;
			}

			// 折旧费
			var useCostFee = mapSeries.markPoint.data[dataIndex].useCostFee;
			if (useCostFee != undefined) {
				document.getElementById('other_travelPrice').innerHTML = useCostFee;
			} else {
				document.getElementById('other_travelPrice').innerHTML = 0;
				useCostFee = 0;
			}
			// 人工成本
			var peopleCost = mapSeries.markPoint.data[dataIndex].peopleCost;
			if (peopleCost != undefined) {
				document.getElementById('other_coalPrice').innerHTML = peopleCost;
			} else {
				document.getElementById('other_coalPrice').innerHTML = 0;
				peopleCost = 0;
			}
			// 修理费
			var repairCost = mapSeries.markPoint.data[dataIndex].repairCost;
			if (repairCost != undefined) {
				document.getElementById('other_watt1').innerHTML = repairCost;
			} else {
				document.getElementById('other_watt1').innerHTML = 0;
				repairCost = 0;
			}
			// 财物管理费
			var financeManCost = mapSeries.markPoint.data[dataIndex].financeManCost;
			if (financeManCost != undefined) {
				document.getElementById('other_watt2').innerHTML = financeManCost;
			} else {
				document.getElementById('other_watt2').innerHTML = 0;
				financeManCost = 0;
			}
			var dataAll = useCostFee + peopleCost + repairCost + financeManCost;
			drawpie(ec, otherRunningCostUP + 50, 50, 'detail_pieCost');
			drawbar(ec, useCostFee, dataAll, 'detail_01Cost');
			drawbar(ec, peopleCost, dataAll, 'detail_02Cost');
			drawbar(ec, repairCost, dataAll, 'detail_03Cost');
			drawbar(ec, financeManCost, dataAll, 'detail_04Cost');
		}
	}
});