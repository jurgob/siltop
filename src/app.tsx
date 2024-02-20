import React, { useEffect, useState } from 'react';
import {Text, Box,Newline, useApp, useInput} from 'ink';
import cp from 'child_process'
// import util from 'util';
// const exec = util.promisify(cp.exec);



//time

export default function App() {
	const [time, setTime] = useState<string>('DIO CANE');
	const [uid, setUod] = useState<string>('myuid');
	
	const {exit} = useApp();
	useInput((input) => {
		if (input === 'q') {
			exit();
		}
	})
	


	useEffect(() => {
		// setTime(new Date().toLocaleTimeString());
		setInterval(() => {
			
			// setTime(`temp: `+new Date().toLocaleTimeString());
			cp.exec('date', (err, stdout, _stderr) => {
				if(stdout){
					setTime(stdout);
				}
				if(err){
					setTime(`ERROR: ${err}`);
				}
			});

			if(process.env['SUDO_UID']){
				const uid = parseInt(process.env['SUDO_UID']);
				setUod(`UID: ${uid}`);
			}else{
				setUod(`UID: NOUID`);
			}

			// exec('time')
			// 	.then(({ stdout, stderr } ) => {
			// 		if(stdout){
			// 			setTime(stdout);
			// 		}
			// 		if(!stderr){
			// 			setTime(`ERROR: ${stderr}`);
			// 		}
			// 	});
			
		}, 1000);
	}, [])	

	return (
		<Box borderStyle='single' padding={2} flexDirection='column'>
			<Box>
                <Box width='50%'><Text>{time}</Text></Box>
                <Box width='50%'><Text>{uid}</Text></Box>
            </Box>
			<Newline />
			<Box>
                <Box width='50%'><Text>COIN</Text></Box>
                <Box width='50%'><Text>PRICE (USD)</Text></Box>
            </Box>

		</Box>
	);
}
