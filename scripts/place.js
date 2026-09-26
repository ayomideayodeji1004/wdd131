// Footer: current year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Static weather values (metric)
const temperature = 27; // Celsius
const windSpeed = 10;   // km/h

// Wind chill formula (metric, Environment Canada)
function calculateWindChill(temp, wind) {
  return Math.round((13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)) * 10) / 10;
}

const windChillEl = document.getElementById('windchill');

if (temperature <= 10 && windSpeed > 4.8) {
  windChillEl.textContent = `${calculateWindChill(temperature, windSpeed)}°C`;
} else {
  windChillEl.textContent = 'N/A';
}