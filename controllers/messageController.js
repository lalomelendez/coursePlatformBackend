// controllers/messageController.js

import Message from "../models/messageModel.js";

// Obtener todos los mensajes
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender")
      .populate("receiver");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un mensaje por ID
export const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate("sender")
      .populate("receiver");
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo mensaje
export const createMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  const newMessage = new Message({
    sender,
    receiver,
    content,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un mensaje por ID
export const updateMessage = async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un mensaje por ID
export const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
