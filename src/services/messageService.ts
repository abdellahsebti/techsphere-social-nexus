import { db } from '@/config/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { uploadToDrive, getFileUrl } from '@/utils/driveUpload';

// The folder ID where message attachments will be stored
const MESSAGE_ATTACHMENTS_FOLDER = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_MESSAGES_FOLDER;

interface MessageData {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  attachments?: File[];
}

interface MessageAttachment {
  fileId: string;
  fileName: string;
  viewLink: string;
  downloadLink: string;
}

export const sendMessage = async (messageData: MessageData) => {
  try {
    // Handle file uploads first if there are any attachments
    const attachments: MessageAttachment[] = [];
    
    if (messageData.attachments && messageData.attachments.length > 0) {
      for (const file of messageData.attachments) {
        // Upload file to Google Drive
        const { fileId } = await uploadToDrive(file, MESSAGE_ATTACHMENTS_FOLDER);
        
        // Get the public URLs for the file
        const { viewLink, downloadLink } = await getFileUrl(fileId);
        
        attachments.push({
          fileId,
          fileName: file.name,
          viewLink,
          downloadLink,
        });
      }
    }

    // Store message data in Firebase
    const messagesRef = collection(db, 'messages');
    const messageDoc = await addDoc(messagesRef, {
      senderId: messageData.senderId,
      receiverId: messageData.receiverId,
      content: messageData.content,
      timestamp: Timestamp.fromDate(messageData.timestamp),
      attachments,
    });

    return {
      messageId: messageDoc.id,
      attachments,
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getConversation = async (user1Id: string, user2Id: string) => {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('senderId', 'in', [user1Id, user2Id]),
      where('receiverId', 'in', [user1Id, user2Id]),
      orderBy('timestamp', 'asc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting conversation:', error);
    throw error;
  }
};

export const getUserConversations = async (userId: string) => {
  try {
    const messagesRef = collection(db, 'messages');
    const sentQ = query(
      messagesRef,
      where('senderId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const receivedQ = query(
      messagesRef,
      where('receiverId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const [sentSnapshot, receivedSnapshot] = await Promise.all([
      getDocs(sentQ),
      getDocs(receivedQ)
    ]);

    // Combine and sort messages
    const allMessages = [
      ...sentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      ...receivedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    ];

    // Group by conversation partner and get latest message
    const conversations = allMessages.reduce((acc, message) => {
      const partnerId = message.senderId === userId ? message.receiverId : message.senderId;
      if (!acc[partnerId] || acc[partnerId].timestamp < message.timestamp) {
        acc[partnerId] = message;
      }
      return acc;
    }, {});

    return Object.values(conversations);
  } catch (error) {
    console.error('Error getting user conversations:', error);
    throw error;
  }
}; 