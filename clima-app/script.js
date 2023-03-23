//@ts-check
"use strict";

import convertTime12to24 from './js/vendor.js'

const airQualityColors = new Map([
  [1,{
    value: "Good",
    color: 'hsl(162, 71%, 73%)'
  }],
  [2,{
    value: "Moderate",
    color: 'hsl(62, 71%, 73%)'
  }],
  [3,{
    value: "Unhealthy for Sensitive Groups",
    color: 'hsl(36, 71%, 73%)'
  }],
  [4,{
    value: "Unhealthy",
    color: 'hsl(0, 71%, 73%)'
  }],
  [5,{
    value: "Very Unhealthy",
    color: "hsl(250, 35%, 73%)"
  }],
  [6,{
    value: "Hazardous",
    color: "hsl(0, 61%, 61%)"
  }]
])

const airLevelText = document.querySelector('[data-widget-type="air-quality"] .level')

const weekWeatherWidget = document.querySelector('[data-widget-type="week-weather"]')

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
 * @type {SVGCircleElement}
 */
// @ts-ignore
const semiCircleSunTime = document.querySelector('.sun-time-progress .sun-radius')

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

/**
 * 
 * @param {number} dayWeek 
 * @param {string} imgSrc 
 * @param {number} max 
 * @param {number} min 
 */
function createLittleTemperatureWidget(dayWeek, imgSrc, imgAlt, max, min) {
  const dayMap = new Map([
    [0,"Sunday"],
    [1,"Monday"],
    [2,"Tuesday"],
    [3,"Wednesday"],
    [4,"Thursday"],
    [5,"Friday"],
    [6,"Saturday"]
  ])
  const weatherDiv = document.createElement('div')
  weatherDiv.classList.add('weather')
  weatherDiv.dataset.day = dayMap.get(dayWeek)

  const weekDaySpan = document.createElement('span')
  weekDaySpan.classList.add('day')
  weekDaySpan.textContent = dayMap.get(dayWeek) - 1 === (new Date().getDay()) ? "Tomorrow" : dayMap.get(dayWeek)

  weatherDiv.appendChild(weekDaySpan)

  const img = document.createElement('img')
  img.src = imgSrc
  img.decoding = 'async'
  img.classList.add('weather-icon')
  img.alt = imgAlt

  weatherDiv.appendChild(img)

  const minMaxDiv = document.createElement('div')
  minMaxDiv.classList.add('min-max')

  weatherDiv.appendChild(minMaxDiv)

  const maxSpan = document.createElement('span')
  maxSpan.classList.add('max')
  maxSpan.textContent = max

  minMaxDiv.appendChild(maxSpan)

  const minSpan = document.createElement('span')
  minSpan.classList.add('min')
  minSpan.textContent = min

  minMaxDiv.appendChild(minSpan)

  return weatherDiv
}

fetch('https://api.weatherapi.com/v1/forecast.json?key=dac8507bbe2a4114bd9153944232003&q=Salvador&days=3&aqi=yes&alerts=yes')
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
    sunriseHour.textContent = convertTime12to24(data.forecast.forecastday[0].astro.sunrise)
    // @ts-ignore
    sunsetHour.textContent = convertTime12to24(data.forecast.forecastday[0].astro.sunset)
    const now = new Date()
    // @ts-ignore
    actualHour.textContent = `${now.getHours()}:${now.getMinutes()}`

    const sunriseDate = new Date(data.forecast.forecastday[0].date)
    // @ts-ignore
    sunriseDate.setHours(+sunriseHour?.textContent?.slice(0,2))
    // @ts-ignore
    sunriseDate.setMinutes(+sunriseHour?.textContent?.slice(3,5))

    const sunsetDate = new Date(data.forecast.forecastday[0].date)
    // @ts-ignore
    sunsetDate.setHours(+sunsetHour?.textContent?.slice(0,2)) 
    // @ts-ignore
    sunsetDate.setMinutes(+sunsetHour?.textContent?.slice(3,5))

    // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    // https://stackoverflow.com/questions/19225414/how-to-get-the-hours-difference-between-two-date-objects#:~:text=var%20hours%20%3D%20Math.,the%20two%20dates%20in%20milliseconds.
    // @ts-ignore
    const diffSunsetSunriseMinutes = Math.abs(sunsetDate - sunriseDate) / 6e4
    console.log(diffSunsetSunriseMinutes)

    // @ts-ignore
    const sunTimeRadius = semiCircleSunTime.getBBox().width / 2
    const sunTimeSemiCircunferencePX = (2 * Math.PI * sunTimeRadius) / 2

    const airLevel = airQualityColors.get(data.current.air_quality["us-epa-index"])?.value
    const airColor = airQualityColors.get(data.current.air_quality["us-epa-index"])?.color

    // @ts-ignore
    airLevelText.textContent = airLevel
    // @ts-ignore
    document.documentElement.style.setProperty('--air-level-color', airColor)

    for (const day in data.forecast.forecastday) {
      if (Object.hasOwnProperty.call(data.forecast.forecastday, day)) {
        if(day === 0) continue
        const dayData = data.forecast.forecastday[day]

        const dayWeek = new Date(`${dayData.date}T00:00`).getDay()

        const weatherIconSrc = dayData.day.condition.icon
        const weatherIconAlt = dayData.day.condition.text

        const dayMax = dayData.day.maxtemp_c
        const dayMin = dayData.day.mintemp_c

        weekWeatherWidget?.appendChild(createLittleTemperatureWidget(dayWeek, weatherIconSrc, weatherIconAlt, dayMax, dayMin))
      }
    }
  })