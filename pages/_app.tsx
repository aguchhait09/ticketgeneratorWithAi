// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@mantine/tiptap/styles.css';
import 'react-quill/dist/quill.snow.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
      <QueryClientProvider client={queryClient}>
        <Toaster richColors/>
        <Component {...pageProps} />
      </QueryClientProvider>
  );
}
