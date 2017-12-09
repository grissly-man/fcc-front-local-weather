import React from 'react';
import ReactDOM from 'react-dom';
import WeatherBox from './js/WeatherBox';
import ArtistTag from './js/ArtistTag';

/**
 * ajax wrapper
 */
function getWeatherFromGeoLocation(coords, cb) {
    var apiURI = "https://fcc-weather-api.glitch.me/api/current?";
    apiURI += `lat=${coords.latitude}&lon=${coords.longitude}`;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            var json = JSON.parse(req.responseText);  // our API sends a string which needs to be parsed
            
            // convert to fahrenheit, and indicate main temperature preference
            var temp = { value: json.main.temp, unit: "C" };
            json.main.temp = [
                temp,
                { value: convertToFahrenheit(json.main.temp), unit: "F" }
            ];
            
            // normalize response
            return cb(json);
        }
    };
    req.open("GET", apiURI, true);
    req.send();
}

function convertToFahrenheit(temp) {
    return 1.8 * temp + 32;
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        
        this.componentDidMount = this.componentDidMount.bind(this);
        
        this.state = {
            err: false,
            weather: null,
            pos: null,
        }
    }
    
    componentDidMount() {
        var page = this;
        if (!navigator.geolocation) return this.setState({
            err: true
        });
        
        navigator.geolocation.getCurrentPosition(pos => {
            getWeatherFromGeoLocation(pos.coords, weather => {
                return page.setState({
                    weather: weather
                });
            }, function() {
                
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
    }
    
    render() {
        // style the weather app according to the weather description
        var themes = {
            'snow': {
                alt: "#aaa",
                highlight: "f00",
                bg: "#e4f0f5",
                fg: "#000",
                pageBg: "#fff",
                pageColor: "f00"
            },
            'rain': {
                alt: "#eee",
                highlight: "191970",
                bg: "#ccc",
                fg: "#000",
                pageBg: "#708090",
                pageColor: "#ccc"
            },
            'thunderstorm': {
                alt: "#999",
                highlight: "yellow",
                bg: "#666",
                fg: "#dde",
                pageBg: "#335",
                pageColor: "yellow",
            },
            'clouds': {
                alt: "#aaa",
                highlight: "#2c91de",
                bg: "#fff",
                fg: "#000",
                pageBg: '#ccc',
                pageColor: "#fff"
            },
            'drizzle': {
                alt: "#aaa",
                highlight: "#55a",
                bg: "#fff",
                fg: "#000",
                pageBg: '#ccc',
                pageColor: "#fff"
            },
            'mist': {
                alt: "#aaa",
                highlight: "#55a",
                bg: "#fff",
                fg: "#000",
                pageBg: '#ccc',
                pageColor: "#fff"
            },
            'clear': {
                alt: "#aaa",
                highlight: "#2c91de",
                bg: "#fff",
                fg: "#000",
                pageBg: "#2c91de",
                pageColor: "#fff"
            },
            'default': {
                alt: "#aaa",
                highlight: "#2c91de",
                bg: "#fff",
                fg: "#000",
                pageBg: "#2c91de",
                pageColor: "#fff"
            }
        };
        
        var theme = this.state.weather ? themes[this.state.weather.weather[0].main.toLowerCase()] || themes['default'] : themes['default'];
        
        var styles = {
            "page-style": {
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
                padding: '0px',
                margin: '0px',
                backgroundColor: theme['pageBg'],
                fontFamily: '"Century Gothic", Monaco, sans-serif',
                overflow: "hidden",
                color: theme['pageColor'] || theme['highlight']
            }
        };
        
        return <div style={styles['page-style']}>
            <WeatherBox theme={theme} weather={this.state.weather} />
            <ArtistTag />
        </div>;
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('app')
);