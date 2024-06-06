import { useContext } from 'react';
import { SocketContext } from '@context/socket.ctx';

const Conversation = ({
  title,
  description,
  randomColorsGenerator,
  members,
}: {
  title: string;
  description: string;
  members: number;
  randomColorsGenerator: () => string;
}) => {
  return (
    <div className='flex flex-col rounded-xl border border-black/[0.2] mb-3'>
      <div className='relative w-full h-24'>
        <div
          className='w-full h-24 rounded-t-xl absolute top-0 left-0'
          style={{
            backgroundColor: randomColorsGenerator(),
          }}
        />
        <div
          className='h-12 w-12 cursor-pointer rounded-xl border-2 border-white flex justify-center items-center text-white font-bold text-xl mr-3 absolute top-4 left-4'
          style={{
            backgroundColor: randomColorsGenerator(),
          }}
        >
          {'G'}
        </div>
      </div>
      <div className='flex flex-col my-5 px-4'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <span className='text-black/[.5] my-2'>{description}</span>
        <span className='font-semibold'>{members} members</span>
      </div>
    </div>
  );
};

const ExplorePage = () => {
  const { conversations } = useContext(SocketContext);
  const randomColors: string[] = [
    '#D97DE9',
    '#DF6F0B',
    '#0E77D9',
    '#5FB918',
    '#0B5FAE',
    '#C91616',
    '#16C9C9',
    '#1616C9',
    '#C9C916',
    '#C916C9',
    '#16C916',
    '#C9C9C9',
    '#161616',
  ];

  const randomColorsGenerator = () => {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };
  return (
    <>
      <h3 className='my-5 text-xl font-semibold'>Featured Conversations</h3>
      {conversations.length ? (
        conversations.map((conversation, index) => (
          <Conversation
            key={index + conversation.name}
            title={conversation.name}
            description='Join our conversation to share and engage in this gaming conversation'
            members={conversation.members.length}
            randomColorsGenerator={randomColorsGenerator}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default ExplorePage;
