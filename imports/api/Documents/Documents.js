/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Documents = new Mongo.Collection('Documents');

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Documents.schema = {
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
    autoValue() {
      if (this.isInsert) return this.userId;
    },
  },
  createdAt: {
    type: Number,
    label: 'The timestamp (ms) at document creation.',
    autoValue() {
      if (this.isInsert) return Date.now();
    },
  },
  updatedAt: {
    type: Number,
    label: 'The timestamp (ms) this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return Date.now();
    },
  },
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
};
Documents.attachSchema(new SimpleSchema(Documents.schema));

export default Documents;
