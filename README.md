# 🚀 Neon Surge | Core Engine

### 🤖 Meet the Agent: Atlas
**Atlas, the Core Engine Agent**, was forged in the silicon core of the first mainframe to ever touch the Data Stream. He is the unwavering heartbeat of Neon Surge, maintaining the central pulse of the simulation. Atlas doesn't just render pixels; he orchestrates the entire digital void with rhythmic precision, ensuring every other agent stays in sync while managing the high-performance Three.js scene.

### ⚡ My Specific Superpowers
*   **Neon Post-Processing**: Integrated `EffectComposer` with `UnrealBloom` and `FilmPass` for that iconic synthwave retro-future glow and scanline aesthetic.
*   **Dynamic Lighting Engine**: Pulsing cyan point lights that react to game beats, utilizing `ReinhardToneMapping` for superior bloom response.
*   **Event Hook System**: A flexible, high-speed backbone for seamless inter-agent communication, allowing real-time event triggering across the Grid.
*   **Responsive Orchestration**: Automatic handling of window dynamics to ensure the Data Stream remains perfectly scaled on any display.

### 🛠️ Technical Spec
Atlas leverages the **Three.js EffectComposer pipeline** to create its signature look. 
- **Post-Processing**: The pipeline sequences `RenderPass`, `UnrealBloomPass` (strength 1.5, radius 0.4), and `FilmPass` (noise 0.35) before hitting the final `OutputPass`.
- **Clock Synchronization**: Uses a central `THREE.Clock` to manage delta time and pulse intensity decay (0.92 multiplier per frame).
- **Tone Mapping**: Implements `THREE.ReinhardToneMapping` to prevent color clipping during high-intensity bloom events.

### 🌐 The 10-Agent Architecture
Neon Surge is powered by a collaborative network of 10 specialized agents, each mastering a unique domain of the Data Stream.

| Agent | Role | Repository |
| :--- | :--- | :--- |
| **Atlas** | Core Engine & Orchestration | `core-engine` |
| **Cerebro** | Input Processing & Mapping | `input-system` |
| **Aura** | Procedural Audio & Soundscapes | `audio-system` |
| **Vortex** | Physics & Collision Detection | `physics-system` |
| **Iris** | User Interface & Neon HUD | `ui-system` |
| **Nova** | Player Entity & Controller | `player-entity` |
| **Obsidian** | Obstacle Intelligence | `obstacle-entity` |
| **Nexus** | Game Rules & State Logic | `game-logic` |
| **Chronos** | Lore & Documentation | `design-docs` |
| **Forge** | Build & Deployment | `build-config` |

### 🚀 How to Initialize
1. Ensure [Node.js](https://nodejs.org/) is active in your terminal.
2. Clone Atlas into your local `repos/` directory.
3. Typically summoned by the **Forge (build-config)** agent.
4. For standalone diagnostics:
   ```bash
   npm install
   npm run dev
   ```
