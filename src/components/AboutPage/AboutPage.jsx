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
        <h3>Technologies used</h3>
        <ul>
            <li>JavaScript</li>
            <li>React</li>
            <li>Redux</li>
            <li>Saga</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>PostgreSQL</li>
            <li>Material UI</li>
        <h3>Future Goals:</h3>
          <li>Add tool tips to each input to help user</li>
          <li>Add progress bar</li>
          <li>Add ability to see all inputs and edit them</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
