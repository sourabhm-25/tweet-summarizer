import React from 'react';
import TweetItem from './TweetItem';
import { useTweets } from '../contexts/TweetContext';

const TweetList: React.FC = () => {
  const { tweets, loading, error, refreshTweets } = useTweets();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => refreshTweets()}
          className="btn btn-primary px-4 py-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {tweets.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-lg">No tweets to display</p>
        </div>
      ) : (
        tweets.map(tweet => <TweetItem key={tweet.id} tweet={tweet} />)
      )}
    </div>
  );
};

export default TweetList;