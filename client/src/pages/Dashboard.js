import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');

  // Demo posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/300?img=1',
        title: 'Social Work Student',
        year: 'Class of 2024'
      },
      content: 'Just finished my field placement at the local family services center. It\'s been an incredible learning experience working with diverse families and understanding the complexities of case management. Grateful for the mentorship!',
      timestamp: '2 hours ago',
      likes: 12,
      comments: [
        {
          id: 1,
          author: 'Emily Wilson',
          content: 'That sounds amazing! Which center were you placed at?',
          timestamp: '1 hour ago'
        }
      ],
      liked: false
    },
    {
      id: 2,
      author: {
        id: '3',
        name: 'Emily Wilson',
        avatar: 'https://i.pravatar.cc/300?img=32',
        title: 'Policy Analyst',
        year: 'Alumni 2023'
      },
      content: 'Excited to share that our team at NC DHHS just launched a new initiative to improve access to mental health services in rural communities. If any current students are interested in policy work, feel free to reach out!',
      timestamp: '5 hours ago',
      likes: 28,
      comments: [
        {
          id: 1,
          author: 'Marcus Thompson',
          content: 'This is exactly the kind of work I want to do after graduation!',
          timestamp: '4 hours ago'
        },
        {
          id: 2,
          author: 'Ashley Locklear',
          content: 'Would love to learn more about this initiative!',
          timestamp: '3 hours ago'
        }
      ],
      liked: true
    },
    {
      id: 3,
      author: {
        id: '4',
        name: 'Marcus Thompson',
        avatar: 'https://i.pravatar.cc/300?img=33',
        title: 'Social Work Student',
        year: 'Class of 2024'
      },
      content: 'Looking for study partners for the Social Work Licensure Exam. Planning to create a study group that meets twice a week. Who\'s interested?',
      timestamp: '1 day ago',
      likes: 15,
      comments: [
        {
          id: 1,
          author: 'Destiny Brooks',
          content: 'Count me in! When are you thinking of starting?',
          timestamp: '23 hours ago'
        }
      ],
      liked: false
    },
    {
      id: 4,
      author: {
        id: '5',
        name: 'Ashley Locklear',
        avatar: 'https://i.pravatar.cc/300?img=20',
        title: 'Social Work Student',
        year: 'Class of 2025'
      },
      content: 'Attending the Indigenous Health Conference this weekend. It\'s so important that we incorporate culturally responsive practices in our work. Looking forward to bringing back insights to share with everyone!',
      timestamp: '2 days ago',
      likes: 34,
      comments: [],
      liked: true
    },
    {
      id: 5,
      author: {
        id: '6',
        name: 'Jasmine Williams',
        avatar: 'https://i.pravatar.cc/300?img=47',
        title: 'Family Advocate',
        year: 'Alumni 2022'
      },
      content: 'Pro tip for current students: Start building your professional network early! Attending conferences, joining professional organizations, and connecting with alumni made a huge difference in my job search.',
      timestamp: '3 days ago',
      likes: 45,
      comments: [
        {
          id: 1,
          author: 'Carlos Rodriguez',
          content: 'Great advice! Any specific organizations you recommend?',
          timestamp: '2 days ago'
        }
      ],
      liked: false
    }
  ]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: {
          id: user?.id || 'current',
          name: user?.name || 'Current User',
          avatar: null,
          title: 'Social Work Student',
          year: 'Class of 2025'
        },
        content: newPostContent,
        timestamp: 'Just now',
        likes: 0,
        comments: [],
        liked: false
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="dashboard newsfeed">
      <div className="feed-container">
        <div className="create-post-section">
          <h2>Share with your network</h2>
          <form onSubmit={handlePostSubmit} className="post-form">
            <textarea
              placeholder="What's on your mind? Share updates, insights, or questions..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="post-textarea"
              rows="3"
            />
            <button type="submit" className="btn btn-primary post-btn">Post</button>
          </form>
        </div>

        <div className="posts-feed">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <Link to={`/profile/${post.author.id}`} className="post-author">
                  <div className="author-avatar">
                    {post.author.avatar ? (
                      <img src={post.author.avatar} alt={post.author.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="author-info">
                    <h4>{post.author.name}</h4>
                    <p>{post.author.title} • {post.author.year}</p>
                  </div>
                </Link>
                <span className="post-timestamp">{post.timestamp}</span>
              </div>
              
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              
              <div className="post-actions">
                <button 
                  className={`action-btn ${post.liked ? 'liked' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <span className="icon">❤️</span>
                  <span>{post.likes} Likes</span>
                </button>
                <button className="action-btn">
                  <span className="icon">💬</span>
                  <span>{post.comments.length} Comments</span>
                </button>
                <button className="action-btn">
                  <span className="icon">📤</span>
                  <span>Share</span>
                </button>
              </div>
              
              {post.comments.length > 0 && (
                <div className="post-comments">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <strong>{comment.author}:</strong> {comment.content}
                      <span className="comment-timestamp">{comment.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <aside className="feed-sidebar">
        <div className="sidebar-section">
          <h3>Trending Topics</h3>
          <ul className="trending-list">
            <li>#FieldPlacement2024</li>
            <li>#SocialWorkLicensure</li>
            <li>#CommunityOutreach</li>
            <li>#MentalHealthAwareness</li>
            <li>#UNCPSocialWork</li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <h3>Upcoming Events</h3>
          <div className="event-item">
            <h4>NASW Student Chapter Meeting</h4>
            <p>Thursday, 3:00 PM • Room 201</p>
          </div>
          <div className="event-item">
            <h4>Field Placement Fair</h4>
            <p>Next Monday • Student Center</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;