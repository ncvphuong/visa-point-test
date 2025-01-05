import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface SharedAuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: { id: string; email: string; user_metadata: any }) => void;
  mode?: 'login' | 'signup';
}

export const SharedAuthModal = ({ open, onClose, onSuccess, mode = 'login' }: SharedAuthModalProps) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (user) {
          onSuccess({
            id: user.id,
            email: user.email || '',
            user_metadata: user.user_metadata,
          });
          onClose();
        }
      } else {
        const { data: { user }, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        if (error) throw error;
        
        if (user) {
          onSuccess({
            id: user.id,
            email: user.email || '',
            user_metadata: user.user_metadata,
          });
          alert('Account created successfully! Please check your email for verification.');
          onClose();
        } else {
          alert('Please check your email to confirm your account before signing in.');
          onClose();
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => {
        onClose();
        resetForm();
      }}
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        elevation: 3,
        sx: { px: 2 }
      }}
    >
      <DialogTitle sx={{ pt: 3 }}>
        {isLogin ? 'Sign in to your account' : 'Create a new account'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {!isLogin && (
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}
          <TextField
            autoFocus={isLogin}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Password must be at least 6 characters"
          />
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  resetForm();
                }}
                sx={{ textTransform: 'none' }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ px: 4 }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 