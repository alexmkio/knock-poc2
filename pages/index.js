import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useKnockFeed } from "@knocklabs/react";
import styles from "../styles/Home.module.css";
import Toast from "../components/Toast/Toast";

export default function Home() {
  const { feedClient } = useKnockFeed();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const showToastMessage = (message, duration = 3000) => {
    setMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  useEffect(() => {
    // Show only notifications that have not been seen yet
    const onNotificationsReceived = ({ items }) => {
      // Whenever we receive a new notification from our real-time stream, show a toast
      // (note here that we can receive > 1 items in a batch)
      items.forEach((notification) => {
        if (!notification?.seen_at) {
          showToastMessage(notification.blocks[0].rendered);
        }
      });

      // Optionally, you may want to mark them as "seen" as well
      feedClient.markAsSeen(items);
    };

    // Receive all real-time notifications on our feed
    feedClient.on("items.received.realtime", onNotificationsReceived);

    // Cleanup
    return () =>
      feedClient.off("items.received.realtime", onNotificationsReceived);
  }, [feedClient]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast message={message} showToast={showToast} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
