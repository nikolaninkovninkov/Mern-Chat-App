import DatabaseMessage from '../types/DatabaseMessage';
import MessageModel from '../models/Message';
async function isMessageCreator(user: string, message: string) {
  const databaseMessage: DatabaseMessage = await MessageModel.findOne({
    _id: message,
  });
  return databaseMessage.sender === user;
}
export { isMessageCreator };
