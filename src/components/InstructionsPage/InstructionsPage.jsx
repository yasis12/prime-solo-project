import './InstructionsPage.css'
import { useHistory } from 'react-router-dom';

function InstructionsPage() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/income')
    }
    // todo: reword the instructions
    // todo: style the button
    return (
        <>
        <div className='instructions-page'>
            <div className='card'>
            <h1 id='title'>How To Use Budget Buddy</h1>
            <p id='under-title'>Budget Buddy can take 1-2 Hours to complete</p>
                <br />
                <ol>
                <li><strong>Enter All Your Transactions:</strong> To get the best insights, it's crucial that you record every single income and expense from the entire previous month. Don't skip any expenses, even if you feel the month was unusual. The more accurate your data, the better your financial insights will be.</li>
                <li><strong>Honesty Is Key:</strong> The success of Budget Buddy relies on your honesty. Your inputs drive the quality of the feedback and insights you receive. Be as honest as possible when filling out the form. This honesty will enable you to set realistic goals and make meaningful financial changes.</li>
                <li><strong>Use Descriptions (Optional):</strong> While descriptions are not mandatory, they can be helpful in the future. Adding a short description of each purchase can help you recall the details later. It's entirely up to you whether you want to use this feature.</li>
                <li><strong>Analyze Your Insights:</strong> After entering your transactions, Budget Buddy will provide insights into your income and spending habits. Use these insights to identify areas where you might need to cut back or allocate more funds.</li>
                <li><strong>Create Your Customized Budget (Not yet available in this applicaiton):</strong> Based on the insights provided, you can create a budget that suits your unique financial needs. This budget will help you reach your specific financial goals effectively.</li>
                <li><strong>Good Luck!</strong> Budget Buddy is here to support your journey to financial stability. Remember that the more honest and detailed you are with your inputs, the more accurate and helpful the tool becomes. Here's to achieving positive financial changes!</li>
                <li><strong>MAKE SURE TO SAVE EACH PAGE BEFORE MOVING ON</strong></li>
                </ol>
                <br />
                <div id='button-container'>
                    <button id='button' onClick={handleClick}>Get Started with Budget Buddy</button>
                </div>
                
            </div>
        </div>
        
        </>
        

    )
}

export default InstructionsPage;