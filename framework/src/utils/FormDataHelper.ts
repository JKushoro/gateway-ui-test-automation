// framework/src/utils/FormDataHelper.ts
import { dataStore } from './DataStore';
import { TestDataGenerator } from './TestDataGenerator';

/**
 * Test form data interface
 */
export interface TestFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  fullName: string;
  generatedAt: string;
}

/**
 * FormDataHelper - Utility for generating and managing test form data
 * Focused on data generation and storage, not UI interaction
 */
export class FormDataHelper {
  
  /**
   * Create TestFormData object from individual fields
   */
  private static createFormData(firstName: string, lastName: string, companyName: string, email: string, phone: string): TestFormData {
    return {
      firstName,
      lastName,
      companyName,
      email,
      phone,
      fullName: `${firstName} ${lastName}`,
      generatedAt: new Date().toISOString()
    };
  }
  
  /**
   * Store form data in DataStore
   */
  private static storeFormData(formData: TestFormData, prefix: string): void {
    dataStore.setValue(`${prefix}.firstName`, formData.firstName);
    dataStore.setValue(`${prefix}.lastName`, formData.lastName);
    dataStore.setValue(`${prefix}.companyName`, formData.companyName);
    dataStore.setValue(`${prefix}.email`, formData.email);
    dataStore.setValue(`${prefix}.phone`, formData.phone);
    dataStore.setValue(`${prefix}.fullName`, formData.fullName);
    dataStore.setValue(`${prefix}.complete`, formData);
  }
  
  /**
   * Generate and store a complete set of form data
   */
  static generateAndStore(prefix: string = 'formData'): TestFormData {
    const firstName = TestDataGenerator.firstName();
    const lastName = TestDataGenerator.lastName();
    const companyName = TestDataGenerator.companyName();
    const email = TestDataGenerator.email({ first: firstName, last: lastName });
    const phone = TestDataGenerator.phone();
    
    const formData = this.createFormData(firstName, lastName, companyName, email, phone);
    this.storeFormData(formData, prefix);
    
    return formData;
  }
  
  /**
   * Generate form data with custom overrides
   */
  static generateWithOverrides(
    overrides: Partial<Pick<TestFormData, 'firstName' | 'lastName' | 'companyName' | 'email' | 'phone'>> = {},
    prefix: string = 'formData'
  ): TestFormData {
    const firstName = overrides.firstName ?? TestDataGenerator.firstName();
    const lastName = overrides.lastName ?? TestDataGenerator.lastName();
    const companyName = overrides.companyName ?? TestDataGenerator.companyName();
    const email = overrides.email ?? TestDataGenerator.email({ first: firstName, last: lastName });
    const phone = overrides.phone ?? TestDataGenerator.phone();
    
    const formData = this.createFormData(firstName, lastName, companyName, email, phone);
    this.storeFormData(formData, prefix);
    
    return formData;
  }
  
  /**
   * Retrieve stored form data
   */
  static getStoredData(prefix: string = 'formData'): TestFormData | null {
    return dataStore.getValue(`${prefix}.complete`);
  }
  
  /**
   * Get a specific field from stored form data
   */
  static getField(field: string, prefix: string = 'formData'): string | undefined {
    return dataStore.getValue(`${prefix}.${field}`);
  }
  
  /**
   * Clear stored form data
   */
  static clearStoredData(prefix: string = 'formData'): void {
    const fields = ['firstName', 'lastName', 'companyName', 'email', 'phone', 'fullName', 'complete'];
    fields.forEach(field => dataStore.removeValue(`${prefix}.${field}`));
  }
}