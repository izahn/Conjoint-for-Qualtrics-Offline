Qualtrics.SurveyEngine.addOnload(function() {
  var random_result = sessionStorage.random_result.split(',');

  function fill_table(number) {

    var set1 = [];
    var set2 = [];

    var table_element = document.getElementById("conjoint_table_" + number);
    
    var label = "Rd_" + (number) + "_";
    
    // Rows
    for (var i = 0;i<random_result.length;i++) {
      var row_element = document.createElement("TR");
      
      // Row cells
      for (var j=0;j<3;j++) {
        var data_element = document.createElement("TD");
        
        var random_value = random_result[i];
        
        if (j !== 0) {
          var random_values_array = [];
          for (var x = 0; x < values_array[random_value].length; x++) {
            random_values_array.push(x);
          }


          // If Christian exclude the first value of tribe. Note that this
          // depends on religion being the first category and tribe being the third.
          if (i == 2){
            if (j == 1) {
              if (set1.indexOf("Christian") != -1) {
                random_values_array = [];
                for (x = 1; x < values_array[random_value].length; x++) {
                  random_values_array.push(x);
                }
              }
            }
            if (j == 2) {
              if (set2.indexOf("Christian") != -1) {
				random_values_array = [];
                for (x = 1; x < values_array[random_value].length; x++) {
                  random_values_array.push(x);
                }
              }
            }
          }

          var random_index = shuffle(random_values_array);
          var value = values_array[random_value];
          var text = document.createTextNode(value[random_index[0]]);

          // Keep track of previous values for A (set1) and B (set2) so we can exclude choices
          // depending on previous selections.
		      if (j === 1) {
            set1.push(value[random_index[0]]);
          }
		      if (j === 2) {
            set2.push(value[random_index[0]]);
          }
          // If you want to use different choice names in your embedded data, change the values below
          if (j === 1) {
            var choice = "A";
          } else {
            var choice = "B";
          }
          var new_label = label + choice + "_" + attribute_array[random_value];
          Qualtrics.SurveyEngine.setEmbeddedData(new_label, value[random_index[0]]);
        } else {
          var text = document.createElement("B");
          var bolded_text = document.createTextNode(attribute_array[random_value]);

          text.appendChild(bolded_text);
        }
        
        data_element.appendChild(text); 
        row_element.appendChild(data_element);
      }

      table_element.appendChild(row_element);   
    }
    
  }

  // Replace the round number with round number you are on
  fill_table(1);
});

