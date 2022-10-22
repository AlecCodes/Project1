//https://ashfull1979.blogspot.com/2021/08/mars-weather-and-how-to-fetch-data.html

const curiosity_url = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'
const perserverance_url = "https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json"

const curiosity_request = $.ajax(curiosity_url)
const perserverance_request = $.ajax(perserverance_url)

let sol = 0
let current_rover = "curiosity"

function render_rover(){
    if (current_rover === "curiosity"){
        console.log("curiosity selected")
        curiosity_render()
    } else if (current_rover === "perserverance"){
        console.log("perserverance selected")
        perserverance_render()
    }
}

function perserverance_render(){
    perserverance_request.then(data =>{
        flipped_sols = data.sols.reverse()
        p_recentSol = flipped_sols[sol]
        console.log(p_recentSol)

        const $pdate = $("#sol1date")
        $pdate.html("Terrestrial date of last downlink from Perserverance: " + p_recentSol.terrestrial_date)

        $pmax = $('#sol1max')
        $pmax.html('Perserverance max temp: ' + p_recentSol.max_temp + ' F°')

        $pmin = $('#sol1min')
        $pmin.html('Perserverance min temp: ' + p_recentSol.min_temp + ' F°')

        $ppressure = $('#sol1pressure')
        $ppressure.html('Perserverence atmospheric pressure reading: ' + p_recentSol.pressure)

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

        const $date = $('#sol1date')
        $date.html('Terrestrial date of last downlink from Curiosity: ' + recentSol.terrestrial_date)

        const $max = $('#sol1max')
        $max.html('Curiosity Max temp: ' + recentSol.max_temp + ' F°')
        
        const $min = $('#sol1min')
        $min.html('Curiosity Min temp: ' + recentSol.min_temp + ' F°')

        const $pressure = $('#sol1pressure')
        $pressure.html('Curiosity atomspheric pressure reading: ' + recentSol.pressure)

        // //day2
        // const $date2 = $('#sol2date')
        // $date2.html('Terrestrial date: ' + previousSol.terrestrial_date)

        // const $max2 = $('#sol2max')
        // $max2.html('Max temp: ' + previousSol.max_temp + ' F°')
        
        // const $min2 = $('#sol2min')
        // $min2.html('Min temp: ' + previousSol.min_temp + ' F°')

        // const $weather2 = $('#sol2weather')
        // $weather2.html('Atomsphere opacity: ' + previousSol.atmo_opacity)

        })
    .catch(error => console.log('Failed Request!!!!! ', error))}





//event listeners
$("#c_rover_button").click(function(){
    current_rover = "curiosity"
    render_rover()
})
$("#p_rover_button").click(function(){
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