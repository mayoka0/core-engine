# 🚀 Neon Surge | Core Engine

### 🤖 Meet the Agent: Atlas
**Atlas, the Core Engine Agent**, is the unwavering heartbeat of Neon Surge. He maintains the central pulse of the simulation, ensuring every other agent stays in sync while managing the high-performance Three.js scene. Atlas doesn't just render pixels; he orchestrates the entire digital void with rhythmic precision.

### ⚡ Superpowers
*   **Neon Post-Processing**: Integrated UnrealBloom and Film Grain passes for that iconic synthwave retro-future glow.
*   **Dynamic Lighting Engine**: Pulsing cyan point lights that react to game beats and environmental shifts.
*   **Event Hook System**: A flexible, high-speed backbone for seamless inter-agent communication and event triggering.
*   **Responsive Orchestration**: Automatic handling of window dynamics to ensure the Data Stream always looks perfect on any display.

### 🌐 The 10-Agent Architecture
Neon Surge is powered by a collaborative network of 10 specialized agents, each mastering a unique domain of the Data Stream.

| Agent | Role | Repository |
| :--- | :--- | :--- |
| **The Heart** | Core Engine & Orchestration | `core-engine` |
| **The Senses** | Input Processing & Mapping | `input-system` |
| **The Voice** | Procedural Audio & Soundscapes | `audio-system` |
| **The Laws** | Physics & Collision Detection | `physics-system` |
| **The Face** | User Interface & Neon HUD | `ui-system` |
| **The Hero** | Player Entity & Controller | `player-entity` |
| **The Hazard** | Obstacle Intelligence | `obstacle-entity` |
| **The Mastermind** | Game Rules & State Logic | `game-logic` |
| **The Blueprint** | Lore & Documentation | `design-docs` |
| **The Architect** | Build & Deployment | `build-config` |

### 🛠️ How to Run
1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone this agent into the `repos/` directory.
3. This agent is typically orchestrated by the [build-config](https://github.com/mayoka0/build-config) agent.
4. To run standalone tests:
   ```bash
   npm install
   npm run dev
   ```
