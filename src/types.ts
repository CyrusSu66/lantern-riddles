export interface Riddle {
    id: number;
    question: string;
    answer: string;
    hint: string;
}

export type RiddleStatus = 'unsolved' | 'solved';
