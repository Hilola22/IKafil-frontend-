import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3030/api/",
});

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  const res = await fetch(`http://localhost:3030/api/devices?search=${query}`);
  const data = await res.json();

  return NextResponse.json(data);
}
