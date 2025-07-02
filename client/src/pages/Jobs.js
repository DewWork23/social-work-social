import React, { useState } from 'react';

const Jobs = () => {
  const demoJobs = [
    {
      id: 1,
      title: 'School Social Worker',
      organization: 'Public Schools of Robeson County',
      location: 'Pembroke, NC',
      type: 'Full-time',
      experienceLevel: 'Entry Level',
      postedDate: '2 days ago',
      salary: '$45,000 - $52,000',
      description: 'We are seeking a compassionate School Social Worker to join our team at Pembroke Elementary School. You will work with students, families, and educators to address barriers to learning and promote student success.',
      requirements: [
        'BSW from CSWE-accredited program required',
        'NC School Social Work License or eligible',
        'Experience with children and families preferred',
        'Bilingual (English/Spanish) a plus'
      ],
      responsibilities: [
        'Conduct assessments and develop intervention plans',
        'Provide individual and group counseling',
        'Connect families with community resources',
        'Collaborate with teachers and administrators',
        'Maintain accurate documentation'
      ]
    },
    {
      id: 2,
      title: 'Clinical Social Worker - Behavioral Health',
      organization: 'Southeastern Regional Medical Center',
      location: 'Lumberton, NC',
      type: 'Full-time',
      experienceLevel: 'Mid-Level',
      postedDate: '1 week ago',
      salary: '$55,000 - $65,000',
      description: 'Join our behavioral health team providing mental health services to diverse populations in Robeson County. Work in both inpatient and outpatient settings.',
      requirements: [
        'MSW required, LCSW preferred',
        'Criteria C certification a plus',
        '2+ years clinical experience',
        'Experience with substance abuse treatment'
      ],
      responsibilities: [
        'Provide individual and group therapy',
        'Conduct psychosocial assessments',
        'Develop treatment plans',
        'Crisis intervention',
        'Collaborate with multidisciplinary team'
      ]
    },
    {
      id: 3,
      title: 'Family Services Specialist',
      organization: 'Lumbee Tribe of North Carolina',
      location: 'Pembroke, NC',
      type: 'Full-time',
      experienceLevel: 'Entry Level',
      postedDate: '3 days ago',
      salary: '$42,000 - $48,000',
      description: 'Support Lumbee families through culturally responsive social services. Perfect opportunity for new BSW graduates passionate about serving indigenous communities.',
      requirements: [
        'BSW or related degree',
        'Knowledge of Lumbee culture and history preferred',
        'Valid NC driver\'s license',
        'Ability to work with diverse families'
      ],
      responsibilities: [
        'Case management for tribal families',
        'Connect clients with resources',
        'Facilitate support groups',
        'Home visits and community outreach',
        'Maintain cultural sensitivity'
      ]
    },
    {
      id: 4,
      title: 'Youth Program Coordinator',
      organization: 'Boys & Girls Club of Robeson County',
      location: 'Lumberton, NC',
      type: 'Full-time',
      experienceLevel: 'Entry Level',
      postedDate: '5 days ago',
      salary: '$38,000 - $44,000',
      description: 'Lead after-school and summer programs for at-risk youth. Great opportunity for social work graduates interested in youth development and prevention services.',
      requirements: [
        'Bachelor\'s degree in Social Work or related field',
        'Experience working with youth',
        'Strong program planning skills',
        'Background check required'
      ],
      responsibilities: [
        'Develop and implement youth programs',
        'Supervise program staff and volunteers',
        'Build relationships with youth and families',
        'Track program outcomes',
        'Coordinate with community partners'
      ]
    },
    {
      id: 5,
      title: 'Medical Social Worker - Hospice',
      organization: 'Southeastern Hospice',
      location: 'Fayetteville, NC',
      type: 'Full-time',
      experienceLevel: 'Entry Level',
      postedDate: '1 day ago',
      salary: '$48,000 - $55,000',
      description: 'Provide compassionate end-of-life care and support to patients and families. Join a caring interdisciplinary team making a difference during life\'s most challenging moments.',
      requirements: [
        'BSW required, MSW preferred',
        'Valid driver\'s license and reliable transportation',
        'Excellent communication skills',
        'Ability to handle emotional situations'
      ],
      responsibilities: [
        'Psychosocial assessments',
        'Grief and bereavement counseling',
        'Resource coordination',
        'Family support and education',
        'Interdisciplinary team collaboration'
      ]
    },
    {
      id: 6,
      title: 'Bilingual Family Advocate',
      organization: 'Centro Latino of Robeson County',
      location: 'Red Springs, NC',
      type: 'Part-time',
      experienceLevel: 'Entry Level',
      postedDate: '4 days ago',
      salary: '$20-25/hour',
      description: 'Support Spanish-speaking families in navigating social services, healthcare, and education systems. Perfect for bilingual social work students or recent graduates.',
      requirements: [
        'Fluent in Spanish and English',
        'BSW or pursuing BSW',
        'Cultural competency',
        'Flexible schedule'
      ],
      responsibilities: [
        'Interpretation and translation services',
        'Help families access resources',
        'Cultural advocacy',
        'Community education',
        'Documentation in both languages'
      ]
    }
  ];

  const [selectedJob, setSelectedJob] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');

  const filteredJobs = demoJobs.filter(job => {
    if (filterType !== 'all' && job.type !== filterType) return false;
    if (filterExperience !== 'all' && job.experienceLevel !== filterExperience) return false;
    return true;
  });

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Job Opportunities</h1>
        <p>Find your next social work position in the Robeson County area</p>
      </div>

      <div className="jobs-filters">
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <select 
          value={filterExperience} 
          onChange={(e) => setFilterExperience(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Experience Levels</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid-Level">Mid-Level</option>
        </select>
      </div>

      <div className="jobs-content">
        <div className="jobs-list">
          {filteredJobs.map(job => (
            <div 
              key={job.id} 
              className={`job-card ${selectedJob?.id === job.id ? 'selected' : ''}`}
              onClick={() => setSelectedJob(job)}
            >
              <div className="job-card-header">
                <h3>{job.title}</h3>
                <span className="job-type">{job.type}</span>
              </div>
              <h4>{job.organization}</h4>
              <div className="job-meta">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.salary}</span>
                <span>•</span>
                <span>{job.postedDate}</span>
              </div>
              <p className="job-preview">{job.description.substring(0, 150)}...</p>
              <div className="job-tags">
                <span className="experience-tag">{job.experienceLevel}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="job-details">
            <div className="job-details-header">
              <h2>{selectedJob.title}</h2>
              <button className="btn btn-primary">Apply Now</button>
            </div>
            <h3>{selectedJob.organization}</h3>
            <div className="job-meta-detailed">
              <span>{selectedJob.location}</span>
              <span>•</span>
              <span>{selectedJob.type}</span>
              <span>•</span>
              <span>{selectedJob.salary}</span>
              <span>•</span>
              <span>{selectedJob.postedDate}</span>
            </div>

            <div className="job-section">
              <h4>Job Description</h4>
              <p>{selectedJob.description}</p>
            </div>

            <div className="job-section">
              <h4>Requirements</h4>
              <ul>
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="job-section">
              <h4>Responsibilities</h4>
              <ul>
                {selectedJob.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div className="job-actions">
              <button className="btn btn-primary">Apply Now</button>
              <button className="btn btn-secondary">Save Job</button>
            </div>
          </div>
        )}

        {!selectedJob && (
          <div className="job-details-empty">
            <p>Select a job to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;