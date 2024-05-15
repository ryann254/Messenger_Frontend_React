// import ChannelInfo from '@components/ChannelInfo';
// import MainSection from '@components/MainSection';
// import Sidebar from '@components/Sidebar';

import MessageBox from '@components/main-section/MessageBox';
import Navbar from '@components/main-section/Navbar';
import MessageData from '@components/main-section/messageData.json';

const Home = () => {
  return (
    <div className='overflow-hidden'>
      {/* <Sidebar /> */}
      <Navbar />
      <div className='h-[85vh] px-6 overflow-x-hidden overflow-y-scroll min-h-full'>
        {MessageData.map((message, index) => (
          <MessageBox
            key={index}
            username={message.name}
            profilePic={message.profilePic}
          />
        ))}
      </div>
      <div>text input</div>
      {/* <MainSection /> */}
      {/* <ChannelInfo /> */}
    </div>
  );
};

export default Home;
