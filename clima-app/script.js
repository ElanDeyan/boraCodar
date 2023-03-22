//@ts-check
"use strict";

const tempNow = document.getElementById('TempNow')
const userLocation = document.getElementById('Location')
/**
 * @type {HTMLImageElement}
 */
// @ts-ignore
const weatherImage = document.getElementById('WeatherImage')
const minTemp = document.querySelector('#TempNow+.min-max .min')
const maxTemp = document.querySelector('#TempNow+.min-max .max')
const windWidget = document.querySelector('[data-widget-type="wind"] .value')
const humidityWidget = document.querySelector('[data-widget-type="humidity"] .value')
const rainWidget = document.querySelector('[data-widget-type="rain"] .value')
const airElementsDiv = document.getElementById('AirPolluents')
const AIR_POLLUENTS = ['co', 'no2', 'o3', 'pm2_5', 'pm10', 'so2']
const airQualityValue = document.querySelector('.quality .value')
const sunriseHour = document.querySelector('.sunrise tspan')
const sunsetHour = document.querySelector('.sunset tspan')
const actualHour = document.querySelector('.sun-time-progress .now tspan')

/**
 * 
 * @param {number} grade 
 * @param {string} polluent 
 */
function createPolluentNode(grade, polluent) {
  const div = document.createElement('div')
  div.classList.add('element')

  const gradeSpan = document.createElement('span')
  gradeSpan.classList.add('grade')
  gradeSpan.textContent = grade.toFixed(1)

  div.appendChild(gradeSpan)

  const polluentSpan = document.createElement('span')
  polluentSpan.classList.add('polluent')
  if(polluent.includes('_')) polluent.replace('_','.')
  polluentSpan.textContent = `${polluent.toLocaleUpperCase()}`

  div.appendChild(polluentSpan)

  return div
}

fetch('https://api.weatherapi.com/v1/forecast.json?key=dac8507bbe2a4114bd9153944232003&q=Salvador&days=1&aqi=yes&alerts=yes')
  .then(res => res.json())
  .catch(err => console.error(err))
  .then(data => {
    console.log(data)
    // @ts-ignore
    tempNow.textContent = data.current.temp_c
    // @ts-ignore
    userLocation.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`
    // @ts-ignore
    weatherImage.src = data.current.condition.icon
    weatherImage.title = data.current.condition.text
    weatherImage.alt = data.current.condition.text
    //@ts-ignore
    maxTemp.textContent = data.forecast.forecastday[0].day.maxtemp_c
    //@ts-ignore
    minTemp.textContent = data.forecast.forecastday[0].day.mintemp_c
    //@ts-ignore
    windWidget.textContent = data.current.wind_kph
    //@ts-ignore
    humidityWidget.textContent = data.current.humidity
    //@ts-ignore
    rainWidget.textContent = data.forecast.forecastday[0].day.daily_chance_of_rain
    // @ts-ignore
    airElementsDiv.innerHTML = null
    let airPolluentsSum = 0
    let iterations = 0
    for (const polluent in data.current.air_quality) {
      if (Object.hasOwnProperty.call(data.current.air_quality, polluent)) {
        if(!(AIR_POLLUENTS.includes(polluent))) continue
        const grade = data.current.air_quality[polluent]
        airPolluentsSum += grade
        iterations++
        // @ts-ignore
        airElementsDiv.appendChild(createPolluentNode(grade, polluent))
      }
    }
    const airPolluentMean = airPolluentsSum / iterations

    // @ts-ignore
    airQualityValue.textContent = airPolluentMean.toFixed(1)
    // @ts-ignore
    sunriseHour.textContent = data.forecast.forecastday[0].astro.sunrise
    // @ts-ignore
    sunsetHour.textContent = data.forecast.forecastday[0].astro.sunset
    const now = new Date()
    // @ts-ignore
    actualHour.textContent = `${now.getHours()}:${now.getMinutes()}`

    const sunriseDate = new Date(data.forecast.forecastday[0].date)
    sunriseDate.setHours(+sunriseHour?.textContent?.slice(0,2))
    sunriseDate.setMinutes(+sunriseHour?.textContent?.slice(3,5))

    const sunsetDate = new Date(data.forecast.forecastday[0].date)
    sunsetDate.setHours(+sunsetHour?.textContent?.slice(0,2))
    sunsetDate.setMinutes(+sunsetHour?.textContent?.slice(3,5))

    // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    // https://stackoverflow.com/questions/19225414/how-to-get-the-hours-difference-between-two-date-objects#:~:text=var%20hours%20%3D%20Math.,the%20two%20dates%20in%20milliseconds.
    const diffSunsetSunriseMinutes = Math.abs(sunsetDate - sunriseDate) / 6e4
    console.log(diffSunsetSunriseMinutes)
  })