import { ITask } from "@/types";
import { Separator } from "./ui/separator";
import { MdDateRange } from "react-icons/md";
import { AiOutlineExclamationCircle } from "react-icons/ai";



type TaskProps = {
  task: ITask
  bgColor: string
}

export default function Task({ task, bgColor }: TaskProps) {
console.log(bgColor)
  return (
    <div className={`rounded-md p-3 flex flex-col gap-1 bg-[${'#ecf4fe'}] shadow`}>
      <h3 className="text-md font-bold">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
      <Separator className="my-2"/>
      <div className="flex flex-col items-start xl:gap-3 text-sm xl:flex-row xl:items-center">
        <div className={`bg-white py-1 px-2 rounded min-w-fit flex gap-2 items-center text-[${bgColor}]`}>
        <AiOutlineExclamationCircle />
          <p className='uppercase text-xs'>
          {task.priority}
          </p>
          </div>
        <div className="flex gap-2 items-center">
          <MdDateRange />
          <span className='text-sm'>
          {task.deadline.toLocaleDateString('en-us', {  year:"numeric", month:"short", day:"numeric"}) }
          </span>
          </div>
      </div>
    </div>
  );
}

function Priority({
  priority,
}: {
  priority: "urgent" | "high" | "medium" | "low";
}) {
  let color;

  switch (priority) {
    case "urgent":
      color = "#FFEBEB"; 
      break;
    case "high":
      color = "#FFEFD5"; 
      break;
    case "medium":
      color = "#FFFFE0"; 
      break;
    case "low":
      color = "#E8F5E9"; 
      break;
    default:
      break;
  }


  return (
    <div
      className={`p-1 rounded-full inline-block text-[${color}]`}
    >
      {priority.toUpperCase()}
    </div>
  );
}
