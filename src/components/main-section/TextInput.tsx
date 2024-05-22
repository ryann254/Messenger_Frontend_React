import { useEffect } from 'react';

const TextInput = ({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}) => {
  useEffect(() => {
    const textInput = document.getElementById('textInput');
    textInput?.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    return () => {
      textInput?.removeEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    };
  }, []);
  return (
    <div className='flex px-6 py-4 relative'>
      <div className='h-14 w-14 mr-4 rounded-full border border-black/[.2] flex justify-center items-center cursor-pointer'>
        <i className='fa-solid fa-plus text-black/[.4] !font-normal text-3xl'></i>
      </div>
      <input
        type='text'
        id='textInput'
        className='w-[85%] px-4 py-2 border border-black/[.1] rounded-md focus:outline-none'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Message...'
      />
      <i
        className='fa-solid fa-paper-plane text-lg absolute bottom-[40%] right-[9%] cursor-pointer text-sky-600'
        onClick={sendMessage}
      ></i>
    </div>
  );
};

export default TextInput;
