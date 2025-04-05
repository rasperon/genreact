import inquirer from 'inquirer';

export async function askQuestions() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Choose type:',
      choices: ['JavaScript', 'TypeScript']
    },
    {
      type: 'input',
      name: 'structure',
      message: 'Describe project structure (e.g. src/components):'
    },
    {
      type: 'input',
      name: 'example',
      message: 'Give example component path (e.g. src/components/Button.tsx):'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Tell about component:'
    }
  ]);
}
