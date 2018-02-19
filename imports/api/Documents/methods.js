import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import rateLimit from '../../modules/rate-limit';

import Documents from './Documents';
import handleMethodException from '../../modules/handle-method-exception';
import { getSchemaFieldTypes } from '../Utility/methodutils';


Meteor.methods({
  'documents.insert': function documentsInsert(doc) {
    check(doc, getSchemaFieldTypes(Documents.schema, doc));

    try {
      return Documents.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'documents.update': function documentsUpdate(doc) {
    check(doc, getSchemaFieldTypes(Documents.schema, doc, true));

    try {
      const documentId = doc._id;
      Documents.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'documents.remove': function documentsRemove(documentId) {
    check(documentId, String);

    try {
      return Documents.remove(documentId);
    } catch (exception) {
      handleMethodException(exception);
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
