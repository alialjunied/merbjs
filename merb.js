/**
 * Created by alaay on 10/11/13.
 */
var Merb = function() {};

//pass in the root server url api call for just one movie.
//https://cs3213.herokuapp.com/movies/
var Model = Merb.Model = function(modelUrl) {
    /* Model Properties */
    this.url = modelUrl;
    this.modelObj = {};

    /* Model Methods */
    this.get = function(modelParams){
        //ajax default async true
        $.ajax({
            url: this.url+"/"+ modelParams.id,
            type: 'get',
            context: this,
            error: function(jqxhr, textStatus, error){
                console.log("error: " + error);
            },
            success: function(data, textStatus, jqxhr){
                this.modelObj = data;
                modelParams.success(data); //run callback method
            }
        });
    };
    // Save a model when:
    // Create - https://cs3213.herokuapp.com/movies.json
    // newModelParams would be data from the Form in the HTML
    this.save = function(newModelParams){
        var urlToSaveTo = newModelParams.urlForSaving;
        // success is typically a function defined by the user which we want to run
        // at the end of saving
        var callbackFunc = newModelParams.success;

        if (urlToSaveTo == null){ //if user did not define, use model's url
            urlToSaveTo  = this.url;
        }

        if (this.obj.formData instanceof FormData){
            $.ajax({
                type: 'post',
                url: urlToSaveTo,
                data: this.obj.formData,
                contentType: false,
                processData: false,
                error: function(jqxhr, textStatus, error){
                    console.log("error: " + error);
                },
                success: function(data, textStatus, jqxhr){
                    this.modelObj = data;
                    modelParams.success(data); //run callback method
                }
            });
        }
        else {
            //do ajax POST call with normal key-value pairs of the new data
            $.ajax({
                type: 'post',
                url: urlToSaveTo,
                async: false,
                context: this,
                data: this.modelObj,
                error: function(jqxhr, textStatus, error){
                    console.log("error: " + error);
                },
                success: function(data, textStatus, jqxhr){
                    this.modelObj = data;
                    modelParams.success(data); //run callback method
                }
            });
        }
    }; //end of this.save = func...

    // Use when Updating existing movie details
    // About the same as the save function
    // except we need to define the particular movie id
    this.sync = function (newModelParams){
        var urlToSendUpdate = newModelParams.urlForUpdating;

    };
    this.delete = function(modelToDeleteParams){
        var urlToDeleteFrom = modelToDeleteParams.url;
        var serverModelId = modelToDeleteParams.id;
        var callbackFunc = modelToDeleteParams.success;

        if (typeof urlToDeleteFrom != "undefined"){
            urlToDeleteFrom = this.url;
        }

        if (typeof serverModelId != "undefined"){
            urlToDeleteFrom = urlToDeleteFrom + "/" + serverModelId;
        }
        else {
            urlToDeleteFrom = urlToDeleteFrom + "/" + this.modelObj.id;
        }
        if (typeof this.modelObj.id == "undefined"){
            this.modelObj = {};
        }
        else {
            $.ajax({
                type: 'delete',
                url: urlToDeleteFrom,
                context: this,
                data: this.modelObj,
                error: function(jqxhr, textStatus, error){
                    console.log("error: " + error);
                },
                success: function(data, textStatus, jqxhr){
                    this.modelObj = data;
                    modelParams.success(data); //run callback method
                }
            });
        }
    }//end of this.delete = func...

} // end of var Model = Merb.Model ...

var Collection = Merb.Collection = function (modelForCollection){
    this.model = function(){};
    this.modelList = [];
    this.get = function(collectionParams){
    };
}

//View takes a HTML Template object to work
var View = Merb.View = function(options){
    this.model = null;
    this.template = options["el"];
    this.events = options["events"];
    _.extend(this,options);

    this.delegateEvents(this.events);
    this.bindModel = function(model){
        this.model = model;
    },
    this.render = function(){
        var template = _.template(this.template.html(), {model: this.model});
        return template;
    }

};
var delegateEventSplitter = /^(\S+)\s*(.*)$/;
_.extend(Merb.View.prototype, {
    initialize: function(){},
    delegateEvents: function(events){
        for(var key in events){
            var match = key.match(delegateEventSplitter);
            var eventName = match[1], selector = match[2];
            var method = events[key];
            $(selector).bind(eventName, this[method]);
        }
    },
    print: function(){
        var events = _.result(this, 'events');
        for(var key in events){
            var method = events[key];
            console.log(key + " : " + method + "\n");
        }  
    }
});



