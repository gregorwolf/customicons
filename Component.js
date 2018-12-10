sap.ui.define([
	"sap/ui/core/Component",
	"sap/m/Button",
	"sap/m/Bar",
	"sap/ui/core/IconPool",
	"sap/m/MessageToast"
], function (Component, Button, Bar, IconPool, MessageToast) {

	return Component.extend("com.sap.sapmentors.customicons.Component", {

		metadata: {
			"manifest": "json"
		},

		init: function () {
			var rendererPromise = this._getRenderer();

			// This is example code. Please replace with your implementation!

			/**
			 * Add item to the header
			 */
			rendererPromise.then(function (oRenderer) {
	        	var oCustomFontConfig = { 
	        		fontFamily: "fa-solid-900", 
	        		collectionName: "fasolid", 
	        		fontURI: "/sap/fiori/customicons/assets/" 
	        	};
	        	IconPool.registerFont(oCustomFontConfig);	

	        	var oSAPFontConfig = { 
	        		fontFamily: "fa-solid-900", 
	        		fontURI: "/sap/fiori/customicons/assets/" 
	        	};
	        	IconPool.registerFont(oSAPFontConfig);	

	        	var symbols = [
	         			{ name: "user",       id: "meAreaHeaderButton" },
	         			{ name: "angle-left", id: "backBtn"  },
	        			{ name: "home",       id: "homeBtn" },
	        			{ name: "apple-alt",  id: "openCatalogBtn" },
	        			{ name: "cog",        id: "userSettingsBtn" },
	        			{ name: "pen",        id: "ActionModeBtn" },
	        			{ name: "info",       id: "aboutBtn" }
				];
		        var sURI;
	        	for (var i in symbols) {
	        		// var fontFace = "Font Awesome 5 Free";
	        		if(symbols[i].name) {
		        		sURI = IconPool.getIconURI(symbols[i].name, oCustomFontConfig.collectionName);
		        		if(symbols[i].id) {
				        	var oButton = sap.ui.getCore().byId(symbols[i].id);
				        	if(oButton) {
				        		oButton.setIcon(sURI);
				        	} else  {
				        		jQuery.sap.log.info("Can't access " + symbols[i].id);
				        	}
		        		}
	        		}
	        	}
			});

		},


		/**
		 * Returns the shell renderer instance in a reliable way,
		 * i.e. independent from the initialization time of the plug-in.
		 * This means that the current renderer is returned immediately, if it
		 * is already created (plug-in is loaded after renderer creation) or it
		 * listens to the &quot;rendererCreated&quot; event (plug-in is loaded
		 * before the renderer is created).
		 *
		 *  @returns {object}
		 *      a jQuery promise, resolved with the renderer instance, or
		 *      rejected with an error message.
		 */
		_getRenderer: function () {
			var that = this,
				oDeferred = new jQuery.Deferred(),
				oRenderer;

			that._oShellContainer = jQuery.sap.getObject("sap.ushell.Container");
			if (!that._oShellContainer) {
				oDeferred.reject(
					"Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");
			} else {
				oRenderer = that._oShellContainer.getRenderer();
				if (oRenderer) {
					oDeferred.resolve(oRenderer);
				} else {
					// renderer not initialized yet, listen to rendererCreated event
					that._onRendererCreated = function (oEvent) {
						oRenderer = oEvent.getParameter("renderer");
						if (oRenderer) {
							oDeferred.resolve(oRenderer);
						} else {
							oDeferred.reject("Illegal state: shell renderer not available after recieving 'rendererLoaded' event.");
						}
					};
					that._oShellContainer.attachRendererCreatedEvent(that._onRendererCreated);
				}
			}
			return oDeferred.promise();
		}
	});
});