# KYC Forms - Refactored Architecture

## Overview

This directory contains the refactored KYC (Know Your Customer) form step classes that follow DRY (Don't Repeat Yourself) and SOLID principles. The architecture has been significantly improved to reduce code duplication, improve maintainability, and make the codebase more accessible to junior developers.

## Key Improvements

### 1. Enhanced BaseKYCSteps Class

The `BaseKYCSteps` class now provides a comprehensive set of standardized methods that eliminate code duplication across all KYC step classes:

- **Standardized Question Handling**: All radio questions now use consistent patterns
- **Unified Page Completion Flow**: Common page completion logic is centralized
- **Consistent Logging**: Standardized logging patterns across all methods
- **Error Handling**: Robust error handling with meaningful error messages

### 2. Standardized Patterns

#### Question Answering Pattern
```typescript
// Old pattern (inconsistent and duplicated)
private async answerSomeQuestion(answer: string = 'No'): Promise<void> {
  await this.action.setRadioByQuestion('Question text?', answer);
  this.logInfo(`✓ Answered question: ${answer}`);
}

// New standardized pattern
private async answerSomeQuestion(answer?: string): Promise<void> {
  await this.answerRadioQuestionIfExists('Question text?', answer);
}
```

#### Page Completion Pattern
```typescript
// Old pattern (duplicated across files)
public async completeKYC_SomePage(): Promise<void> {
  await this.page.waitForLoadState('domcontentloaded');
  await this.verifySomePageHeading();
  await this.answerSomePageQuestions();
  await this.action.clickButtonByText('Save & Continue');
}

// New standardized pattern
public async completeKYC_SomePage(): Promise<void> {
  await this.completeKYCPageStandard(
    'page=some-page',
    'Page Heading',
    () => this.answerAllSomePageQuestions()
  );
}
```

### 3. Improved Import Management

The `CommonImports.ts` file has been enhanced to provide a single source of truth for all common imports, reducing duplication and improving maintainability.

## Refactored Files

### ✅ Completed Refactoring

1. **BaseKYCSteps.ts** - Enhanced with standardized methods and better abstractions
2. **KycIncomePageSteps.ts** - Fully refactored to use new patterns
3. **KycPensionsPageSteps.ts** - Fully refactored to use new patterns
4. **KycProtectionPageSteps.ts** - Fully refactored to use new patterns
5. **KycSavingsAndInvestmentsPageSteps.ts** - Fully refactored to use new patterns

### 🔄 Complex Files (Require Additional Work)

1. **KycPersonalDetailsPageSteps.ts** - Large file with complex logic (710 lines)
2. **KycCurrentSituationPageSteps.ts** - Complex with multiple question types (171 lines)
3. **KycLiabilitiesAndExpendituresPageSteps.ts** - Very complex with date pickers and calculations (430 lines)
4. **KycInvestmentKnowledgeAndPreferencesPageSteps.ts** - Complex conditional logic (280 lines)

## Benefits for Junior Developers

### 1. Consistent Patterns
- All KYC step classes follow the same structure
- Predictable method naming conventions
- Standardized error handling and logging

### 2. Reduced Complexity
- Common functionality is abstracted into base class
- Less code duplication means fewer places to make mistakes
- Clear separation of concerns

### 3. Better Documentation
- Comprehensive JSDoc comments
- Clear method responsibilities
- Examples of proper usage patterns

## Usage Examples

### Creating a New KYC Step Class

```typescript
import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycNewPageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  public async completeKYC_NewPage(): Promise<void> {
    await this.completeKYCPageStandard(
      'page=new-page',
      'New Page Heading',
      () => this.answerAllNewPageQuestions()
    );
  }

  private async answerAllNewPageQuestions(): Promise<void> {
    await this.answerFirstQuestion('Yes');
    await this.answerSecondQuestion('No');
    await this.fillSomeField('Some value');
  }

  private async answerFirstQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('First question text?', answer);
  }

  private async answerSecondQuestion(answer?: string): Promise<void> {
    await this.answerRadioQuestionIfExists('Second question text?', answer);
  }

  private async fillSomeField(value?: string): Promise<void> {
    await this.fillInputIfExists('Field label', value || 'Default value');
  }
}
```

## Available BaseKYCSteps Methods

### Question Handling
- `answerRadioQuestionIfExists(questionText, answer)` - Answer radio questions with consistent logging
- `answerRadioQuestionWithVerificationIfPresent(questionText, answer)` - Answer with verification
- `fillInputIfExists(labelText, value)` - Fill input fields if they exist
- `selectDropdownIfExists(labelText, value)` - Select dropdown options if they exist

### Page Management
- `completeKYCPageStandard(urlFragment, headingText, questionsHandler)` - Standard page completion flow
- `verifyKYCPageHeading(urlFragment, expectedHeading)` - Verify page heading and URL

### Utility Methods
- `elementExists(text, exact)` - Check if element exists
- `elementNotExists(text, exact)` - Check if element doesn't exist
- `logInfo(message)` - Consistent logging with timestamps
- `logError(message)` - Error logging

## Best Practices

### 1. Method Naming
- Use descriptive method names that clearly indicate their purpose
- Follow the pattern: `answer[QuestionName]Question()` for radio questions
- Use `fill[FieldName]Field()` for input fields
- Use `select[DropdownName]Option()` for dropdowns

### 2. Error Handling
- Always use the provided base class methods for consistent error handling
- Don't swallow errors silently
- Provide meaningful error messages

### 3. Logging
- Use the standardized logging methods from the base class
- Include relevant context in log messages
- Use appropriate log levels (info for normal flow, error for failures)

### 4. Code Organization
- Keep methods focused on a single responsibility
- Group related methods together
- Use clear section comments to organize code

## Migration Guide

When refactoring existing KYC step files:

1. **Replace manual question handling** with `answerRadioQuestionIfExists()`
2. **Replace manual page completion** with `completeKYCPageStandard()`
3. **Remove duplicate verification logic** - use base class methods
4. **Standardize method naming** according to the new conventions
5. **Update imports** to use `CommonImports.ts` where possible

## Future Improvements

1. **Complete refactoring** of remaining complex files
2. **Add unit tests** for all standardized methods
3. **Create validation helpers** for form data
4. **Implement page object model** improvements
5. **Add performance monitoring** for page completion times

## Contributing

When adding new functionality:

1. Follow the established patterns in refactored files
2. Add comprehensive JSDoc comments
3. Include error handling and logging
4. Update this README if adding new patterns
5. Ensure compatibility with existing code

---

*This refactoring effort significantly improves code quality, reduces duplication, and makes the codebase more maintainable for both current and future developers.*