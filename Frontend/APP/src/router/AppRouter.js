import React/*,{useContext,useEffect}*/ from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
   // Navigate
  } from 'react-router-dom';
import { MainPaige} from '../pages/TermsandConditions';
import { ProcessPage } from '../pages/ProcessPage'
export const AppRouter = () => {

  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/*" element={<MainPaige />} />
         {/* <Route exact path="/process"  element={<ProcessPage />} />  */}
      </Routes>
    </div>
  </Router>
  )
}
