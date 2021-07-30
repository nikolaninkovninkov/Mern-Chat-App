import { Schema, model, ObjectId } from 'mongoose';
const { String, ObjectId } = Schema.Types;
import { v4 as uuid } from 'uuid';

const MessageSchema = new Schema(
  {
    group: {
      type: ObjectId,
      ref: 'Group',
      required: true,
    },
    sender: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    displayId: {
      type: String,
      required: true,
      default: uuid(),
    },
  },
  { timestamps: true },
);
export default model('Message', MessageSchema);
