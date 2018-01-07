import { Meteor } from 'meteor/meteor'
import React from 'react';
import { Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <h1>{Meteor.settings.public.appName}</h1>
    <ReactMarkdown className="description" source={Meteor.settings.public.appDescription} />

    <footer>
      <p>Feet here.</p>
    </footer>
  </div>
);

export default Index;
