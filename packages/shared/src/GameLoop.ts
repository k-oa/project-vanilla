export abstract class GameLoop {
    public lastTime: number = 0;
    protected isRunning: boolean = false;
    private accumulator: number = 0;
    private readonly FIXED_TIME_STEP = 1 / 60;

    public abstract start(): void;

    public stop(): void {
        this.isRunning = false;
    }

    protected tick(currentTime: number): void {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.accumulator += deltaTime;
        while (this.accumulator >= this.FIXED_TIME_STEP) {
            this._physicsProcess(this.FIXED_TIME_STEP);
            this.accumulator -= this.FIXED_TIME_STEP;
        }

        this._process(deltaTime);
    }

    protected abstract _physicsProcess(delta: number): void;
    protected abstract _process(delta: number): void;
}
