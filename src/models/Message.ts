import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
    user: string;
    content: string;
}

const messageSchema = new Schema({
    user: { type: String, required: true },
    content: { type: String, required: true },
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
