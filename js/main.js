"use strict";

var DataManager = function(){
    this.data = ko.observableArray();
    this.baseUrl = 'http://localhost:9998/';
};

DataManager.prototype.fetchStudents = function () {
    var mapping={
        create: function (options) {
            return
        }
    };

    return $.ajax({
        url: this.baseUrl + "students",
        type: "GET",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            var mapping = ko.mapping.fromJSON(data);
            return mapping;
        }
    })
};

function AppViewModel() {
    var self = this;

    var dataManager = new DataManager();
    var students = dataManager.fetchStudents().then(function (data) {
        self.students = data;
        ko.applyBindings(self);
    });
}

var appViewModel = new AppViewModel();

$(function () {
    ko.applyBindings(appViewModel);
});

