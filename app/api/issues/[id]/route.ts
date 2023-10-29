import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: +params.id,
      },
    });

    if (!issue)
      return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
      where: { id: issue?.id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.meta?.cause || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  if (!params.id)
    return NextResponse.json({ error: "Id is required" }, { status: 400 });

  try {
    const issue = await prisma.issue.delete({
      where: {
        id: +params.id,
      },
    });

    if (!issue)
      return NextResponse.json(
        { error: "Item doesn't exist" },
        { status: 404 }
      );

    return NextResponse.json(issue, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.meta?.cause || "Internal Server Error" },
      { status: 400 }
    );
  }
}
