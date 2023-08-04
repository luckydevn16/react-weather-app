import React, {useState} from 'react';

const api = {
  key: 'd1de8f9386d03f34296e106bd799d18d',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(weather);
      })
      .catch(err => console.error(err));
    }
  }

  const dateBuilder = (d) => {
    const months = [
      'January', 'February', 'March', 'April', 
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
      'Thursday', 'Friday', 'Saturday', 
    ]
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div className='app'>
      <main>
        <h1 className='main-heading'>Weather Now</h1>
        <div className='search-box'>
          <input 
            type="text"
            className='search-bar'
            placeholder="Enter location..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyUp={search}
          />
        </div>
        <div className='app-container'>
          {
            (typeof weather.main != "undefined") ? (
            <div className={
              (typeof weather.main != "undefined") 
                ? ((weather.main.temp > 16) 
                  ? 'basic-part warm' 
                  : 'basic-part') 
                : 'basic-part'
              }>
              <div className='location-wrapper'>
                <p className='date'>
                  {dateBuilder(new Date())}
                </p>
                <h3 className='location'>
                  <img src={require('./assets/location.png')} className="location-img" alt="location" />
                  {weather.name}, {weather.sys.country}
                </h3>
              </div>
              <div className='temp-wrapper'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="weather-img" alt={weather.weather[0].description} />
                <h2 className="temp">
                  {Math.round(weather.main.temp)}°C
                </h2>
                <p className='weather-description'>
                  {weather.weather[0].description}
                </p>
              </div>
            </div>
            ) : (
              <div className='basic-part warm'>
                <div className='location-wrapper'>
                  <p className='date'>
                    {dateBuilder(new Date())}
                  </p>
                </div>
              </div>
            )
          }

          {
            (typeof weather.main != "undefined") ? (
            <div className="details-part">
              <div className="details-row">
                <h4 className="details-name">
                  FEELS LIKE
                </h4>
                <p className="details-value">
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              <div className="details-row">
                <h4 className="details-name">
                  HUMIDITY
                </h4>
                <p className="details-value">
                  {weather.main.humidity}%
                </p>
              </div>
              <div className="details-row">
                <h4 className="details-name">
                  PRESSURE
                </h4>
                <p className="details-value">
                  {Math.round(weather.main.pressure * 0.75)} mmHg
                </p>
              </div>
              <div className="details-row">
                <h4 className="details-name">
                  WIND
                </h4>
                <p className="details-value">
                  {weather.wind.speed} m/s 
                </p>
              </div>
            </div>
            ) : ('')
          }
        </div>
        <div className="contribution-data">
          <p>
            Data provived by 
            <a className="contribution-link" href="https://openweathermap.org/api" target="_blank" rel="noreferrer">
              <img src={require('./assets/logo_white_cropped.png')} className="api-logo" alt="API Logo" />
            </a>
          </p>
          <p>
            App made by 
            <a className="contribution-link" href="https://luckydevn16.github.io/portfolio/" target="_blank" rel="noreferrer">
              luckydevn16
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
