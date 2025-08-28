const { parseIpFromLine } = require('./index');

describe('parseIpFromLine', () => {
  test('should return the IP address when the line starts with a valid IP', () => {
    const line = '192.168.1.1 - - [28/Aug/2025:10:00:00 +0000] "GET / HTTP/1.1" 200 1234';
    expect(parseIpFromLine(line)).toBe('192.168.1.1');
  });

  test('should return null when the line does not start with an IP address', () => {
    const line = 'Some other log data';
    expect(parseIpFromLine(line)).toBeNull();
  });

  test('should return null for a line with an IP address not at the beginning', () => {
    const line = 'Some data before 192.168.1.1';
    expect(parseIpFromLine(line)).toBeNull();
  });

  test('should return null for an empty line', () => {
    const line = '';
    expect(parseIpFromLine(line)).toBeNull();
  });

  test('should return null for a line with an invalid IP address', () => {
    const line = '999.999.999.999 - invalid ip';
    expect(parseIpFromLine(line)).toBeNull();
  });
});
