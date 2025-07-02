import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Network = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Demo network data
  const networkMembers = [
    {
      _id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      graduationYear: 2024,
      profilePicture: 'https://i.pravatar.cc/300?img=1',
      interests: ['Child Welfare', 'School Social Work'],
      isAlumni: false,
      openToWork: true,
      connections: 45
    },
    {
      _id: '2', 
      firstName: 'Michael',
      lastName: 'Davis',
      graduationYear: 2025,
      profilePicture: 'https://i.pravatar.cc/300?img=13',
      interests: ['Mental Health', 'Substance Abuse'],
      isAlumni: false,
      openToWork: false,
      connections: 38
    },
    {
      _id: '3',
      firstName: 'Emily',
      lastName: 'Wilson',
      graduationYear: 2023,
      profilePicture: 'https://i.pravatar.cc/300?img=32',
      interests: ['Community Development', 'Policy'],
      isAlumni: true,
      currentWorkplace: 'NC Department of Health and Human Services',
      jobTitle: 'Policy Analyst',
      openToWork: false,
      connections: 127
    },
    {
      _id: '4',
      firstName: 'Marcus',
      lastName: 'Thompson',
      graduationYear: 2024,
      profilePicture: 'https://i.pravatar.cc/300?img=33',
      interests: ['Youth Services', 'Criminal Justice Reform'],
      isAlumni: false,
      openToWork: true,
      connections: 52
    },
    {
      _id: '5',
      firstName: 'Ashley',
      lastName: 'Locklear',
      graduationYear: 2025,
      profilePicture: 'https://i.pravatar.cc/300?img=20',
      interests: ['Indigenous Health', 'Rural Social Work'],
      isAlumni: false,
      openToWork: false,
      connections: 31
    },
    {
      _id: '6',
      firstName: 'Jasmine',
      lastName: 'Williams',
      graduationYear: 2022,
      profilePicture: 'https://i.pravatar.cc/300?img=47',
      interests: ['Family Therapy', 'Community Advocacy'],
      isAlumni: true,
      currentWorkplace: 'Southeastern Family Violence Center',
      jobTitle: 'Family Advocate',
      openToWork: true,
      connections: 89
    },
    {
      _id: '7',
      firstName: 'Carlos',
      lastName: 'Rodriguez',
      graduationYear: 2025,
      profilePicture: 'https://i.pravatar.cc/300?img=15',
      interests: ['Immigration Services', 'Bilingual Social Work'],
      isAlumni: false,
      openToWork: false,
      connections: 42
    },
    {
      _id: '8',
      firstName: 'Destiny',
      lastName: 'Brooks',
      graduationYear: 2024,
      profilePicture: 'https://i.pravatar.cc/300?img=35',
      interests: ['Healthcare Social Work', 'Gerontology'],
      isAlumni: false,
      openToWork: true,
      connections: 56
    },
    {
      _id: '9',
      firstName: 'Robert',
      lastName: 'Chen',
      graduationYear: 2021,
      profilePicture: 'https://i.pravatar.cc/300?img=8',
      interests: ['Clinical Social Work', 'Trauma-Informed Care'],
      isAlumni: true,
      currentWorkplace: 'Cape Fear Valley Health',
      jobTitle: 'Clinical Social Worker',
      openToWork: false,
      connections: 142
    },
    {
      _id: '10',
      firstName: 'Tiffany',
      lastName: 'Moore',
      graduationYear: 2026,
      profilePicture: 'https://i.pravatar.cc/300?img=21',
      interests: ['School Social Work', 'Youth Development'],
      isAlumni: false,
      openToWork: false,
      connections: 28
    }
  ];

  // Filter members based on search and filter criteria
  const filteredMembers = networkMembers.filter(member => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'alumni' && member.isAlumni) ||
      (activeFilter === 'students' && !member.isAlumni) ||
      (activeFilter === 'openToWork' && member.openToWork);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="network-page">
      <div className="network-header">
        <h1>Your Professional Network</h1>
        <p>Connect with UNCP Social Work students and alumni</p>
      </div>

      <div className="network-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Members
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'students' ? 'active' : ''}`}
            onClick={() => setActiveFilter('students')}
          >
            Students
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'alumni' ? 'active' : ''}`}
            onClick={() => setActiveFilter('alumni')}
          >
            Alumni
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'openToWork' ? 'active' : ''}`}
            onClick={() => setActiveFilter('openToWork')}
          >
            Open to Work
          </button>
        </div>
      </div>

      <div className="network-stats">
        <p>Showing {filteredMembers.length} of {networkMembers.length} members</p>
      </div>

      <div className="network-grid">
        {filteredMembers.map(member => (
          <Link to={`/profile/${member._id}`} key={member._id} className="network-card">
            {member.openToWork && (
              <div className="open-to-work-badge">Open to Work</div>
            )}
            {member.isAlumni && (
              <div className="alumni-badge">Alumni</div>
            )}
            
            <div className="member-avatar">
              {member.profilePicture ? (
                <img src={member.profilePicture} alt={member.firstName} />
              ) : (
                <div className="avatar-placeholder">
                  {member.firstName[0]}{member.lastName[0]}
                </div>
              )}
            </div>
            
            <h3>{member.firstName} {member.lastName}</h3>
            <p className="member-year">Class of {member.graduationYear}</p>
            
            {member.isAlumni && member.currentWorkplace && (
              <div className="workplace-info">
                <p className="job-title">{member.jobTitle}</p>
                <p className="workplace">{member.currentWorkplace}</p>
              </div>
            )}
            
            <div className="member-interests">
              {member.interests.slice(0, 2).map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
            
            <div className="member-connections">
              <span>{member.connections} connections</span>
            </div>
            
            <button className="connect-btn">Connect</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Network;