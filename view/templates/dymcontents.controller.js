sap.ui.controller("com.zhenergy.pcbi.view.templates.dymcontents", {

    onInsertMap:function(oDocument,identical){
          var plantLeftdiv = oDocument.getElementById("powerPlantLeft"+identical);
          console.log(plantLeftdiv);
          console.log(identical);
            plantLeftdiv.innerHTML="<div class='mapTop'>" + 
                "<div id='huaiNanMap"+identical+"' style='float:left;height:180px;width:150px;margin-left:100px;margin-top:10px;'></div>"+
                "<div id='zaoquanMap"+identical+"' style='float:left;height:210px;width:150px;margin-left:50px;margin-top:50px;'></div>" +
                "<div id='akesuMap"+identical+"' style='float:left;height:180px;width:150px;margin-left:50px;margin-top:50px;'></div>" + 
                "<b id='powerName"+identical+"' style='color:#FEFF02;display:none;size:24px;margin-top:110px;'></b>"+
                "</div>"+
                "<div class='mapBottom'>"+
                "<div id='powerPlantMap"+identical+"' class='powerPlantMap'></div>"+
                "</div>";
    }
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.pcbi.view.templates.dymcontents
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.pcbi.view.templates.dymcontents
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.pcbi.view.templates.dymcontents
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.pcbi.view.templates.dymcontents
*/
//	onExit: function() {
//
//	}

});