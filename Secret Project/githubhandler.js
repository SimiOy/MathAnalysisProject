function save(){

	var exec = require('child_process').exec;

	exec('git add levels.csv && git commit -m "A new test" ', function (error, stdOut, stdErr) {
		console.log(error); 	
	});
	exec('git push', function (error, stdOut, stdErr) {
	 	console.log(error,stdOut);
	});
}
function get(){
	var exec = require('child_process').exec;
	exec('git checkout -- levels.csv"', function (error, stdOut, stdErr) {
	 	console.log(error);
	});
}
save();
