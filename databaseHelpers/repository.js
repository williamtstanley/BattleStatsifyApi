const when = require('when');

class Repository {
  constructor(model) {
    this.model = model;
  }

  count(conditions) {
	  return when(this.model.count(conditions).exec());
  }

  create(item) {
    return when(this.model.create(item));
  }

  find(conditions, fields, sort) {
	  const query = this.model.find(conditions, fields);

	  if (typeof sort != 'undefined') query.sort(sort);

	  return when(query.exec());
  }

  findOne(conditions, fields, sort) {
	  const query = this.model.findOne(conditions, fields);

	  if (typeof sort != 'undefined') query.sort(sort);

	  return when(query.exec());
  }

  remove(conditions) {
	  return when(this.model.find(conditions).exec()).then(entities => {
		  const promises = [];

		  for (let i in entities) {
			  promises.push(when.promise((resolve, reject, notify) => {
				  entities[i].remove((err, result) => {
					  if (err) reject(err);
					  resolve(result);
				  });
			  }));
		  }

		  return when.settle(promises);
	  });
  }

  update(conditions, update, options) {
	  return when(this.model.update(conditions, update, options).exec());
  }

  aggregate(pipeline) {
	  return when(Model.aggregate(pipeline).exec());
  }

  updateDocument(update) {
	  if (update) {
		  Object.keys(update).forEach(key => {
			  if (typeof update[key] === 'undefined') {
				  this.model[key] = undefined;
			  }
		  });

		  this.model.merge(update);
	  }

	  return when.promise((resolve, reject, notify) => {
		  this.model.save(err => {
			  if (err) reject(err);
			  resolve(this.model);
		  });
	  });
  }
}

module.exports = Repository;
