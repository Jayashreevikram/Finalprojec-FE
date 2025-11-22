import { Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import CreateProject from "./pages/Createproject";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Explore from "./pages/Explore";
import RequireAuth from "./components/RequireAuth";






function App() {
  
  return (
  <>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>  
      <Route path="/login" element={<Login/>}/> 
      <Route path="/signup" element={<Signup/>}/> 
      <Route
  path="/createproject"
  element={
    <RequireAuth>
      <CreateProject />
    </RequireAuth>
  }
/>

<Route
  path="/explore"
  element={
    <RequireAuth>
      <Explore />
    </RequireAuth>
  }
/>

     </Routes>
</>
     
   
  )
}

export default App
