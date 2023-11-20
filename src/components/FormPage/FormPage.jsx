import React from 'react';
import IncomePage from '../IncomePage/IncomePage';
import NeedsPage from '../NeedsPage/NeedsPage';
import WantsPage from '../WantsPage/WantsPage';
import SavingsDebtsPage from '../SavingsDebtsPage/SavingsDebtsPage';

function FormPage() {
  return (
<>
<IncomePage />
<NeedsPage />
<WantsPage />
<SavingsDebtsPage />
</>
  );
}

export default FormPage;