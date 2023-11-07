import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { memo } from 'react';

const Main = ({loggedIn}) => {
    return (
      <>
        <Header loggedIn={loggedIn}/>
        <main>
          <Profile />
        </main>
        <Footer />
      </>
    )
  }

  export default memo(Main);
