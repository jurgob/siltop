import React, { useEffect, useState } from 'react';
import {Text, Box, useApp, useInput, Newline} from 'ink';
// import {spawn} from 'child_process'
import { powermetricsStats } from './powermetrics.js';
// import util from 'util';
// const exec = util.promisify(cp.exec);



// sudo powermetrics --samplers cpu_power,gpu_power,thermal -f plist -o /tmp/asitop_111.xml

export default function App() {
	const [cpuenergy, setCPUenergy] = useState<string>('');

	const {exit} = useApp();
	useInput((input) => {
		if (input === 'q') {
			exit();
		}
	})
	


	useEffect(() => {
		// setTime(new Date().toLocaleTimeString());
		const killPowerMetricsStats = powermetricsStats({onData: (stats) => {
			setCPUenergy(stats.cpu_energy.toString())
		}})

		return () => {
			killPowerMetricsStats()
		}
		
	}, [])	

	return (
		<Box borderStyle='single' padding={2} flexDirection='column'>
			<Box width='100%' >
				<Text>CPU Energy: {cpuenergy}</Text> 
			</Box>
			<Newline />
			{/* <Box>
                <Box width='50%'><Text>{time}</Text></Box>
                <Box width='50%'><Text>{uid}</Text></Box>
            </Box>
			<Newline /> */}
			{/* <Box>
                <Box width='50%'><Text>{msg}</Text></Box>
                <Box width='50%'><Text>PRICE (USD)</Text></Box>
            </Box> */}

		</Box>
	);
}
