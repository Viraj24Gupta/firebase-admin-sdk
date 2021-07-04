function myFunction() {
    var input, filter, table, tr, td, cell, i1, j1;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("user");
    tr = table.getElementsByTagName("tr");
    for (i1 = 1; i1 < tr.length; i1++) {
        tr[i1].style.display = "none";
        td = tr[i1].getElementsByTagName("td");
        for (j1 = 0; j1 < td.length; j1++) {
            cell = tr[i1].getElementsByTagName("td")[j1];
            if (cell) {
                if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i1].style.display = "";
                    break;
                }
            }
        }
    }
}

function myFunction1() {
    var input, filter, table, tr, td, cell, i1, j1;
    input = document.getElementById("myInput1");
    filter = input.value.toUpperCase();
    table = document.getElementById("user");
    tr = table.getElementsByTagName("tr");
    for (i1 = 1; i1 < tr.length; i1++) {
        tr[i1].style.display = "none";
        td = tr[i1].getElementsByTagName("td");
        for (j1 = 0; j1 < td.length; j1++) {
            cell = tr[i1].getElementsByTagName("td")[j1];
            if (cell) {
                if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i1].style.display = "";
                    break;
                }
            }
        }
    }
}