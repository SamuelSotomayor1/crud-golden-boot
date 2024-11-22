import connectMongoDB from "@/libs/mongodb";
import Player from "@/models/playerModel";
import { NextResponse } from "next/server";

export async function GET(){
    await connectMongoDB();
    const players = await Player.find();
    return NextResponse.json({ players })
}

export async function POST(request){
    const{ player, goals, matchs } = await request.json();
    await connectMongoDB();
    await Player.create({ player, goals, matchs});
    return NextResponse.json({message: "Player agregated"}, {status: 201});
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Player.findByIdAndDelete(id);
    return NextResponse.json({message: "Player deleted"}, {status:200});
}