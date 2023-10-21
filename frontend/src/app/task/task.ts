export interface Task {
    taskNo: number;
 title: string;
 description: string;
 priority: 'low' | 'high';
 type: 'Web Design' | 'Web Development' | 'Graphic Design' | 'Software Development' | 'Software Testing'  | 'Documentation';
 completed?: Date;
}
