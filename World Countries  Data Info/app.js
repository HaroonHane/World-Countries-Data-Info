const countriesList = document.querySelector("#countriesList");
const specificCountryData = document.querySelector(".specificCountryData");
const userSearchInputField=document.querySelector('#userSearchInputField');
const copyRight = ``

// Disable the search input initially
userSearchInputField.disabled = true;
window.onload= ()=>{
 userSearchInputField.disabled = false;
//  console.log('loaded');
}


  //Fetching Url
const url = "https://restcountries.com/v2/all";
//Fetch All Countries Data
let countries = "";
const fetching = async () => {
  try {
    let respone = await fetch(url);
    countries = await respone.json();
    // console.log(countries);
    countriesList.innerHTML=''
    showCountriesData(countries);
  } catch (err) {
      const errMessage= document.createElement('error');
      errMessage.textContent=`Connection Failed! No Internet connection,Please Try again `;
      countriesList.innerHTML='';
      countriesList.appendChild(errMessage);
      throw err;
  }
  list();
};
//Appending Data to HTML Element
const showCountriesData = (data) => {
  data.forEach((country) => {
    let eachCountryData = document.createElement("div");
    eachCountryData.classList.add("each-country");
    eachCountryData.innerHTML = `<span>${country.name}</span>`;
    countriesList.appendChild(eachCountryData);
  });
  const footerWrapper=document.createElement('footer');
  footerWrapper.innerHTML=`<center> Copyrights reserved &copy; 2021-2024 </center>`
  countriesList.appendChild(footerWrapper)

  allCont(data);
};
const allCont = (data) => {
  const allTextContainer = document.querySelectorAll(".each-country");
let curText=null;

  //Shows specific country data which has been searched
  allTextContainer.forEach((e) => {
    e.addEventListener("click", () => {
      specificCountryData.style.display = "flex";
      specificCountryData.style.flexDirection = "column";

      data.forEach((coutryExplicitData) => {
        if (coutryExplicitData.name === e.innerText) {
          let languages = coutryExplicitData.languages.map((lan) => {
            return lan.name;
          }); //Language Ended

specificCountryData.innerHTML=`
<button class="close-btn" onclick="closeWindow()">X</button>
<p> <b> Name  </b> ${coutryExplicitData.name}</p>
<p> <b> Native name  </b> ${coutryExplicitData.nativeName}</p>
<p> <b> Nationality  </b> ${coutryExplicitData.demonym}</p>
<p> <b> Calling code  </b> +${coutryExplicitData.callingCodes}</p>
<p> <b> Capital  </b> ${coutryExplicitData.capital}</p>
<p> <b> Population  </b> ${coutryExplicitData.population}</p>
<p> <b>${languages.length > 1 ? "Languages  ":"Language  "}</b> ${languages} </p>
<p> <b> Area  </b> ${coutryExplicitData.area}</p>
<p> <b> Connected Borders  </b> ${coutryExplicitData.borders != undefined? coutryExplicitData.borders.reduce((r,br)=>{return r+=', '+ br;}):"Sorry not available yet"}</p>
<p> <b> Region  </b> ${coutryExplicitData.region}</p>
<p> <b> Subregion  </b> ${coutryExplicitData.subregion}</p>
<p> <b> Timezone </b> ${coutryExplicitData.timezones}</p>
<p> <b>Currency </b> ${curText=coutryExplicitData.currencies != undefined? coutryExplicitData.currencies[0].name:"Sorry not available yet"} </p>
<p><b>Flag </b><img class='flag-style' src='${curText=coutryExplicitData.flag}' alt='${coutryExplicitData.name} flag'> </p>

`

        }
      });
    });
    allTextContainer.innerHTML='';
  });
 
};
function closeWindow() {
  specificCountryData.style.display = "none";
}
fetching();
//Taking All Elements After Response
function list() {
  const list = document.querySelectorAll(".each-country");
  return list;
}
//Search Solution
function searchItem(e) {
  if (e.value != "") {
    let listedCountry = list();
    let key = e.value.toUpperCase();
    countries.forEach((country) => {
      if (country.name != undefined) {
        let upperCaseKey = country.name.toUpperCase();
        if (
          country.alpha3Code.startsWith(key) ||
          upperCaseKey.startsWith(key)
        ) {
          for (let e of listedCountry) {
            if (
              e.childNodes[0].textContent.startsWith(
                country.alpha3Code
              ) ||
              e.childNodes[0].textContent.startsWith(country.name)
            ) {
              e.style.display = "flex";
            } else {
              e.style.display = "none";
            }
          }
        }
      }
    });
  } else {
    let listedCountry = list();
    for (let e of listedCountry) {
      e.style.display = "flex";
    }
  }
}
