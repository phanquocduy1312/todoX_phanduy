import {Toaster} from 'sonner';
import {BrowserRouter,Routes,Route} from 'react-router';
import HomePage from './pages/HomePage.jsx';
import NotFound from '/src/pages/NotFound.jsx';
function App() {


  return (
    <>
    <Toaster position='top-right' richColors duration={3000}/>
   
 <BrowserRouter>
 <Routes>
  <Route 
  path='/'
  element={<HomePage/>}
  />
    <Route 
  path='*'
  element={<NotFound/>}
  />
    
 </Routes>
 </BrowserRouter>
    </>
  )
}

export default App
