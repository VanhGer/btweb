var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let jsonData = JSON.parse(xhttp.responseText);
        
        let container = document.getElementById("container");
        
        let table = document.createElement("table");
        
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
         

        let head = ["Name", "Username", "Phone", "Email", "Company", "Address"];

         head.forEach((item) => {
            let th = document.createElement("th");
            th.innerText = item;
            tr.appendChild(th); 
         });
         thead.appendChild(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table
         
         // Loop through the JSON data and create table rows
         jsonData.forEach((item) => {
            let tr = document.createElement("tr");
            
            // Get the values of the current object in the JSON data
            //let vals = Object.values(item);
            //console.log(vals);
            // Loop through the values and create table cells
            
            head.forEach((na) => {
                let tmp = na.toLowerCase();
                let td = document.createElement("td");

                if (tmp == "company") {
                    td.innerText = item[tmp]["name"];
                }
                else if (tmp == "address") td.innerText = item[tmp]["street"];
                else td.innerText = item[tmp];
                tr.appendChild(td);
            });
            table.appendChild(tr); // Append the table row to the table
         });
         container.appendChild(table) // Append the table to the container element

    }
};
xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
xhttp.send();