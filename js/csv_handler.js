
function processCSV2ObjectArrayOLD(allText){
    /* How does the returned object look like?
    - Object.headers is an array of the headers found
    - Object.Data is an array of the data objects
        - Each one (eg. Object.Data[14]) has an attribute corresponding to a header
        - The name of these attributes is the header, changing " " (spaces) with "_"
        - This way, you can hardcode the attribute's name or use Object.headers

    */

    var DataObj = new Object();
    //* Storing the headers
    DataObj.headers = [];
    var allTextLines = allText.split(/\r\n|\n/);

    headers_raw = allTextLines[0].split(',');
    for (var j=0; j < headers_raw.length; j++){
        headers_procsd = headers_raw[j].replace(" ","_","g");
        DataObj.headers.push(headers_procsd);
    }
    //* Storing the rest
    DataObj.Data = [];
    for (var k=1; k < allTextLines.length; k++) {
        var data = allTextLines[k].split(',');
        var tarr = new Object();
        for (var l=0; l < DataObj.headers.length; l++){
            

            eval("tarr." + DataObj.headers[l] + "=\"" + data[l] + "\"");
        }
        DataObj.Data.push(tarr);
    }

    return DataObj;
}

function processCSV2ObjectArray(allText){
    /* How does the returned object look like?
    - Object.headers is an array of the headers found <- TAKE THIS OUT IN THE FUTURE
    - Object.Data is an array of the data objects
        - Each one (eg. Object.Data[14]) has an attribute corresponding to a header
        - The name of these attributes is the header, changing " " (spaces) with "_"
        - This way, you can hardcode the attribute's name or use Object.headers

    */

    var DataObj = new Object();
    //* Storing the headers
    DataObj.headers = [];
    var allTextLines = allText.split(/\r\n|\n/);

    headers_raw = allTextLines[0].split(',');
    for (var j=0; j < headers_raw.length; j++){
        headers_procsd = headers_raw[j].replace(" ","_","g");
        DataObj.headers.push(headers_procsd);
    }
    //* Storing the rest
    DataObj.Data = [];
    for (var k=1; k < allTextLines.length; k++) {
        var data = allTextLines[k].split(',');
        var tarr = new Object();
        tarr.Subject = data[0];
		tarr.Start_Date = data[1];
		tarr.Start_Time = data[2];
		tarr.End_Date = data[3];
		tarr.End_Time = data[4];
		tarr.All_Day_Event = data[5];
		tarr.Description = data[6];
		tarr.Location = data[7];
		tarr.Private = data[8];
        
        DataObj.Data.push(tarr);
    }

    return DataObj;
}


function searchObj(DataObj,column,text) {
	var result = new Object();
	result.Data = [];
	result.headers = DataObj.headers;
    for(var propertyName in DataObj.Data[0]) {
        if (column == propertyName) {
	       for (i = 0; i < DataObj.Data.length; i++){
                if ( DataObj.Data[i][propertyName] == text) {
                    result.Data.push(DataObj.Data[i]);
                }                
            }
        }
	} 
	return result;
}

// Format functions

// Date function to CSV-Stored date
function DateToCSVdate(dateday){

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

// Date function to something to show at the GUI
function DateToGUI(dateday){
	var daydivided = dateday.toDateString().split(' ');

	dayformatted = daydivided[1] + " " + daydivided[2];
	return dayformatted;
}

// CSV-Stored date to something to show at the GUI
function CSVdateToGUI(dateday){
	var datedaydivided = dateday.split('/');
	var d = new Date("20"+datedaydivided[1], (datedaydivided[0]-1), datedaydivided[2]); 

	ddivided = d.toDateString().split(' ');
	dayformatted = ddivided[1] + " " + ddivided[2];
	return dayformatted;
}