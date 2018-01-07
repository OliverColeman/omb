import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import rateLimit from '../../modules/rate-limit';

import Documents from './Documents';
import { getSchemaFieldTypes, throwMethodException } from '../Utility/methodutils';


Meteor.methods({
  'documents.insert': function documentsInsert(doc) {
    check(doc, getSchemaFieldTypes(Documents.schema, doc));

    try {
      return Documents.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      throwMethodException(exception);
    }
  },

  'documents.update': function documentsUpdate(doc) {
    check(doc, getSchemaFieldTypes(Documents.schema, doc, true));

    try {
      const documentId = doc._id;
      Documents.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throwMethodException(exception);
    }
  },

  'documents.remove': function documentsRemove(documentId) {
    check(documentId, String);

    try {
      return Documents.remove(documentId);
    } catch (exception) {
      throwMethodException(exception);
    }
  },
});


rateLimit({
  methods: [
    'documents.insert',
    'documents.update',
    'documents.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
