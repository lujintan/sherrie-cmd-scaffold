{{require name="<%= moduleName %>:widget/<%= widgetName %>/<%= widgetName %>.css"}}



{{script}}
    Rosetta.invoke('<%= widgetName %>', function(){
        var <%= widgetName %> = require('app:widget/<%= widgetName %>/<%= widgetName %>.js');
        new <%= widgetName %>(this.container);
    });
{{script}}