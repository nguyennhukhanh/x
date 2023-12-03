// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

/**
 * @input: yarn generate:module [name] OR node nest-generate-module.js [name].
 *         The [name] parameter is the desired name for the service, module, and controller.
 * @output: creates a new service, module, and controller with the given name
 * @return: returns an error message if there is an error, otherwise returns the stdout
 * @example: yarn generate:module user
 * @example: node nest-generate-module.js user
 */
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
