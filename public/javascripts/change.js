var data;
var id;
fetch('http://localhost:1234/data')
    .then(response => response.text())
    .then(result => {
        data = JSON.parse(result);
        console.log(data);
        paas(data)
    }).catch(error => console.log('error', error));

fetch('http://localhost:1234/id')
    .then(response => response.text())
    .then(result => {
        id = JSON.parse(result);
        console.log(id);
        paas(id)
    }).catch(error => console.log('error', error));

function paas() {
    append(data,id)
}
function append(data,id) {
    for(x in data) {
        let row = `
               <tr id="${id[x]}" ><th>${data[x].fullName}</th><th>SELFIE</th><th>AADHAR</th><th>${data[x].Verify}&nbsp;&nbsp;<button type="submit" name="changed" value="${id[x]}">change</button></th></tr>
            `;

        $('table.new').append(row);
    }
}