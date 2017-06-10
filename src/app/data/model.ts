export class Hole {
    constructor(
        public par: number,
        public length?: number
    ) {}
}

export class Course {
    constructor(
        public name: string,
        public holes: Hole[] = []
    ) {}
}

export class Score {
    constructor(
        public hole: Hole,
        public throws: number,
        public comment?: string
    ) {}
}

export class Round {
    constructor(
        public date: Date,
        public scores: Score[],
        public comment?: string
    ) {}
}