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
               <tr id="${id[x]}" >
                    <td>${s}</td>
                    <td class="bold">${data[x].fullName}</td>
                    <td>${data[x].username}</td>
                    <td class="bold">${data[x].gender}</td>
                    <td class="bold">${data[x].dob}</td>
                    <td><img src="${data[x].selfieUrl}" width="250px" alt="selfie-img" onclick="window.open(this.src, '_blank');" ></td>
                    <td><img  src="${data[x].aadharUrl}" width="250px" alt="DELETED" onclick="window.open(this.src, '_blank');"/></td>
                    <td><input form="form${x}" type="text" class="ad_num" name="ad_num" required/><br/>${data[x].aadharNumber}
                        <br/><input form="form${x}" name="ad_url" type="checkbox" value="${data[x].aadharUrl}">Delete aadhar card image</button></td>
                    <td><form id="form${x}" method="post" action="/change">
                        <button type="submit" class="verify-btn" name="changed" value="${id[x]}">verify</button></form>${data[x].Verify}</td>
               </tr>
            `;
        s++;
        $('table.new').append(row);
    }
}