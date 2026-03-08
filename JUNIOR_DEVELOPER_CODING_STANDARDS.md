# 🎯 Junior Developer Coding Standards & SOLID Principles Guide

## 📚 Table of Contents
1. [SOLID Principles Overview](#solid-principles-overview)
2. [File Organization & Naming](#file-organization--naming)
3. [Class Structure Guidelines](#class-structure-guidelines)
4. [Method & Function Standards](#method--function-standards)
5. [Documentation Requirements](#documentation-requirements)
6. [TypeScript Best Practices](#typescript-best-practices)
7. [Testing Standards](#testing-standards)
8. [Common Patterns & Examples](#common-patterns--examples)

## 🏗️ SOLID Principles Overview

### S - Single Responsibility Principle (SRP)
**"A class should have only one reason to change"**

✅ **Good Example:**
```typescript
// Each class has ONE responsibility
class UserValidator {
  validateEmail(email: string): boolean { /* ... */ }
  validatePassword(password: string): boolean { /* ... */ }
}

class UserRepository {
  save(user: User): Promise<void> { /* ... */ }
  findById(id: string): Promise<User> { /* ... */ }
}
```

❌ **Bad Example:**
```typescript
// This class does TOO MANY things
class UserManager {
  validateEmail(email: string): boolean { /* ... */ }
  saveToDatabase(user: User): Promise<void> { /* ... */ }
  sendWelcomeEmail(user: User): Promise<void> { /* ... */ }
  generateReport(): string { /* ... */ }
}
```

### O - Open/Closed Principle (OCP)
**"Open for extension, closed for modification"**

✅ **Good Example:**
```typescript
interface PaymentProcessor {
  processPayment(amount: number): Promise<boolean>;
}

class CreditCardProcessor implements PaymentProcessor {
  processPayment(amount: number): Promise<boolean> { /* ... */ }
}

class PayPalProcessor implements PaymentProcessor {
  processPayment(amount: number): Promise<boolean> { /* ... */ }
}
```

### L - Liskov Substitution Principle (LSP)
**"Objects should be replaceable with instances of their subtypes"**

✅ **Good Example:**
```typescript
abstract class Shape {
  abstract calculateArea(): number;
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) { super(); }
  calculateArea(): number { return this.width * this.height; }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  calculateArea(): number { return Math.PI * this.radius * this.radius; }
}
```

### I - Interface Segregation Principle (ISP)
**"Clients should not depend on interfaces they don't use"**

✅ **Good Example:**
```typescript
interface Readable {
  read(): string;
}

interface Writable {
  write(data: string): void;
}

interface ReadWritable extends Readable, Writable {}
```

❌ **Bad Example:**
```typescript
interface FileHandler {
  read(): string;
  write(data: string): void;
  compress(): void;
  encrypt(): void;
  backup(): void; // Not all file handlers need all these methods
}
```

### D - Dependency Inversion Principle (DIP)
**"Depend on abstractions, not concretions"**

✅ **Good Example:**
```typescript
interface Logger {
  log(message: string): void;
}

class UserService {
  constructor(private logger: Logger) {} // Depends on abstraction
  
  createUser(userData: any): void {
    // ... create user logic
    this.logger.log('User created successfully');
  }
}
```

## 📁 File Organization & Naming

### Directory Structure
```
framework/
├── src/
│   ├── core/           # Base classes and interfaces
│   ├── helpers/        # Single-purpose utility classes
│   ├── services/       # Business logic services
│   ├── types/          # TypeScript interfaces and types
│   ├── utils/          # Pure utility functions
│   └── constants/      # Application constants
```

### Naming Conventions

#### Files & Classes
- **PascalCase** for classes: `UserService`, `PaymentProcessor`
- **PascalCase** for files: `UserService.ts`, `PaymentProcessor.ts`
- **Descriptive names**: `EmailValidator` not `Validator`

#### Methods & Variables
- **camelCase** for methods: `validateEmail()`, `processPayment()`
- **camelCase** for variables: `userName`, `isValid`
- **Descriptive names**: `calculateTotalAmount()` not `calc()`

#### Constants
- **SCREAMING_SNAKE_CASE**: `MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEOUT`

#### Interfaces
- **PascalCase** with descriptive names: `PaymentProcessor`, `UserRepository`
- **No "I" prefix**: Use `Logger` not `ILogger`

## 🏗️ Class Structure Guidelines

### Standard Class Template
```typescript
/**
 * Brief description of what this class does
 * 
 * @example
 * ```typescript
 * const validator = new EmailValidator();
 * const isValid = validator.validate('user@example.com');
 * ```
 */
export class EmailValidator {
  // 1. Constants (static readonly)
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // 2. Private properties
  private readonly config: ValidationConfig;
  
  // 3. Constructor
  constructor(config: ValidationConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  
  // 4. Public methods (alphabetically ordered)
  public validate(email: string): boolean {
    return this.isValidFormat(email) && this.isValidDomain(email);
  }
  
  // 5. Private methods (alphabetically ordered)
  private isValidDomain(email: string): boolean {
    // Implementation
  }
  
  private isValidFormat(email: string): boolean {
    return EmailValidator.EMAIL_REGEX.test(email);
  }
}
```

### Inheritance Guidelines
```typescript
// Base class - abstract when appropriate
abstract class BaseValidator {
  protected readonly config: ValidationConfig;
  
  constructor(config: ValidationConfig) {
    this.config = config;
  }
  
  // Template method pattern
  public validate(input: string): ValidationResult {
    const result = this.performValidation(input);
    this.logResult(result);
    return result;
  }
  
  // Abstract method - must be implemented by subclasses
  protected abstract performValidation(input: string): ValidationResult;
  
  // Common functionality
  protected logResult(result: ValidationResult): void {
    console.log(`Validation result: ${result.isValid}`);
  }
}

// Concrete implementation
class EmailValidator extends BaseValidator {
  protected performValidation(email: string): ValidationResult {
    // Email-specific validation logic
    return { isValid: true, errors: [] };
  }
}
```

## 🔧 Method & Function Standards

### Method Naming Patterns
- **Actions**: `create`, `update`, `delete`, `validate`, `process`
- **Queries**: `get`, `find`, `is`, `has`, `can`
- **Boolean returns**: `isValid`, `hasPermission`, `canAccess`

### Method Structure
```typescript
/**
 * Validates user email address and returns detailed result
 * 
 * @param email - The email address to validate
 * @param options - Optional validation configuration
 * @returns Validation result with success status and error details
 * 
 * @example
 * ```typescript
 * const result = await validateUserEmail('user@example.com');
 * if (result.isValid) {
 *   console.log('Email is valid');
 * }
 * ```
 */
public async validateUserEmail(
  email: string,
  options: ValidationOptions = {}
): Promise<ValidationResult> {
  // 1. Input validation
  if (!email || typeof email !== 'string') {
    throw new Error('Email must be a non-empty string');
  }
  
  // 2. Main logic
  const formatResult = this.validateFormat(email);
  const domainResult = await this.validateDomain(email);
  
  // 3. Return result
  return {
    isValid: formatResult.isValid && domainResult.isValid,
    errors: [...formatResult.errors, ...domainResult.errors]
  };
}
```

### Error Handling Patterns
```typescript
// Custom error classes
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly code: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Error handling in methods
public validateEmail(email: string): ValidationResult {
  try {
    // Validation logic
    return { isValid: true, errors: [] };
  } catch (error) {
    this.logger.error('Email validation failed', { email, error });
    throw new ValidationError(
      'Invalid email format',
      'email',
      'INVALID_FORMAT'
    );
  }
}
```

## 📝 Documentation Requirements

### Class Documentation
```typescript
/**
 * Handles user authentication and session management
 * 
 * This service provides methods for user login, logout, and session validation.
 * It integrates with external authentication providers and manages local session state.
 * 
 * @example Basic usage
 * ```typescript
 * const authService = new AuthenticationService(config);
 * const result = await authService.login('user@example.com', 'password');
 * if (result.success) {
 *   console.log('User logged in successfully');
 * }
 * ```
 * 
 * @example With custom configuration
 * ```typescript
 * const config = { timeout: 5000, retryAttempts: 3 };
 * const authService = new AuthenticationService(config);
 * ```
 */
export class AuthenticationService {
  // Class implementation
}
```

### Method Documentation
```typescript
/**
 * Authenticates user with email and password
 * 
 * @param email - User's email address (must be valid format)
 * @param password - User's password (minimum 8 characters)
 * @param options - Optional authentication settings
 * @param options.rememberMe - Whether to create persistent session
 * @param options.timeout - Request timeout in milliseconds
 * 
 * @returns Promise resolving to authentication result
 * @returns result.success - Whether authentication succeeded
 * @returns result.user - User information if successful
 * @returns result.token - Authentication token if successful
 * @returns result.error - Error message if failed
 * 
 * @throws {ValidationError} When email or password format is invalid
 * @throws {AuthenticationError} When credentials are incorrect
 * @throws {NetworkError} When authentication service is unavailable
 * 
 * @example
 * ```typescript
 * try {
 *   const result = await authService.login('user@example.com', 'password123');
 *   if (result.success) {
 *     console.log(`Welcome ${result.user.name}!`);
 *   } else {
 *     console.error(`Login failed: ${result.error}`);
 *   }
 * } catch (error) {
 *   console.error('Authentication error:', error.message);
 * }
 * ```
 */
public async login(
  email: string,
  password: string,
  options: LoginOptions = {}
): Promise<AuthenticationResult> {
  // Implementation
}
```

## 🎯 TypeScript Best Practices

### Interface Design
```typescript
// Good: Specific, focused interfaces
interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly createdAt: Date;
}

interface UserActions {
  updateProfile(updates: Partial<UserProfile>): Promise<void>;
  deleteAccount(): Promise<void>;
}

// Good: Composition over large interfaces
interface UserService extends UserActions {
  getProfile(id: string): Promise<UserProfile>;
}
```

### Type Definitions
```typescript
// Use union types for specific values
type UserRole = 'admin' | 'user' | 'guest';
type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

// Use generic types for reusability
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Use mapped types for transformations
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type UserEmail = Pick<User, 'email'>;
```

## 🧪 Testing Standards

### Test File Structure
```typescript
// UserService.test.ts
import { UserService } from '../UserService';
import { MockUserRepository } from '../__mocks__/MockUserRepository';

describe('UserService', () => {
  let userService: UserService;
  let mockRepository: MockUserRepository;
  
  beforeEach(() => {
    mockRepository = new MockUserRepository();
    userService = new UserService(mockRepository);
  });
  
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test User' };
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.user.email).toBe(userData.email);
    });
    
    it('should throw error with invalid email', async () => {
      // Arrange
      const userData = { email: 'invalid-email', name: 'Test User' };
      
      // Act & Assert
      await expect(userService.createUser(userData))
        .rejects
        .toThrow('Invalid email format');
    });
  });
});
```

## 🎨 Common Patterns & Examples

### Factory Pattern
```typescript
interface PaymentProcessor {
  process(amount: number): Promise<boolean>;
}

class PaymentProcessorFactory {
  static create(type: 'credit' | 'paypal' | 'stripe'): PaymentProcessor {
    switch (type) {
      case 'credit':
        return new CreditCardProcessor();
      case 'paypal':
        return new PayPalProcessor();
      case 'stripe':
        return new StripeProcessor();
      default:
        throw new Error(`Unknown payment type: ${type}`);
    }
  }
}
```

### Repository Pattern
```typescript
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

class DatabaseUserRepository implements UserRepository {
  constructor(private database: Database) {}
  
  async findById(id: string): Promise<User | null> {
    // Database implementation
  }
  
  async save(user: User): Promise<void> {
    // Database implementation
  }
  
  async delete(id: string): Promise<void> {
    // Database implementation
  }
}
```

### Builder Pattern
```typescript
class UserBuilder {
  private user: Partial<User> = {};
  
  setEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }
  
  setName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }
  
  setRole(role: UserRole): UserBuilder {
    this.user.role = role;
    return this;
  }
  
  build(): User {
    if (!this.user.email || !this.user.name) {
      throw new Error('Email and name are required');
    }
    return this.user as User;
  }
}

// Usage
const user = new UserBuilder()
  .setEmail('user@example.com')
  .setName('John Doe')
  .setRole('admin')
  .build();
```

## 🚀 Quick Reference Checklist

### Before Writing Code
- [ ] Does this class have a single responsibility?
- [ ] Can I extend this without modifying existing code?
- [ ] Are my dependencies injected rather than hard-coded?
- [ ] Do my interfaces represent what clients actually need?

### Code Review Checklist
- [ ] Are class and method names descriptive?
- [ ] Is each method doing only one thing?
- [ ] Are there comprehensive JSDoc comments?
- [ ] Are error cases handled appropriately?
- [ ] Are there unit tests covering the functionality?
- [ ] Does the code follow TypeScript best practices?

### Common Code Smells to Avoid
- [ ] Methods longer than 20 lines
- [ ] Classes with more than 10 public methods
- [ ] Deep nesting (more than 3 levels)
- [ ] Magic numbers or strings
- [ ] Commented-out code
- [ ] Inconsistent naming conventions

---

## 💡 Remember: Code is read more often than it's written!

Write code that your future self and your teammates will thank you for. When in doubt, choose clarity over cleverness.