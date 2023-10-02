const admin = require('firebase-admin');

// Load your Firebase credentials from JSON
const serviceAccount = require('./firebase-service-account.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const firstNames = [
  'John',
  'Jane',
  'Alex',
  'Emily',
  'Chris',
  'Katie',
  'Michael',
  'Sarah',
  'David',
  'Laura',
];
const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Jones',
  'Brown',
  'Davis',
  'Miller',
  'Garcia',
  'Rodriguez',
  'Martinez',
];

const getRandomName = names => {
  return names[Math.floor(Math.random() * names.length)];
};

// Function to generate random coordinates within a 25-mile radius of downtown Austin, TX
const generateRandomCoordinates = () => {
  const lat = 30.2672;
  const lng = -97.7431;
  const radiusLat = 0.3623 * (Math.random() - 0.5) * 2;
  const radiusLng = 0.4575 * (Math.random() - 0.5) * 2;

  return new admin.firestore.GeoPoint(lat + radiusLat, lng + radiusLng);
};

const getRandomDate = () => {
  const today = new Date();
  const threeDaysBefore = new Date(today);
  threeDaysBefore.setDate(today.getDate() - 3);

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 100); // You can set this to however many days you want in the future

  return new Date(
    threeDaysBefore.getTime() +
      Math.random() * (futureDate.getTime() - threeDaysBefore.getTime()),
  )
    .toISOString()
    .split('T')[0];
};

// Function to populate users
const populateUsers = async numOfUsers => {
  const dummyData = [];

  for (let i = 0; i < numOfUsers; i++) {
    const firstName = getRandomName(firstNames);
    const lastName = getRandomName(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;

    dummyData.push({
      username: `user${i}`,
      email: email,
      first_name: firstName,
      last_name: lastName,
      profile_picture: `http://placekitten.com/200/200?image=${i}`,
      location: generateRandomCoordinates(),
      date: getRandomDate(),
    });
  }

  const batch = db.batch();

  dummyData.forEach(user => {
    const docRef = db.collection('TestData').doc();
    batch.set(docRef, user);
  });

  await batch.commit();
  console.log('Successfully populated database with test users!');
};

// Call the function
populateUsers(100);
