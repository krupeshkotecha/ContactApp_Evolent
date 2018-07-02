(function() {
    "use strict";
    app.directive("contact", function(contactService) {
        var contactDirective = {};
        contactDirective.templateUrl = 'contactApp/contactTemplate.html';
        contactDirective.link = link;

        function link(scope, element, attrs) {
            scope.popoverFlag = false;
            var promise = contactService.fetchData();
            promise.then(function(contactData) {
                scope.contact = contactData.data;
            }, function(reason) {
                alert("Failed...!!! Please restart app and try again...!!!");
            });

            scope.editRecord = function(id) {
                scope.popoverFlag = !scope.popoverFlag;
                scope.editRecordFlag = true;
                scope.currentRecord = Object.assign({}, scope.contact.contactDetails[id]);
                scope.currentRecord.id = id;
            }

            scope.deleteRecord = function() {
                delete scope.contact.contactDetails[scope.currentRecord.id];
                scope.contact.contactDetails.splice(scope.currentRecord.id, 1);
                scope.popoverFlag = false;
                saveData();
            }

            scope.updateRecord = function(contactForm) {
                if (contactForm.$valid) {
                    scope.contact.contactDetails[scope.currentRecord.id].firstName = scope.currentRecord.firstName;
                    scope.contact.contactDetails[scope.currentRecord.id].lastName = scope.currentRecord.lastName;
                    scope.contact.contactDetails[scope.currentRecord.id].phone = scope.currentRecord.phone;
                    scope.contact.contactDetails[scope.currentRecord.id].email = scope.currentRecord.email;
                    scope.contact.contactDetails[scope.currentRecord.id].status = scope.currentRecord.status;
                    saveData();
                } else {
                    alert("please enter proper details in form")
                }
            }

            scope.addRecord = function(contactForm) {
                if (contactForm.$valid) {
                    scope.contact.contactDetails.push(Object.assign({}, scope.currentRecord));
                    saveData();
                } else {
                    alert("All filled are require and must have valid information")
                }
            }

            scope.popoverOuterDiv = function(e) {
                if (e.target.className == "popover") {
                    scope.editRecordFlag = false;
                    scope.popoverFlag = false;
                    scope.currentRecord = {};
                }
            }

            scope.addRecordForm = function(contactForm) {
                scope.currentRecord = {};
                contactForm.firstName.$touched = false;
                contactForm.lastName.$touched = false;
                contactForm.phone.$touched = false;
                contactForm.email.$touched = false;
                scope.currentRecord.status = "Active"
                scope.editRecordFlag = false;
                scope.popoverFlag = true;
            }

            function saveData() {
                contactService.saveData(scope.contact);
                scope.editRecordFlag = false;
                scope.popoverFlag = false;
                scope.currentRecord = {};
            }
        }
        return contactDirective;
    })
}());