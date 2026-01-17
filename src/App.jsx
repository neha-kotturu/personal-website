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

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      <div className="header-section">
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <span className="gradient-text">Hey, I'm Neha</span> 👋
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Welcome to my sandbox!
        </motion.p>

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
        <AnimatePresence mode="wait">
          {tab === 'about' && (
            <motion.div
              key="about"
              className="about"
              variants={fadeVariant}
              initial="hidden"
              animate="show"
              exit="hidden">
              <div className="about-content">
                <div className="about-text">
                  <motion.div 
                    className="about-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}>
                    <h3>Education</h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}>
                      🎓 UMass Amherst - MS in Computer Science (current)
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}>
                      👩‍🎓 UMass Amherst - BS in Computer Science, Minor in Mathematics (graduated)
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}>
                      {/* 📅 Expected MS Graduation: Dec 2026 */}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}>
                      🏆 Commonwealth Honors College Scholar
                    </motion.p>
                  </motion.div>

                  <motion.div 
                    className="about-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2 }}>
                    <h3>Skills</h3>
                    <div className="skills-grid">
                      <div className="skill-category">
                        <h4>Languages</h4>
                        <div className="skill-blocks">
                          {['Python', 'Java', 'C#', 'C', 'JavaScript', 'Typescript'].map((skill, idx) => (
                            <motion.span 
                              key={skill}
                              className="skill-block"
                              initial={{ opacity: 0, scale: 0, rotate: -180 }}
                              whileInView={{ 
                                opacity: 1, 
                                scale: 1, 
                                rotate: 0,
                                transition: { 
                                  delay: idx * 0.05,
                                  type: "spring",
                                  stiffness: 200
                                }
                              }}
                              viewport={{ once: true }}
                              whileHover={{ 
                                scale: 1.1, 
                                rotate: [0, -5, 5, 0],
                                transition: { duration: 0.3 }
                              }}>
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="about-section">
                      <div className="skill-category">
                        <h4>Web & Application Development</h4>
                        <div className="skill-blocks">
                          {['HTML/CSS', 'React.js', 'Next.js', 'Express.js', 'Tailwind CSS', 'Rest APIs', 'Microservices'].map((skill, idx) => (
                            <motion.span 
                              key={skill}
                              className="skill-block"
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: idx * 0.1 }
                              }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.1, y: -2 }}>
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="skill-category">
                        <h4>Tools</h4>
                        <div className="skill-blocks">
                          {['Git', 'Terraform', 'Datadog', 'Salesforce', 'Google Cloud Platform', 'RabbitMQ', 'Microsoft SSMS', 'Visual Studio'].map((skill, idx) => (
                            <motion.span 
                              key={skill}
                              className="skill-block"
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: idx * 0.1 }
                              }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.1, y: -2 }}>
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="skill-category">
                        <h4>AI/ML</h4>
                        <div className="skill-blocks">
                          {['PyTorch', 'TensorFlow', 'Scikit-Learn', 'LLMs', 'NLP', 'Computer Vision'].map((skill, idx) => (
                            <motion.span 
                              key={skill}
                              className="skill-block"
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: idx * 0.1 }
                              }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.1, y: -2 }}>
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <motion.div 
                className="contact-bar"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}>
                <div className="contact-line"></div>
                <div className="contact-icons">
                  <motion.a 
                    href="mailto:nekotturu@gmail.com" 
                    title="Email"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: "spring" }}>
                    <Mail size={20} />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/neha-kotturu" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="LinkedIn"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}>
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a 
                    href="https://github.com/neha-kotturu" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="GitHub"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, type: "spring" }}>
                    <Github size={20} />
                  </motion.a>
                  <motion.a 
                    href={resumePdf} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Resume"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, type: "spring" }}>
                    <FileText size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}

          {tab === 'experience' && (
            <motion.div
              key="experience"
              className="experience-section"
              variants={fadeVariant}
              initial="hidden"
              animate="show"
              exit="hidden">
              <Timeline position="right">
                {experiences.map((exp, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent style={{ flex: 0.2 }} className="timeline-period-side">
                      {exp.period}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}>
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
                      </motion.div>
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
                      <motion.div
                        className={`experience-card ${expandedExp === index ? 'expanded' : ''}`}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0, 
                          scale: 1,
                          transition: { 
                            duration: 0.5,
                            delay: 0.1,
                            ease: "easeOut"
                          }
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        onMouseEnter={() => setHoveredExp(index)}
                        onMouseLeave={() => setHoveredExp(null)}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 8px 30px rgba(168, 85, 247, 0.3)'
                        }}
                        onClick={() => toggleExpand(index)}
                        style={{ cursor: 'pointer' }}>
                        
                        <div className="experience-header">
                          <motion.div 
                            className="company-logo"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}>
                            <img src={exp.logo} alt={`${exp.company} logo`} />
                          </motion.div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <h3>{exp.company}</h3>
                              <motion.div
                                animate={{ rotate: expandedExp === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}>
                                <ChevronDown size={20} color="#a855f7" />
                              </motion.div>
                            </div>
                            <div className="experience-subheader">
                              <span className="experience-role">{exp.role}</span>
                              <span className="experience-period-mobile">{exp.period}</span>
                            </div>
                            {exp.tags && (
                              <div className="experience-tags">
                                {exp.tags.map((tag, i) => (
                                  <motion.span 
                                    key={i}
                                    className="experience-tag"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}>
                                    {tag}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {expandedExp === index && (
                            <motion.div
                              className="experience-description"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}>
                              {Array.isArray(exp.description) ? (
                                <ul>
                                  {exp.description.map((item, i) => (
                                    <motion.li 
                                      key={i}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}>
                                      {item}
                                    </motion.li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{exp.description}</p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </motion.div>
          )}

          {tab === 'projects' && (
            <motion.div
              key="projects"
              className="projects-showcase"
              variants={fadeVariant}
              initial="hidden"
              animate="show"
              exit="hidden">
              {projects.map((p, i) => (
                <motion.div
                  key={i}
                  className="project-card-enhanced"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    transition: {
                      duration: 0.5,
                      delay: i * 0.15,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => window.open(p.url, '_blank')}
                  style={{ 
                    cursor: 'pointer',
                    '--accent-color': p.color
                  }}>
                  
                  <div className="project-glow" style={{ background: `radial-gradient(circle at center, ${p.color}40, transparent)` }}></div>
                  
                  <motion.div 
                    className="project-category"
                    style={{ backgroundColor: p.color }}
                    whileHover={{ scale: 1.05 }}>
                    <Sparkles size={14} />
                    <span>{p.category}</span>
                  </motion.div>

                  <div className="project-header">
                    <h3>{p.name}</h3>
                  </div>

                  <p className="project-description">{p.description}</p>

                  <div className="project-tech-stack">
                    {p.tech.map((t, j) => (
                      <motion.span 
                        key={j}
                        className="tech-pill"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: i * 0.15 + j * 0.08 }
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -3,
                          boxShadow: `0 4px 12px ${p.color}60`
                        }}>
                        <Code2 size={12} />
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div 
                    className="project-hover-indicator"
                    style={{ backgroundColor: p.color }}>
                    Click to view on GitHub
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}