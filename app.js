//https://ashfull1979.blogspot.com/2021/08/mars-weather-and-how-to-fetch-data.html


const url = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'

const request = $.ajax(url)

request.then(data =>{
    console.log(data)
    const recentSol = data.soles[0]
    console.log(recentSol)
    
    const $date = $('#date')
    $date.html('Terrestrial date: ' + recentSol.terrestrial_date)

    const $max = $('#max')
    $max.html('Max temp: ' + recentSol.max_temp + ' F°')
    
    const $min = $('#min')
    $min.html('Min temp: ' + recentSol.min_temp + ' F°')

    const $weather = $('#weather')
    $weather.html('Atomsphere opacity: ' + recentSol.atmo_opacity)

    })
.catch(error => console.log('Failed Request!!!!! ', error))