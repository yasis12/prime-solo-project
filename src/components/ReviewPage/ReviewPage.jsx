import './ReviewPage.css'
import { useHistory } from 'react-router-dom';

function ReviewPage() {
    const history = useHistory();
    // JSON.stringify()
    const handleSubmit =() => {
        history.push('/audit')
    }
    
    return (
        <>
        <h1>Review Page</h1>

        <button onClick={handleSubmit}>SUBMIT DATA / NEXT PAGE</button>
        </>
        
    )
}

export default ReviewPage;