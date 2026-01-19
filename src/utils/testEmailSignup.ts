import { supabase } from '../lib/supabase';

// Test email signup to verify confirmation emails are working
export const testEmailSignup = async (email: string, password: string) => {
  try {
    console.log('Testing email signup for:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: 'Test User',
        },
      },
    });

    if (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }

    console.log('Signup response:', data);
    
    // Check if user was created but needs confirmation
    if (data.user && !data.session) {
      console.log('User created successfully. Confirmation email should be sent.');
      return { 
        success: true, 
        message: 'User created. Check email for confirmation link.',
        needsConfirmation: true 
      };
    }
    
    if (data.session) {
      console.log('User already confirmed or email confirmation disabled.');
      return { 
        success: true, 
        message: 'User already confirmed.',
        needsConfirmation: false 
      };
    }

    return { success: false, error: 'Unknown response from Supabase' };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
};
