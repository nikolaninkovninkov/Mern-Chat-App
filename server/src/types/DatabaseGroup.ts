export default interface DatabaseGroup {
  _id: string;
  name: string;
  creator: string;
  members: Array<string>;
  displayId: string;
  createdAt: string;
  updatedAt: string;
}
