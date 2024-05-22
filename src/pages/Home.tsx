// import ChannelInfo from '@components/ChannelInfo';
import MainSection from '@components/main-section/MainSection';
// import Sidebar from '@components/Sidebar';

import Navbar from '@components/main-section/Navbar';
import TextInput from '@components/main-section/TextInput';
import { useEffect, useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('');

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

  const sendMessage = async () => {
    if (message === '') {
      return;
    }

    try {
      const storedUser = localStorage.getItem('user') || '';
      const storedMessageData = localStorage.getItem('message') || '';
      const user = JSON.parse(storedUser);
      const messageData = JSON.parse(storedMessageData);
      const data = {
        user,
        message: {
          ...messageData,
          text: message,
        },
      };

      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setMessage('');
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className='overflow-hidden'>
      {/* <Navbar/> and <Sidebar /> components*/}
      <Navbar />
      <div className='h-[85vh] px-6 overflow-x-hidden overflow-y-scroll min-h-full'>
        <MainSection />
      </div>
      <TextInput
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default Home;
