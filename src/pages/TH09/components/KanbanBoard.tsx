import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, Tag, Typography } from 'antd';
import { Task, TaskStatus } from '../data.d';

interface KanbanProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const columns = [
  { id: 'Todo', title: 'Cần làm', color: '#1890ff' },
  { id: 'In Progress', title: 'Đang làm', color: '#faad14' },
  { id: 'Done', title: 'Hoàn thành', color: '#52c41a' }
];

const KanbanBoard: React.FC<KanbanProps> = ({ tasks, setTasks }) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const updatedTasks = tasks.map((t) => 
      t.id === draggableId ? { ...t, status: destination.droppableId as TaskStatus} : t
    );
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: 16, padding: 16, overflowX: 'auto' }}>
        {columns.map(col => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} 
                   style={{ background: '#f0f2f5', padding: 8, width: 300, borderRadius: 8, minHeight: 500 }}>
                <Typography.Title level={5} style={{ color: col.color, textAlign: 'center' }}>{col.title}</Typography.Title>
                {tasks.filter((t: any) => t.status === col.id).map((task: any, index: number) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => (
                      <Card 
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        size="small" style={{ marginBottom: 8, borderRadius: 4 }}
                      >
                        <div style={{ fontWeight: 'bold' }}>{task.title}</div>
                        <Tag color={task.priority === 'High' ? 'red' : 'blue'}>{task.priority}</Tag>
                        <div style={{ fontSize: 12, marginTop: 4 }}>📅 {task.deadline}</div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;