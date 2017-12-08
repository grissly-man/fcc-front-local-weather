import React from 'react';
import ReactDOM from 'react-dom';
import ArtistTag from './js/ArtistTag';
import QuoteBox from './js/QuoteBox';

var styles = {
    "page-style": {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        padding: '0px',
        margin: '0px',
        backgroundColor: "FF7F50",
        fontFamily: '"Century Gothic", Monaco, sans-serif',
        overflow: "hidden"
    }
};

ReactDOM.render(
    <div style={styles['page-style']}>
        <QuoteBox />
        <ArtistTag />
    </div>,
    document.getElementById('app')
);