### Oliver's Meteor Base

A starting point for Meteor projects using React.

Based on [Pup](http://cleverbeagle.com/pup).


### Differences to Pup

In no particular order:
* Reorganised `imports/ui` directory structure.
* Uses settings file to set app name and description via markdown.
* Adds EditInline component for editing Meteor Collection document fields inline.
* Removes document edit/add page in favour of inline field editing from document view page.
* Adds Pager (easy paging through collection queries) and ExpandControl components.
* Use numeric timestamps on document creation/update time fields.


### To do

* Split out EditInline component to a Meteor Atmosphere package.
* The DocumentRoute component might be a bit overly complicated - rethink or remove.
* Add more documentation.
* Clean up date stuff to use `moment.js` instead of `imports/modules/dates.js`.
