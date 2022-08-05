let fulcontrylist = document.querySelector(".fulcontrylist");
let jsondata = [];
let pagenumb = 1;
let contrylist = async () => {
  try {
    let api = await fetch(`https://restcountries.com/v2/all`);
    jsondata = await api.json();
    //display all data
    //displycountry()

    displycountry(pagenumb);
    //  pagination(pagenumb);
  } catch {
    console.log("no data available country");
  }
};

let displycountry = (pagenumbs) => {
  let perpagelist = [...jsondata];
  fulcontrylist.innerHTML = "";
  let startindex = 1 * (Number(pagenumbs) - 1) * 10;
  let perpage_count = 9;
  perpagelist = perpagelist.splice(startindex, perpage_count);
  console.log(perpagelist);
  perpagelist.forEach((contry,ind) => {
    //creating empty div
    let newdiv = document.createElement("div");
    //setting attribute class
    newdiv.setAttribute("class", "col-lg-4");
    //taking one empty
    let newtdvalue = "";
    newtdvalue += `
              <div class="card m-2">
              <div class="card-header"><h5 class="card-title">${contry.name}</h5></div>
             
              <div class="card-body">
              <div  id="carddetail-${ind}"></div>
                <img src=${contry.flag} class="card-img-top" alt="image not loaded">
                <p class="card-text">Capital : ${contry.capital}</p> 
                <p class="card-text">Region : ${contry.region}</p> 
                <p class="card-text">Country Code : ${contry.alpha3Code}</p> 
                <button class="btn btn-primary btn-sm" id="getdata" onclick="loadweatherinformation(${contry.latlng},${ind})"data-toggle="modal" data-target="#displaymodel-${ind}">Click for Weather</button>
                
              </div>
            </div>
      `;
    newdiv.innerHTML = newtdvalue;
    fulcontrylist.appendChild(newdiv);
  });
  pagination(pagenumbs);
};

//pagination display
let pagination = (pagenumbs) => {
  let pagelist = document.querySelector(".pagination");
  let totalpage = Math.ceil(jsondata.length / 9);
  let lastpage = totalpage;

  //checking total page reaches or not
  if (
    totalpage === Number(pagenumbs) ||
    totalpage < Number(pagenumbs) ||
    totalpage < Number(pagenumbs) + 2
  ) {
    lastpage = totalpage;
    console.log(lastpage);
  } else {
    //pagination displaying 3 value
    lastpage = Number(pagenumbs) + 2;
  }

  let pagli = "";
  let isdisableprev = "";
  let isdesablenext = "";
  //disable previous btn
  if (Number(pagenumbs) === 1) {
    isdisableprev = "disabled";
  }

  //disable next btn
  if (Number(pagenumbs) === totalpage) {
    isdesablenext = "disabled";
  }

  pagli += `<li class="page-item Previous ${isdisableprev}" id=${
    Number(pagenumbs) - 1
  }>
    <a class="page-link">Previous</a>
  </li>`;

  for (let i = Number(pagenumbs); i <= lastpage; i++) {
    let isactive = "";

    if (i === Number(pagenumbs)) {
      isactive = "active";
    }
    pagli += `<li class="page-item ${isactive} ${isdesablenext}" id=${i}>
                <a class="page-link" href="#">${i}</a>
                </li>`;
  }

  pagli += ` <li class="page-item Next ${isdesablenext}" id=${
    Number(pagenumbs) + 1
  }>
    <a class="page-link" >Next</a>
  </li>`;

  pagelist.innerHTML = pagli;
  //click set
  pageclick();
};

//click event page number click
let pageclick = () => {
  //select page-item not set to disable class
  let clicknumber = document.querySelectorAll(".pagination li:not(.disabled)");

  clicknumber.forEach((clicknumber, ind) => {
    clicknumber.addEventListener("click", function () {
      let text = this.id;
      pagenumb = clicknumber.id;

      displycountry(text);
    });
  });
};
//create each list click

//https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=6ade6843e66699649ba4ea7b1f707451

let loadweatherinformation = async (lat, lng, id) => {
  
try{
  
    let weather_info = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6ade6843e66699649ba4ea7b1f707451`);
    let weatherData = await weather_info.json();
    displayWeather([weatherData],id);
    
}
catch{
    console.log('data not available')
}
};

let displayWeather = (weatherInfo,id) => {

    console.log(weatherInfo[0]);
    let modelpopAll = document.querySelectorAll('div[id*="carddetail-"]');
    modelpopAll.forEach(modelpopAll=>{
      modelpopAll.innerHTML=""
    })
  let modelpop = document.querySelector("#carddetail-"+id);
  modelpop.innerHTML=""
  let modelbody = "";
  modelbody += `<div class="modal fade fullmodels" id="displaymodel-${id}">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Weather Information</h5>
      
        <button type="button" class="close closeModel" data-dismiss="modal" aria-label="Close" onclick="closeModel(${id})">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <p class="modal-subtitl"><label>Country Name </label>: ${weatherInfo[0].sys["country"]}</p>
      <ul class="list">
        <li class="list-text"><label>Humidity </label>: ${weatherInfo[0].main["humidity"]}</li>
        <li class="list-text"><label>Temperature </label>: ${weatherInfo[0].main["temp"]}</li>
        <li class="list-text"><label>Pressure </label>: ${weatherInfo[0].main["pressure"]}</li>
        <li class="list-text"><label>Wind Info </label>: deg: ${weatherInfo[0].wind["deg"]} gust: ${weatherInfo[0].wind["gust"]}</p>
        <li class="list-text"><label>Clouds </label>: ${weatherInfo[0].weather[0].description}</li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary closeModel" data-dismiss="modal" onclick="closeModel(${id})">Close</button>
      </div>
    </div>
  </div>
  </div>`;
  modelpop.innerHTML = modelbody;
  document.querySelector('.fullmodels').style.display="block"
  document.querySelector('.fullmodels').style.opacity="1"
};

let closeModel=(id)=>{
    document.querySelector('.fullmodels').style.display="none"
    document.querySelector('.fullmodels').style.opacity="0"
    document.querySelector("#carddetail-"+id).innerHTML=""
    let modelpop = document.querySelector("#carddetail-"+id);
  modelpop.innerHTML=""
}
contrylist();

