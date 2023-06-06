const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');

const temp_status = document.getElementById('temp_status');
const temp_data_val = document.getElementById('temp_data_val');

const middle_layer = document.querySelector('.middle_layer');

const getInfo = async(e) =>{
    e.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText='Please write the name of city'
        middle_layer.classList.add('data_hide')
    }else{
        try{
            // const key = ?  
            let url = 'https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${key}';
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            // const arrData=[
            //     {
            //         "main":{
            //             "temp": 42,
            //         },
            //         "weather":[
            //             {
            //                 "main":"Clear",
            //             }
            //         ],
            //         "name":"Pune",
            //         "sys":{
            //             "country":"IN"
            //         }
            //     },
            // ]

            temp_data_val.innerText = arrData[0].main.temp;
            city_name.innerText = arrData[0].name +  " " + arrData[0].sys.country;

            const tempMood = arrData[0].weather[0].main;
            if(tempMood ==="Clear")
                temp_status.HTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            else if(tempMood=="Rain")
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            else
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            
            middle_layer.classList.remove('data_hide')

        }catch(e){
            console.log(e);
            city_name.innerText='Please write a correct city name'
            middle_layer.classList.add('data_hide')
        }
        
    }

}

submitBtn.addEventListener('click',getInfo);