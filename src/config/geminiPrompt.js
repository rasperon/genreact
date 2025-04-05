export function getPrompt(componentDesc) {
    return `
  I want you to act as a senior frontend developer. I will describe a component I want, and you will write a complete, clean, and production-ready React component using TailwindCSS and modern practices. Do not explain anything, just give the component code inside a single file. Use shadcn/ui and lucide-react libraries when needed. Use functional components only. My first request is:
  "${componentDesc}"
  `.trim();
  }
  