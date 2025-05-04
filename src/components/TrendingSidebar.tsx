import React from 'react';
import { Search } from 'lucide-react';

interface TrendingTopic {
  category: string;
  title: string;
  tweetCount: string;
}

const trendingTopics: TrendingTopic[] = [
  { category: 'Technology', title: 'React 19', tweetCount: '42.5K' },
  { category: 'Sports', title: 'Champions League', tweetCount: '125K' },
  { category: 'Politics', title: 'Election2024', tweetCount: '340K' },
  { category: 'Entertainment', title: 'New Marvel Movie', tweetCount: '87.3K' },
  { category: 'Business', title: 'Bitcoin', tweetCount: '97.2K' },
];

interface SuggestedUser {
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

const suggestedUsers: SuggestedUser[] = [
  { 
    name: 'NASA', 
    username: 'NASA', 
    avatar: 'https://pbs.twimg.com/profile_images/1321163587679784960/0ZxKlEKB_400x400.jpg', 
    verified: true 
  },
  { 
    name: 'Vercel', 
    username: 'vercel', 
    avatar: 'https://pbs.twimg.com/profile_images/1252531684353998848/6R0-p1Vf_400x400.jpg', 
    verified: true 
  },
  { 
    name: 'Next.js', 
    username: 'nextjs', 
    avatar: 'https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg', 
    verified: true 
  },
];

const TrendingSidebar: React.FC = () => {
  return (
    <div className="p-4 h-screen overflow-y-auto sticky top-0">
      {/* Search bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-secondary-light" />
        </div>
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-gray-100 dark:bg-gray-800 w-full py-3 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      {/* Trending section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl mb-6">
        <h2 className="font-bold text-xl p-4">Trends for you</h2>
        <ul>
          {trendingTopics.map((topic, index) => (
            <li key={index} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <span className="text-secondary-light text-sm">{topic.category} · Trending</span>
              <p className="font-bold">{topic.title}</p>
              <span className="text-secondary-light text-sm">{topic.tweetCount} Tweets</span>
            </li>
          ))}
        </ul>
        <a href="#" className="block p-4 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-2xl transition-colors">
          Show more
        </a>
      </div>
      
      {/* Who to follow section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <h2 className="font-bold text-xl p-4">Who to follow</h2>
        <ul>
          {suggestedUsers.map((user, index) => (
            <li key={index} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-center justify-between">
              <div className="flex items-center">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <div className="flex items-center">
                    <p className="font-bold">{user.name}</p>
                    {user.verified && (
                      <svg className="w-4 h-4 ml-1 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-secondary-light">@{user.username}</p>
                </div>
              </div>
              <button className="bg-secondary dark:bg-white dark:text-secondary text-white font-bold px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                Follow
              </button>
            </li>
          ))}
        </ul>
        <a href="#" className="block p-4 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-2xl transition-colors">
          Show more
        </a>
      </div>
    </div>
  );
};

export default TrendingSidebar;