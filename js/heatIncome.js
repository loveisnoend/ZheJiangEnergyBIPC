var btnID, divID, oldbtn, olddivID;
function internetbackHeat() {
    document.getElementById('internetDetailHeat').style.display = "none";
    document.getElementById('rlcb_detailHeat').style.display = "";
}
function priceDetailAnotherHeat(detailId) {
	document.getElementById("rlcb_detailHeat").style.display = "none";
	document.getElementById("internetDetailHeat").style.display = "";
	var priceChartId = "priceDetailDivHeat";
	var priceChartName = '';
	if (detailId == 'detail001') {
	    priceChartName = '自产蒸汽';
	} else if(detailId == 'detail002'){
	    priceChartName = '外购蒸汽';   
	} else if(detailId == 'detail003'){
	    priceChartName = '热水';   
	} else if(detailId == 'detail004'){
	    priceChartName = '初装费';   
	} else if(detailId == 'detail005'){
	    priceChartName = '供热收入';   
	}
	
	// 当前电厂
    var powerPlantName = document.getElementById('powerPlantMainDetailTitleHeat').innerHTML;
    if (powerPlantName == '台二电厂') {
        powerPlantName = '台二发电';
    }
    if (powerPlantName == '兰溪电厂') {
        powerPlantName = '兰溪发电';
    }
    if (powerPlantName == '凤台电厂') {
        powerPlantName = '凤台发电';
    }
    if (powerPlantName == '浙能电力股份有限公司') {
			powerPlantName = '浙能电力';
		}
	if (powerPlantName == '浙能电力') {
	   heatIncome.getController().loadBase_SupplyHeatIncome(priceChartId, priceChartName);
	} else {
	   heatIncome.getController().loadEachPlant_SupplyHeatIncome(priceChartId, priceChartName, powerPlantName);
	}
}