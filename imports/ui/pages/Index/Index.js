import { Meteor } from 'meteor/meteor'
import React from 'react';
import { Button } from 'react-bootstrap';

import './Index.scss';

console.log(Meteor.settings);

const Index = () => (
  <div className="Index">
    <img
      src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
      alt="Clever Beagle"
    />
  <h1>{Meteor.settings.public.appName}</h1>
    <p>Base app framework.</p>
    <div>
      <Button href="http://cleverbeagle.com/pup">Read the Docs</Button>
      <Button href="https://github.com/cleverbeagle/pup"><i className="fa fa-star" /> Star on GitHub</Button>
    </div>
    <footer>
      <p>Feet here.</p>
    </footer>
  </div>
);

export default Index;
