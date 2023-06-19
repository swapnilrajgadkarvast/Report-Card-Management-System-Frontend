import { google } from "googleapis";
import fs from "fs";

const client_ID =
  "455788008554-rm1gr3pdpcuc79g9rklnpm9m0j5ei3pv.apps.googleusercontent.com";
const client_Secret = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04hLREM82lW8HCgYIARAAGAQSNwF-L9Ir_ho2gnnttam16HwuF30BytPsBm9vPLQqPcte9ecrwcDSJJG2SBcXqnGe5TyCR7PJcQ8";

const saveToGoogleDrive = async (pdfContent) => {
  const oauth2Client = new google.auth.OAuth2(
    client_ID,
    client_Secret,
    REDIRECT_URL
  );
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    // Create a new file in Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: "report.pdf", // Set the desired name for the PDF file
        mimeType: "application/pdf",
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(pdfContent), // Assuming pdfContent is a file path
      },
    });

    // Set the file permissions to allow anyone to view the file
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Get the web link for the file
    const fileResponse = await drive.files.get({
      fileId: response.data.id,
      fields: "webViewLink, webContentLink",
    });

    return fileResponse.data.webViewLink;
  } catch (error) {
    console.log("Error saving to Google Drive:", error.message);
    throw error;
  }
};

export default saveToGoogleDrive;
