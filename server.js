const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://eswarsai8074:GxlEfEfJ2Fw9g7nj@cluster0.fpvov.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Define Message Schema
const messageSchema = new mongoose.Schema({
    sender: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Routes for /client (Android app API)
app.post('/client/send-message', async (req, res) => {
    const { sender, message } = req.body;
    try {
        const newMessage = new Message({ sender, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error(error); // Log any errors
        res.status(500).json({ success: false, error: "Failed to send message" });
    }
});

app.get('/client/get-messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 }); // Fetch all messages sorted by timestamp
        res.status(200).json(messages);
    } catch (error) {
        console.error(error); // Log any errors
        res.status(500).json({ success: false, error: "Failed to retrieve messages" });
    }
});
// Serve the support UI at /server
app.get('/server', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));