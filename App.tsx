import React from 'react';
import Navigation from './src/main/navigation/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  // React.useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, user)
  // },[]
  // )

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
export default App;
