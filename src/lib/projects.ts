export interface Project {
  name: string;
  description: string;
  image: string;
  href?: string;
  external?: string;
  github?: string;
}

export const projects: Project[] = [
  { name: 'Marching Cubes', description: 'Marching Cubes Algorithm, implemented in JavaScript with WebGL.', image: '/projects/repos/WebGL-Marching-Cubes/marching-cubes.png', href: '/projects/marching-cubes', github: 'https://github.com/JosephSullivan256/WebGL-Marching-Cubes' },
  { name: 'Particles', description: 'Physically simulated particles, rendered with WebGL.', image: '/projects/repos/WebGL-Particles/particles.png', href: '/projects/particles', github: 'https://github.com/JosephSullivan256/WebGL-Particles' },
  { name: 'Simultanio', description: 'A real-time strategy game made with Python, Flask, JavaScript, and Socket.io.', image: '/projects/simultanio/simultanio.png', external: 'https://nathanwachholz.com/simultanio/' },
  { name: 'Deduction', description: 'Interactive proof checker for propositional logic.', image: '/projects/repos/Deduction/deduction.png', href: '/projects/deduction', github: 'https://github.com/JosephSullivan256/Deduction' },
];

export const featuredProjects = projects.slice(0, 3);
