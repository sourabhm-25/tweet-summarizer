import React from 'react';
import { Search } from 'lucide-react';

const trendingTopics = [
  { category: 'Technology', title: 'React 19', tweetCount: '42.5K' },
  { category: 'Sports', title: 'Champions League', tweetCount: '125K' },
  { category: 'Politics', title: 'Election2024', tweetCount: '340K' },
  { category: 'Entertainment', title: 'New Marvel Movie', tweetCount: '87.3K' },
  { category: 'Business', title: 'Bitcoin', tweetCount: '97.2K' },
  { category: 'Health', title: 'COVID-19', tweetCount: '215K' },
  { category: 'Science', title: 'Mars Mission', tweetCount: '56.2K' },
  { category: 'Music', title: 'New Album Release', tweetCount: '78.1K' },
  { category: 'Food', title: 'Vegan Recipes', tweetCount: '22.9K' },
  { category: 'Gaming', title: 'New Game Launch', tweetCount: '113K' },
];

const ExplorePage: React.FC = () => {
  return (
    <div>
      {/* Header with search */}
      <header className="sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-border-color dark:border-gray-800 z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-secondary-light" />
          </div>
          <input
            type="text"
            placeholder="Search Twitter"
            className="bg-gray-100 dark:bg-gray-800 w-full py-3 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </header>
      
      {/* Trending topics */}
      <div>
        <h2 className="font-bold text-xl p-4">Trends for you</h2>
        <ul>
          {trendingTopics.map((topic, index) => (
            <li key={index} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer border-b border-border-color dark:border-gray-800">
              <span className="text-secondary-light text-sm">{topic.category} · Trending</span>
              <p className="font-bold">{topic.title}</p>
              <span className="text-secondary-light text-sm">{topic.tweetCount} Tweets</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExplorePage;