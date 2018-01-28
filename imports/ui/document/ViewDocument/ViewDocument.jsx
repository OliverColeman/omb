import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import Loading from '../../misc/Loading/Loading';
import EditInline from '../../misc/EditInline/EditInline.jsx';

const handleRemove = (document, isNew, onDocumentRemove) => {
  if (isNew || confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', document._id, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        !isNew && Bert.alert('Document deleted!', 'success');
        onDocumentRemove && onDocumentRemove();
      }
    });
  }
};


const ViewDocument = ({document, match, onDocumentRemove}) => {
  // It's new if it's less than 5 seconds old.
  const isNew = ((Date.now()) - document.createdAt) < 5000;

  return (<div className="ViewDocument">
    <div className="page-header clearfix">
      <h4 className="pull-left"><EditInline doc={document} field="title" updateMethod="documents.update" inputType={EditInline.types.textfield} /></h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => handleRemove(document, isNew, onDocumentRemove)} className="text-danger">
            { isNew ? 'Cancel' : 'Delete' }
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <EditInline doc={document} field="body" updateMethod="documents.update" inputType={EditInline.types.textarea} />
  </div>)
};


ViewDocument.propTypes = {
  document: PropTypes.object,
  history: PropTypes.object.isRequired,
  onDocumentRemove: PropTypes.func.isRequired,
};


export default ViewDocument;
