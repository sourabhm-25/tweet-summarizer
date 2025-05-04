import axios from 'axios';
import { formatDistance } from 'date-fns';

export interface Tweet {
  id: string;
  text: string;
  user: {
    id: string;
    name: string;
    username: string;
    profileImageUrl: string;
    verified: boolean;
  };
  createdAt: string;
  likes: number;
  replies: number;
  retweets: number;
  views: number;
  liked: boolean;
  retweeted: boolean;
  images?: string[];
}

// Mock data to simulate Twitter API response
const mockTweets: Tweet[] = [
  {
    id: '1',
    text: 'Just announced a new AI model that can summarize long-form content with remarkable accuracy. This is a game changer for content creators and researchers! #AI #MachineLearning',
    user: {
      id: '101',
      name: 'Elon Musk',
      username: 'elonmusk',
      profileImageUrl: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg',
      verified: true,
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 5243,
    replies: 342,
    retweets: 1204,
    views: 143500,
    liked: false,
    retweeted: false,
    images: ['https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2']
  },
  {
    id: '2',
    text: 'The future of technology isn\'t about building more features, but about creating meaningful experiences that enhance human connection. We need to focus on tech that brings us together, not pulls us apart.',
    user: {
      id: '102',
      name: 'Tim Cook',
      username: 'tim_cook',
      profileImageUrl: 'https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg',
      verified: true,
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 3827,
    replies: 529,
    retweets: 1043,
    views: 98750,
    liked: false,
    retweeted: false
  },
  {
    id: '3',
    text: 'We\'re experiencing record adoption of our new platform. Thanks to our amazing community for the support! The future is bright for open source development. #OpenSource #Programming',
    user: {
      id: '103',
      name: 'GitHub',
      username: 'github',
      profileImageUrl: 'https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_400x400.png',
      verified: true,
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 2105,
    replies: 187,
    retweets: 543,
    views: 76320,
    liked: false,
    retweeted: false,
    images: ['https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2']
  },
  {
    id: '4',
    text: 'Just finished reading an amazing book on quantum computing. The potential applications are mind-blowing! Highly recommend for anyone interested in the future of computing technology. #QuantumComputing #Tech',
    user: {
      id: '104',
      name: 'Bill Gates',
      username: 'BillGates',
      profileImageUrl: 'https://tse2.mm.bing.net/th?id=OIP.TvYXXb92t5_DtFyc-GCMhAHaE8&pid=Api&P=0&h=180',
      verified: true,
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 4327,
    replies: 652,
    retweets: 1243,
    views: 112790,
    liked: false,
    retweeted: false
  },
  {
    id: '5',
    text: 'Just released our latest update with significant performance improvements and new features! Check it out and let us know what you think. #WebDevelopment #FrontEnd',
    user: {
      id: '105',
      name: 'React',
      username: 'reactjs',
      profileImageUrl: 'https://tse1.mm.bing.net/th?id=OIP.K-4RqDC6zFrpAG31ayDDOgHaHa&pid=Api&P=0&h=180',
      verified: true,
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 3751,
    replies: 248,
    retweets: 987,
    views: 89320,
    liked: false,
    retweeted: false
  }
];

// Helper function to format the date
export const formatTweetDate = (dateString: string): string => {
  return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
};

// This would be a real API call in a production app
export const fetchTweets = async (): Promise<Tweet[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, we'd make an actual API call like:
  // const response = await axios.get('https://api.twitter.com/2/tweets');
  // return response.data;
  
  return mockTweets;
};

// For summarization, in a real app we'd call an external API
export const summarizeTweetContent = async (tweetId: string, text: string): Promise<string> => {
  // This would call an external API in a real implementation
  // const response = await axios.post('https://api.summarization.com/summarize', { text });
  // return response.data.summary;
  
  // For now, just return a mock summary
  return `Summary: This tweet discusses ${
    text.includes('technology') ? 'technology trends' : 
    text.includes('AI') ? 'artificial intelligence' : 
    'various topics'
  } with some interesting insights.`;
};