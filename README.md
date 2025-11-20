# Parse IP from Log

This repository contains a Node.js script that parses IP addresses from a log file (`log.txt`) and generates `fail2ban-client` commands to ban them.

## Usage

1. Get the log from ` tail -f /var/log/nginx/access.log | grep -E "POST.*wp-login.php"`
2. Place your log file named `log.txt` in the same directory as the script.
3. Run the script using Node.js:

```bash
node index.js
```

The script will output commands to ban the IP addresses found in the log file.

### Example Output

If `log.txt` contains something like this (taken from the NGINX access log file):
```
192.168.1.1 - - [28/Aug/2025:10:00:00 +0000] "GET / HTTP/1.1" 200 1234
10.0.0.1 - - [28/Aug/2025:10:00:01 +0000] "POST /login HTTP/1.1" 401 500
```

The script will output:
```
fail2ban-client set permanent-ban banip 192.168.1.1
fail2ban-client set permanent-ban banip 10.0.0.1
```
