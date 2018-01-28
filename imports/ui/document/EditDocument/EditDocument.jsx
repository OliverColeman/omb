import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Documents from '../../../api/Documents/Documents';
import EditInline from '../../misc/EditInline/EditInline.jsx';
import NotFound from '../../nav/NotFound/NotFound';

const EditDocument = ({ doc, history }) => (doc ? (
  <div className="EditDocument">
    <h4 className="page-header"><EditInline doc={doc} field="title" updateMethod="documents.update" inputType={EditInline.types.textfield} /></h4>
    <h4 className="page-header"><EditInline doc={doc} field="body" updateMethod="documents.update" inputType={EditInline.types.textarea} /></h4>
  </div>
) : <NotFound />);

EditDocument.defaultProps = {
  doc: null,
};

EditDocument.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);

  return {
    loading: !subscription.ready(),
    doc: Documents.findOne(documentId),
  };
})(EditDocument);
