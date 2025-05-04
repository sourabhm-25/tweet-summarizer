import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Tweet, fetchTweets } from '../services/tweetService';

interface TweetContextType {
  tweets: Tweet[];
  loading: boolean;
  error: string | null;
  refreshTweets: () => Promise<void>;
  likeTweet: (id: string) => void;
  retweetTweet: (id: string) => void;
  summarizeTweet: (id: string) => void;
  summaries: Record<string, string>;
  summarizing: Record<string, boolean>;
}

const TweetContext = createContext<TweetContextType | undefined>(undefined);

export const TweetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [summarizing, setSummarizing] = useState<Record<string, boolean>>({});

  const refreshTweets = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedTweets = await fetchTweets();
      setTweets(fetchedTweets);
      setError(null);
    } catch (err) {
      setError('Failed to load tweets. Please try again later.');
      console.error('Error fetching tweets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTweets();
  }, [refreshTweets]);

  const likeTweet = (id: string) => {
    setTweets(prevTweets => 
      prevTweets.map(tweet => 
        tweet.id === id 
          ? { ...tweet, liked: !tweet.liked, likes: tweet.liked ? tweet.likes - 1 : tweet.likes + 1 } 
          : tweet
      )
    );
  };

  const retweetTweet = (id: string) => {
    setTweets(prevTweets => 
      prevTweets.map(tweet => 
        tweet.id === id 
          ? { ...tweet, retweeted: !tweet.retweeted, retweets: tweet.retweeted ? tweet.retweets - 1 : tweet.retweets + 1 } 
          : tweet
      )
    );
  };

  const summarizeTweet = async (id: string) => {
    if (summaries[id]) return;
  
    setSummarizing(prev => ({ ...prev, [id]: true }));
  
    const tweet = tweets.find(t => t.id === id);
    if (!tweet) return;
  
    try {
      const res = await fetch('http://localhost:5000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: tweet.text })
      });
  
      const data = await res.json();
      setSummaries(prev => ({ ...prev, [id]: data.summary }));
    } catch (err) {
      console.error('Error summarizing tweet:', err);
      setSummaries(prev => ({ ...prev, [id]: 'Failed to summarize tweet.' }));
    } finally {
      setSummarizing(prev => ({ ...prev, [id]: false }));
    }
  };
  

  return (
    <TweetContext.Provider value={{ 
      tweets, 
      loading, 
      error, 
      refreshTweets, 
      likeTweet, 
      retweetTweet, 
      summarizeTweet,
      summaries,
      summarizing
    }}>
      {children}
    </TweetContext.Provider>
  );
};

export const useTweets = (): TweetContextType => {
  const context = useContext(TweetContext);
  if (context === undefined) {
    throw new Error('useTweets must be used within a TweetProvider');
  }
  return context;
};