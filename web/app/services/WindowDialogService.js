ElokuvaApp.service('WindowDialogService', function ($window) {
    return {
        confirm: function (message) {
            return $window.confirm(message);
        }
    }
});