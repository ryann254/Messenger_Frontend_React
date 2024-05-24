// import ChannelInfo from '@components/ChannelInfo';
import MainSection from '@components/main-section/MainSection';
// import Sidebar from '@components/Sidebar';

import Navbar from '@components/main-section/Navbar';
import TextInput from '@components/main-section/TextInput';
import { SocketContext } from '@context/socket.ctx';
import { useContext, useEffect } from 'react';

const Home = () => {
  const { selectedConversation } = useContext(SocketContext);

  useEffect(() => {
    const user = {
      id: '6635e291cdd94f2d13ca1687',
      username: 'Edward.Green58',
      email: 'Mollie_Mayert@example.org',
      password: 'ryann@254',
    };

    const message = {
      sender: 'Edward.Green58',
      recipientId: '6635e266cdd94f2d13ca167b',
      recipientName: 'Grace_Schuster',
      sent: false,
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('message', JSON.stringify(message));
  }, []);
  return (
    <div className='overflow-hidden'>
      {/* <Navbar/> and <Sidebar /> components*/}
      <Navbar />
      <div className='h-[85vh] px-6 overflow-x-hidden overflow-y-scroll min-h-full'>
        <MainSection />
      </div>
      {selectedConversation ? <TextInput /> : <></>}
    </div>
  );
};

export default Home;
