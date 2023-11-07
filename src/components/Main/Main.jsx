import { memo } from 'react';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

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

  export default memo(Main)
