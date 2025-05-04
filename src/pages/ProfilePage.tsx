import React, { useState } from 'react';
import { Calendar, MapPin, Link } from 'lucide-react';
import TweetItem from '../components/TweetItem';
import { useTweets } from '../contexts/TweetContext';

interface ProfileTab {
  id: string;
  label: string;
}

const tabs: ProfileTab[] = [
  { id: 'tweets', label: 'Tweets' },
  { id: 'replies', label: 'Replies' },
  { id: 'media', label: 'Media' },
  { id: 'likes', label: 'Likes' },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tweets');
  const { tweets } = useTweets();
  
  const userTweets = tweets.filter(tweet => tweet.user.username === 'elonmusk');
  
  return (
    <div>
      {/* Cover photo */}
      <div className="h-48 bg-primary"></div>
      
      {/* Profile header */}
      <div className="relative px-4 pb-4 border-b border-border-color dark:border-gray-800">
        {/* Profile picture */}
        <div className="absolute -top-16 left-4">
          <img 
            src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg" 
            alt="Elon Musk" 
            className="w-32 h-32 rounded-full border-4 border-white dark:border-background-dark"
          />
        </div>
        
        {/* Follow button */}
        <div className="flex justify-end mt-4">
          <button className="btn border border-border-color dark:border-gray-700 px-4 py-1.5 rounded-full font-bold hover:bg-gray-200 dark:hover:bg-gray-800">
            Follow
          </button>
        </div>
        
        {/* Profile info */}
        <div className="mt-12">
          <h1 className="text-xl font-bold">Elon Musk</h1>
          <p className="text-secondary-light">@elonmusk</p>
          
          <p className="my-3">
            Owner of X, Tesla, SpaceX and various other companies. Working to make humanity multiplanetary.
          </p>
          
          <div className="flex flex-wrap gap-y-1 text-secondary-light">
            <div className="flex items-center mr-4">
              <MapPin size={18} className="mr-1" />
              <span>Mars & Earth</span>
            </div>
            <div className="flex items-center mr-4">
              <Link size={18} className="mr-1" />
              <a href="#" className="text-primary hover:underline">tesla.com</a>
            </div>
            <div className="flex items-center mr-4">
              <Calendar size={18} className="mr-1" />
              <span>Joined June 2009</span>
            </div>
          </div>
          
          <div className="flex mt-3">
            <div className="mr-4">
              <span className="font-bold">139</span> <span className="text-secondary-light">Following</span>
            </div>
            <div>
              <span className="font-bold">154.4M</span> <span className="text-secondary-light">Followers</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border-color dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
              activeTab === tab.id 
                ? 'font-bold border-b-2 border-primary'
                : 'text-secondary-light'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content based on active tab */}
      <div>
        {activeTab === 'tweets' && (
          userTweets.length > 0 ? (
            userTweets.map(tweet => <TweetItem key={tweet.id} tweet={tweet} />)
          ) : (
            <div className="p-6 text-center">
              <p className="text-lg">No tweets to display</p>
            </div>
          )
        )}
        
        {activeTab === 'replies' && (
          <div className="p-6 text-center">
            <p className="text-lg">No replies yet</p>
          </div>
        )}
        
        {activeTab === 'media' && (
          <div className="p-6 text-center">
            <p className="text-lg">No media yet</p>
          </div>
        )}
        
        {activeTab === 'likes' && (
          <div className="p-6 text-center">
            <p className="text-lg">No likes yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;