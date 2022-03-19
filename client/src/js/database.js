import { openDB } from 'idb';

const initdb = async () =>
  openDB('bate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('bate')) {
        console.log('bate database already exists');
        return;
      }
      db.createObjectStore('bate', { keyPath: 'id', autoIncrement: true });
      console.log('bate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.log('Post to the text-editor');
  const bateDb = await openDB('bate', 1);
  const tx = bateDb.transaction('bate', 'readwrite');
  const store = tx.objectStore('bate');
  const request = store.put({ id: id, value: value });
  const result = await request;
  console.log('🚀 - Data saved to the bateDb!', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  console.log('GET all data from the database');
  const bateDb = await openDB('bate', 1);
  const tx = bateDb.transaction('bate', 'readwrite');
  const store = tx.objectStore('bate');
  const request = store.getAll();
  const result = await request;
  console.log('🚀 - Data saved to the bateDb!', result);
};

initdb();