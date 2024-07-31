import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express() as any;

// Conectar ao MongoDB no Docker
mongoose.connect("mongodb+srv://junior123nelson:glylWqACgyBBlUrN@cluster0.3ju5ces.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions);


app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000`)
);