// get real name by powerplant name
function getRealNameByPowerplantname(plantName) {
    var realName = '';
	if (plantName == '凤台发电') {
        realName = '凤台电厂';
    }
    if (plantName == '兰溪发电') {
        realName = '浙江浙能兰溪发电有限责任公司';
    }
    if (plantName == '台二发电') {
        realName = '浙江浙能台州第二发电有限责任公司';
    }
    if (plantName == '集团') {
        realName = '浙能电力股份有限公司';
    }
    // 杭州
    if (plantName == '电力股份本部') {
        realName = '浙能电力股份本部';
    }
    if (plantName == '萧山发电') {
        realName = '萧山发电厂';
    }
    if (plantName == '浙能运输贸易') {
        realName = '浙江浙能运输贸易有限公司';
    }
    // 台州
    if (plantName == '台州发电') {
        realName = '台州发电厂';
    }
    if (plantName == '台州海天电力工程') {
        realName = '台州市海天电力工程有限公司';
    }
    if (plantName == '台州联源热力') {
        realName = '台州市联源热力有限公司';
    }
    // 绍兴
    if (plantName == '华隆电力工程') {
        realName = '浙江华隆电力工程有限公司';
    }
    if (plantName == '滨海发电') {
        realName = '浙江浙能绍兴滨海热电有限责任公司';
    }
    if (plantName == '钱清发电') {
        realName = '浙江浙能钱清发电有限责任公司';
    }
    if (plantName == '绍兴滨海热力') {
        realName = '浙江浙能绍兴滨海热力有限公司';
    }
    // 嘉兴
    if (plantName == '嘉兴发电') {
        realName = '浙江浙能嘉兴发电有限公司';
    }
    if (plantName == '嘉源电力工程') {
        realName = '浙江嘉源电力工程有限公司';
    }
    if (plantName == '平湖市滨海热力') {
        realName = '平湖市滨海热力有限公司';
    }
    if (plantName == '嘉华发电') {
        realName = '浙江浙能嘉华发电有限公司';
    }
    // 湖州
    if (plantName == '长兴发电') {
        realName = '浙江浙能长兴发电有限公司';
    }
    if (plantName == '长兴东南热力') {
        realName = '浙江长兴东南热力有限责任公司';
    }
    // 宁波
    if (plantName == '镇海发电') {
        realName = '浙江浙能镇海发电有限责任公司';
    }
    if (plantName == '镇海热力') {
        realName = '宁波市镇海热力有限责任公司';
    }
    if (plantName == '宁波发电工程') {
        realName = '宁波发电工程有限公司';
    }
    if (plantName == '镇海联合') {
        realName = '浙江浙能镇海联合发电有限公司';
    }
    if (plantName == '北仑发电') {
        realName = '浙江浙能北仑发电有限公司';
    }
    if (plantName == '镇海燃气') {
        realName = '浙江浙能镇海天然气发电有限责任公司';
    }
    if (plantName == '镇海燃热') {
        realName = '浙江浙能镇海燃气热电有限责任公司';
    }
    // 温州
    if (plantName == '温州发电') {
        realName = '浙江浙能温州发电有限公司';
    }
    if (plantName == '乐清瓯越电力工程') {
        realName = '乐清市瓯越电力工程检修有限公司';
    }
    if (plantName == '嘉隆供热') {
        realName = '乐清市嘉隆供热有限公司';
    }
    if (plantName == '乐清发电') {
        realName = '浙江浙能乐清发电有限责任公司';
    }
    if (plantName == '温州燃机') {
        realName = '温州燃机发电有限公司';
    }
    if (plantName == '温特发电') {
        realName = '浙江温州特鲁莱发电有限责任公司';
    }
    // 金华
    if (plantName == '金华燃机') {
        realName = '浙江浙能金华燃机发电有限责任公司';
    }
    // 舟山
    if (plantName == '舟山煤电') {
        realName = '浙江浙能中煤舟山煤电有限责任公司';
    }
    // 衢州
    if (plantName == '常山燃气') {
        realName = '浙江浙能常山天然气发电有限公司';
    }
    // 新疆
    if (plantName == '阿克苏热电') {
        realName = '阿克苏热电';
    }
    // 宁夏
    if (plantName == '枣泉发电') {
        realName = '枣泉发电';
    }
    return realName;
}
// get powerplant name by real name
function getPowerplantnameByRealName(realName) {
    var powerPlantName = '';
	if (realName == '浙江浙能兰溪发电有限责任公司') {
	    powerPlantName = '兰溪电厂';
	} else if (realName == '浙江浙能台州第二发电有限责任公司') {
	    powerPlantName = '台二电厂';
	} else if (realName == '浙能电力股份有限公司') {
	    powerPlantName = '集团';
	} else if (realName == '凤台电厂') {
	    powerPlantName = '凤台电厂';
	}
	// 杭州
    if (realName == '浙能电力股份本部') {
        powerPlantName = '电力股份本部';
    }
    if (realName == '萧山发电厂') {
        powerPlantName = '萧山发电';
    }
    if (realName == '浙江浙能运输贸易有限公司') {
        powerPlantName = '浙能运输贸易';
    }
    // 台州
    if (realName == '台州发电厂') {
        powerPlantName = '台州发电';
    }
    if (realName == '台州市海天电力工程有限公司') {
        powerPlantName = '台州海天电力工程';
    }
    if (realName == '台州市联源热力有限公司') {
        powerPlantName = '台州联源热力';
    }
    // 绍兴
    if (realName == '浙江浙能绍兴滨海热电有限责任公司') {
        powerPlantName = '滨海发电';
    }
    if (realName == '浙江华隆电力工程有限公司') {
        powerPlantName = '华隆电力工程';
    }
    if (realName == '浙江浙能钱清发电有限责任公司') {
        powerPlantName = '钱清发电';
    }
    if (realName == '浙江浙能绍兴滨海热力有限公司') {
        powerPlantName = '绍兴滨海热力';
    }
    
    // 嘉兴
    if (realName == '浙江浙能嘉兴发电有限公司') {
        powerPlantName = '嘉兴发电';
    }
    if (realName == '浙江嘉源电力工程有限公司') {
        powerPlantName = '嘉源电力工程';
    }
    if (realName == '平湖市滨海热力有限公司') {
        powerPlantName = '平湖市滨海热力';
    }
    if (realName == '浙江浙能嘉华发电有限公司') {
        powerPlantName = '嘉华发电';
    }
    // 湖州
    if (realName == '浙江浙能长兴发电有限公司') {
        powerPlantName = '长兴发电';
    }
    if (realName == '浙江长兴东南热力有限责任公司') {
        powerPlantName = '长兴东南热力';
    }
    // 宁波
    if (realName == '浙江浙能镇海发电有限责任公司') {
        powerPlantName = '镇海发电';
    }
    if (realName == '宁波市镇海热力有限责任公司') {
        powerPlantName = '镇海热力';
    }
    if (realName == '宁波发电工程有限公司') {
        powerPlantName = '宁波发电工程';
    }
    if (realName == '浙江浙能镇海联合发电有限公司') {
        powerPlantName = '镇海联合';
    }
    if (realName == '浙江浙能北仑发电有限公司') {
        powerPlantName = '北仑发电';
    }
    if (realName == '浙江浙能镇海天然气发电有限责任公司') {
        powerPlantName = '镇海燃气';
    }
    if (realName == '浙江浙能镇海燃气热电有限责任公司') {
        powerPlantName = '镇海燃热';
    }
    // 温州
    if (realName == '浙江浙能温州发电有限公司') {
        powerPlantName = '温州发电';
    }
    if (realName == '乐清市瓯越电力工程检修有限公司') {
        powerPlantName = '乐清瓯越电力工程';
    }
    if (realName == '乐清市嘉隆供热有限公司') {
        powerPlantName = '嘉隆供热';
    }
    if (realName == '浙江浙能乐清发电有限责任公司') {
        powerPlantName = '乐清发电';
    }
    if (realName == '温州燃机发电有限公司') {
        powerPlantName = '温州燃机';
    }
    if (realName == '浙江温州特鲁莱发电有限责任公司') {
        powerPlantName = '温特发电';
    }
    // 金华
    if (realName == '浙江浙能金华燃机发电有限责任公司') {
        powerPlantName = '金华燃机';
    }
    // 舟山
    if (realName == '浙江浙能中煤舟山煤电有限责任公司') {
        powerPlantName = '舟山煤电';
    }
    // 衢州
    if (realName == '浙江浙能常山天然气发电有限公司') {
        powerPlantName = '常山燃气';
    }
    // 新疆
    if (realName == '阿克苏热电') {
        powerPlantName = '阿克苏热电';
    }
    // 宁夏
    if (realName == '枣泉发电') {
        powerPlantName = '枣泉发电';
    }
	return powerPlantName;
}
// date type to 20160101 format string
function toSimpleDateString(datetime,stringType) {
    
	var dateYear
    var dateMonth;
    var dateDay;
    var datetimeMonth = datetime.getMonth()+1;
    // set year value
    dateYear = datetime.getFullYear().toString();
    // set month value
    if (datetimeMonth < 10) {
        dateMonth = '0'+datetimeMonth.toString();
    } else {
        dateMonth = datetime.getMonth().toString();
    }
    // set date value
    if (datetime.getDate() < 10) {
        dateDay = '0'+datetime.getDate().toString();
    } else {
        dateDay = datetime.getDate().toString();
    }
    var currentDate = '';
    if (stringType == 'date') {
        currentDate = dateYear + dateMonth + dateDay;
    }
    if (stringType == 'month') {
        currentDate = dateYear + dateMonth;
    }
    return currentDate;
}
// 皮肤切换，更换CSS文件
function changeSkinCss(pageName) {
    var skinNameAlter = $('.userSkin').html();
    if (skinName == '夜间模式') {
        skinName = '高亮模式';
    } else {
        skinName = '夜间模式';
    }
    skinNameAlter = $('.userSkin').html();
    if (pageName == 'help') {
        changeTheSkinOfPage();
    }
    if (pageName == 'home01') {
        isHomeLoad = false;
        home.getController()._loadData01();
    }
    if (pageName == 'home02') {
        isHome02Load = false;
        home02.getController()._loadData01();
    }
    if (pageName == 'home03') {
        isHome03Load = false;
        home03.getController()._loadData01();
    }
    if (pageName == 'home04') {
        isHome04Load = false;
        home04.getController()._loadData01();
    }
    if (pageName == 'home05') {
        changeTheSkinOfPage();
    }
    if (pageName == 'home06') {
        isHome06Load = false;
        home06.getController()._loadData01();
    }
    if (pageName == 'home07') {
        changeTheSkinOfPage();
    }
    if (pageName == 'home08') {
        isHome08Load = false;
        home08.getController()._loadData01('');
    }
    if (pageName == 'internetPowerVolume') {
        isInternetPowerVolumeLoad = false;
        internetPowerVolume.getController()._loadData01();
    }
    if (pageName == 'powerPlantMap') {
        isPowerPlantMapLoad = false;
        powerPlantMap.getController()._loadData01(); 
    }
    if (pageName == 'internetVolume') {
        isInternetVolumeLoad = false;
        internetVolume.getController()._loadData01(); 
    }
    if (pageName == 'othersCost') {
        isOthersCostLoad = false;
        othersCost.getController()._loadData01(); 
    }
    if (pageName == 'powerIncome') {
        isPowerIncomeLoad = false;
        powerIncome.getController()._loadData01(); 
    }
    if (pageName == 'mainBusiness') {
        isMainBusinessLoad = false;
        mainBusiness.getController()._loadData01(); 
    }
    if (pageName == 'heatIncome') {
        isHeatIncomeLoad = false;
        heatIncome.getController()._loadData01(); 
    }
    if (pageName == 'labourIncome') {
        isLabourIncomeLoad = false;
        labourIncome.getController()._loadData01(); 
    }
    if (pageName == 'othersIncome') {
        isOthersIncomeLoad = false;
        othersIncome.getController()._loadData01(); 
    }
    if (pageName == 'averBusinessIncome') {
        averBusinessIncome.getController()._loadData01(); 
    }
    if (pageName == 'workerCount') {
        workerCount.getController()._loadData01(); 
    }
    if (pageName == 'workerCountPerHour') {
        workerCountPerHour.getController()._loadData01(); 
    }
    if (pageName == 'workerCost') {
        workerCost.getController()._loadData01(); 
    }
    if (pageName == 'workerCostPerHour') {
        workerCostPerHour.getController()._loadData01(); 
    }
    if (pageName == 'pureProfit') {
        isPureProfit = false;
        pureProfit.getController()._loadData01(); 
    }
    // 净利润详细
    if (pageName == 'pureProfitDetail') {
        pureProfitDetail.getController()._loadData01();
    }
    // 营业利润
    if (pageName == 'businessProfit') {
        businessProfit.getController()._loadData01();
    }
    // 利润总额
    if (pageName == 'profitSum') {
        profitSum.getController()._loadData01();
    }
    // 所得税费用
    if (pageName == 'taxFee') {
        taxFee.getController()._loadData01();
    }
    // 营业总收入
    if (pageName == 'businessSumIncome') {
        businessSumIncome.getController()._loadData01();
    }
    // 营业总成本
    if (pageName == 'businessSumCost') {
        businessSumCost.getController()._loadData01();
    }
    
    if (pageName == 'pureProperty') {
        pureProperty.getController()._loadData01(); 
    }
    if (pageName == 'sumProperty') {
        sumProperty.getController()._loadData01(); 
    }
    if (pageName == 'salesPercent') {
        salesPercent.getController()._loadData01(); 
    }
    if (pageName == 'propertyPercent') {
        propertyPercent.getController()._loadData01(); 
    }
    if (pageName == 'performance') {
        isPerformaneceLoad = false;
        Performance.getController()._loadData01(); 
    }
    if (pageName == 'tab') {
        changeTheSkinOfPage();
    }
    if (pageName == 'safeProduceDays') {
        safeProduceDays.getController()._loadData01(); 
    }
    
    // 人均利润
    if (pageName == 'averPersonProfit') {
        changeTheSkinOfPage();
    }
    // 员工类型、用工性质
    if (pageName == 'wokerPropertyAndType') {
        wokerPropertyAndType.getController()._loadData01();
    }
    // 人均营业收入记录
    if (pageName == 'averPersonProfitRecord') {
        averPersonProfitRecord.getController()._loadData01();
    }
    // 人均工资
    if (pageName == 'averPersonSalary') {
        averPersonSalary.getController()._loadData01();
    }
}
// change the skin of the page
function changeTheSkinOfPage() {
    if (skinName == '高亮模式') {
        $('#homeCss').attr("href","css/homeHighlight.css");
        $('#helpCss').attr("href","css/helpHighlight.css");
        $('#bottomButCss').attr("href","css/bottom_buttonHighlight.css");
        $('#tabCss').attr("href","css/tabHighlight.css");
        $('#performanceCss').attr("href","css/PerformanceHightlight.css");
        $('#mainBusinessCss').attr("href","css/mainBusinessHightlight.css");
        $('#powerPlantMapCss').attr("href","css/powerPlantMapHighlight.css");
        $('#internetPowerVolumeCss').attr("href","css/internetPowerVolumeHighlight.css");
        $('#pureProfitCss').attr("href","css/pureProfitHighlight.css");
        $('#averPersonProfitCss').attr("href","css/averPersonProfitHighlight.css");
        $('.userSkin').html('高亮模式');
    } else {
        $('#homeCss').attr("href","css/home.css");
        $('#helpCss').attr("href","css/help.css");
        $('#bottomButCss').attr("href","css/bottom_button.css");
        $('#tabCss').attr("href","css/tab.css");
        $('#performanceCss').attr("href","css/Performance.css");
        $('#mainBusinessCss').attr("href","css/mainBusiness.css");
        $('#powerPlantMapCss').attr("href","css/powerPlantMap.css");
        $('#internetPowerVolumeCss').attr("href","css/internetPowerVolume.css");
        $('#pureProfitCss').attr("href","css/pureProfit.css");
        $('#averPersonProfitCss').attr("href","css/averPersonProfit.css");
        $('.userSkin').html('夜间模式');
    }
    skinNameAlter = $('.userSkin').html();
    // alert('您将切换到'+skinNameAlter);
}
// 个人设定，用户名，肤色JS CSS 控制
function userHoverOn(classNameId) {
  // 登录用户
  if (classNameId != 'userNameCon') {
      $('.userNameCon').css({
        "display":"none"
      });
  } 
  // 设置
  if (classNameId != 'userSettingCon') {
      $('.userSettingCon').css({
        "display":"none"
      });
  } 
  // 帮助
  if (classNameId != 'userHelpCon') {
      $('.userHelpCon').css({
        "display":"none"
      });
  } 
  // 换肤
  if (classNameId != 'userSkinCon') {
      $('.userSkinCon').css({
        "display":"none"
      });
  } 
  //鼠标悬浮
  $('.'+classNameId).css({
    "display":"inline"
  });
}
function userHoverOut(classNameId) {
//   //鼠标悬浮
//   $('.'+classNameId).css({
//     "display":"none"
//   });
}
// 设定头部跑马灯信息
function _loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal){
    $('.userName').html(usrid);
    // 最新消息
    var newMsg = '系统版本已有更新，详情请查看帮助文档！！！';
    if (newMsg != '') {
        $('.newMsgIdClass').html(newMsg);
        $('.newMsgIdClass').css('color','#C51616');
    }
    // CPI环比
    if (valueCPIhuanbi > 0) {
        $('.valueCPIhuanbiIDClass').html(valueCPIhuanbi+"%↑");
        if (skinName == '夜间模式') {
            $('.valueCPIhuanbiIDClass').css('color','green');
        } else {
            $('.valueCPIhuanbiIDClass').css('color','white');
        }
    } else {
        $('.valueCPIhuanbiIDClass').html(valueCPIhuanbi+"%↓");
        $('.valueCPIhuanbiIDClass').css('color','red');
    }
    // GDP增长率
    if (valueGDP > 0) {
        $('.valueGDPIDClass').html(valueGDP+"%↑");
        if (skinName == '夜间模式') {
            $('.valueGDPIDClass').css('color','green');
        } else {
            $('.valueGDPIDClass').css('color','white');
        }
    } else {
        $('.valueGDPIDClass').html(valueGDP+"%↓");
        $('.valueGDPIDClass').css('color','red');
    }
    // CPI同比
    if (valueCPItongbi > 0) {
        $('.valueCPItongbiIDClass').html(valueCPItongbi+"%↑");
        if (skinName == '夜间模式') {
            $('.valueCPItongbiIDClass').css('color','green');
        } else {
            $('.valueCPItongbiIDClass').css('color','white');
        }
    } else {
        $('.valueCPItongbiIDClass').html(valueCPItongbi+"%↓");
        $('.valueCPItongbiIDClass').css('color','red');
    }
    // PPI同比
    if (parseFloat(valuePPItongbi) > 0) {
        $('.valuePPItongbiIDClass').html(valuePPItongbi+"%↑");
        if (skinName == '夜间模式') {
            $('.valuePPItongbiIDClass').css('color','green');
        } else {
            $('.valuePPItongbiIDClass').css('color','white');
        }
    } else {
        $('.valuePPItongbiIDClass').html(valuePPItongbi+"%↓");
        $('.valuePPItongbiIDClass').css('color','red');
    }
    // 制造业-同比 PMI
    if (valuePMIproduce > 0) {
        $('.valuePMIproduceIDClass').html(valuePMIproduce+"%↑");
        if (skinName == '夜间模式') {
            $('.valuePMIproduceIDClass').css('color','green');
        } else {
            $('.valuePMIproduceIDClass').css('color','white');
        }
    } else {
        $('.valuePMIproduceIDClass').html(valuePMIproduce+"%↓");
        $('.valuePMIproduceIDClass').css('color','red');
    }
    // 非制造业-同比
    if (valuePMInonProduce > 0) {
        $('.valuePMInonProduceIDClass').html(valuePMInonProduce+"%↑");
        if (skinName == '夜间模式') {
            $('.valuePMInonProduceIDClass').css('color','green');
        } else {
            $('.valuePMInonProduceIDClass').css('color','white');
        }
    } else {
        $('.valuePMInonProduceIDClass').html(valuePMInonProduce+"%↓");
        $('.valuePMInonProduceIDClass').css('color','red');
    }
    // GDP总值
    valueGDPTotal = (valueGDPTotal/10000).toFixed(1);
    if (valueGDPTotal > 0) {
        $('#GDPSum').html(valueGDPTotal);
        if (skinName == '夜间模式') {
            $('#GDPSum').css('color','green');
        } else {
            $('#GDPSum').css('color','white');
        }
    } else {
        $('#GDPSum').html(valueGDPTotal);
        $('#GDPSum').css('color','red');
    }
    var tempDate = new Date();
    var thisYear = tempDate.getFullYear();
    var thisMonth = tempDate.getMonth()+1;
    var thisDate = tempDate.getDate();
    var nowDate = thisYear + '年' + thisMonth + '月' + thisDate + '日';
    // 今天的日期
    $('.nowDateClass').html(nowDate);
}
//
function returnDefualtPowerPlant(areaName){
    if (areaName == 'zhejiang') {
    	var zhejiang_dataStr = '[';
        zhejiang_dataStr += '{"name":"浙能电力股份有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙能电力股份本部","inputPlanValue":""},{"name":"萧山发电厂","inputPlanValue":""},{"name":"台州发电厂","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能绍兴滨海热电有限责任公司","inputPlanValue":""},{"name":"浙江浙能钱清发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能绍兴滨海热力有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能嘉兴发电有限公司","inputPlanValue":""},{"name":"浙江浙能兰溪发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能台州第二发电有限责任公司","inputPlanValue":""},';	  
        zhejiang_dataStr += '{"name":"浙江浙能嘉华发电有限公司","inputPlanValue":""},{"name":"浙江浙能长兴发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海发电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海联合发电有限公司","inputPlanValue":""},{"name":"浙江浙能北仑发电有限公司","inputPlanValue":""},{"name":"浙江浙能镇海天然气发电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海燃气热电有限责任公司","inputPlanValue":""},{"name":"浙江浙能温州发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能乐清发电有限责任公司","inputPlanValue":""},{"name":"温州燃机发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江温州特鲁莱发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能金华燃机发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能中煤舟山煤电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能常山天然气发电有限公司","inputPlanValue":""}'
        zhejiang_dataStr += ']';
        return zhejiang_dataStr;
    }
    if (areaName == 'zhejiangAddNew') {
    	var zhejiang_dataStr = '[';
        zhejiang_dataStr += '{"name":"浙能电力股份有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙能电力股份本部","inputPlanValue":""},{"name":"萧山发电厂","inputPlanValue":""},{"name":"台州发电厂","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能绍兴滨海热电有限责任公司","inputPlanValue":""},{"name":"浙江浙能钱清发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能绍兴滨海热力有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能嘉兴发电有限公司","inputPlanValue":""},{"name":"浙江浙能兰溪发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能台州第二发电有限责任公司","inputPlanValue":""},';	  
        zhejiang_dataStr += '{"name":"浙江浙能嘉华发电有限公司","inputPlanValue":""},{"name":"浙江浙能长兴发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海发电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海联合发电有限公司","inputPlanValue":""},{"name":"浙江浙能北仑发电有限公司","inputPlanValue":""},{"name":"浙江浙能镇海天然气发电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海燃气热电有限责任公司","inputPlanValue":""},{"name":"浙江浙能温州发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能乐清发电有限责任公司","inputPlanValue":""},{"name":"温州燃机发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江温州特鲁莱发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能金华燃机发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能中煤舟山煤电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能常山天然气发电有限公司","inputPlanValue":""},'
        
        zhejiang_dataStr += '{"name":"浙江华隆电力工程有限公司","inputPlanValue":""},'
        zhejiang_dataStr += '{"name":"台州市海天电力工程有限公司","inputPlanValue":""},'
        zhejiang_dataStr += '{"name":"浙江嘉源电力工程有限公司","inputPlanValue":""},'
        zhejiang_dataStr += '{"name":"宁波发电工程有限公司","inputPlanValue":""},'
        zhejiang_dataStr += '{"name":"乐清市瓯越电力工程检修有限公司","inputPlanValue":""}'
        zhejiang_dataStr += ']';
        return zhejiang_dataStr;
    }
    if (areaName == 'zhejiangAddNew002') {
    	var zhejiang_dataStr = '[';
        zhejiang_dataStr += '{"name":"浙能电力股份有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙能电力股份本部","inputPlanValue":""},{"name":"萧山发电厂","inputPlanValue":""},{"name":"台州发电厂","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能绍兴滨海热电有限责任公司","inputPlanValue":""},{"name":"浙江浙能钱清发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能绍兴滨海热力有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能嘉兴发电有限公司","inputPlanValue":""},{"name":"浙江浙能兰溪发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能台州第二发电有限责任公司","inputPlanValue":""},';	  
        zhejiang_dataStr += '{"name":"浙江浙能嘉华发电有限公司","inputPlanValue":""},{"name":"浙江浙能长兴发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海发电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海联合发电有限公司","inputPlanValue":""},{"name":"浙江浙能北仑发电有限公司","inputPlanValue":""},{"name":"浙江浙能镇海天然气发电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能镇海燃气热电有限责任公司","inputPlanValue":""},{"name":"浙江浙能温州发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能乐清发电有限责任公司","inputPlanValue":""},{"name":"温州燃机发电有限公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江温州特鲁莱发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能金华燃机发电有限责任公司","inputPlanValue":""},{"name":"浙江浙能中煤舟山煤电有限责任公司","inputPlanValue":""},';
        zhejiang_dataStr += '{"name":"浙江浙能常山天然气发电有限公司","inputPlanValue":""},'
        
        zhejiang_dataStr += '{"name":"浙江浙能运输贸易有限公司","inputPlanValue":""}'
        zhejiang_dataStr += ']';
        return zhejiang_dataStr;
    }
}