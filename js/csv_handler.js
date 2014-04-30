
function processCSV2ObjectArray(allText){
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
        alert("in the first for");      

    }
    //* Storing the rest
    DataObj.Data = [];
    alert("alltext length" + allTextLines.length);
    for (var k=1; k < allTextLines.length; k++) {
        var data = allTextLines[k].split(',');
        var tarr = new Object();
        for (var l=0; l < DataObj.headers.length; l++){
            eval("tarr." + DataObj.headers[l] + "='" + data[l] + "'");
            alert("in the second for");
        }
        DataObj.Data.push(tarr);
    }

    return DataObj;
}

function DateToCSV(day){

	var dd = day.getDate();
	var mm = day.getMonth()+1; //January is 0!
	var yyyy = day.getFullYear();
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