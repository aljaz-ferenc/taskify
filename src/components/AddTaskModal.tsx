"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { GrAdd } from "react-icons/gr";
import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar";
import { ITask } from "@/database/models/Task";
import * as actions from '@/actions'

type AddTaskModalProps = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const workers = [
  {
    firstName: "Aljaz",
    lastName: "Ferenc",
    id: 1,
  },
  {
    firstName: "Azi",
    lastName: "Bazi",
    id: 2,
  },
  {
    firstName: "Gazi",
    lastName: "Cazi",
    id: 3,
  },
  {
    firstName: "Aljaz",
    lastName: "Ferenc",
    id: 4,
  },
  {
    firstName: "Azi",
    lastName: "Bazi",
    id: 5,
  },
  {
    firstName: "Gazi",
    lastName: "Cazi",
    id: 6,
  },
  {
    firstName: "Aljaz",
    lastName: "Ferenc",
    id: 7,
  },
  {
    firstName: "Azi",
    lastName: "Bazi",
    id: 8,
  },
  {
    firstName: "Gazi",
    lastName: "Cazi",
    id: 9,
  },
  {
    firstName: "Aljaz",
    lastName: "Ferenc",
    id: 10,
  },
  {
    firstName: "Azi",
    lastName: "Bazi",
    id: 11,
  },
  {
    firstName: "Gazi",
    lastName: "Cazi",
    id: 12,
  },
];

type Worker = {
  firstName: string;
  lastName: string;
  id: number;
};

export default function AddTaskModal({ setModalIsOpen }: AddTaskModalProps) {
  const [selectWorkersIsOpen, setSelectWorkersIsOpen] = useState(false);
  const [selectedWorkersIds, setSelectedWorkersIds] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [errors, setErrors] = useState<any>({})
  

  function handleSubmit(formData: any){

    const task: ITask = {
      title: formData.get('title'),
      deadline: new Date(formData.get('deadline')),
      status: 'pending',
      priority: formData.get('priority'),
      description: formData.get('description'),
      assignedTo: selectedWorkersIds
    }

    const formSchema = z.object({
      title: z.string().min(3, {message: 'Title must be at least 3 characters long'}),
      deadline: z.date(),
      status: z.string(),
      priority: z.enum(['urgent', 'high', 'medium', 'low']),
      assignedTo: z.string().array().min(1, {message: 'Select at least one person for the task'})
    });

    const result: any = formSchema.safeParse(task)
    console.log(result)
    if(result.error){
      setErrors(result.error.flatten().fieldErrors)
      console.log(result.error.flatten().fieldErrors)
    }
    if(result.success === true){
      actions.createTask(task)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="text-black custom-gradient"
          onClick={() => setModalIsOpen(true)}
        >
          <GrAdd className="mr-2" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Assign a task to one or more workers.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div>
          <Label>Title</Label>
          <Input type="text" name="title" />
          {errors.title && <div>{errors.title}</div>}
          </div>
          {/* <div>
          <Label>Deadline</Label>
          <Input type="date" name="deadline"/>
          </div> */}
          <div className="flex flex-col gap-2">
          <Label className="m-0 p-0">Priority</Label>
          <Select name="priority">
            <SelectTrigger>
              <SelectValue placeholder="Select priority..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.priority && <div>Select a priority</div>}
        </div>
        <div className="flex flex-col gap-2">

          <Label className="m-0 p-0">Deadline</Label>
          {/* <Input type="date" name="deadline" hidden value={date}/> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
            <Calendar
          mode="single"
          selected={new Date(date) || new Date()}
          onSelect={(date) => date && setDate(date?.toString())}
          initialFocus
        />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="m-0 p-0">Workers</Label>
          <ToggleGroup
            onValueChange={(value) => setSelectedWorkersIds(value)}
            type="multiple"
            className="grid grid-cols-3"
          >
            {workers.map((worker) => (
              <ToggleGroupItem key={worker.id} value={String(worker.id)}>
                {worker.firstName} {worker.lastName}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {errors.assignedTo && <div>{errors.assignedTo}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name='description'/>
        </div>
        </form>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
