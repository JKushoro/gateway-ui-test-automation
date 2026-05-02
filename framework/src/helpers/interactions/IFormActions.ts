// framework/src/helpers/interactions/IFormActions.ts
import { Locator } from '@playwright/test';
import { ActionOptions } from '../../types';

/**
 * Interface for form-related actions
 * Following Interface Segregation Principle
 */
export interface IFormActions {
  // Input field actions
  fillInputByLabel(labelText: string, value: string, options?: ActionOptions): Promise<void>;
  fillInputByName(name: string, value: string): Promise<void>;
  getInputValueByLabel(label: string): Promise<string>;
  getInputValueByName(name: string): Promise<string>;
  
  // Dropdown actions
  selectDropdownByLabel(labelText: string, option?: string): Promise<string>;
  selectRandomFromNativeSelect(dropdown: Locator): Promise<string | undefined>;
  
  // Checkbox actions
  checkCheckbox(target: string | Locator, options?: ActionOptions): Promise<void>;
  uncheckCheckbox(selector: string, options?: ActionOptions): Promise<void>;
  
  // Radio button actions
  selectRadioByLabel(labelText: string, options?: ActionOptions): Promise<void>;
  setRadioByQuestion(question: string, answer?: string | boolean): Promise<string>;
}