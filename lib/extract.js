import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export default async function parseIplSchedule() {
    const filePath = path.join(process.cwd(), 'public', 'ipl.pdf');
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);

    const lines = data.text.split('\n').map(line => line.trim()).filter(Boolean);

    const teamNames = [
        'Mumbai Indians',
        'Chennai Super Kings',
        'Delhi Capitals',
        'Punjab Kings',
        'Sunrisers Hyderabad',
        'Rajasthan Royals',
        'Lucknow Super Giants',
        'Gujarat Titans',
        'Royal Challengers Bengaluru',
        'Kolkata Knight Riders'
    ];

    const matches = [];
    let matchNumber = 1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const dateRegex = /^\d{2}-\d{2}$/; // 23-03
        const isDate = dateRegex.test(line);
        const isTeam = (name) => teamNames.some(team => name.startsWith(team));

        if (isDate && isTeam(lines[i + 1]) && isTeam(lines[i + 2])) {
            const date = line;
            const team1 = lines[i + 1];
            const team2 = lines[i + 2];
            const venue = lines[i + 3];
            const time = lines[i + 4];

            const day = moment(date + "-2025", "DD-MM-YYYY").format('dddd');

            matches.push({
                matchNumber,
                date,
                match: `${team1} vs ${team2}`,
                venue,
                time,
                day,
                matchDay: matchNumber,
            });

            matchNumber++;
            i += 4;
        }
    }

    const outputPath = path.join(process.cwd(), 'public', 'ipl-schedule.json');
    fs.writeFileSync(outputPath, JSON.stringify(matches, null, 2));
    return matches;
}