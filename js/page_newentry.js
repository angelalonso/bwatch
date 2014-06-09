$(function() {

	load_newentry();
       
	$( "#select-choice-newentry" ).on ({
        click: function() {
            load_newentry();
        }
    }); 
		
    $( "#save-button" ).on ({
        click: function() {
			newentry_type = document.getElementById('select-choice-newentry').value;
			var time_in = DateGUItoCAL(document.getElementById("slider-day").value,document.getElementById("slider-month").value,document.getElementById("slider-year").value,document.getElementById("slider-hour").value,document.getElementById("slider-mins").value);
			start_date_in = time_in[0]; 
			start_time_in = time_in[1];
			end_date_in = start_date_in;
			end_time_in = "12:00:00 AM";
			if (newentry_type == 'pill_take') {
				subject_in = "Sintrom Amount";
				descr_in = "Sintrom Amount: " + document.getElementById('slider-amount').value;
			} else {
				subject_in = "Sintrom Test";
				descr_in = "Blood Level: " + document.getElementById('slider-level').value;
			}
			
			result = '{"Subject": "' + subject_in + '", "Start Date": "' + start_date_in + '", "Start Time": "' + start_time_in + '", "End Date": "' + end_date_in + '", "End Time": "' + end_time_in + '", "All Day Event": "False", "Description": "' + descr_in + '", "Location": "", "Private": "False"}'
			// key is data_nr (data_4)
			// value is "{"Subject": "Sintrom Test", "Start Date": "05/14/12", "Start Time": "11:15:00 AM", "End Date": "05/14/12", "End Time": "12:00:00 AM", "All Day Event": "False", "Description": "Blood Level: 3.5", "Location": "", "Private": "False"} "
            alert(result);
			newEntry2storage(result);
        }
    }); 
    
    $( "#cancel-button" ).on ({
        click: function() {
			load_newentry();
        }
    }); 

function load_newentry() {
	var aux = new Date();
    var todayArray = DateToArraydate(aux);
	document.getElementById('slider-day').value = todayArray[0];
	document.getElementById('slider-month').value = todayArray[1];
	document.getElementById('slider-year').value = todayArray[2];
    newentry_type = document.getElementById('select-choice-newentry').value;
    if (newentry_type == 'pill_take') {
		$( "#level-field" ).hide();
        $( "#amount-field" ).show();
		document.getElementById('slider-hour').value = 21;
		document.getElementById('slider-mins').value = 00;
		
    } else {
        $( "#level-field" ).show();
        $( "#amount-field" ).hide();
		document.getElementById('slider-hour').value = 11;
		document.getElementById('slider-mins').value = 15;
    }
}

});