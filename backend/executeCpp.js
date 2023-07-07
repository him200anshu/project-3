const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, inpath) => {
  const jobID = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobID}.exe`);

  return new Promise((resolve, reject) => {
    const command = `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobID}.exe < ${inpath}`;

    const child = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else if (stderr) {
        console.log(stderr);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });

  });
};

module.exports = {
  executeCpp,
};