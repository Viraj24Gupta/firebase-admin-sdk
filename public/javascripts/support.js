var data,ids;
fetch('http://localhost:1234/supps').then(response => response.text()).then(result => {
    data = JSON.parse(result);
    // console.log(data);
    append(data)
}).catch(error => console.log('error', error));
fetch('http://localhost:1234/allid').then(response => response.text()).then(result => {
    ids = JSON.parse(result);
    // console.log(ids);
    append(ids)
}).catch(error => console.log('error', error));
var s=1;

function append() {
    for(let x in ids) {
        for(let y in data[ids[x]]){
            // console.log(data[ids[x]][y]);
            let row = `
               <tr id="${ids[x]}" >
                    <td>${s}</td>
                    <td><img src="${data[ids[x]][y].userPhotoUrl}" width="250px" alt="user-img" onclick="window.open(this.src, '_blank');" ></td>
                    <td class="bold">${data[ids[x]][y].username}</td>
                    <td class="bold">${data[ids[x]][y].emailID}</td>
                    <td class="bold">${data[ids[x]][y].phoneNumber}</td>
                    <td>${data[ids[x]][y].query}</td>
                    <td>${data[ids[x]][y].reason}</td>
                    <td>${data[ids[x]][y].ticketNumber}</td>
               </tr>
            `;
            s++;
            $('table.new').append(row);
        }
    }
}