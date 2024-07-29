import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
