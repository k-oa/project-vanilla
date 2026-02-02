import { Player } from "./Player";

export abstract class GameLoop {
    public lastTime: number = 0;
    protected isRunning: boolean = false;
    private accumulator: number = 0;
    private readonly FIXED_TIME_STEP = 1 / 20;

    public start(): void {
        this.isRunning = true;
        this.lastTime = performance.now();
    }

    public stop(): void {
        this.isRunning = false;
    }

    protected tick(currentTime: number): void {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.accumulator += deltaTime;
        while (this.accumulator >= this.FIXED_TIME_STEP) {
            this._physicsProcess(this.FIXED_TIME_STEP);
            this.physicsProcess(this.FIXED_TIME_STEP);
            this.accumulator -= this.FIXED_TIME_STEP;
        }

        this._process(deltaTime);
        this.process(deltaTime);
    }

    private _physicsProcess(delta: number): void {}
    private _process(delta: number): void {}

    public movePlayer(
        player: Player,
        moveDirection: { x: number; y: number }
    ): void {
        player.position.x += moveDirection.x * player.speed;
        player.position.y += moveDirection.y * player.speed;

        player.state = "moving";
    }

    protected abstract process(delta: number): void;
    protected abstract physicsProcess(delta: number): void;
}
