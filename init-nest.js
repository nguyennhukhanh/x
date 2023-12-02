// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

// Input: node init-nest.js [name]
const name = process.argv[2];
if (!name) {
  console.warn(
    'Please provide a name for the service, module, and controller.',
  );
  process.exit(1);
}

exec(
  `nest g mo modules/${name} && nest g s modules/${name} && nest g co modules/${name}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.info(`Stderr: ${stderr}`);
      return;
    }
    console.info(`Stdout: ${stdout}`);
  },
);
