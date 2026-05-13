<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=7aa2f7&center=true&vCenter=true&width=600&lines=Atlas:+System+Orchestration+Active...;Maintaining+Central+Pulse...;Neon+Surge+Core+Online." alt="Typing SVG" />
</div>

# 🚀 Neon Surge | Core Engine

### 📊 Agent Telemetry
<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=mayoka0&theme=tokyo-night&hide_border=true&area=true" width="100%" alt="Activity Graph" />
</div>

### 🤖 Meet the Agent: Atlas
**Atlas, the Core Engine Agent**, was forged in the silicon core of the first mainframe to ever touch the Data Stream. He is the unwavering heartbeat of Neon Surge, maintaining the central pulse of the simulation. Atlas doesn't just render pixels; he orchestrates the entire digital void with rhythmic precision, ensuring every other agent stays in sync while managing the high-performance Three.js scene.

### ⚡ My Specific Superpowers
*   **Neon Post-Processing**: Integrated `EffectComposer` with `UnrealBloom` and `FilmPass` for that iconic synthwave retro-future glow and scanline aesthetic.
*   **Dynamic Lighting Engine**: Pulsing cyan point lights that react to game beats, utilizing `ReinhardToneMapping` for superior bloom response.
*   **Event Hook System**: A flexible, high-speed backbone for seamless inter-agent communication, allowing real-time event triggering across the Grid.
*   **Responsive Orchestration**: Automatic handling of window dynamics to ensure the Data Stream remains perfectly scaled on any display.

### 🛠️ Technical Spec
Atlas leverages the **Three.js EffectComposer pipeline** to create its signature look. The post-processing stack is meticulously ordered to ensure maximum visual fidelity without sacrificing performance. It begins with a standard `RenderPass` to capture the scene, followed by an `UnrealBloomPass` configured with a strength of 1.5 and a radius of 0.4. This creates the characteristic "bleed" of light seen in high-end synthwave aesthetics. A `FilmPass` is then layered on top, introducing a subtle noise (0.35) and scanline effect that evokes the feeling of a retro CRT monitor, all before being piped through the final `OutputPass`.

Beyond visuals, Atlas serves as the project's temporal backbone. It utilizes a central `THREE.Clock` to manage delta time, which is then broadcast to all other active modules to ensure frame-independent logic. The engine also calculates a rhythmic pulse intensity that decays at a fixed multiplier of 0.92 per frame. This pulse is used to drive the dynamic lighting and emissive materials across the entire simulation, ensuring that the visual environment breathes in sync with the underlying code.

---

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=mayoka0&repo=core-engine&theme=tokyonight&hide_border=true&title_color=7aa2f7&icon_color=7aa2f7&text_color=ffffff" alt="Repo Card" />
</div>

🔗 **Part of the [Neon Surge Ecosystem](https://github.com/mayoka0/mayoka0#-neon-surge-architecture)**

### 🚀 How to Initialize
1. Ensure [Node.js](https://nodejs.org/) is active in your terminal.
2. Clone Atlas into your local `repos/` directory.
3. Typically summoned by the **Forge (build-config)** agent.
4. For standalone diagnostics:
   ```bash
   npm install
   npm run dev
   ```
