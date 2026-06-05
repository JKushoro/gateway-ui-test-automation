import { ActionOptions } from '../../types';
/**
 * Interface for element query and validation actions
 * Following Interface Segregation Principle
 */
export interface IElementActions {
    getText(selector: string, options?: ActionOptions): Promise<string>;
    getAttribute(selector: string, attribute: string, options?: ActionOptions): Promise<string | null>;
    getInputValue(selector: string, options?: ActionOptions): Promise<string>;
    getTextByLabel(labelText: string, elementTag?: string): Promise<string>;
    isVisible(selector: string): Promise<boolean>;
    isEnabled(selector: string): Promise<boolean>;
    fill(selector: string, value: string, options?: ActionOptions): Promise<void>;
}
//# sourceMappingURL=IElementActions.d.ts.map