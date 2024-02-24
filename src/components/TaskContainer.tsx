import { ITask } from "@/types";
import Task from "./Task";

type TaskContainerProps = {
  title: string;
  tasks: ITask[];
};

export default function TaskContainer({ title, tasks }: TaskContainerProps) {

  function getColor(status: string) {
    let color;
    switch (status) {
      case "to-do":
        color = "#ecf4fe";
        break;
      case "in-progress":
        color = "#acf8ee";
        break;
      case "in-review":
        color = "#f2f0fd";
        break;
      case "done":
        color = "#fff";
        break;

      default:
        color = "#fff";
        break;
    }
    return color;
  }

  const bgColor = getColor(title);

  return (
    <div className="tasks-container flex flex-col gap-3 h-full  w-full m-3 rounded p-3">
      <div className="bg-[#002327] text-white text-center rounded py-2">
        {title.toUpperCase()}
      </div>
      {tasks.map((task, i) => (
        <Task bgColor={bgColor} key={i} task={task} />
      ))}
    </div>
  );
}
