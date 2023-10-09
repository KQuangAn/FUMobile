import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {act} from 'react-test-renderer';
import LoginScreen from './LoginScreen';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('LoginScreen', () => {
  it('renders the login screen correctly', () => {
    const {getByText, getByPlaceholderText} = render(<LoginScreen />);
    const welcomeText = getByText('Welcome');
    const signInButton = getByText('LOG IN');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    expect(welcomeText).toBeTruthy();
    expect(signInButton).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('performs login when form is submitted', async () => {
    const signInWithEmailAndPasswordMock = jest.fn();
    signInWithEmailAndPasswordMock.mockResolvedValue({user: {}}); // Mock the login response
    jest.mock('firebase/auth', () => ({
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
    }));

    const {getByText, getByPlaceholderText} = render(<LoginScreen />);
    const signInButton = getByText('LOG IN');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    // Fill in the form
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');

    // Submit the form
    await act(async () => {
      fireEvent.press(signInButton);
    });

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
      // Expected email and password
      expect.anything(),
      'test@example.com',
      'testpassword',
    );
  });
});
