/**
 * This function generates a random string of a specified length,
 * and appends a timestamp to it.
 *
 * @param {number} numberCharacters - The length of the random string to be generated.
 * If the provided length is less than or equal to 10, the function will default to a length of 24.
 *
 * @returns {string} - The resulting string is a combination of the randomly generated string
 * and the current timestamp. The format is: {randomString}-{timestamp}.
 */
export default async function generateRandomString(numberCharacters: number) {
  // If the provided length is less than or equal to 3, default to 5
  numberCharacters = numberCharacters <= 3 ? 5 : numberCharacters;

  // Generate a random string of the specified length
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomChars = '';
  for (let i = 0; i < numberCharacters; i++) {
    randomChars += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  // Get the current timestamp
  const timestamp = Date.now();

  // Combine the random string and the timestamp
  const result = `${randomChars}-${timestamp}`;

  return result;
}
