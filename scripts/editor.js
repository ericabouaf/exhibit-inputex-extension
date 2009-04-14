Exhibit.Lens.prototype._constructDefaultUI = function(itemID, div, uiContext) {
    var database = uiContext.getDatabase();
    
    if (Exhibit.Lens._commonProperties == null) {
        Exhibit.Lens._commonProperties = database.getAllProperties();
    }
    var properties = Exhibit.Lens._commonProperties;
    
    var label = database.getObject(itemID, "label");
    label = label != null ? label : itemID;
    
    if (Exhibit.params.safe) {
        label = Exhibit.Formatter.encodeAngleBrackets(label);
    }
    
    var template = {
        elmt:       div,
        className:  "exhibit-lens",
        children: [
            {   tag:        "div",
                className:  "exhibit-lens-title",
                title:      label,
                children:   [ 
                    label + " (",
                    {   tag:        "a",
                        href:       Exhibit.Persistence.getItemLink(itemID),
                        target:     "_blank",
                        children:   [ Exhibit.l10n.itemLinkLabel ]
                    },
                    ")"
                ]
            },
            {   tag:        "div",
                className:  "exhibit-lens-body",
                children: [
                    {   tag:        "table",
                        className:  "exhibit-lens-properties",
                        field:      "propertiesTable"
                    }
                ]
            }
        ]
    };
    var dom = SimileAjax.DOM.createDOMFromTemplate(template);
    
    div.setAttribute("ex:itemID", itemID);
    //Exhibit.ToolboxWidget.createFromDOM(div, div, uiContext);
    
    var pairs = Exhibit.ViewPanel.getPropertyValuesPairs(itemID, properties, database);
    
    /**
     * Retrieve inputEx customization
     */
    var itemType = null;
    for (var j = 0; j < pairs.length; j++) {
        var pair = pairs[j];
        if(pair.propertyLabel == "type") {
           itemType = pair.values[0];
           break;
        }
    }
    var inputExCustomization = database._types[itemType]._custom.inputEx;
    
        
    for (j = 0; j < pairs.length; j++) {
        var pair = pairs[j];
        
        var tr = dom.propertiesTable.insertRow(j);
        tr.className = "exhibit-lens-property";
        
        var tdName = tr.insertCell(0);
        tdName.className = "exhibit-lens-property-name";
        tdName.innerHTML = pair.propertyLabel + ": ";
        
        var tdValues = tr.insertCell(1);
        tdValues.className = "exhibit-lens-property-values";
        
        if (pair.valueType == "item") {
            for (var m = 0; m < pair.values.length; m++) {
                if (m > 0) {
                    tdValues.appendChild(document.createTextNode(", "));
                }
                tdValues.appendChild(Exhibit.UI.makeItemSpan(pair.values[m], null, uiContext));
            }
        } else {
            for (var m = 0; m < pair.values.length; m++) {
                if (m > 0) {
                    tdValues.appendChild(document.createTextNode(", "));
                }
                
                // Replace Exhibit.UI.makeValueSpan by inputEx inPlaceEdit (except for type property)
                if(pair.propertyLabel == "type") {
                   tdValues.appendChild(Exhibit.UI.makeValueSpan(pair.values[m], pair.valueType));
                }
                else {
                   
                   var editorField = null;
                   
                   // Get the editor from the custom config
                   if(inputExCustomization && inputExCustomization.hasOwnProperty(pair.propertyLabel) ) {
                      editorField = inputExCustomization[pair.propertyLabel];
                   }
                   // Try to guess the editor from pair.valueType
                   else {
                       var inputExType = null;
                       if(pair.valueType == "text") {
                            inputExType = "string";
                       }
                       else if(pair.valueType == "url") {
                          inputExType = "url";
                       }
                       else {
                          console.log("Exhibit pair type not known: ",pair.valueType);
                          inputExType = "string";
                       }
                       
                       var editorField = {type:inputExType, inputParams: {} };
                   }

                    var f = new YAHOO.inputEx.InPlaceEdit({
                       parentEl: tdValues, 
                       editorField: editorField,  
                       animColors:{from:"#FFFF99" , to:"#DDDDFF"},
                       value: pair.values[m]
                    });

                    f._exhibit = {
                      itemID: itemID, 
                      properties: properties, 
                      database: database ,
                      propertyLabel: pair.propertyLabel
                    };

                    f.updatedEvt.subscribe(Exhibit.inputExExtension.onChange);
                }
                
            }
        }
    }
};

/**
 * Called when a value has been edited
 */
Exhibit.inputExExtension.onChange = function(e,params) {
   var newValue = params[0];
   var field = params[1];
   
   console.log(newValue);
   console.log(field._exhibit);
   
};



