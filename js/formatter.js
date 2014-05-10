//Functions to "beautify" GUI's output

// Date function to something to show at the GUI
function DateToGUI(dateday){
	var daydivided = dateday.toDateString().split(' ');

	dayformatted = daydivided[1] + " " + daydivided[2];
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

// Date function to "beautify" CSV-Stored date
function DateCALtoGUI(dateday){
	var datedaydivided = dateday.split('/');
	var d = new Date("20"+datedaydivided[1], (datedaydivided[0]-1), datedaydivided[2]); 

	ddivided = d.toDateString().split(' ');
	dayformatted = ddivided[1] + " " + ddivided[2];
	return dayformatted;
}