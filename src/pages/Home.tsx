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
      <div className='flex px-6 py-4'>
        <div className='h-14 w-14 mr-4 rounded-full border border-black/[.2] flex justify-center items-center'>
          <i className='fa-solid fa-plus text-black/[.4] !font-normal text-3xl'></i>
        </div>
        <input
          type='text'
          className='w-[85%] px-4 py-2 border border-black/[.1] rounded-md focus:outline-none'
          placeholder='Message...'
        />
        <i className='fa-solid fa-paper-plane absolute bottom-0 right-5'></i>
      </div>
      {/* <MainSection /> */}
      {/* <ChannelInfo /> */}
    </div>
  );
};

export default Home;
