'use client';

import * as React from 'react';
import { useFormStatus } from 'react-dom';
import { TextField, Button, Box, Typography, Alert, CircularProgress,Divider } from '@mui/material';
import { addComment, AddCommentFormState } from 'lib/comment'; // Ensure correct path
import * as Card from 'ui/card'

interface Box1Props {
  style?: React.CSSProperties;
}

// box of footer
export function Box1() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2, // Use theme spacing for padding
        px: 2,
        // mt: 'auto' is no longer needed here because the parent flex container handles it.
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Match the header style
        backdropFilter: 'blur(8px)',
      }}
    >
      <Typography variant="body2" align="center" color="text.secondary">
        © 2025 Alan69359. All rights reserved.
      </Typography>
    </Box>
  );
}

export function Box11({ style }: Box1Props) {
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        ...style
      }}
    >
      <Typography
        sx={{
          color: 'var(--mui-palette-text-primary)',
          fontSize: '1.5rem',
          fontWeight: 400,
          textAlign: 'center',
          lineHeight: 1.6,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          transition: 'color 0.3s ease, text-shadow 0.3s ease',
        }}
      >
        「俺はこの世界で本気で生きていこう。もう、二度と後悔はしないように。全力で。」<br />"我将在这个世界中认真地活下去，不再有任何遗憾，全力以赴。"
      </Typography>
    </Box>
  );
}


const initialState: AddCommentFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={pending}
      sx={{ mt: 2 }}
      startIcon={pending ? <CircularProgress size={20} color="inherit" /> : null}
    >
      {pending ? 'Submitting...' : 'Leave Comment'}
    </Button>
  );
}

// form of comment
export function Box2() {
  const [state, formAction] = React.useActionState(addComment, initialState);

  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <Box component="form" action={formAction} ref={formRef} sx={{ mt: 3, mb: 4, maxWidth: '500px' }}>
      <Typography variant="h5" gutterBottom>
        Leave a Comment
      </Typography>

      {state.message && !state.success && state.errors?._form && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.errors._form.join(', ')}
        </Alert>
      )}
      {state.message && state.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {state.message}
        </Alert>
      )}

      <TextField
        label="Your Name"
        name="name"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        error={!!state.errors?.name}
        helperText={state.errors?.name?.join(', ')}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Your Message"
        name="message"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        required
        error={!!state.errors?.message}
        helperText={state.errors?.message?.join(', ')}
        InputLabelProps={{ shrink: true }}
      />
      <SubmitButton />
    </Box>
  );
}

// Blog list component
export function Box3({ posts }: Card.BlogListProps): React.JSX.Element {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Latest Posts
      </Typography>

      {posts.map((post, index) => (
        <React.Fragment key={post.slug}>
          <Card.Card2 post={post} />
          {index < posts.length - 1 && <Divider sx={{ my: 2 }} />}
        </React.Fragment>
      ))}
    </Box>
  );
}