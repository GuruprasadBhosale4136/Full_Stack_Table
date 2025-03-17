
import "bootstrap/dist/css/bootstrap.min.css" 
import Users from './Users'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import CreateUser from './CreateUser'
import EditUser from "./editUser"
import { getUser, deleteUser } from "./redux/userSlice";


const App = () => {

  
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Users />}></Route>
      <Route path='/create' element = {<CreateUser />}></Route>
      <Route path='/edit/:id' element = {<EditUser />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App



