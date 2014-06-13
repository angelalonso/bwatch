$(function() {

    $("#entry").bind('pagebeforeshow',function(e){
        title = "Entry";
        LSPopup("#popupTest", "New Entry", title);
    }); 

    LSPopup("#popupTest", "New Entry", "NEW ENTRY");


    /* Popup elements */

    $( "#popup-entry-type" ).on ({
        change: function() {
            title = $("#popup-entry-title").text();
            LSPopup("#popupTest", "New Entry", title);
        }
    }); 

    $( "#popup-button-save" ).on ({
        click: function() {
            newentry_type = document.getElementById('popup-entry-type').value;
            var time_in = DateGUItoCAL(document.getElementById("popup-entry-day").value,document.getElementById("popup-entry-month").value,document.getElementById("popup-entry-year").value,document.getElementById("popup-entry-hour").value,document.getElementById("popup-entry-mins").value);
            start_date_in = time_in[0]; 
            start_time_in = time_in[1];
            end_date_in = start_date_in;
            end_time_in = "12:00:00 AM";
            if (newentry_type == 'pill_take') {
                subject_in = "Sintrom Amount";
                descr_in = "Sintrom Amount: " + document.getElementById('popup-slider-amount').value;
            } else if (newentry_type == 'test_result') {
                subject_in = "Sintrom Test";
                descr_in = "Blood Level: " + document.getElementById('popup-slider-level').value;
            } else if (newentry_type == 'test_next') {
                subject_in = "Sintrom Test";
                descr_in = "Blood Level: " + document.getElementById('popup-slider-level').value;
            }
            
            result = '{"Subject": "' + subject_in + '", "Start Date": "' + start_date_in + '", "Start Time": "' + start_time_in + '", "End Date": "' + end_date_in + '", "End Time": "' + end_time_in + '", "All Day Event": "False", "Description": "' + descr_in + '", "Location": "", "Private": "False"}'
            // key is data_nr (data_4)
            // value is "{"Subject": "Sintrom Test", "Start Date": "05/14/12", "Start Time": "11:15:00 AM", "End Date": "05/14/12", "End Time": "12:00:00 AM", "All Day Event": "False", "Description": "Blood Level: 3.5", "Location": "", "Private": "False"} "
            newEntry2storage(result);
            reload_main_html();
        }
    }); 

    $( "#popupEntry" ).on( "popupbeforeposition", function( event, ui ) {
            LSPopup("#popupTest", "New Entry", "NEW ENTRY");
        }
    );
 
});


/* Local Storage POPUP - START */

function LSPopup(div_id, title,popup_type){
    var month_names_en_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month_names_es_short = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    var todayArray = DateToArraydate(new Date());

    $("#popup-entry-title").html(popup_type).init();

    document.getElementById('popup-entry-day').value = todayArray[0];
    data_month = "";

    for (month=1;month<=12;month++) {
        month_tag = month_names_en_short[month -1];
        data_month = data_month + '<option value="' + month + '">' + month_tag+ '</option>';
    }
    $("#popup-entry-month").html(data_month).init();
    $('#popup-entry-month').prop('selectedIndex', parseInt(todayArray[1]) - 1).selectmenu('refresh').change();
    document.getElementById('popup-entry-year').value = todayArray[2];
    document.getElementById('popup-entry-hour').value = todayArray[3];
    document.getElementById('popup-entry-mins').value = todayArray[4];

    entry_type = document.getElementById('popup-entry-type').value;

    if (entry_type == 'pill_take'){
        $( "#popup-amount" ).show();
        $( "#popup-level" ).hide();
        document.getElementById('popup-entry-hour').value = 21;
        document.getElementById('popup-entry-mins').value = 00;
    } else {
        $( "#popup-amount" ).hide();
        $( "#popup-level" ).show();
        document.getElementById('popup-entry-hour').value = 11;
        document.getElementById('popup-entry-mins').value = 15;
    }
}



/* Local Storage POPUP - END */