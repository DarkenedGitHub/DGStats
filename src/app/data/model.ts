export class Hole {
    constructor(
        public par: number,
        public length?: number
    ) {}
}

export class Course {
    constructor(
        public name: string,
        public holes: Hole[] = [],
    ) {}
}

export class Score {
    constructor(
        public throws: number,
        public comment?: string
    ) {}
}

export class Round {
    constructor(
        public courseName: string,
        public date: Date,
        public scores: Score[],
        public comment?: string
    ) {}
}