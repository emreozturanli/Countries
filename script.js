const url = "https://restcountries.com/v3/all";

const regionButtonsDiv = document.querySelector('.btn-group');
const select = document.querySelector('select');
const flagsDiv = document.querySelector('.flags');
const cardContainer = document.querySelector('.card-container');
const regions = [];

const fetchCountries = async ()=>{

    try{
        const res = await fetch(url);
        const countries = await res.json();
        cardContainer.innerHTML = '';
        countries.forEach((country)=>{
            select.innerHTML += `<option value="${country.name.common}">${country.name.common}</option>`;
            if(!regions.includes(country.region)){
                regions.push(country.region);
                regionButtonsDiv.innerHTML +=
                `<button type="button" class="btn rounded-3 btn-primary m-2">${country.region}</button>`;
            }

            if(country.region === 'Americas'){
                flagsDiv.innerHTML += 
                `<div class="col-lg-2 col-md-3 col-sm-4 d-flex justify-content-center p-2"> 
                    <img src="${country.flags[1]}" alt="" width="50px" height="50px"/> 
                </div>`;
            }
        })

        regionButtonsDiv.addEventListener('click', (e)=>{
            flagsDiv.innerHTML = '';
                const continent = e.target.innerText;
                countries.forEach((country)=>{
                    if (country.region === continent){
                        flagsDiv.innerHTML += 
                        `<div class="col-lg-2 col-md-3 col-sm-4 d-flex justify-content-center p-2"> 
                            <img src="${country.flags[1]}" alt="" width="50px" height="50px"/> 
                        </div>`;
                    }
                })
        })

        flagsDiv.addEventListener('click',(e)=>{
            countries.forEach((country)=>{
                if(country.flags[1]=== e.target['src']){
                    const {name:{common}, capital,flags,region, languages, currencies } = country ;
                    cardContainer.innerHTML =
                    ` <div class="card" style="width: 18rem;">
                    <img src="${flags[1]}" class="card-img-top" alt="...">
                    <ul class="list-group text-center list-group-flush">
                      <li class="list-group-item"> ${common}</li>
                      <li class="list-group-item"><i class="fa-solid fa-earth-europe"></i> ${region}</li>
                      <li class="list-group-item"><i class="fa-solid fa-landmark-flag"></i> ${capital}</li>
                      <li class="list-group-item"><i class="fa-solid fa-language"></i> ${Object.values(languages)}</li>
                     <li class="list-group-item"><i class="fa-solid fa-money-bill-1-wave"></i> ${Object.values(currencies)[0].name} ${Object.values(currencies)[0].symbol}</li>
                    </ul>
                </div>`;
                }
            })
    })

    select.addEventListener('change', ()=>{
        // const selectedCountry= select.options[select.selectedIndex].text;
        const selectedCountry= select.value;
        
            countries.forEach((country)=>{
                if(country.name.common === selectedCountry){
                    const {name:{common}, capital,flags,region, languages, currencies } = country ;
                    cardContainer.innerHTML =
                    ` <div class="card" style="width: 18rem;">
                    <img src="${flags[1]}" class="card-img-top" alt="...">
                    <ul class="list-group text-center list-group-flush">
                      <li class="list-group-item"> ${common}</li>
                      <li class="list-group-item"><i class="fa-solid fa-earth-europe"></i> ${region}</li>
                      <li class="list-group-item"><i class="fa-solid fa-landmark-flag"></i> ${capital}</li>
                      <li class="list-group-item"><i class="fa-solid fa-language"></i> ${Object.values(languages)}</li>
                     <li class="list-group-item"><i class="fa-solid fa-money-bill-1-wave"></i> ${Object.values(currencies)[0].name} ${Object.values(currencies)[0].symbol}</li>
                    </ul>
                </div>`;
                }
            })
    })
    }
    catch(err){
        console.log(err);
    }
}

fetchCountries();
