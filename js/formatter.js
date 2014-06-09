//Functions to "beautify" GUI's output

// Date function to something to show at the GUI
function DateToGUI(dateday){
	var daydivided = dateday.toDateString().split(' ');

	dayformatted = daydivided[1] + " " + daydivided[2] + " " + daydivided[3];
	return dayformatted;
}


//Functions to treat the Google Calendar data

// Date function to CSV-Stored date
function DateToCALdate(dateday){

    var dd = dateday.getDate();
    var mm = dateday.getMonth()+1; //January is 0!
    var yyyy = dateday.getFullYear();
    var yy = yyyy  % 100;

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    dayformatted = mm+'/'+yy+'/'+dd;
    return dayformatted;

}

// Date function to Three-values array date
function DateToArraydate(dateday){
	
    var dd = dateday.getDate();
    var mm = dateday.getMonth()+1; //January is 0!
    var yyyy = dateday.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    dayformatted = dd+'/'+mm+'/'+yyyy;
	var day_array = dayformatted.split('/');
    return day_array;

}

// Date function to "beautify" CSV-Stored date
function DateCALtoGUI(dateday){
	var datedaydivided = dateday.split('/');
	var d = new Date("20"+datedaydivided[1], (datedaydivided[0]-1), datedaydivided[2]); 
	ddivided = d.toDateString().split(' ');
	dayformatted = ddivided[1] + " " + ddivided[2] + " 20" + datedaydivided[1];
	return dayformatted;
}
// Date function to "beautify" CSV-Stored date in an orderable way
function DateCALtoListview(dateday){
	var datedaydivided = dateday.split('/');
	dayformatted = "20"+datedaydivided[1] + "/" + datedaydivided[0] + "/" + datedaydivided[2];
	return dayformatted;
}

function DateGUItoCAL(day,month,year,hour,minute){
	var result = [];
	day_out = day;
	month_out = month;
	year_out = year;

	AMPM_out = "AM";
	hour_out = hour;
	if (hour == 12) {
		AMPM_out = "PM";
	} else if (hour > 12) {
		hour_out = hour - 12;
		AMPM_out = "PM";
	}
	minute_out = minute;
	result.push(('0' + month_out).slice(-2) + '/' + ('0' + year_out).slice(-2) + '/' + ('0' + day_out).slice(-2));
	result.push(('0' + hour_out).slice(-2) + ':' + ('0' + minute_out).slice(-2) + ':00 ' + AMPM_out);
	return result;
}