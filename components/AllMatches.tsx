"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Image imports
import Chennai_Super_Kings from "../public/images/Chennai Super Kings.png";
import Delhi_Capitals from "../public/images/Delhi Capitals.png";
import Kolkata_Knight_Riders from "../public/images/Kolkata Knight Riders.png";
import Mumbai_Indians from "../public/images/Mumbai Indians.png";
import Punjab_Kings from "../public/images/Punjab Kings.png";
import Rajasthan_Royals from "../public/images/Rajasthan Royals.png";
import Royal_Challengers_Bangalore from "../public/images/Royal Challengers Bangalore.png";
import Sunrisers_Hyderabad from "../public/images/Sunrisers Hyderabad.png";
import Gujrat_Titans from "../public/images/Gujarat Titans.png";
import Lucknow_Super_Giants from "../public/images/Lucknow Super Giants.png";

const teamLogos = {
    "Chennai Super Kings": Chennai_Super_Kings,
    "Delhi Capitals": Delhi_Capitals,
    "Mumbai Indians": Mumbai_Indians,
    "Punjab Kings": Punjab_Kings,
    "Gujarat Titans": Gujrat_Titans,
    "Kolkata Knight Riders": Kolkata_Knight_Riders,
    "Rajasthan Royals": Rajasthan_Royals,
    "Royal Challengers Bengaluru": Royal_Challengers_Bangalore,
    "Sunrisers Hyderabad": Sunrisers_Hyderabad,
    "Lucknow Super Giants": Lucknow_Super_Giants,
};

const teamAbbreviations = {
    "Chennai Super Kings": "CSK",
    "Delhi Capitals": "DC",
    "Mumbai Indians": "MI",
    "Punjab Kings": "PBKS",
    "Gujarat Titans": "GT",
    "Kolkata Knight Riders": "KKR",
    "Rajasthan Royals": "RR",
    "Royal Challengers Bengaluru": "RCB",
    "Sunrisers Hyderabad": "SRH",
    "Lucknow Super Giants": "LSG",
};

export default function Home() {
    const [allMatches, setAllMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [show, setShow] = useState(false);

    const getAllMatches = async () => {
        const res = await fetch("/ipl-schedule-final.json");
        const data = await res.json();
        setAllMatches(data);
        setFilteredMatches(data);
    };

    const toggleTeamFilter = (team: string) => {
        const updated = selectedTeams.includes(team)
            ? selectedTeams.filter(t => t !== team)
            : [...selectedTeams, team];

        setSelectedTeams(updated);

        if (updated.length === 0) {
            setFilteredMatches(allMatches);
        } else {
            const filtered = allMatches.filter((match: any) =>
                updated.some(t => match.match.includes(t))
            );
            setFilteredMatches(filtered);
        }
    };

    useEffect(() => {
        getAllMatches();
    }, []);

    return (
        <div className="w-full md:px-4 md:py-10 md:max-w-6xl md:mx-auto">
            {show && (
                <>
                    {/* Filter Buttons */}
                    <div className="flex md:flex-wrap overflow-x-scroll gap-x-6 md:gap-4 gap-2 mb-4 md:mb-8">
                        <button
                            onClick={() => {
                                setSelectedTeams([]);
                                setFilteredMatches(allMatches);
                            }}
                            className={`gap-2 px-2 py-1 md:px-4 md:py-2 rounded-lg text-[10px] md:text-sm font-medium ${selectedTeams.length === 0 ? "text-blue-800" : "text-gray-800"}`}
                        >
                            All Teams
                        </button>
                        {Object.keys(teamLogos).map((team) => (
                            <button
                                key={team}
                                onClick={() => toggleTeamFilter(team)}
                                className={`flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded-lg text-[10px] md:text-sm font-medium ${selectedTeams.includes(team) ? "text-blue-800" : "text-gray-800"}`}
                            >
                                <Image src={teamLogos[team as keyof typeof teamLogos]} alt={team} width={24} height={24} />
                                <span className="hidden sm:inline">{team}</span>
                                <span className="inline sm:hidden">
                                    {teamAbbreviations[team as keyof typeof teamAbbreviations]}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Match Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 text-sm text-gray-700">
                                <tr>
                                    <th className="p-3 text-left">Team 1</th>
                                    <th className="p-3 text-left">Team 2</th>
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Day & Time</th>
                                    <th className="p-3 text-left">Venue</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-800">
                                {filteredMatches.map((match: any, index) => {
                                    const [team1, team2] = match.match.split("vs").map((s: any) => s.trim());
                                    return (
                                        <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                                            <td className="p-3">
                                                <span className="hidden sm:inline">{team1}</span>
                                                <span className="inline sm:hidden">
                                                    <Image src={teamLogos[team1 as keyof typeof teamLogos]} alt={team1} width={24} height={24} />
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span className="hidden sm:inline">{team2}</span>
                                                <span className="inline sm:hidden">
                                                    <Image src={teamLogos[team2 as keyof typeof teamLogos]} alt={team2} width={24} height={24} />
                                                </span>
                                            </td>
                                            <td className="p-3">{match.date}</td>
                                            <td className="p-3">{match.day}, {match.time}</td>
                                            <td className="p-3">{match.venue}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* View All Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => {
                        setSelectedTeams([]);
                        setShow(!show);
                        setFilteredMatches(allMatches);
                    }}
                    className="bg-[#DB2E1D] hover:bg-[#f53c2a] text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
                >
                    {show ? "Hide" : "View"} All Matches
                </button>
            </div>
        </div>
    );
}
