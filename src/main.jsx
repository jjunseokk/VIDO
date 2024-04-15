import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Routes/Router';
import ContextProvider from './Routes/ContextProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileRouter from './Routes/MobileRouter';
import "./language/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <BrowserView>
          <Router />
        </BrowserView>
        <MobileView>
          <MobileRouter />
        </MobileView>
      </ContextProvider>
      <ReactQueryDevtools initialIsOpen={false} style={{ color: '#ffffff' }} />
    </QueryClientProvider>
  </RecoilRoot>
);
