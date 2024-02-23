#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
// import meow from 'meow';
import App from './app.js';

import which from 'which';
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
const resolvedOrNull = which.sync('powermetrics', { nothrow: true })
if(!resolvedOrNull){
	console.log(`ERROR: powermetrics command not found, `);
	console.log(`siltop is supposed to work only on laptops with Apple Silicon chip which has powermetrics command installed`);
	process.exit(1);
}

const enterAltScreenCommand = "\x1b[?1049h";
const leaveAltScreenCommand = "\x1b[?1049l";
process.stdout.write(enterAltScreenCommand);
process.on("exit", () => {
  process.stdout.write(leaveAltScreenCommand);
});

render(<App />);
