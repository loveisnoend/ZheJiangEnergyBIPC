var btnID, divID, oldbtn, olddivID;
function internetPowerback() {
    document.getElementById('internetDetail').style.display = "none";
    document.getElementById('internetMain').style.display = "";
}
function priceDetailAnother(detailId) {
    
    var plantName = document.getElementById('powerPlantName').innerHTML;
    if (detailId == 'detail001' && plantName == '电力股份公司') {
    	document.getElementById("internetMain").style.display = "none";
    	document.getElementById("internetDetail").style.display = "";
    	var priceChartId = "priceDetailDiv";
    	var priceChartName = '';
    	if (detailId == 'detail001') {
    	    priceChartName = '平均上网电价';
    	} else if(detailId == 'detail002'){
    	    priceChartName = '合约电价';   
    	} else if(detailId == 'detail003'){
    	    priceChartName = '直供电价';   
    	} else if(detailId == 'detail004'){
    	    priceChartName = '代替电价';   
    	}
        internetPowerVolume.getController().loadPriceChartData(priceChartId, priceChartName);
    }
}