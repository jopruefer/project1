let row = 1;

document.querySelector('.plus-btn').addEventListener("click", () => {
    const input = document.querySelector('.add-input-container');
    input.classList.toggle('bounceIn');
    input.classList.toggle('input-display');
});

document.getElementById('add-btn').addEventListener("click", addTxt);

function addTxt() {
    const input = document.querySelector('.todo-input').value;
    let length = document.getElementById("tasks-list").getElementsByTagName("li").length;
    if (input != "") {
        if (length < 9) {
        let node = document.createElement("li");
        let textnode = document.createTextNode("- " + input);
        node.appendChild(textnode);
        node.setAttribute("id", "contentLi" + row);
        document.getElementById("tasks-list").appendChild(node);

        let removeTask = document.createElement('input');
        removeTask.setAttribute('type', 'button');
        removeTask.setAttribute('value', 'x');
        removeTask.setAttribute('id', 'removeButton');
        removeTask.setAttribute('onClick', "deleterow(" + row + ");");

        node.appendChild(removeTask);
        row++;
        document.querySelector('.todo-input').value = "";
        } else {
            alert("There can only be 9 todos.");
        }
    } else {
        alert("Please insert a value!");
    }
}

function deleterow(id) {
    document.getElementById("contentLi" + id).remove();
}

function updateTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const h = hours < 10 ? "0" + hours : hours;
    const m = minutes < 10 ? "0" + minutes : minutes;
    document.querySelector(".time").innerHTML = h + ":" + m;

    setTimeout(updateTime, 1000);
}

 function getWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                apiUse(position.coords.latitude, position.coords.longitude);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

function apiUse(lat, lon) {
    let weather = {
        icon: "",
        temp: ""
    }
    
    const img = document.getElementById('weather-icon');
    const temp = document.getElementById('temp');

    const apiKey = "7a3a1137bcbe8fc5cbf873cde8058caa";
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey)
    .then((response) => {
        return response.json();
    })
    .then(myJson => {
        weather.temp = myJson.main.temp - 273;
        weather.icon = myJson.weather[0].icon;
        console.log(myJson);
    })
    .then(() => {
        let url = "http://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
        img.src = url;
        temp.innerHTML = Math.round(weather.temp) + "°C";
    })
}

function mainLoop() {
    updateTime();
    getWeather();
}

mainLoop();



