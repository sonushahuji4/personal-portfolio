import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ScrollProgress from '@/components/ui/scroll-progress';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Experience from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Education from '@/components/sections/education';
import Platforms from '@/components/sections/platforms';
import Achievements from '@/components/sections/achievements';
import Courses from '@/components/sections/courses';
import Hobbies from '@/components/sections/hobbies';
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
        <Education />
        <Platforms />
        <Achievements />
        <Courses />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
