import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import config from '../config';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    interests: ''
  });

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/api/users/profile/${id}`);
      setProfile(res.data);
      setFormData({
        bio: res.data.bio || '',
        interests: res.data.interests ? res.data.interests.join(', ') : ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const interests = formData.interests.split(',').map(i => i.trim()).filter(i => i);
      await api.put('/api/users/profile', {
        bio: formData.bio,
        interests
      });
      setEditing(false);
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      await api.post('/api/users/upload-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <div>Loading...</div>;

  const isOwnProfile = user?.id === id;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture-section">
          {profile.profilePicture ? (
            <img src={`${config.API_URL}/uploads/${profile.profilePicture}`} alt={profile.firstName} className="profile-picture" />
          ) : (
            <div className="profile-picture-placeholder">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
          )}
          {isOwnProfile && (
            <label className="upload-btn">
              <input type="file" onChange={handleImageUpload} accept="image/*" hidden />
              Change Photo
            </label>
          )}
        </div>
        <div className="profile-info">
          <h1>{profile.firstName} {profile.lastName}</h1>
          <p className="profile-email">{profile.email}</p>
          <p className="profile-year">Class of {profile.graduationYear}</p>
          {isOwnProfile && !editing && (
            <button onClick={() => setEditing(true)} className="btn btn-secondary">
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        {editing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Interests (comma-separated)</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g., Child Welfare, Community Organizing, Mental Health"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {profile.bio && (
              <div className="profile-section">
                <h2>About</h2>
                <p>{profile.bio}</p>
              </div>
            )}
            {profile.interests && profile.interests.length > 0 && (
              <div className="profile-section">
                <h2>Interests</h2>
                <div className="interests-list">
                  {profile.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;