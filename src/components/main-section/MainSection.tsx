import { useContext, useEffect, useRef } from 'react';
import { IMessage } from '@interfaces/message';
import MessageBox from './MessageBox';
import { IUser } from '@interfaces/user';
import { SocketContext } from '@context/socket.ctx';
import CreateConversationModal from './CreateConversationModal';
import JoinConversation from './JoinConversation';
import WelcomeScreenModal from './WelcomeScreenModal';
import ExplorePage from './home-sections/ExplorePage';
import GamingPage from './home-sections/GamingPage';
import WorkingPage from './home-sections/WorkingPage';
import EntertainmentPage from './home-sections/EntertainmentPage';
import HobbyPage from './home-sections/HobbyPage';

interface IConversationMember extends IUser {
  username: string;
  email: string;
  online: boolean;
  conversation: string[];
  lastActive: Date;
}

const MainSection = () => {
  const homePageContentMap: Record<string, JSX.Element> = {
    Explore: <ExplorePage />,
    Gaming: <GamingPage />,
    Working: <WorkingPage />,
    Entertainment: <EntertainmentPage />,
    Hobby: <HobbyPage />,
  };

  const { selectedConversation, selectedHomeOption, isConversationMember } =
    useContext(SocketContext);
  const bottomMessageRef = useRef(null);

  useEffect(() => {
    // @ts-expect-error scrollIntoView is not defined on type 'never'
    bottomMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages.length]);

  const findUsername = (members: IConversationMember[], sender: string) => {
    const user = members.find((member) => member._id === sender);
    if (user) {
      return user.username;
    }
    return 'Loading...';
  };

  return (
    <>
      <CreateConversationModal />
      <WelcomeScreenModal />
      {!isConversationMember && selectedConversation ? (
        <JoinConversation />
      ) : (
        <></>
      )}
      {selectedConversation &&
      isConversationMember &&
      selectedConversation.messages.length ? (
        selectedConversation.messages.map(
          (message: IMessage, index: number) => (
            <MessageBox
              key={index}
              username={findUsername(
                selectedConversation.members,
                message.sender
              )}
              message={message}
              bottomMessageRef={bottomMessageRef}
            />
          )
        )
      ) : (
        <></>
      )}
      {!selectedConversation ? homePageContentMap[selectedHomeOption] : <></>}
    </>
  );
};

export default MainSection;
