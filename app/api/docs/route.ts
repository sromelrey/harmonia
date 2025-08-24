import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { error: "Path parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Construct the file path
    const filePath = join(process.cwd(), "docs", `${path}.md`);

    // Read the markdown file
    const content = await readFile(filePath, "utf-8");

    // Extract title from the first line (assuming it starts with #)
    const lines = content.split("\n");
    const title = lines[0].startsWith("# ")
      ? lines[0].substring(2).trim()
      : path.split("/").pop() || "Documentation";

    return NextResponse.json({
      title,
      content,
      path,
    });
  } catch (error) {
    console.error("Error reading markdown file:", error);
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
}
