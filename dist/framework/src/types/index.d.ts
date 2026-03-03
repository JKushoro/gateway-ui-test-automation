/**
 * Essential Framework Type Definitions
 * Only the types actually used in the project
 */
export interface FrameworkConfig {
    timeout: number;
    slowMo?: number;
}
export interface WaitOptions {
    timeout?: number;
    force?: boolean;
}
export interface ActionOptions extends WaitOptions {
    clear?: boolean;
}
export interface ClickOptions extends WaitOptions {
    button?: 'left' | 'right' | 'middle';
    clickCount?: number;
    delay?: number;
}
export interface SelectOptions extends WaitOptions {
    exact?: boolean;
}
//# sourceMappingURL=index.d.ts.map