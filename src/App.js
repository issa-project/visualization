
import './App.css';

import TextHighlight from './Component/TextHighlight';
import { Footer }  from './Component/Footer';
import KeyWord from './Component/KeyWord';

import NavBar from './Component/NavBar';


import ArticleInfo from "./Component/ArticleInfo";


function App() {
  return (
      <div>
          <NavBar/>
          <ArticleInfo/>
          <TextHighlight/>
          <KeyWord/>
          <Footer/>

      </div>






  );

}

export default App;




