"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Chennai_Super_Kings from "../public/images/Chennai Super Kings.png";
import Delhi_Capitals from "../public/images/Delhi Capitals.png";
import Kolkata_Knight_Riders from "../public/images/Kolkata Knight Riders.png";
import Mumbai_Indians from "../public/images/Mumbai Indians.png";
import Punjab_Kings from "../public/images/Punjab Kings.png";
import Rajasthan_Royals from "../public/images/Rajasthan Royals.png";
import Royal_Challengers_Bengaluru from "../public/images/Royal Challengers Bangalore.png";
import Sunrisers_Hyderabad from "../public/images/Sunrisers Hyderabad.png";
import Gujarat_Titans from "../public/images/Gujarat Titans.png";
import Lucknow_Super_Giants from "../public/images/Lucknow Super Giants.png";
import AllMatches from '@/components/AllMatches';

const teamLogos = {
  Chennai_Super_Kings,
  Delhi_Capitals,
  Kolkata_Knight_Riders,
  Mumbai_Indians,
  Punjab_Kings,
  Rajasthan_Royals,
  Royal_Challengers_Bengaluru,
  Sunrisers_Hyderabad,
  Gujarat_Titans,
  Lucknow_Super_Giants,
};

export default function Home() {
  const [team1, setTeam1] = useState("");
  const [logo1, setLogo1] = useState("");
  const [team2, setTeam2] = useState("");
  const [logo2, setLogo2] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  const [matchDay, setMatchDay] = useState("");
  const [day, setDay] = useState("");

  const getTodayMatch = async () => {
    try {
      const response = await fetch("/api/today-match", {
        method: "POST",
      });
      const data = await response.json();
      const teams = data.result.match.split("vs");
      console.log("🚀 => teams:", teams);
      setTeam1(teams[0].trim());
      setLogo1(teams[0].trim().split(" ").join("_"));
      setTeam2(teams[1].trim());
      setLogo2(teams[1].trim().split(" ").join("_"));
      setVenue(data.result.venue);
      setDate(data.result.date);
      setTime(data.result.time);
      setMatchNumber(data.result.matchNumber);
      setMatchDay(data.result.matchDay);
      setDay(data.result.day);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getTodayMatch();
  }, []);

  return (
    <div className="md:mt-16 min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Match {matchNumber} — Match Day {matchDay}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white shadow-md rounded-xl p-6 w-auto w-full md:min-w-3xl">
        <div className="flex flex-col items-center gap-2 w-full md:w-[40%]">
          {logo1 && (
            <Image
              src={teamLogos[logo1 as keyof typeof teamLogos]}
              alt={team1}
              width={200}
              height={200}
              className="object-contain"
            />
          )}
          <p className="text-center font-medium text-gray-700">{team1}</p>
        </div>

        <div className="font-bold text-gray-600 w-full md:w-[20%] flex-col items-center justify-center">
          <p className="text-gray-500 text-center">{day}, {date} | {time}</p>
          <p className="text-gray-500 text-center">Venue: {venue}</p>
          <p className="text-center">VS</p>
        </div>

        <div className="flex flex-col items-center gap-2 w-full md:w-[40%]">
          {logo2 && (
            <Image
              src={teamLogos[logo2 as keyof typeof teamLogos]}
              alt={team2}
              width={200}
              height={200}
              className="object-contain"
            />
          )}
          <p className="text-center font-medium text-gray-700">{team2}</p>
        </div>
      </div>

      <AllMatches />

    </div>
  );
}
