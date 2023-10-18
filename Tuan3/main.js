//
// KĂ­ch checkbox tá»«ng dĂ²ng
//
var chks = document.getElementsByName("chk");
function checkBoxChange() {
	for (let i = 0; i < chks.length; i++)
	chks[i].onchange = function() {
			if (this.checked) {
				this.parentNode.parentNode.classList.add("selectedr");
				let c = document.getElementsByName("chk");
				let j = 0;
				for (; j < c.length; j++)
					if (!c[j].checked) break;
				if (j == c.length) document.getElementById("chkall").checked = true;
				else document.getElementById("chkall").checked = false;
				document.querySelector("div.group-op").classList.remove("nodisplay");
			} else {
				this.parentNode.parentNode.classList.remove("selectedr");
				document.getElementById("chkall").checked = false;
				let c = document.getElementsByName("chk");
				let j = 0;
				for (; j < c.length; j++)
					if (c[j].checked) break;
				if (j == c.length) document.querySelector("div.group-op").classList.add("nodisplay");
				else document.querySelector("div.group-op").classList.remove("nodisplay");

			}
	};
}
checkBoxChange();

//
// check all
//

function checkAllBoxChange() {
    document.getElementById("chkall").onchange = function() {
        let c = document.getElementsByName("chk");
        for (let i = 0; i < c.length; i++) {
            c[i].checked = this.checked;
            if (c[i].checked) c[i].parentNode.parentNode.classList.add("selectedr");
            else c[i].parentNode.parentNode.classList.remove("selectedr");
        }
        if (this.checked) document.querySelector("div.group-op").classList.remove("nodisplay");
        else document.querySelector("div.group-op").classList.add("nodisplay");
    };
}
checkAllBoxChange();


//
//	XĂ³a
//
function delRow() {
    document.querySelector(".group-op-delete").onclick = function() {
        let c = document.getElementsByName("chk");
        for (let i = c.length-1; i >= 0; i--)
            if (c[i].checked) {
                c[i].parentNode.parentNode.parentNode.removeChild(c[i].parentNode.parentNode);
            }
    };
}

delRow();

let dir = ""; // chiều sắp xếp
let tbl = document.getElementById("tbl"); //bảng được sắp xếp
function sortColumn(col, cmp) {
    let rows = tbl.rows;
    for (let i = 1; i < rows.length; i++)
        for (let j = i + 1; j < rows.length; j++)
            if (cmp(rows[i].cells[col].innerHTML.toLowerCase(),
                rows[j].cells[col].innerHTML.toLowerCase()) > 0
            ) {
                let tmp = rows[i].outerHTML;
                rows[i].outerHTML = rows[j].outerHTML;
                rows[j].outerHTML = tmp;
            }
};

function parseDate(dateStr) {
    let parts = dateStr.split("/");
    if (parts.length === 3) {
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
    // Trả về null nếu ngày tháng năm không hợp lệ
    return null;
}

let cmp = [];
cmp.push((name1, name2) => {
    let arr1 = name1.split(" ");
    let arr2 = name2.split(" ");
    let res = 0;
    for (let i = arr1.length - 1, j = arr2.length - 1; i >= 0 && j >= 0; --i, --j) {
        let c = arr1[i].localeCompare(arr2[j]);
        if (c !== 0) {
            res = c;
            break;
        }
    }
    if (res === 0)
        res = arr1.length < arr2.length ? -1 : 1;
    return dir === "asc" ? res : -res;
});

cmp.push((date1, date2) => {
    let res = parseDate(date1) < parseDate(date2) ? -1 : 1;
    return dir === "asc" ? res : -res;
});

cmp.push((str1, str2) => {
    let res = str1.localeCompare(str2);
    return dir === "asc" ? res : -res;
});

function main() {
    let headerCells = tbl.rows[0].cells;
    dir = "desc";
    for (let i = 1; i < headerCells.length; ++i)
        headerCells[i].onclick = () => {
            headerCells[1].classList.remove(dir);
            headerCells[2].classList.remove(dir);
            headerCells[3].classList.remove(dir);
            dir = (dir == "asc" ? "desc" : "asc");
            col = i;
            sortColumn(i, cmp[i - 1]);
            headerCells[1].classList.remove(dir);
            headerCells[2].classList.remove(dir);
            headerCells[3].classList.remove(dir);

            headerCells[i].classList.add(dir);

            
            let selectedCells = document.querySelectorAll(".selectedr td");
            selectedCells.forEach((td) => {
                let checkbox = td.firstChild;
                if (checkbox) {
                    checkbox.checked = true;
                }
            });

            checkBoxChange();
        }
}

main()