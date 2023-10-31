import { patchIssueSchema } from "@/app/validationSchemas";
import { authOptions } from "@/authOptions";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedTo, title, description } = body;
  try {
    if (assignedTo) {
      const user = await prisma.user.findUnique({ where: { id: assignedTo } });

      if (!user)
        return NextResponse.json(
          { error: "Assigned user doesn't exist" },
          { status: 404 }
        );
    }
    const issue = await prisma.issue.findUnique({
      where: {
        id: +params.id,
      },
    });

    if (!issue)
      return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    const updatedIssue: Issue = await prisma.issue.update({
      where: { id: issue?.id },
      data: {
        title,
        description,
        assignedTo,
      },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (err: any) {
    console.log(err);
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
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
