
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
  await displayinfofunction(result,datetime_str,pincoderesult);
  await searchcodebuild();
}
catch(error) {
    console.log(error);
    alert('Some Error Occured.Please Refresh The Page!');
}
}

let postofficesreferencearr;
async function displayinfofunction(result,datetime_str,pincoderesult) {
    try {
    
    let getcontentdiv = document.getElementsByClassName('getcontent')[0];
    let latitude=(result.loc.split(','))[0];
    let longitude=(result.loc.split(','))[1]
    
    getcontentdiv.innerHTML=`<div class="lat-long">
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
postofficesreferencearr=postofficeslistarr;  //referring to the array

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
async function searchcodebuild() {
    try {
let searchinput=document.getElementById('searchip');
console.log(searchinput)
searchinput.addEventListener('keyup',searchfunction);
    } catch(error) 
    {
        console.log(error);
    }
}

function searchfunction(event) {
    try{
        console.log("entered")
    let searchtext=event.target.value.toLowerCase().trim();
    console.log(searchtext);
    console.log(postofficesreferencearr);
    let searchedarr=postofficesreferencearr.filter((currelement)=>{
         if((currelement.Name.toLowerCase().includes(searchtext)) || (currelement.BranchType.toLowerCase().includes(searchtext))||(currelement.District.toLowerCase().includes(searchtext)))
         {
            console.log(searchtext)
            return true;
         } else {
            return false;
         }
    });


    let postofficediv=document.getElementsByClassName('postoffices-div')[0];
    postofficediv.innerHTML=''
    for(let i=0;i<searchedarr.length;i++)
   {
    let carddiv=document.createElement('div');
    carddiv.className='card';
    carddiv.innerHTML=`<div>Name: <span>${searchedarr[i].Name}</span></div>
                        <div>Branch Type: <span>${searchedarr[i].BranchType}</span></div>
                        <div>Delivery Status: <span>${searchedarr[i].DeliveryStatus}</span></div>
                        <div>District: <span>${searchedarr[i].District}</span></div>
                        <div>Division: <span>${searchedarr[i].Division}</span></div>`;
    postofficediv.append(carddiv);
   }
    } catch(error) {
    console.log(error);
        }

}

