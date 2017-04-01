
var hint = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					 0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,
					 0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,
					 0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,
					 0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,
					 0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,
					 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);


// var coord = new Array(119);
// for(var i = 0; i < 119; i++){
// 	coord[i] = i;
// }

function getTd(id)
{
	return document.getElementById("td" + id.toString());
}

function init()
{
	for (i=0; i<7; i++) 
	{
		var newTr = document.createElement("tr");
		for (j=0; j<17; j++)
		{
			var newTd = document.createElement("td");
			newTd.id = "td" + (i*17+j).toString();
			newTd.style.border = "1px solid black";
			newTd.style.height = "100px";
			newTd.style.width = "100px";
			newTd.style.cursor = "default";
			newTd.style.textAlign = "center";
			newTd.style.color = "#676767";
			newTd.style.fontWeight = "normal";
			newTd.onclick = function(){flip(this); };
			newTd.bgColor = "#ffffff";
			newTd.innerHTML = hint[i*17+j].toString();
			newTr.appendChild(newTd);
			
		}
		document.getElementById("board").appendChild(newTr);
	}
	check();
}

function flip(tile)
{
	if (tile.bgColor == "#ffffff")
		tile.bgColor = "#ff628c";
	else
		tile.bgColor = "#ffffff";
	check();
}
function check()
{
	var winFlag = true;
	for (var i = 0; i < 119; i++){
		if (match(i) == 0){
			winFlag = false;
			break; 
		}
	}
	if (winFlag){
		setTimeout(function(){$("#board").fadeOut(); }, 2000);
		//$("#message").show();
		//$("#message").fadeIn(10000);
		window.location.replace("winflag/index.html");

	}
	else
		document.getElementById("message").innerHTML = "&nbsp;";
}

function match(id){
	if (hint[id] == 1)   // if it is 1 which is colored
		return getTd(id).bgColor == "#ff628c" ? true : false;
	else 		  // if it is 0 which is blank
		return getTd(id).bgColor == "#ffffff" ? true : false ;

}

$("#message").hide();
init();

