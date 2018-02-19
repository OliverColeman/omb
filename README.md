### Oliver's Meteor Base

A starting point for Meteor projects using React.

Based on [Pup](http://cleverbeagle.com/pup).


### Differences to Pup

In no particular order:
* Reorganised `imports/ui` directory structure.
* Adds EditInline component for editing Meteor Collection document fields inline.
* Uses settings file to set app name and description via markdown.
* Adds Pager (easy paging through collection queries) and ExpandControl components.
* Use numeric timestamps on document creation/update time fields.
* Improved Method error handling and reporting ([more info here](https://github.com/cleverbeagle/pup/issues/49#issuecomment-336343629)).


### To do

* Split out EditInline component to a Meteor Atmosphere package.
* The DocumentRoute component might be a bit overly complicated - rethink or remove.
* Add more documentation.
* Clean up date stuff to use `moment.js` instead of `imports/modules/dates.js`.
