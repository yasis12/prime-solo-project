import './NeedsPage.css'
import { useHistory } from 'react-router-dom';

function NeedsPage() {
    const history = useHistory();

    const handleSubmit = () => {
        history.push('/wants')
    }
    return (
        <>
         <h1>Needs Page</h1>
         <form onSubmit={handleSubmit}>
            <div className='rentMortgage form-field'>
                <label>Rent | Mortgage: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
            <div className='rent/homeInsurance form-field'>
                <label>Rental Home Insurance: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
            <button type='submit'>NEXT PAGE</button>
        </form>

        </>
       

    )
}

export default NeedsPage;