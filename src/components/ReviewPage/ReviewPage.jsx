import './ReviewPage.css'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ReviewPage() {
    // STORE
    const incomeArray = useSelector(store => store.income);
    const needsArray = useSelector(store => store.needs);
    const wantsArray = useSelector(store => store.wants);
    const savingsDebtsArray = useSelector(store => store.savingsDebts);

    const history = useHistory();
 
    const handleSubmit =() => {
        history.push('/audit')
    }
    
    return (
        <>
        <h1>Review Page</h1>
        <h3>Income</h3>
        <h5>{JSON.stringify(incomeArray)}</h5>
        <br />
        <h3>Needs</h3>
        <h5>{JSON.stringify(needsArray)}</h5>
        <br />
        <h3>Wants</h3>
        <h5>{JSON.stringify(wantsArray)}</h5>
        <br />
        <h3>Savings & Debts</h3>
        <h5>{JSON.stringify(savingsDebtsArray)}</h5>
        <br />



        <button onClick={handleSubmit}>SUBMIT DATA / NEXT PAGE</button>
        </>
        
    )
}

export default ReviewPage;