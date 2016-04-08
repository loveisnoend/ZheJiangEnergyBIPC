var btnID, divID, oldbtn, olddivID;
function othersCostback() {
    document.getElementById('othersCostDetail2').style.display = "none";
    document.getElementById('othersCost_detail').style.display = "";
}
function priceDetailAnotherCost(detailId) {

    var plantName = document.getElementById('powerPlantMainDetailTitleCost').innerHTML;
    if (plantName == '浙能电力股份有限公司') {
    	document.getElementById("othersCost_detail").style.display = "none";
    	document.getElementById("othersCostDetail2").style.display = "";
    	var priceChartId = "othersCostDetailDiv";
    	var priceChartName = '';
    	if (detailId == 'detail001') {
    	    priceChartName = '折旧费';
    	    othersCost.getController().loadOthersCostEachCostChartData(priceChartId, priceChartName);
    	} else if(detailId == 'detail002'){
    	    priceChartName = '人工成本';   
    	    othersCost.getController().loadOthersCostEachCostChartData(priceChartId, priceChartName);
    	} else if(detailId == 'detail003'){
    	    priceChartName = '修理费';   
    	    othersCost.getController().loadOthersCostEachCostChartData(priceChartId, priceChartName);
    	} else if(detailId == 'detail004'){
    	    priceChartName = '财务管理费';  
    	    othersCost.getController().loadOthersCostEachCostChartData(priceChartId, priceChartName);
    	} else if(detailId == 'detail005'){
    	    priceChartName = '其他营业成本';  
    	    othersCost.getController().loadOthersCostChartData(priceChartId, priceChartName);
    	} else if(detailId == 'detail006'){
    	    priceChartName = '日利润-其他成本';  
    	    othersCost.getController().loadOthersCostChartData(priceChartId, priceChartName);
    	}
    }
}