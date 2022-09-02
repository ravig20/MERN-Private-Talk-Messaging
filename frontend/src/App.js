import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Chats from "./Components/chats/Chats";
import Singupotpchecker from "./Components/checkOtp/Singupotpchecker";
import Loginpage from "./Components/login/Loginpage";
import Pagenotfound from "./Components/PageNotFound/Pagenotfound.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {FatchUserChatAction, meDataAction} from "../src/Action/userAction";
import ForgotPass from "./Components/ForgotPassword/ForgotPass";
import Help from "./Components/Help/Help";
import NewHelp from "./Components/Help/Help";
function App() {
  const dispatch = useDispatch();
  
  const {isAuthenticated} = useSelector((store)=>store.Medata);
  useEffect(()=>{
    dispatch(meDataAction());
  },[dispatch])

  useEffect(() => {
    if(isAuthenticated === true){
      dispatch(FatchUserChatAction());
    }
  }, [dispatch,isAuthenticated])

  return (
    <BrowserRouter>
    
    <Routes>
    
      <Route index path="/" element={<Loginpage/>}/>
      <Route path="/chat" element={isAuthenticated?<Chats/>:<Loginpage/>}/>
      <Route path="/verify" element={<Singupotpchecker/>} />
      <Route path="/forgotpassword" element={<ForgotPass/>} />
      <Route path="/help" element={<Help/>} />
      
      
      <Route path="*" element={<Pagenotfound/>}/>
      
    </Routes>
   
    </BrowserRouter>
  );
}

export default App;
