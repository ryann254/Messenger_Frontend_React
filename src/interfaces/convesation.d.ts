export interface IConversation {
  _id: string;
  name: string | null;
  members: IUser[];
  messages: IMessage[];
}
