import notifier from 'node-notifier';

const notifyBuild = (done) => {
	notifier.notify({
		title: 'Build Complete',
		message: 'All done!',
	});

	return done();
};

export default notifyBuild;