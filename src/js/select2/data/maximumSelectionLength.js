define([
  'jquery'
], function ($){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.bind =
    function (decorated, container, $container) {
      var self = this;

      decorated.call(this, container, $container);

      container.on('select', function () {
        self._checkIfMaximumSelected();
      });

      container.on('unselect', function () {
        self._checkIfMaximumSelected();
      });
  };

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;
      this._checkIfMaximumSelected(function () {
        decorated.call(self, params, callback);
      });
  };

  MaximumSelectionLength.prototype._checkIfMaximumSelected =
    function (_, successCallback) {
      var self = this;
      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        var resultsContainer = self.container.$results;
        if (self.maximumSelectionLength > 0 &&
          count < self.maximumSelectionLength){
          $.each(resultsContainer.children(), function(index, child) {
            if (!$(child).attr('aria-disabled')) {
                child.classList.remove('select2-results__option--disabled');
                child.classList.add('select2-results__option--selectable');
            }
          });
        }

        if (successCallback) {
          successCallback();
        }
      });
  };

  return MaximumSelectionLength;
});
