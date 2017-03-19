
function displayDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	return today;
}

function displayTime(){
	var today = new Date();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();
	var time = hour + " : " + minute + " : "+ second;
	return time
}

window.onload = function() {
	document.getElementById('practice1').innerHTML = "Date: " + displayDate();
	document.getElementById('practice3').innerHTML = "Time: " + displayTime();

}

function findArea(){
	var side1 = document.getElementById('side1').value;
	var side2 = document.getElementById('side2').value;
	var side3 = document.getElementById('side3').value;
	var perimeter = (side1 + side2 + side3) / 2;
	var area =  Math.sqrt(perimeter*((perimeter - side1) * (perimeter - side2) * (perimeter - side3)));
	document.getElementById('area').innerHTML = "Calculated Area: " + area;
}

function printButton() {
    window.print();
}

