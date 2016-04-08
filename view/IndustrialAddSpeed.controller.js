sap.ui.controller("com.zhenergy.pcbi.view.IndustrialAddSpeed", {
	onInit: function() {
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},
	_loadData01: function() {

		if (isIndustrialAddSpeed == false) {
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

			var edate = new Array();
			var edata = new Array();
			for (var i in sRes.results) {

				if (sRes.results[i].KPI_TYPE == '工业增加值(当月)' && sRes.results[i].KPI_DESC == '全国') {
					edate.push(sRes.results[i].KPI_DATE);
					edata.push(parseFloat(sRes.results[i].KPI_VALUE));
				}
			}
			this.loadChart(edate, edata);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("数据分析中,请稍后......");
		}, this);

		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_02_V06", mParameters);

	},
	onAfterShow: function(evt) {
		this._loadData01();
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi, valueGDP, valueCPItongbi, valuePPItongbi, valuePMIproduce, valuePMInonProduce, valueGDPTotal);
	},
	loadChart: function(date, data) {
		require(
                [
                    'echarts',
                    'echarts/chart/line'
                ],
			draw);

		function draw(e) {
			mychart = e.init(document.getElementById('IndustrialAddSpeedChart'));
			var option = {
				title: {
					show: false,
					text: data[data.length - 1] + '亿千瓦时',
					padding: 10,
					x: 'center',
					textStyle: {
						color: '#FFF',
						fontFamily: 'hiragino',
						fontSize: 36,
						fontStyle: 'normal',
						fontWeight: 'bold'
					}
				},
				legend: {
					show: true,
					textStyle: {
						color: 'white',
						fontSize: 24
					},
					data: ['全国工业增加值增长速度']
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'top'
						}
					}
				},
				tooltip: {
					show: true,
					formatter: function(param, a, b) {
						return param[0].seriesName + "</br>" + param[0].name.substring(0, 4) + "年" + param[0].name.substring(4, 6) + "月" + "</br>" + param[
							0].value;
					},
					trigger: 'axis',
					alwaysShowContent: true,
					backgroundColor: 'rgb(234,234,234)',
					textStyle: {
						color: 'rgb(0,0,0)',
						fontSize: 16
					},
					axisPointer: {
						type: 'none'
						// type: 'line'
					}
				},
				grid: {
					x: '50px',
					y: '30px',
					x2: '40px',
					y2: '40px'
				},
				color: ['#FFB300'],
				xAxis: [
					{
						axisTick: {
							show: false
						},
						axisLabel: {
						    interval:0,
							formatter: function(val, index) {
								if (parseInt(val.substring(4, 6)) % 3 == 0) {
									return val.substring(0, 4) + "年第" + parseInt(val.substring(4, 6)) / 3 + "季度";
								} else {
									return "";
								}
							},
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
						    
							 //show:false,
							lineStyle: {
								color: '#31536f'
							}
						},
						type: 'category',
				// 		splitNumber : 36,
						boundaryGap: false,
						data: date
                    }
                ],
				yAxis: [
					{
						// name: '全国工业增加值增长速度',
						// nameTextStyle:{
						//  fontSize:24  
						// },
						type: 'value',
						axisLabel: {
							formatter: '{value} ',
							margin: 2,
							textStyle: {
								color: 'green'
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
                    }
                ],

				series: [
					{
						name: '全国工业增加值增长速度',
						type: 'line',
						smooth: true,
						itemStyle: {
							normal: {
								color: 'green',
								lineStyle: {
									color: 'green'
								},
								label: {
									show: false,
									position: 'top',
									textStyle: {
										color: 'green'
									}
								}
							}
						},
						data: data
                    }
                    ]
			};
			mychart.setOption(option);
		}

		if (isIndustrialAddSpeed == false) {
			if (busy) {
				busy.close();
			}
			changeTheSkinOfPage();
			isIndustrialAddSpeed = true;
		}

	}

});