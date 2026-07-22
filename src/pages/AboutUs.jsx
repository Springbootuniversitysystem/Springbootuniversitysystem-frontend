import React, { useState } from 'react';
import { Globe, GraduationCap, Users, Edit3, User, Trash2, Plus } from 'lucide-react';
import './AboutUs.css'; 

export default function AboutUs({ role }) {
  const isAdmin = role === "ADMIN";

  // General content blocks
  const [content, setContent] = useState({
    heroTitle: "About PathFinder",
    heroSubtitle: "We believe every South African learner deserves expert career guidance — regardless of their school, province, or background.",
    missionTitle: "Our Mission",
    missionBody1: "PathFinder was born from a simple observation: thousands of South African Grade 12 learners make life-altering university application decisions without adequate guidance. Many apply for courses they don't qualify for. Others settle for less because they don't know they qualify for more.",
    missionBody2: "Our platform bridges that gap — giving every learner access to the kind of personalised career guidance previously available only to students at well-resourced schools with professional guidance counsellors.",
    missionImgUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    missionImgYear: "2021",
    missionImgText: "Founded in Cape Town",
    stat1Title: "All 9 Provinces",
    stat1Desc: "We serve learners across every South African province, from urban centres to rural communities.",
    stat2Title: "150+ Programmes",
    stat2Desc: "Covering every major study area at all 26 public universities in South Africa.",
    stat3Title: "12,000+ Students",
    stat3Desc: "Thousands of learners have used PathFinder to make confident, informed university decisions.",
    teamTitle: "Meet the Team"
  });

  // Dynamic list for Team Members
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Dr. Zanele Mokoena",
      role: "Founder & CEO",
      sub: "Former DHET Education Specialist",
      imgUrl: "" // Leave blank to test the placeholder icon out!
    },
    {
      id: 2,
      name: "Ruan Pretorius",
      role: "CTO",
      sub: "UCT Computer Science Alumni",
      imgUrl: ""
    },
    {
      id: 3,
      name: "Fatima Hendricks",
      role: "Head of Curriculum",
      sub: "Wits Education Faculty PhD",
      imgUrl: ""
    }
  ]);

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  // Modify individual team member properties
  const handleMemberChange = (id, field, value) => {
    setTeamMembers(prev => 
      prev.map(member => member.id === id ? { ...member, [field]: value } : member)
    );
  };

  // Add a brand new team profile row
  const handleAddMember = () => {
    const newMember = {
      id: Date.now(), // safe simple tracking token
      name: "New Team Member",
      role: "Role / Designation",
      sub: "Department or Bio Summary",
      imgUrl: ""
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  // Evict a profile completely from the list array mapping frame
  const handleRemoveMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <div className="about-page-wrapper">
      
      {/* Admin Visual Editor Control Header */}
      {isAdmin && (
        <div className="admin-bar">
          <div className="admin-bar-left">
            <div className="live-indicator"></div>
            <span className="admin-bar-title">Visual Editor Active</span>
          </div>
          <button onClick={() => alert("Publishing updates...")} className="publish-btn">
            Publish Layout Changes
          </button>
        </div>
      )}

      {/* Hero Header Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          {isAdmin ? (
            <div className="hero-edit-container">
              <div className="edit-badge"><Edit3 size={12}/> Editing Hero Section</div>
              <input type="text" name="heroTitle" value={content.heroTitle} onChange={handleContentChange} className="hero-input" />
              <textarea name="heroSubtitle" value={content.heroSubtitle} onChange={handleContentChange} className="hero-textarea" />
            </div>
          ) : (
            <>
              <h1 className="hero-title">{content.heroTitle}</h1>
              <p className="hero-subtitle">{content.heroSubtitle}</p>
            </>
          )}
        </div>
      </section>

      {/* Two-Column Mission & Asset Section */}
      <section className="mission-section">
        <div className="mission-text-column">
          {isAdmin ? (
            <div className="clean-admin-card">
              <div className="edit-badge"><Edit3 size={12}/> Text Content</div>
              <label className="clean-label">Heading</label>
              <input type="text" name="missionTitle" value={content.missionTitle} onChange={handleContentChange} className="clean-input" />
              <label className="clean-label">Paragraph 1</label>
              <textarea name="missionBody1" value={content.missionBody1} onChange={handleContentChange} className="clean-textarea text-area-large" />
              <label className="clean-label">Paragraph 2</label>
              <textarea name="missionBody2" value={content.missionBody2} onChange={handleContentChange} className="clean-textarea text-area-large" />
            </div>
          ) : (
            <>
              <h2 className="section-heading">{content.missionTitle}</h2>
              <p className="body-text">{content.missionBody1}</p>
              <p className="body-text">{content.missionBody2}</p>
            </>
          )}
        </div>
        
        <div className="mission-asset-column">
          {isAdmin ? (
            <div className="clean-admin-card full-width-card">
              <div className="edit-badge"><Edit3 size={12}/> Media Assets</div>
              <label className="clean-label">Image URL</label>
              <input type="text" name="missionImgUrl" value={content.missionImgUrl} onChange={handleContentChange} className="clean-input font-small" />
              
              <label className="clean-label">Overlay Highlight Year</label>
              <input type="text" name="missionImgYear" value={content.missionImgYear} onChange={handleContentChange} className="clean-input" />
              
              <label className="clean-label">Overlay Subtext</label>
              <input type="text" name="missionImgText" value={content.missionImgText} onChange={handleContentChange} className="clean-input" />
            </div>
          ) : (
            <div className="image-container">
              <img src={content.missionImgUrl} alt="Students" className="mission-img" />
              <div className="image-overlay-tag">
                <div className="tag-year">{content.missionImgYear}</div>
                <div className="tag-text">{content.missionImgText}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Core Highlights Grid */}
      <section className="metrics-section">
        <div className="metrics-grid">
          {[
            { id: 1, icon: <Globe size={22} color="#0c1e36" />, keyTitle: 'stat1Title', keyDesc: 'stat1Desc' },
            { id: 2, icon: <GraduationCap size={22} color="#0c1e36" />, keyTitle: 'stat2Title', keyDesc: 'stat2Desc' },
            { id: 3, icon: <Users size={22} color="#0c1e36" />, keyTitle: 'stat3Title', keyDesc: 'stat3Desc' }
          ].map((stat) => (
            <div key={stat.id} className="metric-card">
              <div className="icon-circle">{stat.icon}</div>
              {isAdmin ? (
                <div className="clean-admin-card-inline">
                  <input type="text" name={stat.keyTitle} value={content[stat.keyTitle]} onChange={handleContentChange} className="clean-input-inline-title" />
                  <textarea name={stat.keyDesc} value={content[stat.keyDesc]} onChange={handleContentChange} className="clean-textarea-inline-desc" />
                </div>
              ) : (
                <>
                  <h4 className="card-title">{content[stat.keyTitle]}</h4>
                  <p className="card-desc">{content[stat.keyDesc]}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Leadership Team Board */}
      <section className="team-section">
        <div className="team-container">
          {isAdmin ? (
            <input type="text" name="teamTitle" value={content.teamTitle} onChange={handleContentChange} className="hero-input-center" />
          ) : (
            <h2 className="team-main-title">{content.teamTitle}</h2>
          )}
          
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member">
                
                {/* Media frame: Render image if string path exists, else fallback gracefully to user avatar icon */}
                <div className="avatar-circle">
                  {member.imgUrl ? (
                    <img src={member.imgUrl} alt={member.name} className="team-avatar-image" />
                  ) : (
                    <User size={32} color="#0c1e36" />
                  )}
                </div>

                {isAdmin ? (
                  <div className="team-admin-card">
                    <input 
                      type="text" 
                      value={member.name} 
                      onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)} 
                      className="team-input-name" 
                      placeholder="Name"
                    />
                    <input 
                      type="text" 
                      value={member.role} 
                      onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)} 
                      className="team-input-role" 
                      placeholder="Role"
                    />
                    <input 
                      type="text" 
                      value={member.sub} 
                      onChange={(e) => handleMemberChange(member.id, 'sub', e.target.value)} 
                      className="team-input-sub" 
                      placeholder="Details"
                    />
                    <input 
                      type="text" 
                      value={member.imgUrl} 
                      onChange={(e) => handleMemberChange(member.id, 'imgUrl', e.target.value)} 
                      className="team-input-sub" 
                      placeholder="Image URL Link"
                    />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveMember(member.id)} 
                      className="team-delete-btn"
                    >
                      <Trash2 size={14} /> Remove Member
                    </button>
                  </div>
                ) : (
                  <>
                    <h5 className="member-name">{member.name}</h5>
                    <p className="member-role">{member.role}</p>
                    <p className="member-sub">{member.sub}</p>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Admin Insertion Controller Trigger */}
          {isAdmin && (
            <div className="team-add-control-wrapper">
              <button type="button" onClick={handleAddMember} className="team-add-btn">
                <Plus size={16} /> Add New Team Member
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}