const fs = require('fs');
const readline = require('readline');

const logFile = 'log.txt';

// This regex matches and captures an IPv4 address pattern (four groups of 1-3 digits separated by dots)
// that must appear at the very beginning of a string.
const ipRegex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;

/**
 * Parses an IPv4 address from the beginning of a log line.
 * @param {string} line The log line to parse.
 * @returns {string|null} The extracted IPv4 address, or null if no valid IP address is found.
 */
function parseIpFromLine(line) {
  // Attempt to match the IP address at the beginning of the line.
  const match = line.match(ipRegex);
  // If a match is found, proceed with validation.
  if (match) {
    const ip = match[1];
    // Split the IP into octets.
    const octets = ip.split('.');
    // Validate that it's a correct IPv4 address.
    if (octets.length === 4 && octets.every(octet => octet >= 0 && octet <= 255)) {
      return ip;
    }
  }
  // Return null if no valid IP is found.
  return null;
}

// This block runs when the script is executed directly from the command line.
if (require.main === module) {
    // Create a readline interface to read the log file line by line.
    const rl = readline.createInterface({
    input: fs.createReadStream(logFile),
    crlfDelay: Infinity
    });

    // Empty line for easier copy and paste
    console.log(``);

    // Event listener for each line read from the log file.
    rl.on('line', (line) => {
        // Parse the IP address from the current line.
        const ip = parseIpFromLine(line);
        // If an IP address is successfully parsed, print the fail2ban command.
        if (ip) {
            console.log(`fail2ban-client set permanent-ban banip ${ip}`);
        }
    });


    // Event listener for when the file reading is complete.
    rl.on('close', () => {
        // Empty line for easier copy and paste
        console.log(``);
    });
}

module.exports = { parseIpFromLine };
