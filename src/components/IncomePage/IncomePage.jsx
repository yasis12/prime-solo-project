import './IncomePage.css'
import { useHistory } from 'react-router-dom';

function IncomePage() {
    const history = useHistory();

    const handleSubmit = () => {
        history.push('/needs')
    }
    
    return (
        <>
     <h1>Income Page</h1>
        <form onSubmit={handleSubmit}>
            <div className='wagesAfterTax form-field'>
                <label>Wages After Tax: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
            <div className='otherIncome form-field'>
                <label>Other Income: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
            <button type='submit'>NEXT PAGE</button>
        </form>

        </>
    )
}

export default IncomePage;
