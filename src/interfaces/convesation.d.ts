export interface IConversation {
  _id: string;
  name: string;
  members: IUser[];
  messages: IMessage[];
}
