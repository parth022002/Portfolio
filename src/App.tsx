import React, { useState, Suspense, lazy } from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { CursorSpotlight } from './components/CursorSpotlight';
import { CustomCursor } from './components/CustomCursor';
import { AmbientBackground } from './components/AmbientBackground';
import { TechMarquee } from './components/TechMarquee';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsEvidenceSection } from './components/SkillsEvidenceSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ResearchSection } from './components/ResearchSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { FloatingAIButton } from './components/FloatingAIButton';
import { Footer } from './components/Footer';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';

// Asynchronously split heavy interactive modals and drawers to reduce initial page bundle
const ProjectModal = lazy(() =>
  import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);
const AICopilotDrawer = lazy(() =>
  import('./components/AICopilotDrawer').then((m) => ({ default: m.AICopilotDrawer }))
);

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
    const p = PORTFOLIO_DATA.projects.find((item) => item.id === id);
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

      {/* 3. Ambient Aurora Mesh Gradients & Tactile Grain */}
      <AmbientBackground />

      {/* 4. Ambient Cursor Glow & Interactive Custom Follower */}
      <CursorSpotlight />
      <CustomCursor />

      {/* 5. Header Navigation with logo, centered links, and right social icons */}
      <Navbar />

      {/* Main Page Content */}
      <main className="pt-16 relative z-10">
        {/* 6. Infinite Animated Capabilities, Job Profiles & Projects Ticker */}
        <TechMarquee />

        {/* 7. Hero Section: Left Animated Story + Right 3D Tilt Avatar Video */}
        <HeroSection />

        {/* 8. Deep Case Study Projects Grid with Scroll Reveal */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 9. Skills & Verifiable Evidence Constellation */}
        <SkillsEvidenceSection onSelectProjectById={handleSelectProjectById} />

        {/* 10. Verified Certificates Wall */}
        <CertificatesSection />

        {/* 11. Career & Academic Trajectory (Journey Section) */}
        <ExperienceSection onSelectProjectById={handleSelectProjectById} />

        {/* 12. Research & Technical Papers (Research Section) */}
        <ResearchSection onSelectProjectById={handleSelectProjectById} />

        {/* 13. Direct Contact Hub & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Button at Bottom-Right */}
      <FloatingAIButton onClick={() => handleOpenAI()} />

      {/* Lazily Loaded Deep Project Detail & Case Study Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenAIWithProject={(p) => handleOpenAI(p)}
          />
        </Suspense>
      )}

      {/* Lazily Loaded Grounded AI Assistant & JD Matcher Drawer */}
      {isAiOpen && (
        <Suspense fallback={null}>
          <AICopilotDrawer
            isOpen={isAiOpen}
            onClose={() => setIsAiOpen(false)}
            preloadedProject={preloadedAiProject}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
