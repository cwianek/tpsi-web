"use strict";

const baseUrl = 'http://localhost:9998/';

var DataManager = function () {
    var self = this;
};

DataManager.prototype.fetch = function (name) {
    return $.ajax({
        url: baseUrl + name,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            return data;
        }
    })
};

DataManager.prototype.add = function (name, data) {
    return $.ajax({
        url: baseUrl + name,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: data,
        success: function (data) {
            return data;
        }
    })
};

DataManager.prototype.delete = function (name, index) {
    return $.ajax({
        url: baseUrl + name + '/' + index,
        type: "DELETE",
        dataType: "json",
        success: function (data) {
            return data;
        }
    })
};

DataManager.prototype.fetchStudents = function () {
    return this.fetch("students");
};

DataManager.prototype.fetchCourses = function () {
    return this.fetch("subjects");
};

function AppViewModel() {
    var self = this;
    self.students = ko.mapping.fromJS([]);
    self.courses = ko.mapping.fromJS([]);

    self.addStudent = function () {
        self.students.push({index: null, name: "", surname: "", birthdate: ""})
    };

    self.editStudent = function (data) {
        dataManager.add("students", JSON.stringify({
            name: data.name(),
            surname: data.surname(),
            birthdate: data.birthdate()
        }));
    };

    self.deleteStudent = function (data) {
        dataManager.delete("students", data.index())
    };

    self.addCourse = function () {
        self.courses.push({name: "", lecturer: ""})
    };

    self.editCourse = function (data) {
        console.log(data);
        dataManager.add("subjects", JSON.stringify({
            name: data.name(),
            lecturer: data.lecturer()
        }));
    };

    self.deleteCourse = function (data) {
        dataManager.delete("subjects",data.id())
    };
}

var appViewModel = new AppViewModel();
var dataManager = new DataManager();
dataManager.fetchStudents().then(function (data) {
    ko.mapping.fromJS(data, appViewModel.students);
});
dataManager.fetchCourses().then(function (data) {
    ko.mapping.fromJS(data, appViewModel.courses);
});

$(function () {
    ko.applyBindings(appViewModel);
});