const fs = require('fs');
const readline = require('readline');

const logFile = 'log.txt';

// This regex matches and captures an IPv4 address pattern (four groups of 1-3 digits separated by dots)
// that must appear at the very beginning of a string.
const ipRegex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;

const rl = readline.createInterface({
  input: fs.createReadStream(logFile),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const match = line.match(ipRegex);
  if (match) {
    const ip = match[1];
    console.log(`fail2ban-client set permanent-ban banip ${ip}`);
  }
});

rl.on('close', () => {
  // All lines have been read
});
