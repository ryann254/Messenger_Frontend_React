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
      id: '66509d55ff0ba06ddcd36f48',
      username: 'Timothy_Schaefer91',
      email: 'Jerel51@gmail.com',
      password: 'ryann@254',
    };

    const message = {
      sender: 'Timothy_Schaefer91',
      recipientId: '66509d89ff0ba06ddcd36f4b',
      recipientName: 'Sabryna.Kemmer68',
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
