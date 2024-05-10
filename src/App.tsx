import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { IConversation } from './interfaces/convesation';

interface IUserContent {
  name: string;
  message: string;
}

function App() {
  // Connect to the io Server.
  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
      userId: '6635e291cdd94f2d13ca1687',
    },
  });

  const chat = document.getElementById('chat') as HTMLDivElement;
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userContent, setUserContent] = useState<IUserContent>({
    name: 'Edward.Green58',
    message: '',
  });
  // TODO: Create a UI that maps out all the conversations that a user has.
  const [conversations, setConversations] = useState<IConversation[]>([]);
  console.log(conversations);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessageSent = (message: any) => {
      if (chat) {
        const { fullDocument } = message;
        const item = document.createElement('li');
        item.textContent = fullDocument.text;
        chat.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      }
    };

    const onConversations = (conversations: IConversation[]) => {
      setConversations(conversations);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('conversations', onConversations);
    socket.on('change', onMessageSent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('change', onMessageSent);
    };
  }, [isConnected, socket]);

  // const generatePassword = (length = 8) => {
  //   // Define the character sets
  //   const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  //   const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   const numbers = '0123456789';
  //   const symbols = '!@#$%^&*_';

  //   // Combine all character sets
  //   const allCharacters = lowercase + uppercase + numbers + symbols;

  //   // Ensure the password length is at least 8
  //   if (length < 8) {
  //     length = 8;
  //   }

  //   let password = '';
  //   for (let i = 0; i < length; i++) {
  //     // Generate a random index within the combined character set
  //     const randomIndex = Math.floor(Math.random() * allCharacters.length);
  //     // Append the character at the random index to the password
  //     password += allCharacters[randomIndex];
  //   }

  //   return password;
  // };

  const sendMessage = async () => {
    if (userContent.message === '') {
      return;
    }

    const data = {
      user: {
        id: '6635e291cdd94f2d13ca1687',
        username: userContent.name,
        email: 'Mollie_Mayert@example.org',
        password: 'ryann@254',
      },
      message: {
        sender: userContent.name,
        recipientId: '6635e266cdd94f2d13ca167b',
        recipientName: 'Grace_Schuster',
        text: userContent.message,
        sent: false,
      },
    };

    await fetch(`${URL}/api/v1/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setUserContent({ ...userContent, message: '' });
  };

  return (
    <>
      <div id='chat'></div>
      <div className='container mt-4 mb-2 xl:w-[70%] mx-auto px-4 xl:px-0 grid grid-cols-5 gap-4'>
        <div className='col-span-1 rounded-md h-11 border border-[#007bff]'>
          <input
            type='text'
            value={userContent.name}
            onChange={(event) => {
              setUserContent({ ...userContent, name: event.target.value });
            }}
            className='w-full px-4 py-2 h-full bg-transparent border-none outline-none'
          />
        </div>
        <div className='col-span-3 rounded-md h-11 border border-[#007bff]'>
          <input
            type='text'
            value={userContent.message}
            onChange={(event) => {
              setUserContent({ ...userContent, message: event.target.value });
            }}
            className='w-full px-4 py-2 h-full bg-transparent border-none outline-none'
          />
        </div>
        <div className='col-span-1 rounded-md h-11 border bg-[#007bff]'>
          <button
            className='w-full h-full cursor-pointer text-white'
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
