import Zoro from '@assets/zoro.jpg';
import Sanji from '@assets/sanji.jpg';
import Luffy from '@assets/luffy.jpg';
import Brook from '@assets/brook.jpg';
import Franky from '@assets/franky.jpg';
import Robin from '@assets/robin.jpg';
import Nami from '@assets/nami.jpg';
import Chopper from '@assets/chopper.jpg';
import Usopp from '@assets/usopp.jpg';

export const Member = ({
  title,
  members,
}: {
  title: string;
  members: { name: string; avatar: string }[];
}) => {
  return (
    <div className='mt-6'>
      <h4 className='text-[#7D7A89] font-semibold'>{title}</h4>
      {members.map((member, index) => (
        <div key={index + member.name} className='flex items-center my-3'>
          <div className='relative w-10 h-10 rounded-full mr-5'>
            <img
              src={member.avatar}
              alt='avatar'
              className='w-full h-full rounded-full'
            />
            <span className='absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#1AC391]'></span>
          </div>
          <h4 className='font-semibold text-black'>{member.name}</h4>
        </div>
      ))}
    </div>
  );
};

const ChannelInfo = () => {
  const adminMembers = [
    {
      name: 'Roronoa Zoro',
      avatar: Zoro,
    },
    {
      name: 'Sanji',
      avatar: Sanji,
    },
    {
      name: 'Luffy',
      avatar: Luffy,
    },
  ];

  const onlineMembers = [
    {
      name: 'Brook',
      avatar: Brook,
    },
    {
      name: 'Franky',
      avatar: Franky,
    },
    {
      name: 'Nico Robin',
      avatar: Robin,
    },
  ];

  const offlineMembers = [
    {
      name: 'Usopp',
      avatar: Usopp,
    },
    {
      name: 'Tony Tony Chopper',
      avatar: Chopper,
    },
    {
      name: 'Nami',
      avatar: Nami,
    },
  ];
  return (
    <div className='drawer drawer-end z-10'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label
          htmlFor='my-drawer-4'
          className='btn btn-square btn-ghost drawer-button'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-5 h-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
            ></path>
          </svg>
        </label>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-4'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='menu w-[86%] min-h-full bg-white'>
          {/* Channel Info content here */}
          <div className='flex py-5 px-3.5 border-b border-black/[.1] justify-between items-center'>
            <span className='text-xl font-semibold'>Channel Info</span>
            <label
              htmlFor='my-drawer-4'
              aria-label='close sidebar'
              className='pt-1.5'
            >
              <i className='fa-solid fa-xmark text-black/[.5] text-xl cursor-pointer'></i>
            </label>
          </div>
          {/* Channel Info Body */}
          <div className='overflow-y-scroll overflow-x-hidden px-3.5 py-4'>
            {/* About */}
            <div className=' border-b border-black/[.1] pb-6'>
              <h3 className='font-semibold text-lg pb-3'>About</h3>
              <div className='rounded-lg bg-[#F3F7FA] w-full p-3'>
                <h4 className='text-[#7D7A89] font-semibold pb-2.5'>Topic</h4>
                <span>
                  This chat is all about "One Piece", a legendary high-seas
                  quest about Monkey D. Luffy and his crew.
                </span>
                <h4 className='text-[#7D7A89] font-semibold py-2.5'>
                  Description
                </h4>
                <span>
                  "One Piece" is a legendary high-seas adventure manga and anime
                  series about Monkey D. Luffy and his crew, the Straw Hat
                  Pirates, embarking on a quest to find the One Piece, the
                  ultimate treasure, to become the Pirate King.
                </span>
              </div>
            </div>
            {/* Members */}
            <div className='pt-5'>
              <div className='flex justify-between items-center'>
                <div className='flex'>
                  <h3 className='text-lg font-semibold mr-4'>Members</h3>
                  <div className='bg-[#F18524] text-white px-1.5 py-0.5 text-sm rounded-lg font-semibold'>
                    14
                  </div>
                </div>
                <i className='fa-solid fa-user-plus cursor-pointer text-lg text-black/[.5]'></i>
              </div>
              {/* Admin */}
              <Member
                members={adminMembers}
                title={`Admin - ${adminMembers.length}`}
              />
              {/* Online Members */}
              <Member
                members={onlineMembers}
                title={`Online - ${onlineMembers.length}`}
              />
              {/* Offline Members */}
              <Member
                members={offlineMembers}
                title={`Offline - ${offlineMembers.length}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
