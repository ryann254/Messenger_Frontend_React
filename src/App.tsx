import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { IConversation } from './interfaces/convesation';
import { IMessage } from './interfaces/message';

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
    transports: ['websocket', 'polling'],
    withCredentials: true,
  });

  const chat = document.getElementById('chat') as HTMLDivElement;
  const [isConnected, setIsConnected] = useState(false);
  const [userContent, setUserContent] = useState<IUserContent>({
    name: 'Edward.Green58',
    message: '',
  });
  // TODO: Create a UI that maps out all the conversations that a user has.
  const [conversations, setConversations] = useState<IConversation[]>([]);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onConversations = (conversations: IConversation[]) => {
    setConversations(conversations);
  };

  useEffect(() => {
    const onMessageSent = (message: any) => {
      console.log(message);
      // if (conversations[0] && conversations[0].messages.length) {
      //   const { fullDocument } = message;
      //   const textContent = fullDocument.text;
      //   window.scrollTo(0, document.body.scrollHeight);
      // }
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('conversations', onConversations);
    socket.on('change', onMessageSent);
    socket.on('connect_error', (err: Error) => {
      // the reason of the error, for example "xhr poll error"
      console.log('Error', err.message);
    });
    socket.on('connect', () => {
      const transport = socket.io.engine.transport.name; // in most cases, "polling"
      console.log('main transport', transport);

      socket.io.engine.on('upgrade', () => {
        const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
        console.log('upgraded transport', upgradedTransport);
      });
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('conversations', onConversations);
      socket.off('change', onMessageSent);
    };
  }, []);

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

    try {
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

      const result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      console.log('result', result);

      setUserContent({ ...userContent, message: '' });
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <>
      {conversations[0] && conversations[0].messages.length ? (
        conversations[0].messages.map((message: IMessage, index: number) => (
          <div key={index} id='chat'>
            {message.text}
          </div>
        ))
      ) : (
        <></>
      )}
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
