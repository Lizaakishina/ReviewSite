import Header from '../Header/Header';
import Accordion from '../Accordion/Accordion';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { memo } from 'react';

const faqList = [
  {
    id: 1,
    title: 'Do I have to allow the use of cookies?',
  },
  {
    id: 2,
    title: 'How do I change my My Page password?',
  },
  {
    id: 3,
    title: 'What is BankID?',
  },
  {
    id: 4,
    title: 'Whose birth number can I use?',
  },
  {
    id: 5,
    title: 'When do I recieve a password ordered by letter?',
  },
  {
    id: 6,
    title: 'When do I recieve a password ordered by letter?',
  },
  {
    id: 7,
    title: 'When do I recieve a password ordered by letter?',
  },
  {
    id: 8,
    title: 'When do I recieve a password ordered by letter?',
  },
  {
    id: 9,
    title: 'When do I recieve a password ordered by letter?',
  },
]

const Main = ({loggedIn}, props) => {
    return (
      <>
        <Header loggedIn={loggedIn}/>
        <main>
          <Profile />
          <Accordion faqList={faqList}/>
        </main>
        <Footer />
      </>
    )
  }

  export default memo(Main);
