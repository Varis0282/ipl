import parseIplSchedule from "@/lib/_extract";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const result = await parseIplSchedule();
        return NextResponse.json({ result });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};
