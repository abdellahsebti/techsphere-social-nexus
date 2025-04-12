import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { drive_v3 } from 'googleapis';

// Initialize the Google Drive API client
const initializeDriveClient = () => {
  const KEYFILEPATH = path.join(process.cwd(), 'keygoogle.json');
  const SCOPES = ['https://www.googleapis.com/auth/drive'];

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const driveService = google.drive({ version: 'v3', auth });
  return driveService;
};

// Create folder structure
const createFolderStructure = async (driveService: drive_v3.Drive) => {
  const folders = {
    root: 'TechSphere',
    profilePictures: 'Profile Pictures',
    projectFiles: 'Project Files',
    challengeFiles: 'Challenge Files',
    ideaFiles: 'Idea Files',
    blogFiles: 'Blog Files',
    eventFiles: 'Event Files'
  };

  const folderIds: { [key: string]: string } = {};

  for (const [key, folderName] of Object.entries(folders)) {
    const folderResponse = await driveService.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id)',
    });

    let folderId = folderResponse.data.files?.[0]?.id;

    if (!folderId) {
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: key === 'root' ? undefined : [folderIds.root]
      };

      const folder = await driveService.files.create({
        requestBody: folderMetadata,
        fields: 'id',
      });

      folderId = folder.data.id;
    }

    folderIds[key] = folderId;
  }

  return folderIds;
};

// Upload file to Google Drive
export const uploadToDrive = async (
  fileObject: Express.Multer.File,
  type: 'profile' | 'project' | 'challenge' | 'idea' | 'blog' | 'event',
  userId?: string,
  projectId?: string
): Promise<{ fileId: string; webViewLink: string }> => {
  try {
    const driveService = initializeDriveClient();
    const folderIds = await createFolderStructure(driveService);

    // Determine the appropriate folder based on type
    let parentFolderId = folderIds.root;
    let fileName = fileObject.originalname;

    switch (type) {
      case 'profile':
        parentFolderId = folderIds.profilePictures;
        fileName = `${userId}_${fileName}`;
        break;
      case 'project':
        parentFolderId = folderIds.projectFiles;
        fileName = `${projectId}/${fileName}`;
        break;
      case 'challenge':
        parentFolderId = folderIds.challengeFiles;
        break;
      case 'idea':
        parentFolderId = folderIds.ideaFiles;
        break;
      case 'blog':
        parentFolderId = folderIds.blogFiles;
        break;
      case 'event':
        parentFolderId = folderIds.eventFiles;
        break;
    }

    // Upload file to the appropriate folder
    const fileMetadata = {
      name: fileName,
      parents: [parentFolderId],
    };

    const media = {
      mimeType: fileObject.mimetype,
      body: fs.createReadStream(fileObject.path),
    };

    const file = await driveService.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    // Update file permissions to make it viewable by anyone with the link
    await driveService.permissions.create({
      fileId: file.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Clean up temporary file
    fs.unlinkSync(fileObject.path);

    return {
      fileId: file.data.id!,
      webViewLink: file.data.webViewLink!,
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};

// Delete file from Google Drive
export const deleteFromDrive = async (fileId: string): Promise<void> => {
  try {
    const driveService = initializeDriveClient();
    await driveService.files.delete({ fileId });
  } catch (error) {
    console.error('Error deleting from Google Drive:', error);
    throw error;
  }
};

// Get file metadata from Google Drive
export const getFileMetadata = async (fileId: string) => {
  try {
    const driveService = initializeDriveClient();
    const response = await driveService.files.get({
      fileId,
      fields: 'id, name, mimeType, webViewLink, size, createdTime',
    });
    return response.data;
  } catch (error) {
    console.error('Error getting file metadata:', error);
    throw error;
  }
};

// List files in a folder
export const listFiles = async (type: 'profile' | 'project' | 'challenge' | 'idea' | 'blog' | 'event', userId?: string) => {
  try {
    const driveService = initializeDriveClient();
    const folderIds = await createFolderStructure(driveService);
    
    let folderId = folderIds.root;
    let query = '';

    switch (type) {
      case 'profile':
        folderId = folderIds.profilePictures;
        query = userId ? `name contains '${userId}_'` : '';
        break;
      case 'project':
        folderId = folderIds.projectFiles;
        break;
      case 'challenge':
        folderId = folderIds.challengeFiles;
        break;
      case 'idea':
        folderId = folderIds.ideaFiles;
        break;
      case 'blog':
        folderId = folderIds.blogFiles;
        break;
      case 'event':
        folderId = folderIds.eventFiles;
        break;
    }

    const response = await driveService.files.list({
      q: `'${folderId}' in parents ${query ? `and ${query}` : ''}`,
      fields: 'files(id, name, mimeType, webViewLink, size, createdTime)',
    });

    return response.data.files;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

// Create a middleware for handling file uploads
export const handleFileUpload = async (
  file: Express.Multer.File,
  type: 'profile' | 'project' | 'challenge' | 'idea' | 'blog' | 'event',
  userId?: string,
  projectId?: string
) => {
  try {
    const uploadResult = await uploadToDrive(file, type, userId, projectId);
    return {
      success: true,
      fileId: uploadResult.fileId,
      url: uploadResult.webViewLink,
    };
  } catch (error) {
    console.error('Error handling file upload:', error);
    throw error;
  }
}; 