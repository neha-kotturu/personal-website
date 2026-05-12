import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Code2, BookOpen, Sparkles, Mail, Linkedin, Github, FileText, ChevronDown, ChevronUp, Briefcase, ExternalLink, Zap, Brain, Gamepad2, ShoppingCart, Bot } from 'lucide-react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import './App.css';
import Symbotic from './assets/Symbotic.jpeg'
import UKG from './assets/UKG.png';
import Microsoft from './assets/Microsoft.png';
import UMass from './assets/UMass.png';
import resumePdf from './assets/resume.pdf';

const tabs = [
  { id: 'about', icon: <BookOpen size={16} />, label: 'About' },
  { id: 'experience', icon: <Briefcase size={16} />, label: 'Experience' },
  { id: 'projects', icon: <Code2 size={16} />, label: 'Projects' },
];

const projects = [
  {
    name: 'Cavemanomics',
    description: 'Full-stack bartering site where users can trade items.',
    tech: ['React.js', 'Express.js', 'PostgreSQL', 'Supabase'],
    url: 'https://github.com/neha-kotturu/cavemanomics',
    category: 'Web App',
    color: '#10b981'
  },
  {
    name: 'Squaredle Player',
    description: 'Automated solver for the Squaredle game using web scraping and browser automation.',
    tech: ['Python', 'Selenium', 'BeautifulSoup'],
    url: "https://github.com/neha-kotturu/squaredle-player",
    category: 'Automation',
    color: '#f59e0b'
  },
  {
    name: 'News Classification AI',
    description: 'Fine-tuned ML models for categorizing news headlines and content.',
    tech: ['Python', 'LLMs', 'Microsoft Copilot'],
    url: "https://github.com/AI-Studio-News-Copilot/microsoft-news-copilot",
    category: 'AI/ML',
    color: '#8b5cf6'
  },
  {
    name: 'Witchistry',
    description: 'Chemistry-based 3D game where players forage for plants and complete chemistry challenges.',
    tech: ['C#', 'Unity', 'ConvAI'],
    url: "https://github.com/neha-kotturu/witchistry",
    category: 'Game Dev',
    color: '#ec4899'
  },
  {
    name: 'My Pantry Tracker',
    description: 'Full-stack inventory management application for tracking pantry items.',
    tech: ['React.js', 'Next.js', 'Firebase'],
    url: "https://github.com/neha-kotturu/my-pantry-tracker",
    category: 'Web App',
    color: '#3b82f6'
  },
];

const experiences = [
  {
    company: "Symbotic",
    role: "Co-op",
    period: "Jan 2026 - May 2026",
    description: ["Incoming Spring Co-op at Wilmington HQ on the Breakpack Team"],
    logo: Symbotic,
    tags: ["Microservices", "APIs", "Warehouse Automation"]
  },
  {
    company: "UKG",
    role: "SWE Intern",
    period: "May 2025 - Aug 2025",
    description: [
      "Expanded a scalable observability framework through Terraform, increasing monitoring coverage of critical services by over 65% and improving incident visibility",
      "Designed global ELBs to improve traffic distribution across services, enabling high availability and reducing regional failover time",
      "Developed a DNS-based pod redirection mechanism to route users to the appropriate pod based on company association, supporting multi-tenant infrastructure optimization"
    ],
    logo: UKG,
    tags: ["Terraform", "Cloud Infrastructure", "Observability"]
  },
  {
    company: "Microsoft",
    role: "AI Studio Intern",
    period: "Sept 2024 - Dec 2024",
    description: [
      "Developed and fine-tuned ML models using text classification and LLMs to efficiently categorize news headlines and content descriptions with over 97% accuracy",
      "Engineered the Microsoft Copilot app to create a custom agent for news summarization and classification"
    ],
    logo: Microsoft,
    tags: ["AI/ML", "LLMs", "Copilot"]
  },
  {
    company: "UMass IT Salesforce",
    role: "Salesforce Intern",
    period: "May 2024 - May 2025",
    description: [
      "Resolved 300+ online support tickets from staff and faculty, delivering timely solutions",
      "Built 7+ forms on FormAssembly with Salesforce integration for multiple departments, streamlining data collection processes",
      "Wrote custom APEX script to import data from Boomi REST Service and SQL Database into Salesforce",
      "Assisted with other projects and internal tools as needed"
    ],
    logo: UMass,
    tags: ["Salesforce", "APEX", "FormAssembly"]
  },
  {
    company: "UMass IT ESD",
    role: "Enterprise Applications Support Intern",
    period: "Feb 2024 - May 2024",
    description: [
      "Enhanced SPIRE site reliability by performing rigorous manual testing of 140+ features after new patch releases",
      "Contributed to the IT KnowledgeBase with 20+ articles containing detailed documentation and clearer support for SPIRE services",
      "Reviewed and updated 200+ existing IT support articles",
      "Created 7+ instructional videos using Camtasia and Audacity to support user training and improve knowledge dissemination"
    ],
    logo: UMass,
    tags: ["Testing", "Documentation", "Video Production"]
  },
  {
    company: "UMass IT Service Desk",
    role: "Student Consultant I",
    period: "Oct 2023 - May 2024",
    description: [
      "Provided in-person technical assistance to students, faculty, and alumni at UMass Amherst",
      "Responded to and managed online tickets on ServiceNow",
      "Took 250+ tickets and assisted with/resolved many more",
      "Provided live online support to clients through Bomgar"
    ],
    logo: UMass,
    tags: ["Technical Support", "ServiceNow", "Customer Service"]
  }
];

export default function App() {
  const [tab, setTab] = useState('about');
  const [expandedExp, setExpandedExp] = useState(null);
  const [hoveredExp, setHoveredExp] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleExpand = (index) => {
    setExpandedExp(expandedExp === index ? null : index);
  };

  return (
    <main className="container">
      <div className="header-section">
        <h1 className="title">
          <span className="gradient-text">Hey, I'm Neha</span> 👋
        </h1>

        <p className="subtitle">
          Welcome to my sandbox!
        </p>

        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? 'active' : ''}
              onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="content-section">
        {tab === 'about' && (
          <div className="about">
            <div className="about-content">
              <div className="about-text">
                <div className="about-section">
                  <h3>Education</h3>
                  <p>🎓 UMass Amherst - MS in Computer Science (current)</p>
                  <p>👩‍🎓 UMass Amherst - BS in Computer Science, Minor in Mathematics (graduated)</p>
                  <p>🏆 Commonwealth Honors College Scholar</p>
                </div>

                <div className="about-section">
                  <h3>Skills</h3>
                  <div className="skills-grid">
                    <div className="skill-category">
                      <h4>Languages</h4>
                      <div className="skill-blocks">
                        {['Python', 'Java', 'C#', 'C', 'JavaScript', 'Typescript'].map((skill) => (
                          <span key={skill} className="skill-block">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="about-section">
                    <div className="skill-category">
                      <h4>Web & Application Development</h4>
                      <div className="skill-blocks">
                        {['HTML/CSS', 'React.js', 'Next.js', 'Express.js', 'Tailwind CSS', 'Rest APIs', 'Microservices'].map((skill) => (
                          <span key={skill} className="skill-block">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="skill-category">
                      <h4>Tools</h4>
                      <div className="skill-blocks">
                        {['Git', 'Terraform', 'Datadog', 'Salesforce', 'Google Cloud Platform', 'RabbitMQ', 'Microsoft SSMS', 'Visual Studio'].map((skill) => (
                          <span key={skill} className="skill-block">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="skill-category">
                      <h4>AI/ML</h4>
                      <div className="skill-blocks">
                        {['PyTorch', 'TensorFlow', 'Scikit-Learn', 'LLMs', 'NLP', 'Computer Vision'].map((skill) => (
                          <span key={skill} className="skill-block">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-bar">
              <div className="contact-line"></div>
              <div className="contact-icons">
                <a href="mailto:nekotturu@gmail.com" title="Email">
                  <Mail size={20} />
                </a>
                <a href="https://www.linkedin.com/in/neha-kotturu" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/neha-kotturu" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Github size={20} />
                </a>
                <a href={resumePdf} target="_blank" rel="noopener noreferrer" title="Resume">
                  <FileText size={20} />
                </a>
              </div>
            </div>
          </div>
        )}

        {tab === 'experience' && (
          <div className="experience-section">
            <Timeline position="right">
              {experiences.map((exp, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent style={{ flex: 0.2 }} className="timeline-period-side">
                    {exp.period}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <div
                      onMouseEnter={() => setHoveredExp(index)}
                      onMouseLeave={() => setHoveredExp(null)}
                      style={{ cursor: 'pointer' }}>
                      <TimelineDot 
                        sx={{
                          bgcolor: hoveredExp === index ? '#3b82f6' : '#a855f7',
                          width: 20,
                          height: 20,
                          border: `3px solid ${hoveredExp === index ? '#3b82f6' : '#a855f7'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <div style={{
                          width: 8,
                          height: 8,
                          background: 'white',
                          borderRadius: '50%'
                        }} />
                      </TimelineDot>
                    </div>
                    {index < experiences.length - 1 && (
                      <TimelineConnector 
                        sx={{
                          background: 'linear-gradient(to bottom, #a855f7, #3b82f6)',
                          width: 4,
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div
                      className={`experience-card ${expandedExp === index ? 'expanded' : ''}`}
                      onMouseEnter={() => setHoveredExp(index)}
                      onMouseLeave={() => setHoveredExp(null)}
                      onClick={() => toggleExpand(index)}
                      style={{ cursor: 'pointer' }}>
                      
                      <div className="experience-header">
                        <div 
                          className="company-logo"
                          style={{ transition: 'transform 0.5s' }}>
                          <img src={exp.logo} alt={`${exp.company} logo`} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>{exp.company}</h3>
                            <ChevronDown 
                              size={20} 
                              color="#a855f7" 
                              style={{ 
                                transform: expandedExp === index ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.3s'
                              }} 
                            />
                          </div>
                          <div className="experience-subheader">
                            <span className="experience-role">{exp.role}</span>
                            <span className="experience-period-mobile">{exp.period}</span>
                          </div>
                          {exp.tags && (
                            <div className="experience-tags">
                              {exp.tags.map((tag, i) => (
                                <span 
                                  key={i}
                                  className="experience-tag"
                                  style={{ transition: 'all 0.2s ease' }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {expandedExp === index && (
                        <div className="experience-description">
                          {Array.isArray(exp.description) ? (
                            <ul>
                              {exp.description.map((item, i) => (
                                <li key={i}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{exp.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        )}

        {tab === 'projects' && (
          <div className="projects-showcase">
            {projects.map((p, i) => (
              <div
                key={i}
                className="project-card-enhanced"
                onClick={() => window.open(p.url, '_blank')}
                style={{ 
                  cursor: 'pointer',
                  '--accent-color': p.color
                }}>
                
                <div className="project-glow" style={{ background: `radial-gradient(circle at center, ${p.color}40, transparent)` }}></div>
                
                <div className="project-category" style={{ backgroundColor: p.color }}>
                  <Sparkles size={14} />
                  <span>{p.category}</span>
                </div>

                <div className="project-header">
                  <h3>{p.name}</h3>
                </div>

                <p className="project-description">{p.description}</p>

                <div className="project-tech-stack">
                  {p.tech.map((t, j) => (
                    <span key={j} className="tech-pill">
                      <Code2 size={12} />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-hover-indicator" style={{ backgroundColor: p.color }}>
                  Click to view on GitHub
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}