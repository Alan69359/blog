// app/guestbook/page.tsx
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import { getComments, Comment } from "lib/comment";
import { Box3 } from "ui/box"; // Using the correct named import

const styles = {
  container1: {
    py: { xs: 3, sm: 4 }, // Responsive vertical padding
    px: { xs: 2, sm: 4 }, // Responsive horizontal padding
    mt: 4, // Margin top to push it down from the navbar
    mb: 4, // Margin bottom for spacing
    backgroundColor: "background.paper", // THIS IS THE KEY!
    borderRadius: 2, // Adds rounded corners (theme.shape.borderRadius * 2)
    boxShadow: 3, // Adds a subtle shadow for elevation
  },
};

export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  const comments: Comment[] = await getComments();

  return (
    // --- STYLE THE CONTAINER HERE ---
    <Container maxWidth="md" sx={styles.container1}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Guestbook
      </Typography>
      <Box3 />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Comments ({comments.length})
      </Typography>
      {comments.length === 0 ? (
        <Typography>No comments yet. Be the first one!</Typography>
      ) : (
        // We can now remove the extra Paper component, as the Container handles the background
        <List
          sx={{ bgcolor: "background.paper" /* This ensures consistency */ }}
        >
          {comments.map((comment, index) => (
            <Box key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      component="span"
                      fontWeight="bold"
                    >
                      {comment.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        display="block"
                        sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                      >
                        {comment.message}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < comments.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </Box>
          ))}
        </List>
      )}
    </Container>
  );
}
