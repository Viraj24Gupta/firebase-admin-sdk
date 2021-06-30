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
               <tr id="${id[x]}" ><td>${data[x].fullName}</td><td>SELFIE</td><td>CARD</td><td><input form="form${x}" type="text" name="ad_num" required/></td><td>${data[x].Verify}<form id="form${x}" method="post" action="/change"><button type="submit" name="changed" value="${id[x]}">verify</button></form></td></tr>
            `;

        $('table.new').append(row);
    }
}