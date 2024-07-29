import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express() as any;

// Conectar ao MongoDB no Docker
mongoose.connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions);


app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000`)
);