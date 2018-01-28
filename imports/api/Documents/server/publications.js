import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../Documents';

Meteor.publish('documents', function documents() {
  return Documents.find({ owner: this.userId });
});

// Note: also used when editing an existing document.
Meteor.publish('Documents.withId', function documentsView(documentId) {
  check(documentId, String);
  return Documents.find({ _id: documentId, owner: this.userId });
});
