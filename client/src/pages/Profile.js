import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import config from '../config';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  // Demo data for other profiles
  const demoProfiles = {
    '1': {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sjohnson@uncp.edu',
      profilePicture: 'https://i.pravatar.cc/300?img=1',
      graduationYear: 2024,
      interests: ['Child Welfare', 'School Social Work', 'Family Therapy'],
      specializations: ['School Social Work'],
      fieldPlacement: {
        organization: 'Public Schools of Robeson County',
        location: 'Pembroke, NC',
        supervisor: 'Michael Brown, LCSW',
        description: 'Providing support services to elementary school students and families.'
      },
      bio: 'Dedicated to supporting children in educational settings. Focused on creating positive school environments.',
      isAlumni: false,
      openToWork: true
    },
    '2': {
      id: '2',
      firstName: 'Michael',
      lastName: 'Davis',
      email: 'mdavis@uncp.edu',
      profilePicture: 'https://i.pravatar.cc/300?img=13',
      graduationYear: 2025,
      interests: ['Mental Health', 'Substance Abuse', 'Veterans Services'],
      specializations: ['Criteria C - Clinical Practice'],
      fieldPlacement: {
        organization: 'Southeastern Regional Medical Center',
        location: 'Lumberton, NC',
        supervisor: 'Dr. Patricia Williams',
        description: 'Working in the behavioral health unit with focus on substance abuse treatment.'
      },
      bio: 'Passionate about mental health advocacy and substance abuse recovery.',
      isAlumni: false,
      openToWork: false
    },
    '3': {
      id: '3',
      firstName: 'Emily',
      lastName: 'Wilson',
      email: 'ewilson@uncp.edu',
      profilePicture: 'https://i.pravatar.cc/300?img=32',
      graduationYear: 2024,
      interests: ['Community Development', 'Policy', 'Rural Social Work'],
      specializations: ['Community Practice'],
      fieldPlacement: {
        organization: 'Lumbee Tribe of North Carolina',
        location: 'Pembroke, NC',
        supervisor: 'Robert Hunt, MSW',
        description: 'Developing community programs and conducting needs assessments for tribal members.'
      },
      bio: 'Committed to serving indigenous communities and advocating for policy change.',
      isAlumni: true,
      graduationYear: 2023,
      currentWorkplace: 'NC Department of Health and Human Services',
      jobTitle: 'Policy Analyst',
      openToWork: false
    },
    '4': {
      id: '4',
      firstName: 'Marcus',
      lastName: 'Thompson',
      email: 'mthompson@uncp.edu',
      profilePicture: 'https://i.pravatar.cc/300?img=33',
      graduationYear: 2024,
      interests: ['Youth Services', 'Criminal Justice Reform', 'Mentorship Programs'],
      specializations: ['Criteria C - Clinical Practice'],
      fieldPlacement: {
        organization: 'Robeson County Youth Services',
        location: 'Lumberton, NC',
        supervisor: 'Angela Davis, LCSW',
        description: 'Working with at-risk youth in the juvenile justice system, facilitating group therapy sessions.'
      },
      bio: 'Dedicated to breaking the school-to-prison pipeline and empowering youth in our community.',
      isAlumni: false,
      openToWork: true
    },
    '5': {
      id: '5',
      firstName: 'Ashley',
      lastName: 'Locklear',
      email: 'alocklear@uncp.edu',
      profilePicture: 'https://i.pravatar.cc/300?img=20',
      graduationYear: 2025,
      interests: ['Indigenous Health', 'Rural Social Work', 'Cultural Preservation'],
      specializations: ['Community Practice', 'Rural Social Work'],
      fieldPlacement: {
        organization: 'Lumbee Tribe Health Services',
        location: 'Pembroke, NC',
        supervisor: 'James Oxendine, MSW',
        description: 'Developing culturally responsive health programs and connecting tribal members with resources.'
      },
      bio: 'Proud Lumbee tribal member committed to serving my community and preserving our cultural heritage while addressing modern health challenges.',
      isAlumni: false,
      openToWork: false
    },
    '6': {
      id: '6',
      firstName: 'Jasmine',
      lastName: 'Williams',
      email: 'jwilliams@uncp.edu',
      profilePicture: 'https://i.pravatar.cc/300?img=47',
      graduationYear: 2024,
      interests: ['Family Therapy', 'Community Advocacy', 'Domestic Violence Prevention'],
      specializations: ['Criteria C - Clinical Practice'],
      fieldPlacement: {
        organization: 'Robeson County Family Violence Prevention Center',
        location: 'Red Springs, NC',
        supervisor: 'Dr. Keisha Johnson, LCSW',
        description: 'Providing crisis intervention and support services to survivors of domestic violence.'
      },
      bio: 'Passionate about empowering families and creating safe spaces for healing and growth in our community.',
      isAlumni: true,
      graduationYear: 2022,
      currentWorkplace: 'Southeastern Family Violence Center',
      jobTitle: 'Family Advocate',
      openToWork: true
    },
    '7': {
      id: '7',
      firstName: 'Carlos',
      lastName: 'Rodriguez',
      email: 'crodriguez@uncp.edu',
      profilePicture: 'https://i.pravatar.cc/300?img=15',
      graduationYear: 2025,
      interests: ['Immigration Services', 'Bilingual Social Work', 'Family Reunification'],
      specializations: ['Community Practice'],
      fieldPlacement: {
        organization: 'Catholic Charities Diocese of Raleigh',
        location: 'Fayetteville, NC',
        supervisor: 'Maria Gonzalez, MSW',
        description: 'Assisting immigrant families with legal services, interpretation, and community integration.'
      },
      bio: 'First-generation college student using my bilingual skills to bridge gaps and advocate for immigrant families in North Carolina.',
      isAlumni: false,
      openToWork: false
    },
    '8': {
      id: '8',
      firstName: 'Destiny',
      lastName: 'Brooks',
      email: 'dbrooks@uncp.edu',
      profilePicture: 'https://i.pravatar.cc/300?img=35',
      graduationYear: 2024,
      interests: ['Healthcare Social Work', 'Gerontology', 'End-of-Life Care'],
      specializations: ['Healthcare Social Work'],
      fieldPlacement: {
        organization: 'Cape Fear Valley Health System',
        location: 'Fayetteville, NC',
        supervisor: 'Regina Matthews, LCSW',
        description: 'Working with elderly patients and their families to navigate healthcare systems and end-of-life planning.'
      },
      bio: 'Committed to ensuring dignity and quality of life for our aging population, especially in underserved rural communities.',
      isAlumni: false,
      openToWork: true
    }
  };
  
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    interests: '',
    specializations: '',
    fieldPlacement: {
      organization: '',
      location: '',
      supervisor: '',
      description: ''
    }
  });

  useEffect(() => {
    // Use demo data instead of API call
    if (id === 'demo-user') {
      setProfile(user);
      setFormData({
        bio: user.bio || '',
        interests: user.interests ? user.interests.join(', ') : '',
        specializations: user.specializations ? user.specializations.join(', ') : '',
        fieldPlacement: user.fieldPlacement || {
          organization: '',
          location: '',
          supervisor: '',
          description: ''
        }
      });
    } else {
      const demoProfile = demoProfiles[id];
      if (demoProfile) {
        setProfile(demoProfile);
        setFormData({
          bio: demoProfile.bio || '',
          interests: demoProfile.interests ? demoProfile.interests.join(', ') : '',
          specializations: demoProfile.specializations ? demoProfile.specializations.join(', ') : '',
          fieldPlacement: demoProfile.fieldPlacement || {
            organization: '',
            location: '',
            supervisor: '',
            description: ''
          }
        });
      }
    }
  }, [id, user]);

  const fetchProfile = async () => {
    // Disabled for demo
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('fieldPlacement.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        fieldPlacement: {
          ...formData.fieldPlacement,
          [field]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  const isOwnProfile = user?.id === id || id === 'demo-user';

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture-section">
          {profile.profilePicture ? (
            <img src={profile.profilePicture} alt={profile.firstName} className="profile-picture" />
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
          <div className="profile-badges">
            {profile.isAlumni && (
              <span className="profile-badge alumni">Alumni</span>
            )}
            {profile.openToWork && (
              <span className="profile-badge open-to-work">Open to Work</span>
            )}
          </div>
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
            <div className="form-group">
              <label>Program Specializations (comma-separated)</label>
              <input
                type="text"
                name="specializations"
                value={formData.specializations}
                onChange={handleChange}
                placeholder="e.g., Criteria C - Clinical Practice, School Social Work"
              />
            </div>
            <div className="form-group">
              <label>Field Placement Organization</label>
              <input
                type="text"
                name="fieldPlacement.organization"
                value={formData.fieldPlacement.organization}
                onChange={handleChange}
                placeholder="Organization name"
              />
            </div>
            <div className="form-group">
              <label>Field Placement Location</label>
              <input
                type="text"
                name="fieldPlacement.location"
                value={formData.fieldPlacement.location}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>
            <div className="form-group">
              <label>Field Supervisor</label>
              <input
                type="text"
                name="fieldPlacement.supervisor"
                value={formData.fieldPlacement.supervisor}
                onChange={handleChange}
                placeholder="Supervisor name and credentials"
              />
            </div>
            <div className="form-group">
              <label>Field Placement Description</label>
              <textarea
                name="fieldPlacement.description"
                value={formData.fieldPlacement.description}
                onChange={handleChange}
                placeholder="Describe your field placement experience..."
                rows="3"
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
            {profile.isAlumni && profile.currentWorkplace && (
              <div className="current-workplace">
                <h3>Current Position</h3>
                <p className="position">{profile.jobTitle}</p>
                <p className="company">{profile.currentWorkplace}</p>
              </div>
            )}
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
            {profile.specializations && profile.specializations.length > 0 && (
              <div className="profile-section">
                <h2>Program Specializations</h2>
                <div className="specializations-list">
                  {profile.specializations.map((spec, index) => (
                    <span key={index} className="specialization-tag">{spec}</span>
                  ))}
                </div>
              </div>
            )}
            {profile.fieldPlacement && profile.fieldPlacement.organization && (
              <div className="profile-section">
                <h2>Field Placement</h2>
                <div className="field-placement-info">
                  <h3>{profile.fieldPlacement.organization}</h3>
                  <p className="placement-location">{profile.fieldPlacement.location}</p>
                  {profile.fieldPlacement.supervisor && (
                    <p className="placement-supervisor">Supervisor: {profile.fieldPlacement.supervisor}</p>
                  )}
                  {profile.fieldPlacement.description && (
                    <p className="placement-description">{profile.fieldPlacement.description}</p>
                  )}
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