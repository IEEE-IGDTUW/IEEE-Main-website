import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Branch from "./components/Branch.jsx";
import Signal from "./components/Signal.jsx";
import Aim_and_mission from "./components/Aim_and_mission.jsx";
import Events from "./components/Events.jsx";
import TeamSection from "./components/TeamSection.jsx";
import Cta from "./components/Cta.jsx";
import Faq from "./components/Faq.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Branch />
        <Signal />
        <Aim_and_mission />
        <Events />
        <TeamSection />
        <Cta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
