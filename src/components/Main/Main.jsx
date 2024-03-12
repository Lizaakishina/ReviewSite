import { memo } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Main.css';

const Main = ({loggedIn}) => {
    return (
      <>
        <Header loggedIn={loggedIn}/>
        <main>
          <div className="decor1"></div>
          <div className="decor2"></div>
          <div className="decor3"></div>
          <div className="decor4"></div>
        </main>
        <Footer />
      </>
    )
  }

  export default memo(Main)
