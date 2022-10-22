//https://ashfull1979.blogspot.com/2021/08/mars-weather-and-how-to-fetch-data.html


const url = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'

const request = $.ajax(url)

let sol = 0

function render(){request.then(data =>{
        console.log(data)
        const recentSol = data.soles[sol]
        const previousSol = data.soles[sol + 1]
        console.log(recentSol)
        //day1

        const $rads = $('#rads')
        $rads.html('Radiation level: ' + recentSol.local_uv_irradiance_index)

        const $date = $('#sol1date')
        $date.html('Terrestrial date: ' + recentSol.terrestrial_date)

        const $max = $('#sol1max')
        $max.html('Max temp: ' + recentSol.max_temp + ' F°')
        
        const $min = $('#sol1min')
        $min.html('Min temp: ' + recentSol.min_temp + ' F°')

        const $weather = $('#sol1weather')
        $weather.html('Atomsphere opacity: ' + recentSol.atmo_opacity)

        //day2
        const $date2 = $('#sol2date')
        $date2.html('Terrestrial date: ' + previousSol.terrestrial_date)

        const $max2 = $('#sol2max')
        $max2.html('Max temp: ' + previousSol.max_temp + ' F°')
        
        const $min2 = $('#sol2min')
        $min2.html('Min temp: ' + previousSol.min_temp + ' F°')

        const $weather2 = $('#sol2weather')
        $weather2.html('Atomsphere opacity: ' + previousSol.atmo_opacity)

        })
    .catch(error => console.log('Failed Request!!!!! ', error))}

render()

$("#scrollback").click(function() {
    sol += 1;
    render()
})
$('#scrollforward').click(function(){
    if (sol > 0){
        sol -= 1;
    }
    render()
})