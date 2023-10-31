"use client";

import { Skeleton } from "@/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const handleChange = (userId: string) => {
    {
      axios
        .patch(`/api/issues/${issue.id}`, {
          assignedTo: userId === "null" ? null : userId,
        })
        .catch(() => {
          toast.error("Changes could not be saved");
        });
    }
  };

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignedTo || "null"}
        onValueChange={(userId) => handleChange(userId)}
      >
        <Select.Trigger placeholder="Assign..." />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 30 * 1000, // clear cache data after 30s
    retry: 3, // if api call fails it'll retry 3 times
  });
