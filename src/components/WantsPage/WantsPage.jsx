import './WantsPage.css'
import { useHistory } from 'react-router-dom';

function WantsPage() {
    const history = useHistory();

    //USE STATE


     // HANDLE + BUTTON CLICK


     //HANDLE INPUT FIELD CHANGE


     //HANDLE FORM SUBMIT
    const handleSubmit = () => {
        history.push('/savingsdebts')
    }

    return (
        <>
        <h1>Wants Page</h1>
        <form onSubmit={handleSubmit}>
        {/* START FORM */}
            {/* Dining Out */}

            {/* Clotihg & Jewlery */}

            {/* Drugs (alcohol, THC) */}

            {/* Movie / Events */}

            {/* Memberships */}

            {/* Travel */}

            {/* Subscriptions */}

            {/* Home decor Items */}

            {/* Other */}
        

        {/* END FORM */}
        </form>
        </>
       
    )
}

export default WantsPage;