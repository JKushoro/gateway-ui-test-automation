// framework/src/helpers/interactions/IElementActions.ts
import { ActionOptions } from '../../types';

/**
 * Interface for element query and validation actions
 * Following Interface Segregation Principle
 */
export interface IElementActions {
  // Element queries
  getText(selector: string, options?: ActionOptions): Promise<string>;
  getAttribute(selector: string, attribute: string, options?: ActionOptions): Promise<string | null>;
  getInputValue(selector: string, options?: ActionOptions): Promise<string>;
  getTextByLabel(labelText: string, elementTag?: string): Promise<string>;
  
  // Element state checks
  isVisible(selector: string): Promise<boolean>;
  isEnabled(selector: string): Promise<boolean>;
  
  // Element utilities
  fill(selector: string, value: string, options?: ActionOptions): Promise<void>;
}