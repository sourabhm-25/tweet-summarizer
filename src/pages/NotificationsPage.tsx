import React from 'react';
import { Bell, Heart, Repeat, MessageCircle, UserPlus } from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'retweet' | 'reply' | 'follow';
  user: {
    name: string;
    username: string;
    profileImageUrl: string;
  };
  content?: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Elon Musk',
      username: 'elonmusk',
      profileImageUrl: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg',
    },
    content: 'Just announced a new AI model that can summarize long-form content...',
    time: '2h'
  },
  {
    id: '2',
    type: 'retweet',
    user: {
      name: 'Tim Cook',
      username: 'tim_cook',
      profileImageUrl: 'https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg',
    },
    content: 'The future of technology isn\'t about building more features...',
    time: '5h'
  },
  {
    id: '3',
    type: 'reply',
    user: {
      name: 'GitHub',
      username: 'github',
      profileImageUrl: 'https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_400x400.png',
    },
    content: 'We\'re experiencing record adoption of our new platform...',
    time: '1d'
  },
  {
    id: '4',
    type: 'follow',
    user: {
      name: 'Bill Gates',
      username: 'BillGates',
      profileImageUrl: 'https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg',
    },
    time: '2d'
  },
  {
    id: '5',
    type: 'like',
    user: {
      name: 'React',
      username: 'reactjs',
      profileImageUrl: 'https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png',
    },
    content: 'Just released our latest update with significant performance improvements...',
    time: '3d'
  },
];

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'like':
      return <Heart size={16} className="text-red-500" />;
    case 'retweet':
      return <Repeat size={16} className="text-green-500" />;
    case 'reply':
      return <MessageCircle size={16} className="text-primary" />;
    case 'follow':
      return <UserPlus size={16} className="text-primary" />;
    default:
      return <Bell size={16} className="text-primary" />;
  }
};

const NotificationMessage = ({ notification }: { notification: Notification }) => {
  switch (notification.type) {
    case 'like':
      return <span><span className="font-bold">{notification.user.name}</span> liked your Tweet</span>;
    case 'retweet':
      return <span><span className="font-bold">{notification.user.name}</span> retweeted your Tweet</span>;
    case 'reply':
      return <span><span className="font-bold">{notification.user.name}</span> replied to your Tweet</span>;
    case 'follow':
      return <span><span className="font-bold">{notification.user.name}</span> followed you</span>;
    default:
      return <span>New notification</span>;
  }
};

const NotificationsPage: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-border-color dark:border-gray-800 z-10">
        <h1 className="text-xl font-bold">Notifications</h1>
      </header>
      
      {/* Notification filters */}
      <div className="flex border-b border-border-color dark:border-gray-800">
        <button className="flex-1 py-4 text-center font-bold border-b-2 border-primary">All</button>
        <button className="flex-1 py-4 text-center text-secondary-light hover:bg-gray-50 dark:hover:bg-gray-800">Mentions</button>
      </div>
      
      {/* Notifications list */}
      <div>
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b border-border-color dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex">
              <div className="mr-3 mt-1">
                <NotificationIcon type={notification.type} />
              </div>
              <div className="flex-1">
                <div className="flex mb-2">
                  <img 
                    src={notification.user.profileImageUrl} 
                    alt={notification.user.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <NotificationMessage notification={notification} />
                    <span className="text-secondary-light text-sm">· {notification.time}</span>
                  </div>
                </div>
                {notification.content && (
                  <p className="text-secondary-light ml-12">{notification.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;