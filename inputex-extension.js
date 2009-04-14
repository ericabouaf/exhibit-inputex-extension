/*==================================================
 *  Simile Exhibit inputEx Extension
 *    http://javascript.neyric.com/inputex
 *==================================================
 */

Exhibit.inputExExtension = {
    params: {
        bundle:     false
    } 
};

(function() {
    var javascriptFiles = [
        "editor.js"
    ];
    var cssFiles = [
        "editor.css"
    ];
        
    var url = SimileAjax.findScript(document, "/inputex-extension.js");
    if (url == null) {
        SimileAjax.Debug.exception(new Error("Failed to derive URL prefix for Simile Exhibit Map Extension code files"));
        return;
    }
    Exhibit.inputExExtension.urlPrefix = url.substr(0, url.indexOf("inputex-extension.js"));
    var paramTypes = { bundle: Boolean };
    SimileAjax.parseURLParameters(url, Exhibit.inputExExtension.params, paramTypes);
        
        
    var scriptURLs = [];
    var cssURLs = [];
            
    scriptURLs.push("/inputex/trunk/lib/yui/yahoo-dom-event/yahoo-dom-event.js");
    scriptURLs.push("/inputex/trunk/lib/yui/container/container-min.js");
    scriptURLs.push("/inputex/trunk/lib/yui/element/element-beta-min.js");
    scriptURLs.push("/inputex/trunk/lib/yui/button/button-min.js");
    scriptURLs.push("/inputex/trunk/lib/yui/animation/animation-min.js");
    scriptURLs.push("/inputex/trunk/lib/yui/calendar/calendar-min.js");
    scriptURLs.push("/inputex/trunk/js/inputex.js");
    scriptURLs.push("/inputex/trunk/js/Field.js");
    scriptURLs.push("/inputex/trunk/js/Group.js");
    scriptURLs.push("/inputex/trunk/js/Visus.js");
    scriptURLs.push("/inputex/trunk/js/fields/StringField.js");
    scriptURLs.push("/inputex/trunk/js/fields/SelectField.js");
    scriptURLs.push("/inputex/trunk/js/fields/EmailField.js");
    scriptURLs.push("/inputex/trunk/js/fields/UrlField.js");
    scriptURLs.push("/inputex/trunk/js/fields/ListField.js");
    scriptURLs.push("/inputex/trunk/js/fields/InPlaceEdit.js");
    scriptURLs.push("/inputex/trunk/js/fields/UrlField.js");
    scriptURLs.push("/inputex/trunk/js/fields/DateField.js");
    scriptURLs.push("/inputex/trunk/js/fields/DatePickerField.js");
    
    cssURLs.push("/inputex/trunk/lib/yui/reset/reset-min.css");
    cssURLs.push("/inputex/trunk/lib/yui/fonts/fonts-min.css");
    cssURLs.push("/inputex/trunk/lib/yui/grids/grids-min.css");
    cssURLs.push("/inputex/trunk/lib/yui/container/assets/container.css");
    cssURLs.push("/inputex/trunk/lib/yui/assets/skins/sam/skin.css");
    cssURLs.push("/inputex/trunk/css/inputEx.css");
       
    SimileAjax.prefixURLs(scriptURLs, Exhibit.inputExExtension.urlPrefix + "scripts/", javascriptFiles);
    SimileAjax.prefixURLs(cssURLs, Exhibit.inputExExtension.urlPrefix + "styles/", cssFiles);
    
    /*for (var i = 0; i < Exhibit.locales.length; i++) {
        scriptURLs.push(Exhibit.inputExExtension.urlPrefix + "locales/" + Exhibit.locales[i] + "/map-locale.js");
    };*/
    
    SimileAjax.includeJavascriptFiles(document, "", scriptURLs);
    SimileAjax.includeCssFiles(document, "", cssURLs);
})();
