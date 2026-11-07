// ========================================
// DADOS DO PORTFÓLIO - EDITE AQUI
// ========================================

// PROJETOS
// Adicione, remova ou edite os projetos abaixo
const projectsData = [
  {
    id: 1,
    title: "Lira & Monteiro Advocacia",
    description: "[PROJETO DEMONSTRATIVO] Site institucional moderno para escritório de advocacia. Design minimalista com animações sofisticadas, timeline interativa e navegação fluida. Criado para demonstrar habilidades em design e desenvolvimento web para o setor jurídico.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    githubUrl: "https://github.com/kauanmm11/lira-onteiro-ad",
    liveUrl: "https://kauanmm11.github.io/lira-onteiro-ad/"
  },
  {
    id: 2,
    title: "VRC Advocacia",
    description: "[PROJETO DEMONSTRATIVO] Landing page elegante para escritório de advocacia. Interface clean com foco em conversão, cards interativos e seção FAQ. Desenvolvido para mostrar expertise em criação de sites para o mercado jurídico.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Web Accessibility"],
    githubUrl: "https://github.com/kauanmm11/vrcadvocacia",
    liveUrl: "https://kauanmm11.github.io/valenca-rc-ad/"
  }
];

// SKILLS
// Organize suas habilidades por categoria
const skillsData = {
  frontend: {
    title: "Front-end",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Accessibility"]
  },
  tools: {
    title: "Ferramentas",
    skills: ["Git", "GitHub", "VS Code", "Chrome DevTools", "Figma"]
  },
  learning: {
    title: "Estudando",
    skills: ["React", "TypeScript", "Node.js", "Tailwind CSS"]
  }
};

// Não altere esta linha - exporta os dados para uso no main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projectsData, skillsData };
}