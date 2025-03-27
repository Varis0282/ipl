import parseIplSchedule from "@/lib/extract";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import moment from "moment";

export async function POST(req: Request) {
    try {
        const filePath = path.join(process.cwd(), "public", "ipl-schedule-final.json");
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(fileContent);
        const today = moment().format("DD-MMM-YY");
        const todayMatch = data.find((match: any) => match.date === today);
        return NextResponse.json({ result: todayMatch });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};
