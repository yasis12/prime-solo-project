import React from 'react';
import './AboutPage.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="about-page">
      <div id='about-card'>
        <h1>Technologies used</h1>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Node</li>
          <li>axios</li>
          <li>Postico</li>
          <li>Youtube Embed</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
