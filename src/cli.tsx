#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
// import meow from 'meow';
import App from './app.js';

// const cli = meow(
// 	`
// 	Usage
// 	  $ siltop

// 	Examples
// 	  $ sudo siltop 
// `,
// 	{
// 		importMeta: import.meta,
// 		flags: {
// 			// name: {
// 			// 	type: 'string',
// 			// },
// 		},
// 	},
// );
const uid = process.env['SUDO_UID'];
if(!uid){
	console.log(`ERROR: to siltop you must have sudo permission!! try runnning: `);
	console.log(`sudo siltop`);
	process.exit(1);
}

console.log(uid)

const enterAltScreenCommand = "\x1b[?1049h";
const leaveAltScreenCommand = "\x1b[?1049l";
process.stdout.write(enterAltScreenCommand);
process.on("exit", () => {
  process.stdout.write(leaveAltScreenCommand);
});

render(<App />);
