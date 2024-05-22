import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { IConversation } from '@interfaces/convesation';
import { IMessage } from '@interfaces/message';
import MessageBox from './MessageBox';
import { IUser } from '@interfaces/user';
// import TextInput from './TextInput';

interface IConversationMember extends IUser {
  username: string;
  email: string;
  online: boolean;
  conversation: string[];
  lastActive: Date;
}

const MainSection = () => {
  // Connect to the io Server.
  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
      userId: '6635e291cdd94f2d13ca1687',
    },
    transports: ['websocket', 'polling'],
    withCredentials: true,
  });

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [conversations, setConversations] = useState<IConversation[]>([]);

  const onConnect = () => {
    setIsConnected(true);

    // Check the transport protocol that is being used.
    const transport = socket.io.engine.transport.name; // in most cases, "polling"
    console.log('main transport', transport);

    socket.io.engine.on('upgrade', () => {
      const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
      console.log('upgraded transport', upgradedTransport);
    });
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onConversations = (conversations: IConversation[]) => {
    setConversations(conversations);
  };

  useEffect(() => {
    const onMessageSent = (fullDocument: IMessage) => {
      // Find the conversation that matches the provided ID
      setConversations((currentConversations) => {
        return currentConversations.map((c) => {
          if (c._id === fullDocument.conversation) {
            return {
              ...c,
              messages: [...c.messages, fullDocument],
            };
          }
          return c;
        });
      });
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('conversations', onConversations);
    socket.on('messageToRoom', onMessageSent);
    socket.on('connect_error', (err: Error) => {
      // the reason of the error, for example "xhr poll error"
      console.error('Error', err.message);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('conversations', onConversations);
      socket.off('messageToRoom', onMessageSent);
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

  const findUsername = (members: IConversationMember[], sender: string) => {
    const user = members.find((member) => member._id === sender);
    if (user) {
      return user.username;
    }
    return 'Loading...';
  };

  return (
    <>
      {conversations[0] && conversations[0].messages.length ? (
        conversations[0].messages.map((message: IMessage, index: number) => (
          <MessageBox
            key={index}
            username={findUsername(conversations[0].members, message.sender)}
            message={message.text}
            profilePic={message.media_url}
            time={message.updatedAt}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default MainSection;
