//
// Kích checkbox từng dòng
//

function getString(ci) {
    return ci.cells[1].innerHTML + " " + ci.cells[2].innerHTML + " " + ci.cells[3].innerHTML;
}

var chks = document.getElementsByName("choose");
var chkslength = chks.length;
let checkedList = [];
for (let i = 0; i < chkslength; i++)
	chks[i].onchange = function() {
			if (this.checked) {
				this.parentNode.parentNode.classList.add("selected");
                console.log(tbl);
                console.log(i + 1);
                checkedList.push(getString(tbl.rows[i + 1]));
				let c = document.getElementsByName("choose");
				let j = 0;
				for (; j < c.length; j++) 
					if (!c[j].checked) break;
				if (j == c.length) document.getElementById("chooseAll").checked = true;
				else document.getElementById("chooseAll").checked = false;
				document.querySelector("div.group-op").classList.remove("nodisplay");
			} else {
				this.parentNode.parentNode.classList.remove("selected");
                checkedList.pop(getString(tbl.rows[i + 1]));
				document.getElementById("chooseAll").checked = false;
				let c = document.getElementsByName("choose");	
				let j = 0;		
				for (; j < c.length; j++)
					if (c[j].checked) break;
				if (j == c.length) document.querySelector("div.group-op").classList.add("nodisplay");
				else document.querySelector("div.group-op").classList.remove("nodisplay");
				
			}
	};

//
// Kích check all
//
document.getElementById("chooseAll").onchange = function() {
	let c = document.getElementsByName("choose");			
	for (let i = 0; i < c.length; i++) {
		c[i].checked = this.checked;
		if (c[i].checked) {
            c[i].parentNode.parentNode.classList.add("selected");
            if (! checkedList.includes(getString(tbl.rows[i + 1]))) checkedList.push(getString(tbl.rows[i + 1]));
        }
		else {
            c[i].parentNode.parentNode.classList.remove("selected");
            if (checkedList.includes(getString(tbl.rows[i + 1]))) checkedList.pop(getString(tbl.rows[i + 1]));
        }
	}
	if (this.checked) document.querySelector("div.group-op").classList.remove("nodisplay");
	else document.querySelector("div.group-op").classList.add("nodisplay");
};


//
//	Xóa
//
document.querySelector(".group-op-delete").onclick = function() {
	let c = document.getElementsByName("choose");	 		
	for (let i = c.length-1; i >= 0; i--)
		if (c[i].checked) {
            checkedList.pop(getString(tbl.rows[i + 1]));
            c[i].parentNode.parentNode.parentNode.removeChild(c[i].parentNode.parentNode);

		}

    chks = [];
    chks = document.getElementsByName("choose");
    console.log(chks.length);
    tbl = document.getElementById("tbl");
    console.log(tbl);
    chkslength = chks.length;

};


var col = 0; // cột được sắp xếp
var dir = ""; // chiều sắp xếp
var tbl = document.getElementById("tbl"); //bảng được sắp xếp

// xử lý sự kiện kích chuột trên ô tiêu đề cột "Họ tên"
tbl.rows[0].cells[1].onclick = function() {
	// Bỏ biểu thị cột đang được sắp xếp (nếu có)
	if (col == 1) tbl.rows[0].cells[1].classList.remove(dir);
	else if (col == 2) tbl.rows[0].cells[2].classList.remove(dir);
    else if (col == 3) tbl.rows[0].cells[3].classList.remove(dir);
	// Cột sẽ được sắp xếp là cột 1
	if (col == 1) {
		// cột 1 đã được sắp xếp, đảo chiều
		dir = (dir == "asc" ? "desc" : "asc");
	} else {
		col = 1;
		dir = "asc";
	}
	//thêm biểu thị cột được sắp xếp
	this.classList.add(dir);
	//sắp xếp
	tblSortName();
};

// xử lý sự kiện kích chuột trên ô tiêu đề cột "Ngày sinh"
tbl.rows[0].cells[2].onclick = function() {
	//bỏ biểu thị cột đang được sắp xếp (nếu có)
	if (col == 1) tbl.rows[0].cells[1].classList.remove(dir);
	else if (col == 2) tbl.rows[0].cells[2].classList.remove(dir);
	// cột sẽ được sắp xếp là cột 2
	if (col == 2) {
		// cột 2 đã được sắp xếp, đảo chiều
		dir = (dir == "asc" ? "desc" : "asc");
	} else {
		col = 2;
		dir = "asc";
	}
	//thêm biểu thị cột được sắp xếp
	this.classList.add(dir);
	//sắp xếp
	tblSortBirth();
};

// xử lý sự kiện kích chuột trên ô tiêu đề cột "Giới tính"
tbl.rows[0].cells[3].onclick = function() {
	if (col == 1) tbl.rows[0].cells[1].classList.remove(dir);
	else if (col == 2) tbl.rows[0].cells[2].classList.remove(dir);
    else if (col == 3) tbl.rows[0].cells[3].classList.remove(dir);
	if (col == 3) {
		dir = (dir == "asc" ? "desc" : "asc");
	} else {
		col = 3;
		dir = "asc";
	}
	this.classList.add(dir);
	tblSortGender();
};


function displayChecked() {

    let c = document.getElementsByName("choose");
    for (let i = 0; i < c.length; i++) {
        if (checkedList.includes(getString(tbl.rows[i + 1]))) {
            c[i].parentNode.parentNode.classList.add("selected");
            c[i].checked = true;
            
        }
    }
}

function priorName(a, b) {
    let la = a.split(" ").length;
    let lb = b.split(" ").length;
    if (a.split(" ")[la - 1].toLowerCase() < b.split(" ")[lb - 1].toLowerCase()){
        return -1;
    } else if (a.split(" ")[la - 1].toLowerCase() > b.split(" ")[lb - 1].toLowerCase()) {
        return 1;
    } else if (a.split(" ")[la - 3].toLowerCase() < b.split(" ")[lb - 3].toLowerCase()) {
        return -1;

    } else if (a.split(" ")[la - 3].toLowerCase() > b.split(" ")[lb - 3].toLowerCase()) {
        return 1;
    } else if (a.split(" ")[1].toLowerCase() < b.split(" ")[1].toLowerCase()) {
        return -1;
    } else return 1;
}


function tblSortName() {
    // console.log(dir);
    let c = document.getElementsByName("choose");
    for (let i = 0; i < c.length; i++) {
        c[i].parentNode.parentNode.classList.remove("selected");
        c[i].checked = false;
    }
    console.log(checkedList);
    let rows = tbl.rows;
    for (let i = 1; i < rows.length; i++) {
        for (let j = i + 1; j < rows.length; j++) {
            let cur = priorName(rows[i].cells[col].innerHTML,rows[j].cells[col].innerHTML);
            // console.log(i, j, dir, cur);
            if ((dir == "asc" && cur == -1) || (dir == "desc" && cur == 1)) {
                tmp = rows[i].cells[1].innerHTML;
                rows[i].cells[1].innerHTML = rows[j].cells[1].innerHTML;
                rows[j].cells[1].innerHTML = tmp;

                tmp = rows[i].cells[2].innerHTML;
                rows[i].cells[2].innerHTML = rows[j].cells[2].innerHTML;
                rows[j].cells[2].innerHTML = tmp;

                tmp = rows[i].cells[3].innerHTML;
                rows[i].cells[3].innerHTML = rows[j].cells[3].innerHTML;
                rows[j].cells[3].innerHTML = tmp;
                
            }
        }
    }

    displayChecked();
}



function tblSortGender() {
	var rows = tbl.rows;
	for (var i = 1; i < rows.length; i++) {
		for (var j = i+1; j < rows.length; j++)  
			if ((dir == "asc" && rows[i].cells[col].innerHTML.toLowerCase() > 
					rows[j].cells[col].innerHTML.toLowerCase()) || 
				(dir == "desc" && rows[i].cells[col].innerHTML.toLowerCase() < 
					rows[j].cells[col].innerHTML.toLowerCase())
				)
			{
				//hoán vị	
				tmp = rows[i].cells[1].innerHTML;
				rows[i].cells[1].innerHTML = rows[j].cells[1].innerHTML;
				rows[j].cells[1].innerHTML = tmp;

				tmp = rows[i].cells[2].innerHTML;
				rows[i].cells[2].innerHTML = rows[j].cells[2].innerHTML;
				rows[j].cells[2].innerHTML = tmp;

                tmp = rows[i].cells[3].innerHTML;
				rows[i].cells[3].innerHTML = rows[j].cells[3].innerHTML;
				rows[j].cells[3].innerHTML = tmp;
			}
    }
    displayChecked();
};

function priorBirth(a, b) {
    if (Number(a.split("/")[2]) < Number(b.split("/")[2])){
        return -1;
    } else if (Number(a.split("/")[2]) > Number(b.split("/")[2])) {
        return 1;
    } else if (Number(a.split("/")[1]) < Number(b.split("/")[1])) {
        return -1;
    } else if (Number(a.split("/")[1]) > Number(b.split("/")[1])) {
        return 1;
    } else if (Number(a.split("/")[0]) < Number(b.split("/")[0])) {
        return -1;
    } else return 1;
}


function tblSortBirth() {
    // console.log(dir);
    let rows = tbl.rows;
    for (let i = 1; i < rows.length; i++) {
        for (let j = i + 1; j < rows.length; j++) {
            let cur = priorBirth(rows[i].cells[col].innerHTML,rows[j].cells[col].innerHTML);
            // console.log(i, j, dir, cur);
            if ((dir == "asc" && cur == -1) || (dir == "desc" && cur == 1)) {
                tmp = rows[i].cells[1].innerHTML;
                rows[i].cells[1].innerHTML = rows[j].cells[1].innerHTML;
                rows[j].cells[1].innerHTML = tmp;

                tmp = rows[i].cells[2].innerHTML;
                rows[i].cells[2].innerHTML = rows[j].cells[2].innerHTML;
                rows[j].cells[2].innerHTML = tmp;

                tmp = rows[i].cells[3].innerHTML;
                rows[i].cells[3].innerHTML = rows[j].cells[3].innerHTML;
                rows[j].cells[3].innerHTML = tmp;



            }
        }
    }
    displayChecked();
}