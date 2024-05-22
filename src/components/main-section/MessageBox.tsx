import useFormattedTime from '@utils/useFormattedTime';

const MessageBox = ({
  username,
  message,
  profilePic,
  time,
}: {
  username: string;
  message: string;
  profilePic?: string;
  time: Date;
}) => {
  const formattedTime = useFormattedTime(new Date(time));
  return (
    <div className='pt-5 flex items-start'>
      {profilePic !== '' && profilePic !== undefined ? (
        <img
          src={profilePic}
          alt='profile pic'
          className='h-11 w-11 rounded-full mr-4'
        />
      ) : (
        <div className='h-11 w-11 rounded-full bg-red-300 flex justify-center items-center text-white font-semibold text-xl mr-4'>
          {username[0]}
        </div>
      )}
      <div className='flex flex-col justify-start w-[85%]'>
        <div className='flex items-center'>
          <div className='mr-5 font-semibold text-black text-lg tracking-wider'>
            {username}
          </div>
          <div className='text-sm text-black/[.4]'>{formattedTime}</div>
        </div>
        <div className='text-black/[.7] tracking-wide'>{message}</div>
      </div>
    </div>
  );
};

export default MessageBox;
