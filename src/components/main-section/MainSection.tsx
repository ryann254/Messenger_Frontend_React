import { useContext } from 'react';
import { IMessage } from '@interfaces/message';
import MessageBox from './MessageBox';
import { IUser } from '@interfaces/user';
import { SocketContext } from '@context/socket.ctx';
// import TextInput from './TextInput';

interface IConversationMember extends IUser {
  username: string;
  email: string;
  online: boolean;
  conversation: string[];
  lastActive: Date;
}

const MainSection = () => {
  const { selectedConversation, selectedHomeOption } =
    useContext(SocketContext);
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
      {selectedConversation && selectedConversation.messages.length ? (
        selectedConversation.messages.map(
          (message: IMessage, index: number) => (
            <MessageBox
              key={index}
              username={findUsername(
                selectedConversation.members,
                message.sender
              )}
              message={message.text}
              profilePic={message.media_url}
              time={message.updatedAt}
            />
          )
        )
      ) : (
        <>
          {selectedHomeOption === 'Explore' && <>Explore page</>}
          {selectedHomeOption === 'Gaming' && <>Gaming page</>}
          {selectedHomeOption === 'Working' && <>Working page</>}
          {selectedHomeOption === 'Entertainment' && <>Entertainment page</>}
          {selectedHomeOption === 'Hobby' && <>Hobby page</>}
        </>
      )}
    </>
  );
};

export default MainSection;
