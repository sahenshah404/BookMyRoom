import Headers from "./Header/Header";
import Footer from "./Footer/Footer";
import Body from "./Body/Body";
import { LoginProvider } from "../context/LoginContext";

function App() {

  // fetch("/home")
  // .then((data)=>{
  //   data.text().then(d => console.log(d));
  // })

  return (
    <div className="App">
      <LoginProvider>
        <Headers />
        <Body />
        <Footer />
      </LoginProvider>
    </div>
  );
}

export default App;
