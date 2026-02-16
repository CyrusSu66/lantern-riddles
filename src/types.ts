export interface Riddle {
    id: number;
    question: string;
    answer: string;
}

export type RiddleStatus = 'unsolved' | 'solved';
