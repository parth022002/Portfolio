import React, { useState } from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { CursorSpotlight } from './components/CursorSpotlight';
import { CustomCursor } from './components/CustomCursor';
import { AmbientBackground } from './components/AmbientBackground';
import { TechMarquee } from './components/TechMarquee';
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
    <div className="relative min-h-screen text-[#F8FAFC] selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden">
      {/* 1. Top Reading Scroll Progress Bar */}
      <ScrollProgress />

      {/* 2. 3D Cosmic Starlight, Tech Flares & Star Breaks */}
      <StarfieldCanvas />

      {/* 3. Ambient Aurora Mesh Gradients & Tactile Grain (From Reference) */}
      <AmbientBackground />

      {/* 3. Ambient Cursor Glow & Interactive Custom Follower */}
      <CursorSpotlight />
      <CustomCursor />

      {/* 4. Header Navigation with logo1, centered links, and right social icons */}
      <Navbar />

      {/* Main Page Content */}
      <main className="pt-16 relative z-10">
        {/* 5. Infinite Animated Capabilities, Job Profiles & Projects Ticker (Below Navbar) */}
        <TechMarquee />

        {/* 6. Hero Section: Left Animated Story + Right 3D Tilt Avatar Video */}
        <HeroSection />

        {/* 7. Deep Case Study Projects Grid with Scroll Reveal */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenVideo={(project) => setSelectedProject(project)}
        />

        {/* 8. Skills & Verifiable Evidence Constellation */}
        <SkillsEvidenceSection
          onSelectProjectById={handleSelectProjectById}
        />

        {/* 9. 16+ Verified Certificates Wall */}
        <CertificatesSection />

        {/* 10. Research & Technical Papers */}
        <ResearchSection
          onSelectProjectById={handleSelectProjectById}
        />

        {/* 11. Career & Academic Trajectory */}
        <ExperienceSection />

        {/* 12. Direct Contact Hub & Inquiry Form */}
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
