var program = require("commander"),
	watch = require("watch"),
	Ftp = require("jsftp"),
	package = require(__dirname + "/package.json");

program
	.version(package.version)
	.option("-H, --host <host>", "Host address, localhost by default")
	.option("-P, --port <port>", "Port, 21 by default", parseInt)
	.option("-u, --user <name>", "Username, anynymous by default")
	.option("-p, --pass <password>", "Password")
	.option("-d, --dir <dir>","Directory, defaults to current directory")
	.parse(process.argv);

connection = new Ftp({
	host: program.host,
	port: program.port
});

connection.auth(program.user, program.pass, function () {
	console.log("Connected");
	connection.ls("./", function (err, res) {
		console.log("Current files:");
		console.log(res || err);
	});
})
