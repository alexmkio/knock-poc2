import "../styles/globals.css";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";

function MyApp({ Component, pageProps }) {
  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} 
      userId={process.env.NEXT_PUBLIC_KNOCK_FEED_USER_ID}
    >
      <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}>
        <Component {...pageProps} />
      </KnockFeedProvider>
    </KnockProvider>
  );
}

export default MyApp;
