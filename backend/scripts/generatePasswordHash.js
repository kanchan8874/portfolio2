/**
 * Script to generate bcrypt hash for admin password
 * Run: node scripts/generatePasswordHash.js your_password_here
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('❌ Please provide a password as argument');
  console.log('Usage: node scripts/generatePasswordHash.js your_password');
  process.exit(1);
}

// Generate hash with 10 salt rounds
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('❌ Error generating hash:', err);
    process.exit(1);
  }
  
  console.log('\n✅ Password Hash Generated Successfully!\n');
  console.log('Add this to your .env file:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
  console.log('⚠️  Keep this hash secure! Never commit it to Git.\n');
});

