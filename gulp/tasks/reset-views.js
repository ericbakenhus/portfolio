import panini from 'panini';

const resetViews = (done) => {
	panini.refresh();
	
	return done();
};

export default resetViews;