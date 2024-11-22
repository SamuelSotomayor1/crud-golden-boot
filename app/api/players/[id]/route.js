import connectMongoDB from "@/libs/mongodb";
import Player from "@/models/playerModel";
import { NextResponse } from "next/server";

export async function PUT(request, {params}){
    const{ id } = params;
    const {newName: player, newGoals: goals, newMatchs: matchs} = await request.json();
    await connectMongoDB();
    await Player.findByIdAndUpdate(id, { player, goals, matchs });
    return NextResponse.json({message: "Player updated"}, {status: 200});
}

export async function GET(request, { params }){
    const { id } = params;
    await connectMongoDB();
    const players = await Player.findOne({_id: id});
    if (!players) {
        return NextResponse.json({ message: "Player not found" }, { status: 404 });
    }
    return NextResponse.json({ players }, {status:200});
}
