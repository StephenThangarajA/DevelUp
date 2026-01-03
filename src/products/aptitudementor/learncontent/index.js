// Dynamic imports for all learn content
const modules = import.meta.glob('./**/*.js', { eager: true });

const content = {
  quantitativeaptitude: {},
  logicalreasoning: {},
  verbalability: {}
};

// Process modules
Object.entries(modules).forEach(([path, module]) => {
  // Skip index.js itself
  if (path.endsWith('index.js')) return;

  // Path format: ./category/Topic.js
  const parts = path.split('/');
  if (parts.length < 3) return;

  const category = parts[1];
  const filename = parts[2].replace('.js', '');

  if (content[category]) {
    // Some files use default export, some might use named (based on earlier fixes)
    content[category][filename] = module.default || Object.values(module)[0];
  }
});

export const LEARN_CONTENT = content;
