import ChannelInfo from '@components/channel-info/ChannelInfo';
import Sidebar from '@components/sidebar/Sidebar';

const Navbar = () => {
  return (
    <div className='navbar bg-white border-b-2 border-black[/.2]'>
      <div className='flex-none'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <a className='text-lg font-bold'>The Strawhats World</a>
      </div>
      <div className='flex-none'>
        <ChannelInfo />
      </div>
    </div>
  );
};

export default Navbar;
