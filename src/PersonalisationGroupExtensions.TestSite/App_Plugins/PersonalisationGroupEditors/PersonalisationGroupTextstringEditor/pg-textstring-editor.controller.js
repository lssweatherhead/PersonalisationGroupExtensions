(function () {
  'use strict';

  function PgTextstringEditorController($scope) {

    // STATE
    $scope.showPersonalisationOpts = false;
    $scope.textstring = "";
    $scope.pgOptions = []; // object[{variants[{segment, segmentDisplay}], content}]
    $scope.variantOptionsToCreateContentFor = []; // object[{segment, segmentDisplay}]
    $scope.variantsInProgress = []; // string["segmentAlias"]

    $scope.options = [
      {
        "group": "Self-segmented users",
        "options": [
          { name: 'Cafe', value: 'cafe' },
          { name: 'Pub', value: 'pub' },
          { name: 'Restaurant', value: 'restaurant' }
        ]
      },
      {
        "group": "User journey segments",
        "options": [
          { name: 'Pepsi enthusiast', value: 'pepsi' },
          { name: 'Customer reward', value: 'reward' },
          { name: 'Support seeking', value: 'support' }
        ]
      }];
    $scope.disabledOptions = [];

    // MODEL
    $scope.model.value = {
      textstring: $scope.textstring
    }

    // HEADER FUNCS
    $scope.togglePersonalisationView = function () {
      $scope.showPersonalisationOpts = !$scope.showPersonalisationOpts;
    }

    $scope.selectSegment = function (pg) {
      if (!pg) return;

      for (var j = 0; j < $scope.options.length; j++) {
        var selectItem = $scope.options[j].options.find(val => val.value === pg);
        if (selectItem) {
          $scope.variantOptionsToCreateContentFor.push({
            segment: pg,
            segmentDisplay: `${$scope.options[j].group} | ${selectItem.name}`
          });
        }
      }

      $scope.variantsInProgress.push(pg);
      $scope.pg = "";
      $scope.recalcSegmentOption();
    }

    $scope.removeSegment = function (index, pg) {
      $scope.variantOptionsToCreateContentFor.splice(index, 1);

      $scope.findAndRemoveVariantInProgress(pg);
      $scope.recalcSegmentOption();
    }

    $scope.addContentForVariants = function () {
      if (!$scope.variantOptionsToCreateContentFor || $scope.variantOptionsToCreateContentFor.length === 0) return;

      $scope.variantOptionsToCreateContentFor.sort($scope.compareSegmentNames);
      $scope.pgOptions.push({
        variants: $scope.variantOptionsToCreateContentFor,
        text: ""
      });

      $scope.variantOptionsToCreateContentFor = [];
    }

    // TABLE FUNCS
    $scope.removeOption = function (index, option) {
      $scope.pgOptions.splice(index, 1);

      for (var i = 0; i < $scope.variantsInProgress.length; i++) {
        for (var j = 0; j < option.variants.length; j++) {
          if ($scope.variantsInProgress[i] === option.variants[j].segment) {
            $scope.variantsInProgress.splice(i, 1);
          }
        }
      }

      $scope.recalcSegmentOption();
    }

    $scope.removeVariantOption = function (optionIndex, variantIndex, segment) {
      // remove variant from pgOption object
      $scope.pgOptions[optionIndex].variants.splice(variantIndex, 1);

      // add dd option back in
      $scope.findAndRemoveVariantInProgress(segment);
      $scope.recalcSegmentOption();
    }

    // DROPDOWN FUNCS
    $scope.findAndRemoveVariantInProgress = function (variantName) {
      for (var i = 0; i < $scope.variantsInProgress.length; i++) {
        if ($scope.variantsInProgress[i] === variantName) {
          $scope.variantsInProgress.splice(i, 1);
        }
      }
    }

    $scope.recalcSegmentOption = function () {
      $scope.disabledOptions = [];

      for (var i = 0; i < $scope.variantsInProgress.length; i++) {
        for (var j = 0; j < $scope.options.length; j++) {
          var selectItem = $scope.options[j].options.find(val => val.value === $scope.variantsInProgress[i]);
          if (selectItem) {
            $scope.disabledOptions.push(
              {"group": $scope.options[j].group, "value": selectItem.value}
            );
          }
        }    
      }
    }

    $scope.isDisabled = function (group, value) {
      if (!$scope.disabledOptions || $scope.disabledOptions.length === 0) {
        return false;
      }
      for (var i = 0; i < $scope.disabledOptions.length; i++){
        var disabledOpt = $scope.disabledOptions[i];
        if (disabledOpt.group === group && disabledOpt.value === value) {
          return true
        }
      }
      return false;
    }

    $scope.hasMoreOptions = function () {
      if (!$scope.disabledOptions) return true;
      var availableOpts = 0;
      for (var i = 0; i < $scope.options.length; i++) {
        availableOpts += $scope.options[i].options.length;
      };
      return availableOpts > $scope.disabledOptions.length;
    }

    // MODAL FUNCS
    $scope.modalIsOpen = false;
    $scope.pgModal = "";

    $scope.modalVariants = []; // object[{segment, segmentDisplay}]
    $scope.modalOptionIndexToAddTo = -1;

    $scope.addMoreVariants = function(optionIndex) {
      $scope.modalOptionIndexToAddTo = optionIndex;
      $scope.modalIsOpen = true;
    }

    $scope.closeModal = function() {
      $scope.modalOptionIndexToAddTo = -1;
      if ($scope.modalVariants && $scope.modalVariants.length > 0) {
        for (var i = 0; i < $scope.modalVariants.length; i++) {
          $scope.findAndRemoveVariantInProgress($scope.modalVariants[i].segment);
        }
        $scope.modalVariants = [];
      }
      $scope.modalIsOpen = false;
    }

    $scope.selectSegmentInModal = function(pg) {
      if (!pg) return;

      for (var j = 0; j < $scope.options.length; j++) {
        var selectItem = $scope.options[j].options.find(val => val.value === pg);
        if (selectItem) {
          $scope.modalVariants.push({
            segment: pg,
            segmentDisplay: `${$scope.options[j].group} | ${selectItem.name}`
          });
        }
      }

      $scope.pgModal = "";
      $scope.variantsInProgress.push(pg);
      $scope.recalcSegmentOption();
    }

    $scope.addModalVariants = function() {
      if ($scope.modalOptionIndexToAddTo === -1 || $scope.modalVariants.length === 0) return $scope.closeModal();

      var selectedOpt = $scope.pgOptions[$scope.modalOptionIndexToAddTo];
      if (!selectedOpt) return $scope.closeModal();

      $scope.pgOptions[$scope.modalOptionIndexToAddTo].variants = $scope.pgOptions[$scope.modalOptionIndexToAddTo].variants.concat($scope.modalVariants);
      $scope.pgOptions[$scope.modalOptionIndexToAddTo].variants.sort($scope.compareSegmentNames);
      $scope.modalVariants = [];
      $scope.closeModal();
    }

    $scope.removeModalSegment = function(index, pg) {
      $scope.modalVariants.splice(index, 1);
  
      $scope.findAndRemoveVariantInProgress(pg);
      $scope.recalcSegmentOption();
    }

    $scope.compareSegmentNames = function (v1, v2) {
      if (v1.segmentDisplay > v2.segmentDisplay) return 1;
      if (v1.segmentDisplay < v2.segmentDisplay) return -1;
      if (v1.segment > v2.segment) return 1;
      if (v1.segment < v2.segment) return -1;
      return 0;
    }

  }

  angular.module("umbraco").controller("PgTextstringEditorController", PgTextstringEditorController);

})();
