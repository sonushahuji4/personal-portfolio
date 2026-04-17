import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ScrollProgress from '@/components/ui/scroll-progress';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Experience from '@/components/sections/experience';
import Projects from '@/components/sections/projects/projects';
import Skills from '@/components/sections/skills';
// import LifeCircle from '@/components/sections/life-circle/life-circle'; // Hidden for now — will use later
import GrowthCommunity from '@/components/sections/growth-community';
import Achievements from '@/components/sections/achievements';
import InterestsStrip from '@/components/sections/interests-strip';
import Contact from '@/components/sections/contact';

const Home = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        {/* <LifeCircle /> — Hidden for now, will use later */}
        <GrowthCommunity />
        <Achievements />
        <InterestsStrip />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
