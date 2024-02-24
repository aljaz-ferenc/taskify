"use client";

import { GrAdd } from "react-icons/gr";
import Task from "@/components/Task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ITask } from "@/types";
import React, { useState } from "react";
import TaskContainer from "@/components/TaskContainer";
import AddTaskModal from "@/components/AddTaskModal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TasksPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const tasks: ITask[] = [
    {
      title: "Project Proposal",
      description:
        "Prepare a detailed project proposal outlining goals, scope, and deliverables.",
      deadline: new Date("2024-03-15"),
      priority: "high",
      status: "to-do",
    },
    {
      title: "Market Research",
      description:
        "Conduct market research to identify potential opportunities and threats.",
      deadline: new Date("2024-03-10"),
      priority: "medium",
      status: "in-progress",
    },
    {
      title: "Budget Analysis",
      description: "Review and analyze the budget for the upcoming quarter.",
      deadline: new Date("2024-03-20"),
      priority: "high",
      status: "to-do",
    },
    {
      title: "Client Meeting",
      description:
        "Schedule and organize a meeting with a key client to discuss their requirements.",
      deadline: new Date("2024-03-12"),
      priority: "urgent",
      status: "done",
    },
    {
      title: "Training Session",
      description:
        "Attend a training session on the new software tools implemented in the team.",
      deadline: new Date("2024-03-08"),
      priority: "low",
      status: "done",
    },
  ];

  const taskContainers = [
    {
      title: "to-do",
      tasks: tasks.filter((task) => task.status === "to-do"),
    },
    {
      title: "in-progress",
      tasks: tasks.filter((task) => task.status === "in-progress"),
    },
    {
      title: "in-review",
      tasks: tasks.filter((task) => task.status === "in-review"),
    },
    {
      title: "done",
      tasks: tasks.filter((task) => task.status === "done"),
    },
  ];

  return (
    <div className="w-full max-h-screen overflow-hidden">
      <div className="flex gap-3 items-center p-3 bg-white">
        <h1 className="text-2xl">Task List</h1>
        <Input placeholder="Search tasks..." className="w-[20rem] ml-auto" />
        <AddTaskModal setModalIsOpen={setModalIsOpen}/>
      </div>
      <div className="w-full flex justify-evenly">
        {taskContainers.map((container) => (
          <>
            <TaskContainer title={container.title} tasks={container.tasks} />
            <div className="w-[1px] h-screen bg-gray-200"></div>
          </>
        ))}
      </div>
    </div>
  );
}
