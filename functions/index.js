const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const algoliaClient = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);
const collectionIndexName = 'books';
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

exports.sendCollectionToAlgolia = functions.https.onRequest(async (req, res) => {
    const algoliaRecords = [];
    const querySnapshot = await db.collection('books').get();

    querySnapshot.docs.forEach(doc => {
        const document = doc.data();
        const record = {
            objectID: doc.id,
            id: doc.id,
            author: document.author,
            genre: document.genre,
            title: document.title,
            description: document.description,
            language: document.language,
            cover: document.cover,
        };

        algoliaRecords.push(record);
    });

    collectionIndex.saveObjects(algoliaRecords, (_error, content) => {
        res.status(200).send("books was indexed to Algolia successfully.");
    });

})

exports.collectionOnCreate = functions.firestore.document('books/{uid}').onCreate(async (snapshot, context) => {
    await saveDocumentInAlgolia(snapshot);
});

exports.collectionOnUpdate = functions.firestore.document('books/{uid}').onUpdate(async (change, context) => {
    await updateDocumentInAlgolia(change);
});

exports.collectionOnDelete = functions.firestore.document('books/{uid}').onDelete(async (snapshot, context) => {
    await deleteDocumentFromAlgolia(snapshot);
});

async function saveDocumentInAlgolia(snapshot) {
    if (snapshot.exists) {
        const record = snapshot.data();
        if (record) {
            record.objectID = snapshot.id;
            await collectionIndex.saveObject(record); // Adds or replaces a specific object.
        }
    }
}

async function updateDocumentInAlgolia(change) {
    const docBeforeChange = change.before.data()
    const docAfterChange = change.after.data()
    if (docBeforeChange && docAfterChange) {
        await saveDocumentInAlgolia(change.after);
    }
}

async function deleteDocumentFromAlgolia(snapshot) {
    if (snapshot.exists) {
        const objectID = snapshot.id;
        await collectionIndex.deleteObject(objectID);
    }
}