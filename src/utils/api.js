import axios from 'axios';


const api = axios.create({
  baseURL: "https://mail-app-back-end.onrender.com/api"
});

export const fetchMessages = async (username) => {
  try {
    const response = await api.get(`/messages/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};


export const fetchUnreadCount = async (username) => {
  try {
    const response = await api.get(`/unread-count/${username}`);
    return response.data.unreadCount;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    throw error;
  }
};


export const sendMessage = async (messageData) => {
  try {
    const response = await api.post(`/messages`, messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};


export const markAsRead = async (username, messageId) => {
  try {
    const response = await api.patch(`/messages/${username}/${messageId}`);
    return response.data;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};


export const markMessageAsRead = async (messageId) => {
  try {
    const response = await api.patch(`/messages/${messageId}`);
    return response.data;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};