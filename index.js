// Convenience file to require the SDK from the root of the repository
var TypeForm = require('./lib/TypeForm');
TypeForm.StatementField = require('./lib/models/statementField');
TypeForm.MultipleChoiceField = require('./lib/models/multipleChoiceField');
TypeForm.PictureChoiceField = require('./lib/models/pictureChoiceField');
module.exports = TypeForm;
