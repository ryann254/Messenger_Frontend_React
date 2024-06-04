// import ChannelInfo from '@components/ChannelInfo';
import MainSection from '@components/main-section/MainSection';
// import Sidebar from '@components/Sidebar';

import Navbar from '@components/main-section/Navbar';
import TextInput from '@components/main-section/TextInput';
import { SocketContext } from '@context/socket.ctx';
import { useContext, useEffect } from 'react';

const Home = () => {
  const { selectedConversation, isConversationMember } =
    useContext(SocketContext);

  useEffect(() => {
    const user = {
      id: '665dc9c2ecc3ae6c191d2731',
      username: 'Kennith_Abbott',
      email: 'Krystel87@hotmail.com',
    };

    localStorage.setItem('user', JSON.stringify(user));
  }, []);

  return (
    <div className='overflow-hidden relative'>
      {/* <Navbar/> and <Sidebar /> components*/}
      <Navbar />
      <div className='h-[85vh] px-6 overflow-x-hidden overflow-y-scroll min-h-full'>
        <MainSection />
      </div>
      {selectedConversation && isConversationMember ? <TextInput /> : <></>}
    </div>
  );
};

export default Home;
