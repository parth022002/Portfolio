import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { SkillsEvidenceSection } from './components/SkillsEvidenceSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ResearchSection } from './components/ResearchSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { FloatingAIButton } from './components/FloatingAIButton';
import { Footer } from './components/Footer';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [preloadedAiProject, setPreloadedAiProject] = useState<Project | null>(null);

  const handleOpenAI = (project?: Project) => {
    if (project) {
      setPreloadedAiProject(project);
    } else {
      setPreloadedAiProject(null);
    }
    setIsAiOpen(true);
  };

  const handleSelectProjectById = (id: string) => {
    const p = PORTFOLIO_DATA.projects.find(item => item.id === id);
    if (p) {
      setSelectedProject(p);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#F8FAFC] selection:bg-sky-500/30 selection:text-sky-200">
      {/* 1. Header Navigation with logo1, centered links, and right social icons */}
      <Navbar />

      {/* Main Page Content */}
      <main>
        {/* 2. Hero Section: Left Text + Right AI Avatar Video + Clean Number Counters */}
        <HeroSection />

        {/* 3. Deep Case Study Projects Grid */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenVideo={(project) => setSelectedProject(project)}
        />

        {/* 4. Skills & Verifiable Evidence Constellation */}
        <SkillsEvidenceSection
          onSelectProjectById={handleSelectProjectById}
        />

        {/* 5. 16+ Verified Certificates Wall */}
        <CertificatesSection />

        {/* 6. Research & Technical Working Papers */}
        <ResearchSection
          onSelectProjectById={handleSelectProjectById}
        />

        {/* 7. Career & Academic Trajectory */}
        <ExperienceSection />

        {/* 8. Direct Contact Hub & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Button at Bottom-Right */}
      <FloatingAIButton onClick={() => handleOpenAI()} />

      {/* Deep Project Detail & Video Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenAIWithProject={(p) => handleOpenAI(p)}
      />

      {/* Grounded AI Assistant & JD Matcher Drawer */}
      <AICopilotDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        preloadedProject={preloadedAiProject}
      />
    </div>
  );
};

export default App;
