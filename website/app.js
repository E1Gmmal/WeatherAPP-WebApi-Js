/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'-'+ d.getDate()+'-'+ d.getFullYear();

// Personal API key for OpenWeatherMap API
// write your api key and base URL and ur ready to go

var baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=' ;
var apiKey = '&appid=2fde8c7cf630cf4b4752361b04fd447c';

document.getElementById('generate').addEventListener('click',performAction);
/*callback event listener function */
function performAction(e) {
const ZipCode = document.getElementById('zip').value;
const feelings = document.getElementById('feelings').value;
getWeatherApiFunc(baseURL,ZipCode, apiKey)
    .then(function(data) {
        console.log(data);
        // Add data to post request
        postData('/add', {date:newDate, temp:data.list[0].main.temp, content:feelings })  
        UpdateUI();
    })  
};

// get web api data
const getWeatherApiFunc = async (URL, zip, key)=>{

    const res = await fetch(URL+zip+key)
    try{
        const ResponseObject = await res.json();
        if(ResponseObject.cod != 200)
         alert("Sorry . Error Occured Getting Data From Backend as "+ ResponseObject.message +" ,please try anytime later ");
        return ResponseObject;
    }catch(error) {
        console.log("error occurred from Api", error);
        // handling the error
        alert("Sorry . Error Occured Getting Data From Backend ,please try anytime later")

    }
}

// post data
const postData = async (url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',   // GET, POST DELETE etc
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
    // Body data type must match "Content-Type" header
        body : JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("error",error);
    }
}

// UpdateUI Dynamically
const UpdateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date :  ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperatuer : ${allData.temp}`;
        document.getElementById('content').innerHTML = `MyFeeling is : ${allData.content}`;
    }catch(error){
        console.log("error occurred while getting data from server ", error);
    }
}