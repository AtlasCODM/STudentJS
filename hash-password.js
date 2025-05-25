const bcrypt = require('bcryptjs');

const run = async () => {
  const plainPassword = 'yourPasswordHere'; // <-- Replace with your desired admin password
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log('Hashed Password:', hash);
};

run();
