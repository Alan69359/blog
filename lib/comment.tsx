'use server'

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod'; // For validation

const commentsFilePath = path.join(process.cwd(), 'database', 'comment.json');

export interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

// --- Helper function to read comments ---
async function readComments(): Promise<Comment[]> {
  try {
    const data = await fs.readFile(commentsFilePath, 'utf-8');
    return JSON.parse(data) as Comment[];
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    console.error("Error reading comments file:", error);
    return [];
  }
}

// --- Helper function to write comments ---
async function writeComments(comments: Comment[]): Promise<void> {
  await fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), 'utf-8');
}

// --- Server Action: Get all comments ---
export async function getComments(): Promise<Comment[]> {
  const comments = await readComments();
  // Sort by newest first
  return comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// --- Schema for validation ---
const CommentSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).max(50, { message: "Name must be 50 characters or less."}),
  message: z.string().min(1, { message: "Message is required." }).max(500, { message: "Message must be 500 characters or less."}),
});

export interface AddCommentFormState {
  message: string;
  errors?: {
    name?: string[];
    message?: string[];
    _form?: string[]; // For general form errors
  };
  success: boolean;
}

// --- Server Action: Add a new comment ---
export async function addComment(
  prevState: AddCommentFormState,
  formData: FormData
): Promise<AddCommentFormState> {
  const validatedFields = CommentSchema.safeParse({
    name: formData.get('name'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { name, message } = validatedFields.data;

  try {
    const comments = await readComments();
    const newComment: Comment = {
      id: Date.now().toString(), // Simple ID, use UUID in production
      name,
      message,
      createdAt: new Date().toISOString(),
    };
    comments.push(newComment);
    await writeComments(comments);

    revalidatePath('/guestbook'); // Revalidate the guestbook page to show the new comment

    return { message: 'Comment added successfully!', success: true };
  } catch (error) {
    console.error("Failed to add comment:", error);
    return {
      message: "Failed to add comment. Please try again.",
      errors: { _form: ["An unexpected error occurred."] },
      success: false
    };
  }
}