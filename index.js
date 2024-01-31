const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
  let data = '';

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    const payload = JSON.parse(data);

    // Check if the push event is on the main branch
    if (payload.ref === 'refs/heads/main') {
      // Trigger the build process (replace this with your build command)
      const buildProcess = spawn('sh', ['path/to/your/build-script.sh']);

      buildProcess.stdout.on('data', (data) => {
        console.log(`Build Process: ${data}`);
      });

      buildProcess.stderr.on('data', (data) => {
        console.error(`Build Process Error: ${data}`);
      });
    }

    res.end('Webhook received successfully.');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
