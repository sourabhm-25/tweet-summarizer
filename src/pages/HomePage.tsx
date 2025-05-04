import React from 'react';
import TweetList from '../components/TweetList';
import { RefreshCw } from 'lucide-react';
import { useTweets } from '../contexts/TweetContext';

const HomePage: React.FC = () => {
  const { refreshTweets } = useTweets();

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-border-color dark:border-gray-800 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Home</h1>
          <button 
            onClick={() => refreshTweets()}
            className="btn-icon"
            aria-label="Refresh"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>
      
      {/* Compose tweet box */}
      <div className="p-4 border-b border-border-color dark:border-gray-800">
        <div className="flex">
          <img 
            src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg" 
            alt="Your profile" 
            className="w-12 h-12 rounded-full mr-3"
          />
          <div className="flex-1">
            <textarea 
              placeholder="What's happening?"
              className="w-full bg-transparent text-lg placeholder-secondary-light resize-none focus:outline-none mb-3 h-24"
            ></textarea>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 text-primary">
                {/* Tweet icons would go here */}
              </div>
              <button className="btn btn-primary px-4 py-2 rounded-full">
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tweet list */}
      <TweetList />
    </div>
  );
};

export default HomePage;