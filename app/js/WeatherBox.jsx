import React, {Component} from 'react';

class WeatherBox extends Component {
    constructor(props) {
        super(props);
        
        this.toggleFahrenheit = this.toggleFahrenheit.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        
        this.state = {
            city: null,
            desc: null,
            temp: null
        };
    }
    
    //  convert our props into the current state (usefful for fahrenheit/celsius switching)
    componentWillReceiveProps(props) {
        console.log(props);
        this.setState({
            city: props.weather.name,
            desc: props.weather.weather,
            temp: props.weather.main.temp
        });
    }
    
    //  turn weather array into human-readable string
    parseWeatherDescriptions(weather) {
        var desc = weather[0].description;
        for (var i = 1; i < weather.length - 1; i++) {
            desc += `, ${weather[i].description}`;
        }
        if (weather.length > 1) desc += ` and ${weather[weather.length - 1].description}`;
        return desc.charAt(0).toUpperCase() + desc.slice(1);
    }
    
    //  swap the fahrenheit and celsius positions
    toggleFahrenheit() {
        this.setState({
            temp: [this.state.temp[1], this.state.temp[0]]
        });
    }
    
    render() {
        var theme = this.props.theme;
        
        var styles = {
            'weather-box-outer': {
                position: 'absolute',
                left: 10, right: 10, top: '50%',
                minWidth: '250px',
                maxWidth: '500px',
                margin: 'auto',
                transform: 'translateY(-50%)',
                backgroundColor: theme['bg'],
                color: theme['fg'],
                textAlign: 'center',
            },
            'weather-box-inner': {
                margin: '30px'
            },
            'weather-box-header': {
                fontSize: '14pt',
            },
            'weather-box-header-city': {
                fontWeight: 'bold',
                color: theme['highlight']
            },
            'weather-box-description': {
                color: theme['alt'],
                margin: '20 0'
            },
            'weather-box-temperature': {
                fontSize: '30pt',
            },
            'weather-box-temperature-alt': {
                fontSize: '10pt',
                color: theme['alt'],
            },
            'loading-box': {
                fontSize: '30pt'
            },
            'temperature-toggle-link': {
                color: theme['highlight']
            }
        };

        return <div style={styles['weather-box-outer']}>
            <div style={styles['weather-box-inner']}>
                { this.state.temp ? <div>
                    <div style={styles['weather-box-header']}>Weather for <span style={styles['weather-box-header-city']}>{this.state.city}</span></div>
                    <div style={styles['weather-box-description']}>
                        {this.parseWeatherDescriptions(this.state.desc)}
                    </div>
                    <div style={styles['weather-box-temperature']}>{this.state.temp[0].value}&deg; {this.state.temp[0].unit}</div>
                    <div style={styles['weather-box-temperature-alt']}>({this.state.temp[1].value}&deg; {this.state.temp[1].unit}) <a href="#" onClick={this.toggleFahrenheit} style={styles['temperature-toggle-link']}>Swap</a></div>
                </div> : <div style={styles['loading-box']}>
                    Loading...
                </div> }
            </div>
        </div>;
    }
}

export default WeatherBox;