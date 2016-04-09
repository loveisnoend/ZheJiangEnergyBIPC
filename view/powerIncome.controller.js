sap.ui.controller("com.zhenergy.pcbi.view.powerIncome", {

	/**
	 * Called when a controller detail_01 instantiated and its View controls (if available) are already created.
	 * Can be used to modify thdetail_01e View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.zhenergy.bi.view.powerPlantMap
	 */
	onInit: function() {
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
			    //AC-Gates 更改 唯一标识，可以搜索chinaMap 找到后半部分字符串
			    var sIdentical = "PowerIncome";
				//AC-Gates 动态插入MAP的div代码
				sap.ui.controller("com.zhenergy.pcbi.view.templates.dymcontents").onInsertMap(document,sIdentical);
			    //AC-Gates 页面增加动态的时间日期标签
				var myDate=new Date() ;
				var timeLabel = myDate.getFullYear() + "年" + (myDate.getMonth()+1) +"月"; //getMonth 1-12月对应0-11  myDate.getDate()-1
				var naviDemo = document.getElementById("navi"+sIdentical);
		        naviDemo.innerHTML =  "<span id='demo' style='height:100%;'>"+
		        //AC-Gates 更改下面的文字和onclick方法
                                "<b onClick='toMainBusinessPage()' style='cursor:pointer;'>浙能电力主营业务</b> > <b>"+timeLabel+"发电收入</b>"+
                                "</span>";
				this.onAfterShow(evt);
			}, this)
		});
	},

	// eventment before show the page 
	onAfterShow: function() {

		document.getElementById('internetDetailPower').style.display = "none";
		document.getElementById('rlcb_detailPower').style.display = "";
		// this.loadChart();
		this._loadData01();
		// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi, valueGDP, valueCPItongbi, valuePPItongbi, valuePMIproduce, valuePMInonProduce, valueGDPTotal);
	},
	// 获取三级页面数据
	_loadData01: function() {
		if (isPowerIncomeLoad == false) {
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
				if (sRes.results[i].KPI_DESC != "") {// sRes.results[i].KPI_DESC != "浙能电力本部" && 
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
					if ((sRes.results[i].KPI_TYPE == '各电厂发电量' || sRes.results[i].KPI_TYPE == '浙能电力汇总发电量') && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"eachPlantPV":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '补贴收入_同比' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"subsidyUp":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '补贴收入' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"subsidyValue":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '发电收入_同比' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"powerIncomeup":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '发电收入' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"powerIncomeValue":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '辅助服务收入_同比' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"serviceIncomeUp":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '辅助服务收入' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"serviceIncomeValue":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '售电收入_同比' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"salesIncomeUp":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
						isFirst = false;
					}
					if (sRes.results[i].KPI_TYPE == '售电收入' && sRes.results[i].KPI_DESC == dc[j]) {
						if (isFirst != true) {
							tempJsonStrData += ',';
						}
						tempJsonStrData += '"salesIncomeValue":';
						tempJsonStrData += sRes.results[i].KPI_VALUE;
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
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_03_V05/?$filter=(BNAME eq '" + usrid + "')", mParameters);
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
			document.getElementById('caloriPowerPlantNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower').innerHTML;
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
	// 获取浙能电力指标-售电收入 SCREEN_JYYJ_04_VSDSRJT
	loadBase_SalesIncome: function(chartDivId, priceChartName) {

		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// 售电收入指标
		// 合约电量收入
		var KPI_HYS_V = new Array();
		// 直销电量收入
		var KPI_ZGS_V = new Array();
		// 替发电量收入
		var KPI_TDS_V = new Array();
		// 竞价电量收入
		var KPI_JJS_V = new Array();
		// 其他电量收入
		var KPI_OES_V = new Array();
		// 容量电费收入
		var KPI_RLS_V = new Array();
		// 转发电量收入
		var KPI_ZFS_V = new Array();

		// 合约电量收入同比
		var KPI_HYS_UP = new Array();
		// 直销电量收入同比
		var KPI_ZGS_UP = new Array();
		// 替发电量收入同比
		var KPI_TDS_UP = new Array();
		// 竞价电量收入同比
		var KPI_JJS_UP = new Array();
		// 其他电量收入同比
		var KPI_OES_UP = new Array();
		// 容量电费收入同比
		var KPI_RLS_UP = new Array();
		// 转发电量收入同比
		var KPI_ZFS_UP = new Array();

		var dataStatisticDate = '';
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 各个电厂
			var xData = new Array();
			for (var i in sRes.results) {
				// 合约电量收入同比
				if (sRes.results[i].KPI_TYPE == '合约电量收入_同比') {
					KPI_HYS_UP.push(sRes.results[i].KPI_VALUE);
					xData.push(sRes.results[i].KPI_DESC);
				}
				// 合约电量收入
				if (sRes.results[i].KPI_TYPE == '合约电量收入') {
					KPI_HYS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 直销电量收入同比
				if (sRes.results[i].KPI_TYPE == '直销电量收入_同比') {
					KPI_ZGS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 直销电量收入
				if (sRes.results[i].KPI_TYPE == '直销电量收入') {
					KPI_ZGS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 替发电量收入同比
				if (sRes.results[i].KPI_TYPE == '替发电量收入_同比') {
					KPI_TDS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 替发电量收入
				if (sRes.results[i].KPI_TYPE == '替发电量收入') {
					KPI_TDS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 竞价电量收入同比
				if (sRes.results[i].KPI_TYPE == '竞价电量收入_同比') {
					KPI_JJS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 竞价电量收入
				if (sRes.results[i].KPI_TYPE == '竞价电量收入') {
					KPI_JJS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 其他电量收入同比
				if (sRes.results[i].KPI_TYPE == '其他电量收入_同比') {
					KPI_OES_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 其他电量收入
				if (sRes.results[i].KPI_TYPE == '其他电量收入') {
					KPI_OES_V.push(sRes.results[i].KPI_VALUE);
				}

				// 容量电费收入同比
				if (sRes.results[i].KPI_TYPE == '容量电费收入_同比') {
					KPI_RLS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 容量电费收入
				if (sRes.results[i].KPI_TYPE == '容量电费收入') {
					KPI_RLS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 转发电量收入同比
				if (sRes.results[i].KPI_TYPE == '转发电量收入_同比') {
					KPI_ZFS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 转发电量收入
				if (sRes.results[i].KPI_TYPE == '') {
					KPI_ZFS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 收入统计日期
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}
			// 统计于日期
// 			$('#powerIncomeStatisticDate').html(dataStatisticDate);
			this.loadBaseDataDetail_SalesIncome(chartDivId, priceChartName, xData, KPI_HYS_V, KPI_ZGS_V, KPI_TDS_V, KPI_JJS_V, KPI_OES_V,
				KPI_RLS_V, KPI_ZFS_V, KPI_HYS_UP, KPI_ZGS_UP, KPI_TDS_UP, KPI_JJS_UP, KPI_OES_UP, KPI_RLS_UP, KPI_ZFS_UP);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_04_VSDSRJT/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取个电厂指标-售电收入 SCREEN_JYYJ_04_VSDSRDC
	loadEachPlant_SalesIncome: function(chartDivId, priceChartName, powerPlantName) {

		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// 售电收入指标
		// 合约电量收入
		var KPI_HYS_V = new Array();
		// 直销电量收入
		var KPI_ZGS_V = new Array();
		// 替发电量收入
		var KPI_TDS_V = new Array();
		// 竞价电量收入
		var KPI_JJS_V = new Array();
		// 其他电量收入
		var KPI_OES_V = new Array();
		// 容量电费收入
		var KPI_RLS_V = new Array();
		// 转发电量收入
		var KPI_ZFS_V = new Array();

		// 合约电量收入同比
		var KPI_HYS_UP = new Array();
		// 直销电量收入同比
		var KPI_ZGS_UP = new Array();
		// 替发电量收入同比
		var KPI_TDS_UP = new Array();
		// 竞价电量收入同比
		var KPI_JJS_UP = new Array();
		// 其他电量收入同比
		var KPI_OES_UP = new Array();
		// 容量电费收入同比
		var KPI_RLS_UP = new Array();
		// 转发电量收入同比
		var KPI_ZFS_UP = new Array();

		var dataStatisticDate = '';
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 各个指标月份
			var xData = new Array();
			for (var i in sRes.results) {
				// 合约电量收入同比
				if (sRes.results[i].KPI_TYPE == '合约电量收入_同比') {
					KPI_HYS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 合约电量收入
				if (sRes.results[i].KPI_TYPE == '合约电量收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_HYS_V.push(sRes.results[i].KPI_VALUE);
					xData.push(sRes.results[i].KPI_DATE);
				}

				// 直销电量收入同比
				if (sRes.results[i].KPI_TYPE == '直销电量收入_同比') {
					KPI_ZGS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 直销电量收入
				if (sRes.results[i].KPI_TYPE == '直销电量收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_ZGS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 替发电量收入同比
				if (sRes.results[i].KPI_TYPE == '替发电量收入_同比') {
					KPI_TDS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 替发电量收入
				if (sRes.results[i].KPI_TYPE == '替发电量收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_TDS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 竞价电量收入同比
				if (sRes.results[i].KPI_TYPE == '竞价电量收入_同比') {
					KPI_JJS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 竞价电量收入
				if (sRes.results[i].KPI_TYPE == '竞价电量收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_JJS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 其他电量收入同比
				if (sRes.results[i].KPI_TYPE == '其他电量收入_同比') {
					KPI_OES_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 其他电量收入
				if (sRes.results[i].KPI_TYPE == '其他电量收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_OES_V.push(sRes.results[i].KPI_VALUE);
				}

				// 容量电费收入同比
				if (sRes.results[i].KPI_TYPE == '容量电费收入_同比') {
					KPI_RLS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 容量电费收入
				if (sRes.results[i].KPI_TYPE == '容量电费收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_RLS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 转发电量收入同比
				if (sRes.results[i].KPI_TYPE == '转发电量收入_同比') {
					KPI_ZFS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 转发电量收入
				if (sRes.results[i].KPI_TYPE == '转发电量收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_ZFS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 收入统计日期
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}
			// 统计于日期
// 			$('#powerIncomeStatisticDate').html(dataStatisticDate);
			this.loadBaseDataDetail_SalesIncome(chartDivId, priceChartName, xData, KPI_HYS_V, KPI_ZGS_V, KPI_TDS_V, KPI_JJS_V, KPI_OES_V,
				KPI_RLS_V, KPI_ZFS_V, KPI_HYS_UP, KPI_ZGS_UP, KPI_TDS_UP, KPI_JJS_UP, KPI_OES_UP, KPI_RLS_UP, KPI_ZFS_UP);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_04_VSDSRDC/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 加载浙能电力售电收入
	loadBaseDataDetail_SalesIncome: function(chartDivId, priceChartName, xData, KPI_HYS_V, KPI_ZGS_V, KPI_TDS_V, KPI_JJS_V, KPI_OES_V,
		KPI_RLS_V, KPI_ZFS_V, KPI_HYS_UP, KPI_ZGS_UP, KPI_TDS_UP, KPI_JJS_UP, KPI_OES_UP, KPI_RLS_UP, KPI_ZFS_UP) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			var mychart = e.init(document.getElementById(chartDivId));
// 			if(document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML=="浙能电力"){
//   document.getElementById('profitNamePower').innerHTML="电力股份公司";
// }else{
// document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML;
// }
			document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower').innerHTML;
			var color1 = '#2DE630';
			var color2 = '#E52DE6';
			var option = {
				title: {
					text: priceChartName,
					subtext: '',
					x: 40,
					y: 5,
					textStyle: {
						fontSize: 15,
						color: 'green'
					}
				},
				legend: {
					orient: 'horizontal',
					x: '120',
					y: '10',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['合约电量收入', '直销电量收入', '替发电量收入', '竞价电量收入', '其他电量收入', '容量电费收入', '转发电量收入']
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
						data: xData
                            }
                        ],
				yAxis: [
					{
						name: '单位:亿元',
						type: 'value',
						axisLine: {
							show: true
						},
						axisLabel: {
							textStyle: {
								color: color1
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
						// 		max: y1,
						// 		min: y2,
						// 		splitNumber: n
                            }
                        ],
				series: [
					{
						name: '合约电量收入',
						type: 'bar',
						//                     symbol:'emptyCircle',
						// 		symbolSize:5,
						// 		itemStyle: {
						// 		    normal: {
						// 		        label : {
						// 		            show :true,
						// 		            position : 'top',
						// 		            textStyle:{
						// 		                color : 'white'
						// 		            }
						// 		        }
						// 		    }
						// 		},
						// barWidth : 50,
						stack: '售电收入',
						data: KPI_HYS_V
                            },
					{
						name: '直销电量收入',
						type: 'bar',
						stack: '售电收入',
						data: KPI_ZGS_V
                            },
					{
						name: '替发电量收入',
						type: 'bar',
						stack: '售电收入',
						data: KPI_TDS_V
                            },
					{
						name: '竞价电量收入',
						type: 'bar',
						stack: '售电收入',
						data: KPI_JJS_V
                            },
					{
						name: '其他电量收入',
						type: 'bar',
						stack: '售电收入',
						data: KPI_OES_V
                            },
					{
						name: '容量电费收入',
						type: 'bar',
						stack: '售电收入',
						data: KPI_RLS_V
                            },
					{
						name: '转发电量收入',
						type: 'bar',
						stack: '售电收入',
						data: KPI_ZFS_V
                            }
                        ]
			};

			mychart.setOption(option);
		}
	},

	// 获取浙能电力指标-补贴收入 SCREEN_JYYJ_04_VBTSRJT
	loadBase_SubsidyIncome: function(chartDivId, priceChartName) {

		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// 补贴收入指标
		// 可再生补贴收入
		var KPI_ZSS_V = new Array();
		// 脱硫补助收入
		var KPI_TLS_V = new Array();
		// 脱硝补助收入
		var KPI_TXS_V = new Array();
		// 除尘补助收入
		var KPI_CCS_V = new Array();
		// 超低排放补助收入
		var KPI_DPS_V = new Array();
		// 考核补偿电费收入
		var KPI_KHS_V = new Array();

		// 可再生补贴收入_同比
		var KPI_ZSS_UP = new Array();
		// 脱硫补助收入_同比
		var KPI_TLS_UP = new Array();
		// 脱硝补助收入_同比
		var KPI_TXS_UP = new Array();
		// 除尘补助收入_同比
		var KPI_CCS_UP = new Array();
		// 超低排放补助收入_同比
		var KPI_DPS_UP = new Array();
		// 考核补偿电费收入_同比
		var KPI_KHS_UP = new Array();

		var dataStatisticDate = '';
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 各个电厂
			var xData = new Array();
			for (var i in sRes.results) {
				// 可再生补贴收入同比
				if (sRes.results[i].KPI_TYPE == '可再生补贴收入_同比') {
					KPI_ZSS_UP.push(sRes.results[i].KPI_VALUE);
					xData.push(sRes.results[i].KPI_DESC);
				}
				// 可再生补贴收入
				if (sRes.results[i].KPI_TYPE == '可再生补贴收入') {
					KPI_ZSS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 脱硫补助收入同比
				if (sRes.results[i].KPI_TYPE == '脱硫补助收入_同比') {
					KPI_TLS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 脱硫补助收入
				if (sRes.results[i].KPI_TYPE == '脱硫补助收入') {
					KPI_TLS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 脱硝补助收入同比
				if (sRes.results[i].KPI_TYPE == '脱硝补助收入_同比') {
					KPI_TXS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 脱硝补助收入
				if (sRes.results[i].KPI_TYPE == '脱硝补助收入') {
					KPI_TXS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 除尘补助收入同比
				if (sRes.results[i].KPI_TYPE == '除尘补助收入_同比') {
					KPI_CCS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 除尘补助收入
				if (sRes.results[i].KPI_TYPE == '除尘补助收入') {
					KPI_CCS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 超低排放补助收入同比
				if (sRes.results[i].KPI_TYPE == '超低排放补助收入_同比') {
					KPI_DPS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 超低排放补助收入
				if (sRes.results[i].KPI_TYPE == '超低排放补助收入') {
					KPI_DPS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 考核补偿电费收入同比
				if (sRes.results[i].KPI_TYPE == '考核补偿电费收入_同比') {
					KPI_KHS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 考核补偿电费收入
				if (sRes.results[i].KPI_TYPE == '考核补偿电费收入') {
					KPI_KHS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 收入统计日期
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}
			// 统计于日期
// 			$('#powerIncomeStatisticDate').html(dataStatisticDate);
			this.loadBaseDataDetail_SubsidyIncome(chartDivId, priceChartName, xData, KPI_ZSS_V, KPI_TLS_V, KPI_TXS_V, KPI_CCS_V, KPI_DPS_V,
				KPI_KHS_V, KPI_ZSS_UP, KPI_TLS_UP, KPI_TXS_UP, KPI_CCS_UP, KPI_DPS_UP, KPI_KHS_UP);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_04_VBTSRJT/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取个电厂指标-补贴收入 SCREEN_JYYJ_04_VBTSRDC
	loadEachPlant_SubsidyIncome: function(chartDivId, priceChartName, powerPlantName) {
		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// 补贴收入指标
		// 可再生补贴收入
		var KPI_ZSS_V = new Array();
		// 脱硫补助收入
		var KPI_TLS_V = new Array();
		// 脱硝补助收入
		var KPI_TXS_V = new Array();
		// 除尘补助收入
		var KPI_CCS_V = new Array();
		// 超低排放补助收入
		var KPI_DPS_V = new Array();
		// 考核补偿电费收入
		var KPI_KHS_V = new Array();

		// 可再生补贴收入_同比
		var KPI_ZSS_UP = new Array();
		// 脱硫补助收入_同比
		var KPI_TLS_UP = new Array();
		// 脱硝补助收入_同比
		var KPI_TXS_UP = new Array();
		// 除尘补助收入_同比
		var KPI_CCS_UP = new Array();
		// 超低排放补助收入_同比
		var KPI_DPS_UP = new Array();
		// 考核补偿电费收入_同比
		var KPI_KHS_UP = new Array();

		var dataStatisticDate = '';
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 各个指标月份
			var xData = new Array();
			for (var i in sRes.results) {
				// 可再生补贴收入同比
				if (sRes.results[i].KPI_TYPE == '可再生补贴收入_同比') {
					KPI_ZSS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 可再生补贴收入
				if (sRes.results[i].KPI_TYPE == '可再生补贴收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_ZSS_V.push(sRes.results[i].KPI_VALUE);
					xData.push(sRes.results[i].KPI_DATE);
				}

				// 脱硫补助收入同比
				if (sRes.results[i].KPI_TYPE == '脱硫补助收入_同比') {
					KPI_TLS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 脱硫补助收入
				if (sRes.results[i].KPI_TYPE == '脱硫补助收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_TLS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 脱硝补助收入同比
				if (sRes.results[i].KPI_TYPE == '脱硝补助收入_同比') {
					KPI_TXS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 脱硝补助收入
				if (sRes.results[i].KPI_TYPE == '脱硝补助收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_TXS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 除尘补助收入同比
				if (sRes.results[i].KPI_TYPE == '除尘补助收入_同比') {
					KPI_CCS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 除尘补助收入
				if (sRes.results[i].KPI_TYPE == '除尘补助收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_CCS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 超低排放补助收入同比
				if (sRes.results[i].KPI_TYPE == '超低排放补助收入_同比') {
					KPI_DPS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 超低排放补助收入
				if (sRes.results[i].KPI_TYPE == '超低排放补助收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_DPS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 考核补偿电费收入同比
				if (sRes.results[i].KPI_TYPE == '考核补偿电费收入_同比') {
					KPI_KHS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 考核补偿电费收入
				if (sRes.results[i].KPI_TYPE == '考核补偿电费收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_KHS_V.push(sRes.results[i].KPI_VALUE);
				}

				// 收入统计日期
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}
			// 统计于日期
// 			$('#powerIncomeStatisticDate').html(dataStatisticDate);
			this.loadBaseDataDetail_SubsidyIncome(chartDivId, priceChartName, xData, KPI_ZSS_V, KPI_TLS_V, KPI_TXS_V, KPI_CCS_V, KPI_DPS_V,
				KPI_KHS_V, KPI_ZSS_UP, KPI_TLS_UP, KPI_TXS_UP, KPI_CCS_UP, KPI_DPS_UP, KPI_KHS_UP);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_04_VBTSRDC/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 加载浙能电力补贴收入
	loadBaseDataDetail_SubsidyIncome: function(chartDivId, priceChartName, xData, KPI_ZSS_V, KPI_TLS_V, KPI_TXS_V, KPI_CCS_V, KPI_DPS_V,
		KPI_KHS_V, KPI_ZSS_UP, KPI_TLS_UP, KPI_TXS_UP, KPI_CCS_UP, KPI_DPS_UP, KPI_KHS_UP) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			var mychart = e.init(document.getElementById(chartDivId));
// 			if(document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML=="浙能电力"){
//   document.getElementById('profitNamePower').innerHTML="电力股份公司";
// }else{
// document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML;
// }
			document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower').innerHTML;
			var color1 = '#2DE630';
			var color2 = '#E52DE6';
			var option = {
				title: {
					text: priceChartName,
					subtext: '',
					x: 40,
					y: 5,
					textStyle: {
						fontSize: 15,
						color: 'green'
					}
				},
				legend: {
					orient: 'horizontal',
					x: '120',
					y: '10',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['可再生补贴收入', '脱硫补助收入', '脱硝补助收入', '除尘补助收入', '超低排放补助收入', '考核补偿电费收入']
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
						data: xData
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
								color: color1
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
						// 		max: y1,
						// 		min: y2,
						// 		splitNumber: n
                            }
                        ],
				series: [
					{
						name: '可再生补贴收入',
						type: 'bar',
						//                     symbol:'emptyCircle',
						// 		symbolSize:5,
						// 		itemStyle: {
						// 		    normal: {
						// 		        label : {
						// 		            show :true,
						// 		            position : 'top',
						// 		            textStyle:{
						// 		                color : 'white'
						// 		            }
						// 		        }
						// 		    }
						// 		},
						stack: '补贴收入',
						data: KPI_ZSS_V
                            },
					{
						name: '脱硫补助收入',
						type: 'bar',
						stack: '补贴收入',
						data: KPI_TLS_V
                            },
					{
						name: '脱硝补助收入',
						type: 'bar',
						stack: '补贴收入',
						data: KPI_TXS_V
                            },
					{
						name: '除尘补助收入',
						type: 'bar',
						stack: '补贴收入',
						data: KPI_CCS_V
                            },
					{
						name: '超低排放补助收入',
						type: 'bar',
						stack: '补贴收入',
						data: KPI_DPS_V
                            },
					{
						name: '考核补偿电费收入',
						type: 'bar',
						stack: '补贴收入',
						data: KPI_KHS_V
                            }
                        ]
			};

			mychart.setOption(option);
		}
	},

	// 获取浙能电力指标-辅助服务收入 SCREEN_JYYJ_04_VFZSRJT
	loadBase_SubServiceIncome: function(chartDivId, priceChartName) {
		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// 辅助服务收入指标
		// 辅助服务收入
		var KPI_FZS_V = new Array();

		// 辅助服务收入_同比
		var KPI_FZS_UP = new Array();

		var dataStatisticDate = '';
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 各个电厂
			var xData = new Array();
			for (var i in sRes.results) {
				// 辅助服务收入同比
				if (sRes.results[i].KPI_TYPE == '辅助服务收入_同比') {
					KPI_FZS_UP.push(sRes.results[i].KPI_VALUE);
					xData.push(sRes.results[i].KPI_DESC);
				}
				// 辅助服务收入
				if (sRes.results[i].KPI_TYPE == '辅助服务收入') {
					KPI_FZS_V.push(sRes.results[i].KPI_VALUE);
				}
				// 收入统计日期
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}
			// 统计于日期
// 			$('#powerIncomeStatisticDate').html(dataStatisticDate);
			this.loadBaseDataDetail_SubServiceIncome(chartDivId, priceChartName, xData, KPI_FZS_V, KPI_FZS_UP);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_04_VFZSRJT/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取个电厂指标-辅助服务收入 SCREEN_JYYJ_04_VFZSRDC
	loadEachPlant_SubServiceIncome: function(chartDivId, priceChartName, powerPlantName) {
		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// 辅助服务收入指标
		// 辅助服务收入
		var KPI_FZS_V = new Array();

		// 辅助服务收入_同比
		var KPI_FZS_UP = new Array();

		var dataStatisticDate = '';
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 各个指标月份
			var xData = new Array();
			for (var i in sRes.results) {
				// 辅助服务收入同比
				if (sRes.results[i].KPI_TYPE == '辅助服务收入_同比' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_FZS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 辅助服务收入
				if (sRes.results[i].KPI_TYPE == '辅助服务收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_FZS_V.push(sRes.results[i].KPI_VALUE);
					xData.push(sRes.results[i].KPI_DATE);
				}
				// 收入统计日期
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}
			// 统计于日期
// 			$('#powerIncomeStatisticDate').html(dataStatisticDate);
			this.loadBaseDataDetail_SubServiceIncome(chartDivId, priceChartName, xData, KPI_FZS_V, KPI_FZS_UP);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_04_VFZSRDC/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 加载浙能电力辅助服务收入
	loadBaseDataDetail_SubServiceIncome: function(chartDivId, priceChartName, xData, KPI_FZS_V, KPI_FZS_UP) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			var mychart = e.init(document.getElementById(chartDivId));
// 			if(document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML=="浙能电力"){
//   document.getElementById('profitNamePower').innerHTML="电力股份公司";
// }else{
// document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML;
// }
			document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower').innerHTML;
			var color1 = '#2DE630';
			var color2 = '#E52DE6';
			var option = {
				title: {
					text: priceChartName,
					subtext: '',
					x: 40,
					y: 5,
					textStyle: {
						fontSize: 15,
						color: 'green'
					}
				},
				legend: {
					orient: 'horizontal',
					x: '120',
					y: '35',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['辅助服务收入', '辅助服务收入同比']
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
						data: xData
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
								color: color1
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
						// 		max: y1,
						// 		min: y2,
						// 		splitNumber: n
                            }
                        ],
				series: [
					{
						name: '辅助服务收入',
						type: 'bar',
						symbol: 'emptyCircle',
						symbolSize: 5,
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
						barWidth: 50,
						data: KPI_FZS_V
                            },
					{
						name: '辅助服务收入同比',
						type: 'bar',
						data: KPI_FZS_UP
                            },
                        ]
			};

			mychart.setOption(option);
		}
	},

	// 获取浙能电力指标-发电收入 SCREEN_JYYJ_04_VFDSRJT
	loadBase_PowerOutputIncome: function(chartDivId, priceChartName) {

		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// 发电收入指标
		// 发电收入
		var KPI_FDS_V = new Array();
		// 售电收入
		var KPI_SDS_V = new Array();
		// 补贴收入
		var KPI_BTS_V = new Array();
		// 辅助服务收入
		var KPI_FZS_V = new Array();

		// 发电收入同比
		var KPI_FDS_UP = new Array();
		// 售电收入同比
		var KPI_SDS_UP = new Array();
		// 补贴收入同比
		var KPI_BTS_UP = new Array();
		// 辅助服务收入同比
		var KPI_FZS_UP = new Array();

		var dataStatisticDate = '';
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 各个电厂
			var xData = new Array();
			for (var i in sRes.results) {

				// 发电收入同比
				if (sRes.results[i].KPI_TYPE == '发电收入_同比') {
					KPI_FDS_UP.push(sRes.results[i].KPI_VALUE);
					xData.push(sRes.results[i].KPI_DESC);
				}
				// 发电收入
				if (sRes.results[i].KPI_TYPE == '发电收入') {
					KPI_FDS_V.push(sRes.results[i].KPI_VALUE);
				}
				// 售电收入同比
				if (sRes.results[i].KPI_TYPE == '售电收入_同比') {
					KPI_SDS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 售电收入
				if (sRes.results[i].KPI_TYPE == '售电收入') {
					KPI_SDS_V.push(sRes.results[i].KPI_VALUE);
				}
				// 补贴收入同比
				if (sRes.results[i].KPI_TYPE == '补贴收入_同比') {
					KPI_BTS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 补贴收入
				if (sRes.results[i].KPI_TYPE == '补贴收入') {
					KPI_BTS_V.push(sRes.results[i].KPI_VALUE);
				}
				// 辅助服务收入同比
				if (sRes.results[i].KPI_TYPE == '辅助服务收入_同比') {
					KPI_FZS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 辅助服务收入
				if (sRes.results[i].KPI_TYPE == '辅助服务收入') {
					KPI_FZS_V.push(sRes.results[i].KPI_VALUE);
				}
				// 收入统计日期
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}
			// 统计于日期
// 			$('#powerIncomeStatisticDate').html(dataStatisticDate);
			this.loadBaseDataDetail_PowerOutputIncome(chartDivId, priceChartName, xData, KPI_FDS_V, KPI_SDS_V, KPI_BTS_V, KPI_FZS_V, KPI_FDS_UP,
				KPI_SDS_UP, KPI_BTS_UP, KPI_FZS_UP);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_04_VFDSRJT/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取个电厂指标-发电收入 SCREEN_JYYJ_04_VFDSRDC
	loadEachPlant_PowerOutputIncome: function(chartDivId, priceChartName, powerPlantName) {

		var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		}
		// 发电收入指标
		// 发电收入
		var KPI_FDS_V = new Array();
		// 售电收入
		var KPI_SDS_V = new Array();
		// 补贴收入
		var KPI_BTS_V = new Array();
		// 辅助服务收入
		var KPI_FZS_V = new Array();

		// 发电收入同比
		var KPI_FDS_UP = new Array();
		// 售电收入同比
		var KPI_SDS_UP = new Array();
		// 补贴收入同比
		var KPI_BTS_UP = new Array();
		// 辅助服务收入同比
		var KPI_FZS_UP = new Array();

		var dataStatisticDate = '';
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 各个电厂月记录
			var xData = new Array();
			for (var i in sRes.results) {

				// 发电收入同比
				if (sRes.results[i].KPI_TYPE == '发电收入_同比') {
					KPI_FDS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 发电收入
				if (sRes.results[i].KPI_TYPE == '发电收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_FDS_V.push(sRes.results[i].KPI_VALUE);
					xData.push(sRes.results[i].KPI_DATE);
				}
				// 售电收入同比
				if (sRes.results[i].KPI_TYPE == '售电收入_同比') {
					KPI_SDS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 售电收入
				if (sRes.results[i].KPI_TYPE == '售电收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_SDS_V.push(sRes.results[i].KPI_VALUE);
				}
				// 补贴收入同比
				if (sRes.results[i].KPI_TYPE == '补贴收入_同比') {
					KPI_BTS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 补贴收入
				if (sRes.results[i].KPI_TYPE == '补贴收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_BTS_V.push(sRes.results[i].KPI_VALUE);
				}
				// 辅助服务收入同比
				if (sRes.results[i].KPI_TYPE == '辅助服务收入_同比') {
					KPI_FZS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 辅助服务收入
				if (sRes.results[i].KPI_TYPE == '辅助服务收入' && sRes.results[i].KPI_DESC == powerPlantName) {
					KPI_FZS_V.push(sRes.results[i].KPI_VALUE);
				}
				// 收入统计日期
				if (dataStatisticDate == '') {
					dataStatisticDate = sRes.results[sRes.results.length - 1].KPI_DATE.substring(0, 4) + '.' + sRes.results[sRes.results.length - 1].KPI_DATE
						.substring(4, 6) + "." + sRes.results[sRes.results.length - 1].KPI_DATE.substring(6, 8);
				}
			}
			// 统计于日期
// 			$('#powerIncomeStatisticDate').html(dataStatisticDate);
			this.loadBaseDataDetail_PowerOutputIncome(chartDivId, priceChartName, xData, KPI_FDS_V, KPI_SDS_V, KPI_BTS_V, KPI_FZS_V, KPI_FDS_UP,
				KPI_SDS_UP, KPI_BTS_UP, KPI_FZS_UP);
			if (busy) {
				busy.close();
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......", {
				offset: '0 -110'
			});
		}, this);
		sap.ui.getCore().getModel().read("AT_ZSCREEN_JYYJ_04_VFDSRDC/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 加载浙能电力发电收入
	loadBaseDataDetail_PowerOutputIncome: function(chartDivId, priceChartName, xData, KPI_FDS_V, KPI_SDS_V, KPI_BTS_V, KPI_FZS_V, KPI_FDS_UP,
		KPI_SDS_UP, KPI_BTS_UP, KPI_FZS_UP) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			var mychart = e.init(document.getElementById(chartDivId));
// 			if(document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML=="浙能电力"){
//   document.getElementById('profitNamePower').innerHTML="电力股份公司";
// }else{
// document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML;
// }
			document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower').innerHTML;
			var color1 = '#2DE630';
			var color2 = '#E52DE6';
			var option = {
				title: {
					text: priceChartName,
					subtext: '',
					x: 40,
					y: 5,
					textStyle: {
						fontSize: 15,
						color: 'green'
					}
				},
				legend: {
					orient: 'horizontal',
					x: '120',
					y: '35',
					textStyle: {
						color: 'white',
						fontFamily: '微软雅黑'
					},
					data: ['售电收入', '补贴收入', '辅助服务收入']
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
						data: xData
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
								color: color1
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
						// 		max: y1,
						// 		min: y2,
						// 		splitNumber: n
                            }
                        ],
				series: [
            //                 {
            //                     name:'发电收入',
            //                     type:'bar',
            //                     stack: '发电收入',
            // //                     symbol:'emptyCircle',
        				// // 		symbolSize:5,
        				// // 		itemStyle: {
        				// // 		    normal: {
        				// // 		        label : {
        				// // 		            show :true,
        				// // 		            position : 'top',
        				// // 		            textStyle:{
        				// // 		                color : 'white'
        				// // 		            }
        				// // 		        }
        				// // 		    }
        				// // 		},
            //                     barWidth : 50,
            //                     data:KPI_FDS_V
            //                 },
					{
						name: '售电收入',
						type: 'bar',
						stack: '发电收入',
						data: KPI_SDS_V
                            },
					{
						name: '补贴收入',
						type: 'bar',
						stack: '发电收入',
						data: KPI_BTS_V
                            },
					{
						name: '辅助服务收入',
						type: 'bar',
						stack: '发电收入',
						data: KPI_FZS_V
                            },
                        ]
			};

			mychart.setOption(option);
		}
	},

	// 电价详细Chart
	loadPriceChartdetail: function(chartDivId, priceChartName, showdataUP, showdataValue, xData) {
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);

		function draw(e) {
			var mychart = e.init(document.getElementById(chartDivId));
// 			if(document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML=="浙能电力"){
//   document.getElementById('profitNamePower').innerHTML="电力股份公司";
// }else{
// document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower')
// .innerHTML;
// }
			document.getElementById('profitNamePower').innerHTML = document.getElementById('powerPlantMainDetailTitlePower').innerHTML;

			//   var fuelXaxisName = '';
			//   if (document.getElementById('powerPlantMainDetailTitlePower').innerHTML == '浙能电力') {
			//       fuelXaxisName = ['浙能电力','兰溪发电', '台二发电', '凤台发电'];
			//   } else {
			//       fuelXaxisName = ['机组1', '机组2', '机组3', '机组4'];
			//   }

			var datax1 = showdataValue;
			var datax2 = showdataUP;
			var color1 = '#2DE630';
			var color2 = '#E52DE6';
			var option = {
				title: {
					text: priceChartName,
					subtext: '',
					x: 40,
					y: 10,
					textStyle: {
						fontSize: 20,
						color: 'green'
					}
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
				color: specialColorArray,
				//[color1, color2],
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
						data: xData
                            }
                        ],
				yAxis: [
					{
						name: '单位:百万元',
						type: 'value',
						axisLine: {
							show: true
						},
						axisLabel: {
							textStyle: {
								color: color1
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
						// 		max: y1,
						// 		min: y2,
						// 		splitNumber: n
                            },
					{
						name: '同比增长:%',
						type: 'value',
						axisLine: {
							show: true
						},
						axisLabel: {
							textStyle: {
								color: color2
							},
							formatter: '{value}'
						},
						splitLine: {
							// 			show: false
							lineStyle: {
								color: 'rgba(64,64,64,0.5)'
							}
						},
						// 		max: y3,
						// 		min: y4,
						// 		splitNumber: n
                            }
                        ],
				series: [
					{
						name: '当年',
						type: 'bar',
						smooth: true,
						symbol: 'emptyCircle',
						symbolSize: 5,
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
						data: datax1
                            },
					{
						name: '去年',
						type: 'line',
						smooth: true,
						yAxisIndex: 1,
						symbol: 'emptyCircle',
						symbolSize: 5,
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
						data: datax2

                            }
                        ]
			};

			mychart.setOption(option);
		}
	},
	//load the chart map
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

// 			///////////////////////////////////中国地图/////////////////////////////////////			
// 			// 基于准备好的dom，初始化echarts图表
// 			myChart3 = ec.init(document.getElementById('chinaMapPower'));
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

			document.getElementById('powerPlantMainDetailTitlePower').innerHTML = '浙能电力股份有限公司'
			//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			// 基于准备好的dom，初始化echarts图表
			var myChart4 = ec.init(document.getElementById('powerPlantMapPowerIncome'));
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
							"浙能电力本部": [119.60, 30.10],
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
								    // {name: "杭州", value: 300}
								    // {name: "台州", value: 300}
								    // {name: "浙江浙能电力股份有限公司萧山发电厂", value: 300},
								    // {name: "浙江华隆电力工程有限公司", value: 300}
								    ]
						}
						}
					]
			};
			myChart4.on(ecConfig.EVENT.CLICK, function(param) {

				document.getElementById('internetDetailPower').style.display = "none";
				document.getElementById('rlcb_detailPower').style.display = "";

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

			// 默认浙能电力数据显示
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
			myChart5 = ec.init(document.getElementById('huaiNanMapPowerIncome'));

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

				document.getElementById('internetDetailPower').style.display = "none";
				document.getElementById('rlcb_detailPower').style.display = "";

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
			myChart6 = ec.init(document.getElementById('akesuMapPowerIncome'));
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

				document.getElementById('internetDetailPower').style.display = "none";
				document.getElementById('rlcb_detailPower').style.display = "";

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
			myChart7 = ec.init(document.getElementById('zaoquanMapPowerIncome'));
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

				document.getElementById('internetDetailPower').style.display = "none";
				document.getElementById('rlcb_detailPower').style.display = "";

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

			if (isPowerIncomeLoad == false) {
				if (busy) {
					busy.close();
				}
				changeTheSkinOfPage();
				isPowerIncomeLoad = true;
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
			drawpie(e, 3, 4, 'detail_piePower');
		}

		function drawbar01(e) {
			drawbar(e, 4, 6, 'detail_01Power');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'detail_02Power');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'detail_03Power');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'detail_04Power');
		}
		// 设置Chart的数据
		function setChartData(ec, mapSeries, dataIndex) {

			// get powerplantname by real name
			var powerPlantName = getPowerplantnameByRealName(mapSeries.markPoint.data[dataIndex].name);
			if(powerPlantName=="浙能电力"){
			    document.getElementById('powerPlantMainDetailTitlePower').innerHTML = "浙能电力股份有限公司";
			}else{
			document.getElementById('powerPlantMainDetailTitlePower').innerHTML = powerPlantName;
}
			// 售电收入
			var salesIncomeValue = mapSeries.markPoint.data[dataIndex].salesIncomeValue;
			if (salesIncomeValue != undefined) {
				document.getElementById('travelPricePower').innerHTML = salesIncomeValue;
			} else {
				document.getElementById('travelPricePower').innerHTML = 0;
			}
			// 补贴收入
			var subsidyValue = mapSeries.markPoint.data[dataIndex].subsidyValue;
			if (subsidyValue != undefined) {
				document.getElementById('coalPricePower').innerHTML = subsidyValue;
			} else {
				document.getElementById('coalPricePower').innerHTML = 0;
			}
			// 辅助服务收入
			var serviceIncomeValue = mapSeries.markPoint.data[dataIndex].serviceIncomeValue;
			if (serviceIncomeValue != undefined) {
				document.getElementById('watt1Power').innerHTML = serviceIncomeValue;
			} else {
				document.getElementById('watt1Power').innerHTML = 0;
			}
			// 其他收入
			//  var factoryUsePV = mapSeries.markPoint.data[dataIndex].factoryUsePV;
			//  if (factoryUsePV != undefined) {
			//      document.getElementById('factoryUsePV').innerHTML = factoryUsePV;
			//  } else {
			//      document.getElementById('factoryUsePV').innerHTML = 0;
			//      directlyPV = 0;
			//  }
			// 发电收入
			var powerIncomeValue = mapSeries.markPoint.data[dataIndex].powerIncomeValue;
			if (powerIncomeValue != undefined) {
				document.getElementById('fuelCostPower').innerHTML = powerIncomeValue;
			} else {
				document.getElementById('fuelCostPower').innerHTML = 0;
			}
			// 发电收入同比
			var powerIncomeup = mapSeries.markPoint.data[dataIndex].powerIncomeup;
			if (powerIncomeup != undefined) {
				document.getElementById('fuelDownPercentPower').innerHTML = powerIncomeup;
			} else {
				document.getElementById('fuelDownPercentPower').innerHTML = 0;
			}

			var dataAll = salesIncomeValue + subsidyValue + serviceIncomeValue;
			if (dataAll == 0) {
				dataAll = 10;
			}
			drawpie(ec, powerIncomeup + 50, 50, 'detail_piePower');
			drawbar(ec, salesIncomeValue, dataAll, 'detail_01Power');
			drawbar(ec, subsidyValue, dataAll, 'detail_02Power');
			drawbar(ec, serviceIncomeValue, dataAll, 'detail_03Power');
		}
	}
});