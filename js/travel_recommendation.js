const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".form-search");
const recommendationSection = document.querySelector(".recommendation");
let textHTML = "";
let searchValue = null;

const loadJson = async () => {
    await fetch("/travel_recommendation_api.json")
        .then((res) => res.json())
        .then((data) => {
            displayCities(data.countries);
        })
        .catch((err) => console.error("Unexpected error"));
};

const handleChangeInput = (e) => {
    if (e.target.value.trim() != "") {
        searchValue = e.target.value.trim().toLowerCase();
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchValue == null) {
    }

    recommendationSection.innerHTML = "";
    let result;
    await fetch("../public/travel_recommendation_api.json")
        .then((res) => res.json())
        .then((data) => {
            result = data;
        })
        .catch((err) => console.error("Unexpected error"));

    switch (searchValue) {
        case "country":
        case "countries":
            displayCities(result.countries);
            break;
        case "beach":
        case "beaches":
            displayBeaches(result.beaches);
            break;
        case "temples":
        case "temple":
            displayTemples(result.temples);
            break;
    }
};

const displayCities = (result) => {
    return result.forEach((e) => {
        e.cities.forEach((info) => {
            recommendationSection.innerHTML += `
           
                <figure>
                    <h2>${info.name}</h2>
                    <img src="${info.imageUrl}" alt="" />
                    <figcaption>${info.description}</figcaption>
                </figure>
          
        `;
        });
    });
};

const displayBeaches = (beaches) => {
    return beaches.forEach((info) => {
        recommendationSection.innerHTML += `
                <figure>
                    <h2>${info.name}</h2>
                    <img src="${info.imageUrl}" alt="" />
                    <figcaption>${info.description}</figcaption>
                </figure>
          
        `;
    });
};

const displayTemples = (temples) => {
    return temples.forEach((info) => {
        recommendationSection.innerHTML += `
                <figure>
                    <h2>${info.name}</h2>
                    <img src="${info.imageUrl}" alt="" />
                    <figcaption>${info.description}</figcaption>
                </figure>
          
        `;
    });
};

searchForm.addEventListener("submit", handleSubmit);
loadJson();

// EVENT LISTENER
searchInput.addEventListener("change", handleChangeInput);
searchForm.addEventListener("submit", handleSubmit);
