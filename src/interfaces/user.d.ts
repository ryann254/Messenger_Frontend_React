export interface IUser {
  _id: string;
  useraname: string;
  email: string;
  password: string;
  online: boolean;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}
