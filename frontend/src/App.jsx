import './index.css'
import { AppRouter } from './routes/AppRouter'
import { AuthProvider } from "./context/AuthContext"; //Naheeda

function App() {
  return (
    <>
         <AuthProvider>  {/* Naheeda hat Authprovider hinzugefügt*/}
               <AppRouter></AppRouter>
         </AuthProvider>
    </>
  )
}

export default App
