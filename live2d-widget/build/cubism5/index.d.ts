export class AppDelegate {
    run(): void;
    _drawFrameId: number;
    stop(): void;
    release(): void;
    _cubismOption: any;
    releaseEventListener(): void;
    pointBeganEventListener: any;
    pointMovedEventListener: any;
    pointEndedEventListener: any;
    pointCancelEventListener: any;
    initializeSubdelegates(): void;
    changeModel(modelSettingPath: string): void;
    get subdelegates(): any;
}
