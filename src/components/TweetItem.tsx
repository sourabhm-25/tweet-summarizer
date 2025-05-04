import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Repeat, Share2, BarChart2, FileText, X } from 'lucide-react';
import { formatTweetDate } from '../services/tweetService';
import type { Tweet } from '../services/tweetService';
import { useTweets } from '../contexts/TweetContext';

interface TweetItemProps {
  tweet: Tweet;
}

const TweetItem: React.FC<TweetItemProps> = ({ tweet }) => {
  const { likeTweet, retweetTweet, summarizeTweet, summaries, summarizing } = useTweets();
  const [showSummary, setShowSummary] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [summaryHeight, setSummaryHeight] = useState(70); // Default height in vh
  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.clientHeight;
      setShowReadMore(height > lineHeight * 3);
    }
  }, [tweet.text]);

  const handleLike = () => {
    likeTweet(tweet.id);
  };

  const handleRetweet = () => {
    retweetTweet(tweet.id);
  };

  const handleSummarize = () => {
    summarizeTweet(tweet.id);
    setShowSummary(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const vh = (window.innerHeight - e.clientY) * 100 / window.innerHeight;
      if (vh >= 30 && vh <= 90) {
        setSummaryHeight(vh);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <article className="tweet-card relative">
      <div className="flex">
        <img 
          src={tweet.user.profileImageUrl} 
          alt={tweet.user.name} 
          className="w-12 h-12 rounded-full mr-3"
        />
        <div className="flex-1 min-w-0">
          {/* Tweet header */}
          <div className="flex items-center mb-1">
            <span className="font-bold truncate">{tweet.user.name}</span>
            {tweet.user.verified && (
              <svg className="w-4 h-4 ml-1 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            )}
            <span className="text-secondary-light ml-1 truncate">@{tweet.user.username}</span>
            <span className="text-secondary-light mx-1">·</span>
            <span className="text-secondary-light truncate">{formatTweetDate(tweet.createdAt)}</span>
          </div>

          {/* Tweet content */}
          <div className="relative">
            <p 
              ref={textRef}
              className={`whitespace-pre-wrap ${!isExpanded ? 'line-clamp-3' : ''}`}
            >
              {tweet.text}
            </p>
            {showReadMore && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-primary hover:underline mt-1"
              >
                Read more...
              </button>
            )}
          </div>

          {/* Tweet images if any */}
          {tweet.images && tweet.images.length > 0 && (
            <div className="mb-3 rounded-xl overflow-hidden">
              {tweet.images.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt="Tweet attachment"
                  className="w-full object-cover rounded-xl"
                />
              ))}
            </div>
          )}

          {/* Tweet actions */}
          <div className="flex justify-between mt-3">
            <button 
              className="btn-icon group"
              aria-label="Reply"
            >
              <MessageCircle size={18} className="group-hover:text-primary" />
              <span className="ml-2 text-sm group-hover:text-primary">{tweet.replies}</span>
            </button>
            
            <button 
              className={`btn-icon group ${tweet.retweeted ? 'text-green-500' : ''}`}
              onClick={handleRetweet}
              aria-label="Retweet"
            >
              <Repeat 
                size={18} 
                className={`group-hover:text-green-500 ${tweet.retweeted ? 'text-green-500' : ''}`} 
              />
              <span 
                className={`ml-2 text-sm group-hover:text-green-500 ${tweet.retweeted ? 'text-green-500' : ''}`}
              >
                {tweet.retweets}
              </span>
            </button>
            
            <button 
              className={`btn-icon group ${tweet.liked ? 'text-red-500' : ''}`}
              onClick={handleLike}
              aria-label="Like"
            >
              <Heart 
                size={18} 
                className={`group-hover:text-red-500 ${tweet.liked ? 'text-red-500 heart-pulse' : ''}`} 
                fill={tweet.liked ? 'currentColor' : 'none'}
              />
              <span 
                className={`ml-2 text-sm group-hover:text-red-500 ${tweet.liked ? 'text-red-500' : ''}`}
              >
                {tweet.likes}
              </span>
            </button>
            
            <button 
              className="btn-icon group"
              aria-label="Views"
            >
              <BarChart2 size={18} className="group-hover:text-primary" />
              <span className="ml-2 text-sm">{tweet.views}</span>
            </button>
            
            <div className="relative">
              <button 
                className="btn-icon group mr-4"
                aria-label="Share"
              >
                <Share2 size={18} className="group-hover:text-primary" />
              </button>
              
              <button 
                className="btn-icon group"
                onClick={handleSummarize}
                aria-label="Summarize"
              >
                <FileText size={18} className="group-hover:text-primary" />
                <span className="ml-2 text-sm group-hover:text-primary">
                  {summarizing[tweet.id] ? 'Summarizing...' : 'Summarize'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Summary display */}
          {summaries[tweet.id] && (
            <div className="mt-2 bg-gray-800 p-2 rounded text-sm">
              <strong>Summary:</strong> {summaries[tweet.id]}
            </div>
          )}
        </div>
      </div>

      {/* Large Summary Box */}
      {showSummary && (
        <div 
          className="fixed inset-x-0 bottom-0 w-[70%] mx-auto bg-white dark:bg-gray-800 rounded-t-xl shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out z-50"
          style={{ height: `${summaryHeight}vh` }}
        >
          {/* Resize handle */}
          <div
            ref={resizeRef}
            className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize bg-gray-200 dark:bg-gray-700 rounded-t-xl"
            onMouseDown={handleMouseDown}
          />
          
          <div className="p-6 h-full flex flex-col">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Tweet Summary</h3>
              <button 
                onClick={() => setShowSummary(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Close summary"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {summarizing[tweet.id] ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent mr-3"></div>
                  <span className="text-lg">Generating summary...</span>
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Original Tweet</h4>
                    <p className="text-gray-900 dark:text-gray-100">{tweet.text}</p>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Summary</h4>
                    <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed">
                      {summaries[tweet.id]}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This summary was generated using AI and may not be 100% accurate.
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default TweetItem;
