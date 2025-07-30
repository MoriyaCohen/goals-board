// src/components/auth/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Paper
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('הוראות לאיפוס סיסמה נשלחו לדוא"ל שלך');
    } catch (error) {
      console.error("שגיאה באיפוס סיסמה:", error);
      setError('שגיאה בשליחת הוראות איפוס סיסמה');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs" dir="rtl">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            איפוס סיסמה
          </Typography>
          
          {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{message}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="אימייל"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              שלח הוראות איפוס
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login" variant="body2">
                  חזרה להתחברות
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  אין לך חשבון? הירשם
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}