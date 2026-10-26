import { useEffect, useState } from "react";
import "./aim_and_mission.css";

const gates = [
  {
    id: "and",
    label: "G1 · AND_GATE",
    heading: "Who Are We?",
    description:
      "We are IEEE IGDTUW, the dynamic student branch of IEEE at Indira Gandhi Delhi Technical University for Women, advancing technology for humanity as part of IEEE Region 10, Delhi Section.",
    switchLabel: "Who Are We switch",
    accent: "yellow",
  },
  {
    id: "or",
    label: "G2 · OR_GATE",
    heading: "What Drives Us?",
    description:
      "Discovery, hands-on learning and the belief that shared knowledge can accelerate every student.",
    switchLabel: "What Drives Us switch",
    accent: "pink",
  },
  {
    id: "not",
    label: "G3 · NOT_GATE",
    heading: "Why We Do It?",
    description:
      "To create equitable opportunities and build technology that serves people and communities.",
    switchLabel: "Why We Do It switch",
    accent: "teal",
  },
  {
    id: "xor",
    label: "G4 · XOR_GATE",
    heading: "Our Journey",
    description:
      "Two decades of experiments, events and friendships—from 33 members to a 230+ strong network.",
    switchLabel: "Our Journey switch",
    accent: "purple",
  },
];

function GateIcon({ type }) {
  return (
    <svg
      className="gate-icon"
      viewBox="0 0 54 39"
      role="img"
      aria-label={`${type.toUpperCase()} gate`}
    >
      {type === "and" && (
        <path
          className="gate-fill"
          d="M5 4 H23 C40 4 47 10 47 19.5 C47 29 40 35 23 35 H5 Z"
        />
      )}

      {type === "or" && (
        <path
          className="gate-fill"
          d="M6 4 C17 11 17 28 6 35 C24 35 39 29 48 19.5 C39 10 24 4 6 4 Z"
        />
      )}

      {type === "not" && (
        <>
          <path className="gate-fill" d="M6 4 L6 35 L37 19.5 Z" />
          <circle cx="41.5" cy="19.5" r="4" fill="#E5EAFF" />
          <line
            x1="45.5"
            y1="19.5"
            x2="50"
            y2="19.5"
            fill="none"
          />
        </>
      )}

      {type === "xor" && (
        <>
          <path
            className="gate-fill"
            d="M6 4 C17 11 17 28 6 35 C24 35 39 29 48 19.5 C39 10 24 4 6 4 Z"
          />
          <path
            d="M1 4 C12 11 12 28 1 35"
            fill="none"
          />
        </>
      )}
    </svg>
  );
}

function GateCardShell({ gate, children }) {
  return (
    <article
      className={`gate-card accent-${gate.accent}`}
      data-gate={gate.id}
    >
      {children}
    </article>
  );
}

function GateCardContent({ gate, isOn, onToggle }) {
  return (
    <>
      <div className="gate-label">{gate.label}</div>

      <GateIcon type={gate.id} />

      <h2 className="gate-heading">{gate.heading}</h2>

      <button
        className="power-switch"
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={gate.switchLabel}
        onClick={onToggle}
      >
        <span className="switch-knob" aria-hidden="true" />
        <span className="switch-state" aria-hidden="true">
          {isOn ? "ON" : "OFF"}
        </span>
      </button>

      <p className="gate-description">
        {isOn ? gate.description : "Flip the switch to power me on"}
      </p>

      <span className="card-indicator" aria-hidden="true" />
    </>
  );
}

function MissionHeader() {
  return (
    <header className="section-header">
      <div className="eyebrow">MODULE 03 - LOGIC ARRAY</div>

      <h1 className="section-title" id="mission-title">
        Our Aim &amp; Mission
      </h1>

      <span className="header-indicator" aria-hidden="true" />
    </header>
  );
}

function getInitialPowerStates() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 520px)").matches;

  return Object.fromEntries(
    gates.map((gate) => [gate.id, !isMobile])
  );
}

export default function AimAndMission() {
  const [powerStates, setPowerStates] = useState(getInitialPowerStates);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 520px)");

    const handleBreakpointChange = (event) => {
      const shouldBeOn = !event.matches;

      setPowerStates(
        Object.fromEntries(
          gates.map((gate) => [gate.id, shouldBeOn])
        )
      );
    };

    mobileQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mobileQuery.removeEventListener(
        "change",
        handleBreakpointChange
      );
    };
  }, []);

  const toggleGate = (gateId) => {
    setPowerStates((previousStates) => ({
      ...previousStates,
      [gateId]: !previousStates[gateId],
    }));
  };

  return (
    <main className="mission-section">
      <section
        className="mission-container"
        aria-labelledby="mission-title"
      >
        <MissionHeader />

        <div className="gates-grid">
          {gates.map((gate) => (
            <GateCardShell key={gate.id} gate={gate}>
              <div
                className={`gate-card-content ${
                  powerStates[gate.id] ? "" : "is-off"
                }`}
              >
                <GateCardContent
                  gate={gate}
                  isOn={powerStates[gate.id]}
                  onToggle={() => toggleGate(gate.id)}
                />
              </div>
            </GateCardShell>
          ))}
        </div>
      </section>
    </main>
  );
}