var data;
var id;
fetch('http://localhost:1234/data').then(response => response.text()).then(result => {
        data = JSON.parse(result);
        console.log(data);
        append(data)
    }).catch(error => console.log('error', error));

fetch('http://localhost:1234/id').then(response => response.text()).then(result => {
        id = JSON.parse(result);
        console.log(id);
        append(id)
    }).catch(error => console.log('error', error));
var s=1;
function append() {
    for(x in data) {
        let row = `
               <tr id="${id[x]}" ><td>${s}</td><td>${data[x].fullName}</td><td>${data[x].username}</td><td>${data[x].gender}</td><td>${data[x].dob}</td><td><img src="${data[x].selfieUrl}" width="250px" alt="selfie-img" onclick="window.open(this.src, '_blank');" ></td><td><img  src="${data[x].aadharUrl}" width="250px" alt="aadhar-img" onclick="window.open(this.src, '_blank');"/></td><td><input form="form${x}" type="text" class="ad_num" name="ad_num" required/>${data[x].aadharNumber}</td><td>${data[x].Verify}<form id="form${x}" method="post" action="/change"><button type="submit" class="verify-btn" name="changed" value="${id[x]}">verify</button></form></td></tr>
            `;
        s++;
        $('table.new').append(row);
    }
}