//https://ashfull1979.blogspot.com/2021/08/mars-weather-and-how-to-fetch-data.html

const curiosity_url = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'
const perserverance_url = "https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json"
const insight_url = "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0"
const black_reticle_url = "https://cdn3.iconfinder.com/data/icons/maps-and-navigation-solid-2/48/58-512.png"
const red_reticle_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Crosshairs_Red.svg/1024px-Crosshairs_Red.svg.png"

const curiosity_model = '<iframe src="https://mars.nasa.gov/gltf_embed/24584" width="100%" height="450px" frameborder="0" />'
const insight_model = "<iframe src='https://solarsystem.nasa.gov/gltf_embed/2380' width='100%' height='450px' frameborder='0' />"
const perserverance_model = "<iframe src='https://solarsystem.nasa.gov/gltf_embed/2380' width='100%' height='450px' frameborder='0' />"


const curiosity_request = $.ajax(curiosity_url)
const perserverance_request = $.ajax(perserverance_url)
const insight_request = $.ajax(insight_url)

let sol = 0
//add a feature so each button click renders the most recent 
let current_rover = "curiosity"

function clear_reticle(){
    $(".reticle").html(`<img src = ${black_reticle_url}>`)
}

function render_rover(){
    if (current_rover === "curiosity"){
        curiosity_render()
        clear_reticle()
        $('#C').html(`<img src = ${red_reticle_url}>`)
    } else if (current_rover === "perserverance"){
        perserverance_render()
        clear_reticle()
        $('#P').html(`<img src = ${red_reticle_url}>`)
    } else if (current_rover === "insight"){
        insight_render()
        clear_reticle()
        $('#I').html(`<img src = ${red_reticle_url}>`)
    }
}

function insight_render(){
    insight_request.then(data => {
        const sol_keys = data.sol_keys

        const i_recentSol = data[sol_keys[sol_keys.length - 1 - sol]] //grab the last element, and deincrement by value of sol
        console.log(i_recentSol)

        $("#sol1date").html("Terrestrial date of most recent InSight downlink " + i_recentSol.First_UTC.slice(0,10))
        $("#sol1max").html("max: " + i_recentSol.AT.mx + ' F°')
        $("#sol1min").html("min: " + i_recentSol.AT.mn +' F°')
        $("#sol1pressure").html("pressure: " + i_recentSol.PRE.av)
        $('h1').html("InSight Lander")
        $('h2').html("Location: Elysium Planitia")
    })
}


function perserverance_render(){
    perserverance_request.then(data =>{
        const sol_list = data.sols
        const p_recentSol = sol_list[sol_list.length-1 - sol]
        console.log(p_recentSol)
        
        $("#sol1date").html("Terrestrial date of last downlink from Perserverance: " + p_recentSol.terrestrial_date)

        $('#sol1max').html('Perserverance max temp: ' + p_recentSol.max_temp + ' F°')

        $('#sol1min').html('Perserverance min temp: ' + p_recentSol.min_temp + ' F°')

        $('#sol1pressure').html('Perserverence atmospheric pressure reading: ' + p_recentSol.pressure)
        $('h1').html('Perserverance Rover')
        $("h2").html('Location: Jezero Crater')

    })
    .catch(error => console.log("Oh no!!", error))
}

function curiosity_render(){curiosity_request.then(data =>{
 
        const recentSol = data.soles[sol]
        //const previousSol = data.soles[sol + 1]
 
        //day1
        console.log(recentSol)

        const $rads = $('#rads')
        $rads.html('Radiation level: ' + recentSol.local_uv_irradiance_index)
        if (recentSol.local_uv_irradiance_index === 'High'){
            $rads.css('color','red')
        } else {
            $rads.css('color','black')
        }

        $('#sol1date').html('Terrestrial date of last downlink from Curiosity: ' + recentSol.terrestrial_date)

        $('#sol1max').html('Curiosity Max temp: ' + recentSol.max_temp + ' F°')
        
        $('#sol1min').html('Curiosity Min temp: ' + recentSol.min_temp + ' F°')

        $('#sol1pressure').html('Curiosity atomspheric pressure reading: ' + recentSol.pressure)
        $('h1').html('Curiosity Rover')
        $('h2').html('Location: Gale Crater')

        })
.catch(error => console.log('Failed Request!!!!! ', error))
}





//event listeners
$("#I").click(function(){
    current_rover = "insight"
    render_rover()    
})

$("#C").click(function(){
    current_rover = "curiosity"
    render_rover()
})
$("#P").click(function(){
    current_rover = "perserverance"
    render_rover()
})


$("#scrollback").click(function() {
    sol += 1;
    render_rover()
})
$('#scrollforward').click(function(){
    if (sol > 0){
        sol -= 1;
        render_rover()
        }
})