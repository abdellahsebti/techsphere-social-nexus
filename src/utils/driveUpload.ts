import { google } from 'googleapis';

// Configure Google Drive API
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
  key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export const uploadToDrive = async (file: File, folderId: string) => {
  try {
    const fileMetadata = {
      name: file.name,
      parents: [folderId], // Specify the folder ID where you want to upload
    };

    const media = {
      mimeType: file.type,
      body: file,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};

export const createDriveFolder = async (folderName: string, parentFolderId?: string) => {
  try {
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      ...(parentFolderId && { parents: [parentFolderId] }),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id',
    });

    return response.data.id;
  } catch (error) {
    console.error('Error creating Google Drive folder:', error);
    throw error;
  }
};

export const getFileUrl = async (fileId: string) => {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });

    return {
      viewLink: result.data.webViewLink,
      downloadLink: result.data.webContentLink,
    };
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
}; 