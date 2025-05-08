// import ChannelInfo from '@components/ChannelInfo';
import MainSection from "@components/main-section/MainSection";
// import Sidebar from '@components/Sidebar';

import Navbar from "@components/main-section/Navbar";
import TextInput from "@components/main-section/TextInput";
import { SocketContext } from "@context/socket.ctx";
import { useContext, useEffect, useRef } from "react";

const Home = () => {
  const { selectedConversation, isConversationMember, isUpdating } =
    useContext(SocketContext);
  const bottomElementRef = useRef(null);

  // TODO: Fetch the first 10 users and display their conversations.
  const userId = "681cc4890829ba6228ff9577";

  const fetchUser = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${userId}`
    );
    const user = await result.json();

    if (result.ok) localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of the page
    // @ts-expect-error scrollIntoView is not defined on type 'never'
    bottomElementRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [isUpdating]);

  return (
    <div className="overflow-hidden relative">
      {/* <Navbar/> and <Sidebar /> components*/}
      <Navbar />
      <div className="h-[85vh] px-6 overflow-x-hidden overflow-y-scroll min-h-full">
        <MainSection />
      </div>
      {selectedConversation && isConversationMember ? (
        <TextInput bottomElementRef={bottomElementRef} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
