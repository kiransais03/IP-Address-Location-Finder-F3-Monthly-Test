
let getdatabtn=document.getElementsByClassName('getdata-btn')[0];

getdatabtn.addEventListener('click',getdatafunction);

function getdatafunction(event) {
    try {
    event.target.classList.add('btn-clicked');
    setTimeout(()=>{event.target.classList.remove('btn-clicked');event.target.remove()},200);
    console.log('clicked');
    let ipadress=document.getElementById('addressno').innerText;
    fetchiplocation(ipadress);
    }
    catch(error) {
        console.log(error);
        alert('Some Error Occured.Please Refresh The Page!');
    }
}


async function fetchiplocation(ipaddress) {
    try {
  let response= await fetch(`https://ipinfo.io/${ipaddress}?token=6dbc726c231eac`);
  let result= await response.json();
  let datetime_str =new Date().toLocaleString("en-US", { timeZone: `${result.timezone}`});
  let pincodeapiresponse=await fetch(`https://api.postalpincode.in/pincode/${result.postal} `);
  let pincoderesult=await pincodeapiresponse.json();
  console.log(result);
  displayinfofunction(result,datetime_str,pincoderesult);
}
catch(error) {
    console.log(error);
    alert('Some Error Occured.Please Refresh The Page!');
}
}


function displayinfofunction(result,datetime_str,pincoderesult) {
    try {
    
    let getcontentdiv = document.getElementsByClassName('getcontent')[0];
    let latitude=(result.loc.split(','))[0];
    let longitude=(result.loc.split(','))[1]
    
    getcontentdiv.innerHTML=` <div class="lat-long">
                                <div>Lat: <span>${latitude}</span></div>
                                <div>City: <span>${result.city}</span> </div>
                                <div>Organisation: <span>${result.org}</span></div>
                                <div>Long: <span>${longitude}</span></div>
                                <div>Region: <span>${result.region}</span></div>
                                <div>Hostname: <span>${result.hostname}</span></div>
                                </div>
                                <div class="gmapsiframe">
                                <iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed" frameborder="0" style="border:0"></iframe>
                                </div>
                                <div class="map-belowcont">
                                <div>Time Zone: <span>${result.timezone}</span></div>
                                <div>Date And Time: <span>${datetime_str}</span></div>
                                <div>Pincode: <span>${result.postal}</span></div>
                                <div>Message: <span>${pincoderesult[0].Message}</span> </div>
                                </div>
                                <div class="searchip-div">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="search" name="searchip" placeholder="Filter" id="searchip">
                                </div>
                                <div class="postoffices-div">
                                </div>`

getcontentdiv.style.display='block';
let postofficediv=document.getElementsByClassName('postoffices-div')[0];
let postofficeslistarr=pincoderesult[0].PostOffice;

for(let i=0;i<postofficeslistarr.length;i++)
{
    let carddiv=document.createElement('div');
    carddiv.className='card';
    carddiv.innerHTML=`<div>Name: <span>${postofficeslistarr[i].Name}</span></div>
                        <div>Branch Type: <span>${postofficeslistarr[i].BranchType}</span></div>
                        <div>Delivery Status: <span>${postofficeslistarr[i].DeliveryStatus}</span></div>
                        <div>District: <span>${postofficeslistarr[i].District}</span></div>
                        <div>Division: <span>${postofficeslistarr[i].Division}</span></div>`;
    postofficediv.append(carddiv);
}
}
catch(error) {
    console.log(error);
}

}    



//Search Fucntionality

// Search functionality

let searchinput=document.getElementById('searchip');
console.log(searchinput)
searchinput.addEventListener('keyup',searchfunction);

function searchfunction(event) {
    try{
        console.log("entered")
    let searchtext=event.target.value.toLowerCase();
    if(searchtext.trim()==='')
    {
        console.log('exit');
        document.getElementsByClassName('items-container')[0].style.display='block';
        document.getElementsByClassName('searchcontainer')[0].style.display='none';
        return;
    }
    console.log(searchtext);
    console.log(result)
    let searchedarr=result.filter((currelement)=>{
        return currelement.title.toLowerCase().includes(searchtext);
    });
    document.getElementsByClassName('searchcontainer')[0].innerHTML=''
    searchaddcardstoui(searchedarr);
} catch(error) {
    console.log(error);
}

}

