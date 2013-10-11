/**
 * Created by alaay on 10/11/13.
 */
var Merb = function() {};

//pass in the root server url api call for just one movie.
//https://cs3213.herokuapp.com/movies/
var Model = Merb.Model = function(modelUrl) {
    this.url = modelUrl;
    this.modelObj = {};
    this.get = function(modelParams){
        //do ajax call here to get the json data and set it to modelObj
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
            //do ajax POST call
        }
        else {
            //do ajax POST call with normal key-value pairs of the new data
        }

    };
    // Use when Updating existing movie details
    // About the same as the save function
    // except we need to define the particular movie id
    this.sync = function (newModelParams){
        var urlToSendUpdate = newModelParams.urlForUpdating;

    };
} // end of var Model = Merb.Model ...

var Collection = Merb.Collection = function (modelForCollection){
    this.model = function(){};
    this.modelList = [];
    this.get = function(collectionParams){
    };
}

//View takes a HTML Template object to work
var View = Merb.View = function(template){
    this.model = null;
}