import { parse } from '@plist/parse';
import {spawn} from 'child_process'
import { Transform } from 'node:stream';

// import fs from 'fs';

function parsePlist(str: string): object| undefined{
    try{
        const parsedPlist = parse(str);
        return parsedPlist as object
    }catch(e){
        console.log(e)
        console.log(`ERROR PARSING, `)
        console.log(str)
        return undefined
    }
}

type Stats = {
    cpu_energy: number
}
export function powermetricsStats({onData}: {onData: (data: Stats) => void}){
    let storedString = ''
    const divideLines = new Transform({
        objectMode: true,
        transform(chunk, _encoding, callback) {
          try{            
            const chunckStr = String(chunk);
            let curr = (storedString + chunckStr).trim();
            const currLines = curr.trim().split(`\n`).filter(l => !l.includes(`<!DOCTYPE`) && !l.includes(`<?xml`)  )
            if(currLines.includes('</plist>')){
                const lastidx = currLines.lastIndexOf(`</plist>`)
                const toParse = currLines.slice(0, lastidx+1)
                const toStore = currLines.slice(lastidx+1)
                storedString = toStore.join(`\n`).trim()
                const parsedPlist = parsePlist(toParse.join(`\n`))
                if(parsedPlist){
                    
                    const stats: Stats = {
                        //@ts-ignore
                        cpu_energy: parsedPlist?.processor?.cpu_energy as number
                    }
                    onData(stats)
                }
            }else{
                storedString += chunckStr
            }
            callback(null, String(chunk));
          }catch(err){
          }
        },
      });

    const powermetricCmd = spawn(`powermetrics`, ['--samplers', 'cpu_power', '-f', `plist`]);
    powermetricCmd.stdout.pipe(divideLines)

    const kill = () => {
    }

    return kill;
}