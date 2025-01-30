const { spawn } = require("node:child_process");

async function runCommand(command, args, options) {
  return new Promise((resolve, reject) => {
    console.log(`\nrunning command ${command} ${args.join(" ")}...`);
    const child = spawn(command, args, { ...options, stdio: "inherit" });
    child.on("close", (code) => {
      if (code === 0) {
        console.log(`${command} ${args.join(" ")} successfully completed!\n`);
        resolve();
      } else {
        reject(
          new Error(
            `${command} ${args.join(" ")} execution failed with code ${code}`
          )
        );
      }
    });

    child.on("error", (error) => {
      reject(
        new Error(
          `error executing the command ${command} ${args.join(" ")}: ${
            error.message
          }`
        )
      );
    });
  });
}

module.exports = { runCommand };
