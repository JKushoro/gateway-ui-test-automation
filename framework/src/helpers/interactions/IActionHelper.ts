// framework/src/helpers/interactions/IActionHelper.ts
import { IClickActions } from './IClickActions';
import { IFormActions } from './IFormActions';
import { INavigationActions } from './INavigationActions';
import { IElementActions } from './IElementActions';

/**
 * Main interface that combines all action interfaces
 * Following Interface Segregation Principle - clients can depend on specific interfaces
 */
export interface IActionHelper extends 
  IClickActions, 
  IFormActions, 
  INavigationActions, 
  IElementActions {
}

// Export all individual interfaces for specific use cases
export * from './IClickActions';
export * from './IFormActions';
export * from './INavigationActions';
export * from './IElementActions';