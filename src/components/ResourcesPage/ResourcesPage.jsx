import './ResourcesPage.css'
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed';


function ResourcesPage() {
    

    // todo:reword the resources page
    return (
        <>
        <div className='resources-page'>
            <div id='resources-card'>
                <h1>Resources Page</h1>
                <p>This page has a list of various videos I believe will help you achieve financial freedom</p>
                <p>They range from videos about money and videos about understanding how your brain works</p>
                <p>at the end of the day it really comes down to if you can mentally stick to a plan.</p>
                <br /><br />
                <YoutubeEmbed embedId='0KOZepXPjNQ' />
                <br /><br />
                <YoutubeEmbed embedId='F2-l-32vqLc' />
                <br /><br />
                <YoutubeEmbed embedId='ta1RNFB0sFM' />
                <br /><br />
                <YoutubeEmbed embedId='FeRgqJVALMQ' />
                <br /><br />
                <YoutubeEmbed embedId='jvXOOddDg_s' />
                <br /><br />
                <YoutubeEmbed embedId='kXA3zkm-rtk?si=HHgVXmvMh-frGK1q' />
                <br /><br />
                <YoutubeEmbed embedId='zQogOBWkK_E?si=CBX32E-2P3N0QA_q' />
            </div>
        </div>
        
        </>
        
    )
}

export default ResourcesPage;