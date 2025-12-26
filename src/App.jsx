import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, BookOpen, Sparkles, Mail, Linkedin, Github, FileText } from 'lucide-react';
import './App.css';
import Symbotic from './assets/Symbotic.jpeg'
import UKG from './assets/UKG.png';
import Microsoft from './assets/Microsoft.png';
import UMass from './assets/UMass.png';
import resumePdf from './assets/resume.pdf';

const tabs = [
  { id: 'about', icon: <BookOpen size={16} />, label: 'About' },
  { id: 'experience', icon: <BookOpen size={16} />, label: 'Experience' },
  { id: 'projects', icon: <Code2 size={16} />, label: 'Projects' },
];

const projects = [
  {
    name: 'Cavemanomics',
    description: 'Full-stack bartering site where users can trade items.',
    tech: ['React.js', 'Express.js', 'PostgreSQL', 'Supabase'],
    url: 'https://github.com/neha-kotturu/cavemanomics'
  },
  {
    name: 'Squaredle Player',
    description: 'Automated solver for the Squaredle game using web scraping and browser automation.',
    tech: ['Python', 'Selenium', 'BeautifulSoup'],
    url: "https://github.com/neha-kotturu/squaredle-player"
  },
  {
    name: 'News Classification AI',
    description: 'Fine-tuned ML models for categorizing news headlines and content.',
    tech: ['Python', 'LLMs', 'Microsoft Copilot'],
    url: "https://github.com/AI-Studio-News-Copilot/microsoft-news-copilot"
  },
  {
    name: 'Witchistry',
    description: 'Chemistry-based 3D game where players forage for plants and complete chemistry challenges.',
    tech: ['C#', 'Unity', 'ConvAI'],
    url: "https://github.com/neha-kotturu/witchistry"
  },
  {
    name: 'My Pantry Tracker',
    description: 'Full-stack inventory management application for tracking pantry items.',
    tech: ['React.js', 'Next.js', 'Firebase'],
    url: "https://github.com/neha-kotturu/my-pantry-tracker"
  },
];

const experiences = [
  {
    company: "Symbotic",
    role: "Co-op",
    period: "Jan 2026 - May 2026",
    description: ["Incoming Spring Co-op at Wilmington HQ"],
    logo: Symbotic
  },
  {
    company: "UKG",
    role: "SWE Intern",
    period: "May 2025 - Aug 2025",
    description: ["Expanded a scalable observability framework through Terraform, increasing monitoring coverage of critical services by over 65% and improving incident visibility",
                  "Designed global ELBs to improve traffic distribution across services, enabling high availability and reducing regional failover time",
                  "Developed a DNS-based pod redirection mechanism to route users to the appropriate pod based on company association, supporting multi-tenant infrastructure optimization"],
    logo: UKG
  },
  {
    company: "Microsoft",
    role: "AI Studio Intern",
    period: "Sept 2024 - Dec 2024",
    description: [
      "Developed and fine-tuned ML models using text classification and LLMs to efficiently categorize news headlines and content descriptions with over 97% accuracy",
      "Engineered the Microsoft Copilot app to create a custom agent for news summarization and classification"
    ],
    logo: Microsoft
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
    logo: UMass
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
    logo: UMass
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
    logo: UMass
  }
];

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function App() {
  const [tab, setTab] = useState('about');

  return (
    <main className="container">
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
                  <div className="about-section">
                    <h3>Education</h3>
                    <p>🎓 UMass Amherst - MS in Computer Science (current)</p>
                    <p>👩‍🎓 UMass Amherst - BS in Computer Science, Minor in Mathematics (graduated)</p>
                    <p>📅 Expected MS Graduation: Dec 2026</p>
                    <p>🏆 Commonwealth Honors College Scholar</p>
                  </div>

                  <div className="about-section">
                    <h3>Skills</h3>
                    <div className="skills-grid">
                      <div className="skill-category">
                        <h4>Languages</h4>
                        <div className="skill-blocks">
                          <span className="skill-block">Python</span>
                          <span className="skill-block">Java</span>
                          <span className="skill-block">C</span>
                          <span className="skill-block">C#</span>
                          <span className="skill-block">JavaScript</span>
                          <span className="skill-block">Typescript</span>
                          <span className="skill-block">HTML/CSS</span>
                        </div>
                      </div>
                    </div>
                    <div className="about-section">
                      <div className="skill-category">
                        <h4>Frameworks</h4>
                        <div className="skill-blocks">
                          <span className="skill-block">React.js</span>
                          <span className="skill-block">Next.js</span>
                          <span className="skill-block">Express.js</span>
                          <span className="skill-block">Tailwind CSS</span>
                        </div>
                      </div>
                      <div className="skill-category">
                        <h4>Tools</h4>
                        <div className="skill-blocks">
                          <span className="skill-block">Git</span>
                          <span className="skill-block">Terraform</span>
                          <span className="skill-block">Datadog</span>
                          <span className="skill-block">Google Cloud Platform</span>
                          <span className="skill-block">VS Code</span>
                        </div>
                      </div>
                      <div className="skill-category">
                        <h4>AI/ML</h4>
                        <div className="skill-blocks">
                          <span className="skill-block">PyTorch</span>
                          <span className="skill-block">TensorFlow</span>
                          <span className="skill-block">Scikit-Learn</span>
                          <span className="skill-block">LLMs</span>
                          <span className="skill-block">NLP</span>
                          <span className="skill-block">Computer Vision</span>
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
            </motion.div>
          )}

          {tab === 'experience' && (
            <motion.div
              key="experience"
              className="experience-container"
              variants={fadeVariant}
              initial="hidden"
              animate="show"
              exit="hidden">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="experience-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <div className="experience-header">
                    <div className="company-logo">
                      <img src={exp.logo} alt={`${exp.company} logo`} />
                    </div>
                    <div>
                      <h3>{exp.company}</h3>
                      <div className="experience-subheader">
                        <span className="experience-role">{exp.role}</span>
                        <span className="experience-period">{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="experience-description">
                    {Array.isArray(exp.description) ? (
                      <ul>
                        {exp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{exp.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 'projects' && (
            <motion.div
              key="projects"
              className="grid"
              variants={fadeVariant}
              initial="hidden"
              animate="show"
              exit="hidden">
              {projects.map((p, i) => (
                <motion.div
                  key={i}
                  className="card"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open(p.url, '_blank')}
                  style={{ cursor: 'pointer' }}>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tech.map((t, j) => (
                      <span key={j}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
