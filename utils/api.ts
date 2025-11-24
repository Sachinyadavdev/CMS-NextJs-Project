// API utilities for file upload and media management

interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

interface FileValidation {
  maxSize: number; // in MB
  allowedTypes: string[];
  dimensions?: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
}

const IMAGE_VALIDATION: FileValidation = {
  maxSize: 10, // 10MB
  allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  dimensions: {
    minWidth: 800,
    minHeight: 600,
    maxWidth: 4000,
    maxHeight: 3000,
  },
};

const VIDEO_VALIDATION: FileValidation = {
  maxSize: 100, // 100MB
  allowedTypes: ["video/mp4", "video/webm", "video/ogg"],
  dimensions: {
    minWidth: 1280,
    minHeight: 720,
    maxWidth: 3840,
    maxHeight: 2160,
  },
};

/**
 * Validate file size and type
 */
function validateFile(file: File, validation: FileValidation): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > validation.maxSize) {
      reject(
        new Error(
          `File size must be less than ${
            validation.maxSize
          }MB. Current size: ${fileSizeMB.toFixed(2)}MB`
        )
      );
      return;
    }

    // Check file type
    if (!validation.allowedTypes.includes(file.type)) {
      reject(
        new Error(
          `File type not supported. Allowed types: ${validation.allowedTypes.join(
            ", "
          )}`
        )
      );
      return;
    }

    // Check dimensions for images and videos
    if (
      validation.dimensions &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      const element = file.type.startsWith("image/")
        ? new Image()
        : document.createElement("video");
      const url = URL.createObjectURL(file);

      const cleanup = () => URL.revokeObjectURL(url);

      const onLoad = () => {
        const width = file.type.startsWith("image/")
          ? (element as HTMLImageElement).naturalWidth
          : (element as HTMLVideoElement).videoWidth;
        const height = file.type.startsWith("image/")
          ? (element as HTMLImageElement).naturalHeight
          : (element as HTMLVideoElement).videoHeight;

        cleanup();

        const { minWidth, minHeight, maxWidth, maxHeight } =
          validation.dimensions!;
        const fileType = file.type.startsWith("image/") ? "Image" : "Video";

        if (minWidth && width < minWidth) {
          reject(
            new Error(
              `${fileType} width must be at least ${minWidth}px. Current: ${width}px`
            )
          );
          return;
        }

        if (minHeight && height < minHeight) {
          reject(
            new Error(
              `${fileType} height must be at least ${minHeight}px. Current: ${height}px`
            )
          );
          return;
        }

        if (maxWidth && width > maxWidth) {
          reject(
            new Error(
              `${fileType} width must be less than ${maxWidth}px. Current: ${width}px`
            )
          );
          return;
        }

        if (maxHeight && height > maxHeight) {
          reject(
            new Error(
              `${fileType} height must be less than ${maxHeight}px. Current: ${height}px`
            )
          );
          return;
        }

        resolve();
      };

      const onError = () => {
        cleanup();
        reject(new Error("Failed to load media file for validation"));
      };

      if (file.type.startsWith("image/")) {
        (element as HTMLImageElement).onload = onLoad;
        (element as HTMLImageElement).onerror = onError;
      } else {
        (element as HTMLVideoElement).onloadedmetadata = onLoad;
        (element as HTMLVideoElement).onerror = onError;
      }

      element.src = url;
    } else {
      resolve();
    }
  });
}

/**
 * Upload file to Vercel Blob storage
 */
export async function uploadFile(
  file: File,
  type: "image" | "video" = "image"
): Promise<string> {
  try {
    // Validate file
    const validation = type === "image" ? IMAGE_VALIDATION : VIDEO_VALIDATION;
    await validateFile(file, validation);

    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    // Upload to server
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Upload failed" }));
      throw new Error(errorData.error || `Upload failed: ${response.status}`);
    }

    const data: UploadResponse = await response.json();
    return data.url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

/**
 * Delete file from Vercel Blob storage
 */
export async function deleteFile(url: string): Promise<void> {
  try {
    const response = await fetch("/api/upload", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
      },
      body: JSON.stringify({ url }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Delete failed" }));
      throw new Error(errorData.error || `Delete failed: ${response.status}`);
    }
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
}

/**
 * Get file validation rules for display
 */
export function getValidationRules(type: "image" | "video") {
  const validation = type === "image" ? IMAGE_VALIDATION : VIDEO_VALIDATION;
  return {
    maxSize: validation.maxSize,
    allowedTypes: validation.allowedTypes,
    dimensions: validation.dimensions,
  };
}

/**
 * Store data to Vercel Blob (deprecated - layouts now stored in MySQL)
 */
export async function storeData(
  dataType: "layout" | "config" | "settings" | "metadata",
  data: any,
  filename?: string
): Promise<string> {
  try {
    const response = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
      },
      body: JSON.stringify({ dataType, data, filename }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Data storage failed" }));
      throw new Error(errorData.error || `Data storage failed: ${response.status}`);
    }

    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error("Data storage error:", error);
    throw error;
  }
}

/**
 * Retrieve data from Vercel Blob URL (deprecated - layouts now retrieved from MySQL)
 */
export async function retrieveData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to retrieve data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Data retrieval error:", error);
    throw error;
  }
}

/**
 * Delete data from Vercel Blob
 */
export async function deleteData(url: string): Promise<void> {
  try {
    const response = await fetch("/api/data", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
      },
      body: JSON.stringify({ url }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Delete failed" }));
      throw new Error(errorData.error || `Delete failed: ${response.status}`);
    }
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
}
