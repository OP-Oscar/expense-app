import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

//auth
import AuthContext from "./store/authContext";

//components
import Header from './components/Header'
import Home from './components/Home'
import Statement from './components/Statement'
import ExpenseForm from './components/ExpenseForm'
import SignInForm from "./components/SignInForm";


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/signin' element={!authCtx.token ? <SignInForm/> : <Navigate to='/'/>}/>

        <Route path='/tracker' element={authCtx.token ? <ExpenseForm/> : <Navigate to='/auth'/>}/>

        <Route path='/statement' element={authCtx.token ? <Statement/> : <Navigate to='/auth'/>}/>

        <Route path='/profile' element={authCtx.token ? "" : <Navigate to='/auth'/>}/>

        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
