import { Schema, model, ObjectId } from 'mongoose';
import { v4 as uuid } from 'uuid';
const { String, ObjectId } = Schema.Types;
const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    displayId: {
      type: String,
      required: true,
      default: uuid(),
    },
  },
  { timestamps: true },
);
export default model('Group', GroupSchema);
