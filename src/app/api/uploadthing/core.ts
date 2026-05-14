import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define your file routes here
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Authentication middleware
    .middleware(async ({ req }) => {
      // Get session using better-auth
      const session = await auth.api.getSession({ headers: req.headers });

      // If no session, user is not authenticated
      if (!session) {
        throw new UploadThingError("Unauthorized");
      }

      // Return user metadata that will be available in onUploadComplete
      return { userId: session.user.id };
    })
    // Callback after upload completes
    .onUploadComplete(async ({ metadata, file }) => {
      // This runs on your server after successful upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Return data that will be sent to client's onClientUploadComplete
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
