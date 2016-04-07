var btnID, divID, oldbtn, olddivID;
function internetbackLabour() {
    document.getElementById('internetDetailLabour').style.display = "none";
    document.getElementById('rlcb_detailLabour').style.display = "";
}
function priceDetailAnotherLabour(detailId) {
	document.getElementById("rlcb_detailLabour").style.display = "none";
	document.getElementById("internetDetailLabour").style.display = "";
	var priceChartId = "priceDetailDivLabour";
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
    var powerPlantName = document.getElementById('powerPlantMainDetailTitleLabour').innerHTML;
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
	   labourIncome.getController().loadBase_SupplyLabourIncome(priceChartId, priceChartName);
	} else {
	   labourIncome.getController().loadEachPlant_SupplyLabourIncome(priceChartId, priceChartName, powerPlantName);
	}
}