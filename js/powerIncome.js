var btnID, divID, oldbtn, olddivID;

function internetbackPower() {
	document.getElementById('internetDetailPower').style.display = "none";
	document.getElementById('rlcb_detailPower').style.display = "";
}

function priceDetailAnotherPower(detailId) {
	document.getElementById("rlcb_detailPower").style.display = "none";
	document.getElementById("internetDetailPower").style.display = "";
	var priceChartId = "priceDetailDivPower";
	var priceChartName = '';
	if (detailId == 'detail001') {
		priceChartName = '售电收入';
	} else if (detailId == 'detail002') {
		priceChartName = '补贴收入';
	} else if (detailId == 'detail003') {
		priceChartName = '辅助服务收入';
	} else if (detailId == 'detail004') {
		priceChartName = '其他收入';
	} else if (detailId == 'detail005') {
		priceChartName = '发电收入';
	}

	// 当前电厂
	var powerPlantName = document.getElementById('powerPlantMainDetailTitlePower').innerHTML;
	if (powerPlantName == '台二电厂') {
		powerPlantName = '台二发电';
	}
	if (powerPlantName == '兰溪电厂') {
		powerPlantName = '兰溪发电';
	}
	if (powerPlantName == '凤台电厂') {
		powerPlantName = '凤台发电';
	}
	if (powerPlantName == '电力股份公司') {
		powerPlantName = '集团';
	}
	if (powerPlantName == '集团') {

		if (priceChartName == '售电收入') {
			powerIncome.getController().loadBase_SalesIncome(priceChartId, priceChartName);
		}
		if (priceChartName == '补贴收入') {
			powerIncome.getController().loadBase_SubsidyIncome(priceChartId, priceChartName);
		}
		if (priceChartName == '辅助服务收入') {
			powerIncome.getController().loadBase_SubServiceIncome(priceChartId, priceChartName);
		}
		if (priceChartName == '发电收入') {
			powerIncome.getController().loadBase_PowerOutputIncome(priceChartId, priceChartName);
		}
	} else {
		if (priceChartName == '售电收入') {
			powerIncome.getController().loadEachPlant_SalesIncome(priceChartId, priceChartName, powerPlantName);
		}
		if (priceChartName == '补贴收入') {
			powerIncome.getController().loadEachPlant_SubsidyIncome(priceChartId, priceChartName, powerPlantName);
		}
		if (priceChartName == '辅助服务收入') {
			powerIncome.getController().loadEachPlant_SubServiceIncome(priceChartId, priceChartName, powerPlantName);
		}
		if (priceChartName == '发电收入') {
			powerIncome.getController().loadEachPlant_PowerOutputIncome(priceChartId, priceChartName, powerPlantName);
		}
	}
}