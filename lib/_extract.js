import fs from 'fs';
import path from 'path';

export default function parseTxtSchedule() {
    const filePath = path.join(process.cwd(), 'public', 'ipl.txt');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const lines = raw.split('\n').map(line => line.trim()).filter(line => line);

    // Split lines based on how the data was structured
    const matchesHalf = Math.floor(lines.length / 2);

    const team1 = lines.slice(0, 37);
    const venue1 = lines.slice(37, 74);
    const team2 = lines.slice(74, 111);
    const time1 = lines.slice(111, 148);
    const day1 = lines.slice(148, 185);
    const date1 = lines.slice(185, 222);
    const matchDay1 = lines.slice(222, 259).map(n => parseInt(n, 10));

    const team3 = lines.slice(259, 292);
    const venue2 = lines.slice(292, 329);
    const team4 = lines.slice(329, 362);
    const time2 = lines.slice(362, 395);
    const day2 = lines.slice(395, 428);
    const date2 = lines.slice(428, 461);
    const matchDay2 = lines.slice(461).map(n => parseInt(n, 10));

    const allMatches = [];

    for (let i = 0; i < team1.length; i++) {
        allMatches.push({
            matchNumber: i + 1,
            date: date1[i],
            match: `${team1[i]} vs ${team2[i]}`,
            venue: venue1[i],
            time: time1[i],
            day: day1[i],
            matchDay: matchDay1[i],
        });
    }

    for (let i = 0; i < team3.length; i++) {
        allMatches.push({
            matchNumber: i + 38,
            date: date2[i],
            match: `${team3[i]} vs ${team4[i]}`,
            venue: venue2[i],
            time: time2[i],
            day: day2[i],
            matchDay: matchDay2[i],
        });
    }

    console.log("🚀 => allMatches:", allMatches);
    // Optional: save to JSON file
    const outputPath = path.join(process.cwd(), 'public', 'ipl-schedule-final.json');
    fs.writeFileSync(outputPath, JSON.stringify(allMatches, null, 2));

    return allMatches;
}
