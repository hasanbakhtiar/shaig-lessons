
const idForSlug = () => Math.floor(10000 + Math.random() * 90000);


function generateSecureUniqueId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPart += characters[randomIndex];
  }

  const hrTime = process.hrtime.bigint().toString(36).toUpperCase();
  return `${hrTime}-${randomPart}`;
}


module.exports = { idForSlug, generateSecureUniqueId };
