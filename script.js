
const regionButtonsDiv = document.querySelector('.btn-group');
const flagsDiv = document.querySelector('.flags') ;
const cardContainer = document.querySelector('.card-container');
const select = document.querySelector('select');
const section = document.querySelector('section');

const regions = []
const url = 'https://restcountries.com/v3/all';

const fetchCountries = async () =>{
    try{
        const res = await fetch(url);
        const countries = await res.json();
        countries.forEach((country) => {
            select.innerHTML += ` <option>${country.name.common}</option>`;
            if(!regions.includes(country.region)) {
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
        });
    }
    catch(err){
        console.log('boom');
    }
}

fetchCountries();



regionButtonsDiv.addEventListener('click', async (e)=>{
    flagsDiv.innerHTML = '';
    try{
        const res = await fetch(url);
        const countries = await res.json();
        const continent = e.target.innerText;
        countries.forEach((country) => {
            if(country.region === continent){
                flagsDiv.innerHTML += 
                            `<div class="col-lg-2 col-md-3 col-sm-4 d-flex justify-content-center p-2"> 
                                <img src="${country.flags[1]}" alt="" width="50px" height="50px"/> 
                            </div>` ;
            }
        }) 
    }catch(err){
        console.log(err);
    }       
})

flagsDiv.addEventListener('click', async (e)=>{
    try{
        const res = await fetch(url);
        const countries = await res.json();
        countries.forEach((country) => {
            if(country.flags[1] === e.target['src']){
                const {name:{common}, region, capital, flags, languages,currencies } = country;
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
    }catch(err){
        console.log(err);
    }
})

select.addEventListener('change', async()=>{
    const selectedCountry = select.options[select.selectedIndex].text;
    try{
        const res = await fetch(url);
        const countries = await res.json();
        countries.forEach((country) => {
            if(country.name.common === selectedCountry){
                const {name:{common}, region, capital, flags, languages,currencies } = country;
                cardContainer.innerHTML = 
                ` <div class="card" style="width: 18rem;">
                <img src="${flags[1]}" class="card-img-top" alt="...">
                <ul class="list-group  text-center list-group-flush">
                  <li class="list-group-item"> ${common}</li>
                  <li class="list-group-item"><i class="fa-solid fa-earth-europe"></i> ${region}</li>
                  <li class="list-group-item"><i class="fa-solid fa-landmark-flag"></i> ${capital}</li>
                  <li class="list-group-item"><i class="fa-solid fa-language"></i> ${Object.values(languages)}</li>
                 <li class="list-group-item"><i class="fa-solid fa-money-bill-1-wave"></i> ${Object.values(currencies)[0].name} ${Object.values(currencies)[0].symbol}</li>
                </ul>
            </div>`;
            }
        })
    }catch(err){
        console.log(err);
    }

})
