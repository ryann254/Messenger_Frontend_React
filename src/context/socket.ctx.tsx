/* eslint-disable @typescript-eslint/no-explicit-any */
import { IConversation } from "@interfaces/convesation";
import { IMessage } from "@interfaces/message";
import { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

type Props = {
  children: React.ReactNode;
};

interface ISocketContext {
  isConnected: boolean;
  conversations: IConversation[];
  selectedConversation: IConversation | undefined;
  selectedHomeOption: string;
  setSelectedHomeOption: React.Dispatch<React.SetStateAction<string>>;
  isConversationMember: boolean;
  setIsConversationMember: React.Dispatch<React.SetStateAction<boolean>>;
  onConversationMemberCheck: (conversation: IConversation | undefined) => void;
  onConversationUpdated: (conversation: IConversation | undefined) => void;
  sidebarSelection: string;
  setSidebarSelection: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isUpdating: { value: boolean; messageId: string };
  setIsUpdating: React.Dispatch<
    React.SetStateAction<{ value: boolean; messageId: string }>
  >;
}

export const SocketContext = createContext<ISocketContext>({
  isConnected: false,
  conversations: [],
  selectedConversation: undefined,
  selectedHomeOption: "",
  setSelectedHomeOption: () => {},
  isConversationMember: false,
  setIsConversationMember: () => {},
  onConversationMemberCheck: () => {},
  onConversationUpdated: () => {},
  sidebarSelection: "Home",
  setSidebarSelection: () => {},
  message: "",
  setMessage: () => {},
  isUpdating: { value: false, messageId: "" },
  setIsUpdating: () => {},
});

export const SocketContextProvider = ({ children }: Props) => {
  // Connect to the io Server.
  const loggedInUser = (() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return null;
      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  })();

  // Use useRef instead of useState for socket
  const socketRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation>();
  const [selectedHomeOption, setSelectedHomeOption] = useState("Explore");
  const [isConversationMember, setIsConversationMember] = useState(false);
  const [sidebarSelection, setSidebarSelection] = useState("Home");
  const [message, setMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState({ value: false, messageId: "" });

  // Initialize socket connection
  useEffect(() => {
    console.log("Socket effect running, loggedInUser:", loggedInUser);
    if (!loggedInUser) {
      console.log("No logged in user, returning");
      return;
    }

    // Only create socket if it doesn't exist
    if (!socketRef.current) {
      console.log("Creating new socket connection");
      const socketInstance = io(import.meta.env.VITE_BACKEND_URL, {
        auth: {
          userId: loggedInUser._id,
        },
        transports: ["websocket", "polling"],
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Set up event listeners
      const onConnect = () => {
        console.log("Socket connected");
        setIsConnected(true);
      };

      const onDisconnect = () => {
        console.log("Socket disconnected");
        setIsConnected(false);
      };

      const onMessageSent = (messageDocument: IMessage) => {
        if (messageDocument) {
          setSelectedConversation((currentConversation) => {
            if (currentConversation?._id === messageDocument.conversation) {
              return {
                ...currentConversation,
                messages: [...currentConversation.messages, messageDocument],
              };
            }
            return currentConversation;
          });
        }
      };

      const onConversationsReceived = (conversations: IConversation[]) => {
        console.log("Received conversations:", conversations);
        setConversations(conversations);
      };

      // Set up all event listeners
      socketInstance.on("connect", onConnect);
      socketInstance.on("disconnect", onDisconnect);
      socketInstance.on("conversations", onConversationsReceived);
      socketInstance.on("messageCreated", onMessageSent);
      socketInstance.on("conversationCreated", onConversationCreated);
      socketInstance.on("messageUpdated", onMessageUpdated);
      socketInstance.on("connect_error", (err: Error) => {
        console.error("Connection error:", err.message);
      });

      socketRef.current = socketInstance;
    }

    // Cleanup function - only run when component is actually unmounting
    return () => {
      const currentSocket = socketRef.current;
      if (currentSocket) {
        console.log("Component unmounting, cleaning up socket");
        currentSocket.off("connect");
        currentSocket.off("disconnect");
        currentSocket.off("conversations");
        currentSocket.off("messageCreated");
        currentSocket.off("conversationCreated");
        currentSocket.off("messageUpdated");
        currentSocket.off("connect_error");
        currentSocket.disconnect();
        socketRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run on mount/unmount

  // Checks if a user is a member of a conversation before joining.
  const onConversationMemberCheck = (
    conversation: IConversation | undefined
  ) => {
    if (conversation) {
      const isMember = conversation.members.find(
        (member) => member._id === loggedInUser._id
      );
      setIsConversationMember(isMember ? true : false);
      setSelectedConversation(conversation);
    } else {
      setSelectedConversation(undefined);
      setIsConversationMember(false);
    }
  };

  const onConversationCreated = async (conversation: IConversation) => {
    if (conversation) {
      // When a Conversation is created, Socket IO's mongodb adapter give us the Conversation document where members are not populated.
      // Hence we have to refetch the conversation with populated members.
      const result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/conversation/${
          conversation._id
        }`
      );
      const populatedConversation = await result.json();

      if (result.ok) {
        setConversations((currentConversations) => [
          ...currentConversations,
          populatedConversation,
        ]);
      }
    }
  };

  // Memoize the index that matches the updatedMessage Id to avoid expensive calculations on every render.
  const conversationIndexCache: Record<string, number> = {};

  const getConversationIndex = (
    conversations: IConversation[],
    updatedConversationId: string
  ) => {
    // Check if the result is already cached
    if (conversationIndexCache[`${updatedConversationId}`]) {
      return conversationIndexCache[`${updatedConversationId}`];
    }

    // Compute the index if not cached
    const index = conversations.findIndex(
      (conversation) => conversation._id === updatedConversationId
    );

    // Cache the result
    conversationIndexCache[`${updatedConversationId}`] = index;

    return index;
  };

  const onConversationUpdated = (
    updatedConversation: IConversation | undefined
  ) => {
    if (updatedConversation) {
      // Update all the conversations
      setConversations((currentConversations) => {
        const index = getConversationIndex(
          currentConversations,
          updatedConversation._id
        );
        if (index !== -1) {
          currentConversations[index] = updatedConversation;
        }
        return currentConversations;
      });
      // Update the members in a current conversation after a user has joined the conversation.
      setSelectedConversation(updatedConversation);
    }
  };

  // Memoize the index that matches the updatedMessage Id to avoid expensive calculations on every render.
  const messageIndexCache: Record<string, number> = {};

  const getMessageIndex = (conversation: IConversation, messageId: string) => {
    // Check if the result is already cached
    if (messageIndexCache[`${conversation._id}-${messageId}`]) {
      return messageIndexCache[`${conversation._id}-${messageId}`];
    }

    // Compute the index if not cached
    const index = conversation.messages.findIndex(
      (message) => message._id === messageId
    );

    // Cache the result
    messageIndexCache[`${conversation._id}-${messageId}`] = index;

    return index;
  };

  const onMessageUpdated = (updatedMessage: IMessage | undefined) => {
    if (updatedMessage) {
      setSelectedConversation((currentConversation) => {
        if (currentConversation) {
          const updatedMessages = [...currentConversation.messages];

          const index = getMessageIndex(
            currentConversation,
            updatedMessage._id
          );

          if (index !== -1) {
            updatedMessages[index] = updatedMessage;
          }
          return { ...currentConversation, messages: updatedMessages };
        }
      });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        conversations,
        selectedConversation,
        selectedHomeOption,
        setSelectedHomeOption,
        isConversationMember,
        setIsConversationMember,
        onConversationMemberCheck,
        onConversationUpdated,
        sidebarSelection,
        setSidebarSelection,
        message,
        setMessage,
        isUpdating,
        setIsUpdating,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
