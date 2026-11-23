import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DualLensBanner } from './components/DualLensBanner';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { SkillsEvidenceSection } from './components/SkillsEvidenceSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { Footer } from './components/Footer';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';

export const App: React.FC = () => {
  const [mode, setMode] = useState<'business' | 'tech'>('business');
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
    <div className={`min-h-screen bg-[#07090E] text-[#F8FAFC] selection:bg-sky-500/30 selection:text-sky-200 transition-colors duration-500 ${
      mode === 'tech' ? 'font-sans' : ''
    }`}>
      {/* Navigation Bar */}
      <Navbar
        mode={mode}
        setMode={setMode}
        onOpenAI={() => handleOpenAI()}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Video Loop & Proof Counters */}
        <HeroSection
          mode={mode}
          setMode={setMode}
          onOpenAI={() => handleOpenAI()}
        />

        {/* 2. Dual Lens Interactive Perspective Banner */}
        <DualLensBanner
          mode={mode}
          setMode={setMode}
        />

        {/* 3. Deep Case Study Projects Grid */}
        <ProjectsSection
          mode={mode}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenVideo={(project) => setSelectedProject(project)}
        />

        {/* 4. Skills & Verifiable Evidence Constellation */}
        <SkillsEvidenceSection
          mode={mode}
          onSelectProjectById={handleSelectProjectById}
        />

        {/* 5. 16+ Verified Certificates Wall */}
        <CertificatesSection
          mode={mode}
        />

        {/* 6. Career & Academic Trajectory */}
        <ExperienceSection
          mode={mode}
        />

        {/* 7. Direct Contact Hub & Inquiry Form */}
        <ContactSection
          mode={mode}
        />
      </main>

      {/* Footer */}
      <Footer mode={mode} />

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
