//VARIÁVEIS 
const apiKey = "5ae2e3f221c38a28845f05b650fa1262ccb4d33dab82a674a1797978";
const pageLength = 5;

let offset = 0;
let lon = 0;
let lat = 0;
let count = 0;

let campoBusca = document.getElementById('search_form');

//GEONAME
//http://api.opentripmap.com/0.1/en/places/geoname?name=paris&country=fr&apikey=5ae2e3f221c38a28845f05b650fa1262ccb4d33dab82a674a1797978

//LISTA DE LUGARES
//http://api.opentripmap.com/0.1/en/places/bbox?lon_min=2.3488&lon_max=3.3488&lat_min=48.85341&lat_max=49.85341&format=json&apikey=5ae2e3f221c38a28845f05b650fa1262ccb4d33dab82a674a1797978

//EVENTOS
campoBusca.addEventListener('submit', function(event){
    let name = document.getElementById('textbox').value;
    apiGet('geoname', 'name=' + name).then(function (data) {
        if (data.status == "OK") {
            lat = data.lon;
            lon = data.lat;            
            //
            console.log(data)
        }        
        //document.getElementById("info").innerHTML = `<p>${message}</p>`;
    });
    event.preventDefault();
    renderMap(lon, lat)
});


/* 

// FUNÇÕES
function apiGet(method, query) {
    return new Promise(function (resolve, reject) {
        var otmAPI =
            "https://api.opentripmap.com/0.1/en/places/" +
            method +
            "?apikey=" +
            apiKey;
        if (query !== undefined) {
            otmAPI += "&" + query;
        }
        fetch(otmAPI)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    });
}


function onShowPOI(data) {
    let poi = document.getElementById("poi");
    poi.innerHTML = "";
    if (data.preview) {
        poi.innerHTML += `<img src="${data.preview.source}">`;
    }
    poi.innerHTML += data.wikipedia_extracts
        ? data.wikipedia_extracts.html
        : data.info
            ? data.info.descr
            : "No description";

    poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
}

function createListItem(item) {
    let a = document.createElement("a");
    a.className = "list-group-item list-group-item-action";
    a.setAttribute("data-id", item.xid);
    a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
      <p class="list-group-item-text">${getCategoryName(item.kinds)}</p>`;

    a.addEventListener("click", function () {
        document.querySelectorAll("#list a").forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");
        let xid = this.getAttribute("data-id");
        apiGet("xid/" + xid).then(data => onShowPOI(data));
    });
    return a;
}

function loadList() {
    apiGet(
        "radius",
        `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
    ).then(function (data) {
        let list = document.getElementById("list");
        list.innerHTML = "";
        data.forEach(item => list.appendChild(createListItem(item)));
        let nextBtn = document.getElementById("next_button");
        if (count < offset + pageLength) {
            nextBtn.style.visibility = "hidden";
        } else {
            nextBtn.style.visibility = "visible";
            nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
        }
    });
}

function firstLoad() {
    apiGet(
        "radius",
        `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
    ).then(function (data) {
        count = data.count;
        offset = 0;
        document.getElementById(
            "info"
        ).innerHTML += `<p>${count} objects with description in a 1km radius</p>`;
        loadList();
    });
}




document
    .getElementById("search_form")
    .addEventListener("submit", function (event) {
        let name = document.getElementById("textbox").value;
        apiGet("geoname", "name=" + name).then(function (data) {
            let message = "Name not found";
            if (data.status == "OK") {
                //message = data.name + ", " + getCountryName(data.country);
                lon = data.lon;
                lat = data.lat;
                firstLoad();
            }
            document.getElementById("info").innerHTML = `<p>${message}</p>`;
        });
        event.preventDefault();
    });

document
    .getElementById("next_button")
    .addEventListener("click", function () {
        offset += pageLength;
        loadList();
    });  */