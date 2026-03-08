# 🏗️ OOP & Page Object Model (POM) Guidelines

## 📚 Table of Contents
1. [Object-Oriented Programming (OOP) Principles](#oop-principles)
2. [Page Object Model (POM) Best Practices](#pom-best-practices)
3. [Implementation Examples](#implementation-examples)
4. [Common Patterns](#common-patterns)
5. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
6. [Junior Developer Checklist](#junior-developer-checklist)

## 🎯 Object-Oriented Programming (OOP) Principles

### 1. Encapsulation ✅
**"Hide internal implementation details and expose only necessary functionality"**

```typescript
// ✅ GOOD: Proper encapsulation
class LoginPage extends BasePage {
  // Private locators - hidden from outside
  private readonly emailInput = this.page.locator('#email');
  private readonly passwordInput = this.page.locator('#password');
  private readonly loginButton = this.page.locator('#login-btn');
  private readonly errorMessage = this.page.locator('.error-message');

  // Public interface - what users of this class need
  public async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  public async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  // Private helper methods - implementation details
  private async enterEmail(email: string): Promise<void> {
    await this.action.fillInput(this.emailInput, email);
  }

  private async enterPassword(password: string): Promise<void> {
    await this.action.fillInput(this.passwordInput, password);
  }

  private async clickLoginButton(): Promise<void> {
    await this.action.clickLocator(this.loginButton);
  }
}
```

```typescript
// ❌ BAD: Poor encapsulation
class LoginPage extends BasePage {
  // Everything is public - no encapsulation
  public emailInput = this.page.locator('#email');
  public passwordInput = this.page.locator('#password');
  public loginButton = this.page.locator('#login-btn');

  public async login(email: string, password: string): Promise<void> {
    // Implementation details exposed
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### 2. Inheritance ✅
**"Create specialized classes from general base classes"**

```typescript
// ✅ GOOD: Proper inheritance hierarchy
abstract class BaseFormPage extends BasePage {
  protected abstract getFormSelector(): string;
  protected abstract getSubmitButtonSelector(): string;

  // Common form functionality
  protected async submitForm(): Promise<void> {
    const submitButton = this.page.locator(this.getSubmitButtonSelector());
    await this.action.clickLocator(submitButton);
    await this.waitForFormSubmission();
  }

  protected async waitForFormSubmission(): Promise<void> {
    await this.wait.waitForNetworkIdle();
  }

  protected async validateForm(): Promise<boolean> {
    const form = this.page.locator(this.getFormSelector());
    return await form.isVisible();
  }
}

// Specialized form pages
class LoginFormPage extends BaseFormPage {
  protected getFormSelector(): string {
    return '#login-form';
  }

  protected getSubmitButtonSelector(): string {
    return '#login-submit';
  }

  // Login-specific functionality
  public async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.fillLoginForm(email, password);
    await this.submitForm();
  }

  private async fillLoginForm(email: string, password: string): Promise<void> {
    await this.action.fillInput(this.page.locator('#email'), email);
    await this.action.fillInput(this.page.locator('#password'), password);
  }
}

class RegistrationFormPage extends BaseFormPage {
  protected getFormSelector(): string {
    return '#registration-form';
  }

  protected getSubmitButtonSelector(): string {
    return '#register-submit';
  }

  // Registration-specific functionality
  public async registerUser(userData: UserData): Promise<void> {
    await this.fillRegistrationForm(userData);
    await this.submitForm();
  }

  private async fillRegistrationForm(userData: UserData): Promise<void> {
    await this.action.fillInput(this.page.locator('#firstName'), userData.firstName);
    await this.action.fillInput(this.page.locator('#lastName'), userData.lastName);
    await this.action.fillInput(this.page.locator('#email'), userData.email);
  }
}
```

### 3. Polymorphism ✅
**"Different classes can be used interchangeably through common interfaces"**

```typescript
// ✅ GOOD: Polymorphism through interfaces
interface Navigable {
  navigate(): Promise<void>;
  isLoaded(): Promise<boolean>;
  getPageTitle(): Promise<string>;
}

interface Searchable {
  search(query: string): Promise<void>;
  getSearchResults(): Promise<string[]>;
  clearSearch(): Promise<void>;
}

class HomePage extends BasePage implements Navigable, Searchable {
  public async navigate(): Promise<void> {
    await this.navigateTo('/home');
  }

  public async isLoaded(): Promise<boolean> {
    return await this.page.locator('#home-content').isVisible();
  }

  public async getPageTitle(): Promise<string> {
    return await this.getPageTitle();
  }

  public async search(query: string): Promise<void> {
    await this.action.fillInput(this.page.locator('#search'), query);
    await this.action.clickLocator(this.page.locator('#search-btn'));
  }

  public async getSearchResults(): Promise<string[]> {
    const results = await this.page.locator('.search-result').allTextContents();
    return results;
  }

  public async clearSearch(): Promise<void> {
    await this.action.clearInput(this.page.locator('#search'));
  }
}

// Usage with polymorphism
class NavigationService {
  public async navigateToPage(page: Navigable): Promise<void> {
    await page.navigate();
    
    if (!(await page.isLoaded())) {
      throw new Error(`Failed to load page: ${await page.getPageTitle()}`);
    }
  }

  public async performSearch(page: Searchable, query: string): Promise<string[]> {
    await page.search(query);
    return await page.getSearchResults();
  }
}
```

### 4. Abstraction ✅
**"Hide complex implementation behind simple interfaces"**

```typescript
// ✅ GOOD: Proper abstraction
abstract class BaseDataPage extends BasePage {
  // Abstract methods - must be implemented by subclasses
  protected abstract getDataTableSelector(): string;
  protected abstract getRowSelector(): string;
  protected abstract getColumnHeaders(): string[];

  // Concrete methods using abstractions
  public async getTableData(): Promise<Record<string, string>[]> {
    const table = this.page.locator(this.getDataTableSelector());
    const rows = table.locator(this.getRowSelector());
    const headers = this.getColumnHeaders();
    
    const data: Record<string, string>[] = [];
    const rowCount = await rows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const rowData: Record<string, string> = {};
      
      for (let j = 0; j < headers.length; j++) {
        const cellValue = await rows.nth(i).locator('td').nth(j).textContent();
        rowData[headers[j]] = cellValue || '';
      }
      
      data.push(rowData);
    }
    
    return data;
  }

  public async findRowByValue(column: string, value: string): Promise<number> {
    const data = await this.getTableData();
    return data.findIndex(row => row[column] === value);
  }
}

// Concrete implementation
class UserListPage extends BaseDataPage {
  protected getDataTableSelector(): string {
    return '#users-table';
  }

  protected getRowSelector(): string {
    return 'tbody tr';
  }

  protected getColumnHeaders(): string[] {
    return ['Name', 'Email', 'Role', 'Status'];
  }

  // User-specific functionality
  public async findUserByEmail(email: string): Promise<number> {
    return await this.findRowByValue('Email', email);
  }

  public async getUserRole(email: string): Promise<string> {
    const data = await this.getTableData();
    const user = data.find(row => row.Email === email);
    return user?.Role || '';
  }
}
```

## 📄 Page Object Model (POM) Best Practices

### 1. Page Structure ✅
**"Each page should be a separate class with clear responsibilities"**

```typescript
// ✅ GOOD: Well-structured page object
class ProductDetailsPage extends BasePage {
  // ==========================================
  // PAGE LOCATORS (Private - Encapsulation)
  // ==========================================
  private readonly productTitle = this.page.locator('[data-testid="product-title"]');
  private readonly productPrice = this.page.locator('[data-testid="product-price"]');
  private readonly productDescription = this.page.locator('[data-testid="product-description"]');
  private readonly addToCartButton = this.page.locator('[data-testid="add-to-cart"]');
  private readonly quantityInput = this.page.locator('[data-testid="quantity-input"]');
  private readonly productImages = this.page.locator('[data-testid="product-images"] img');

  // ==========================================
  // PAGE URL AND NAVIGATION
  // ==========================================
  protected getPageUrl(): string {
    return '/product/{productId}';
  }

  public async navigateToProduct(productId: string): Promise<void> {
    const url = this.getPageUrl().replace('{productId}', productId);
    await this.navigateTo(url);
    await this.waitForPageLoad();
  }

  // ==========================================
  // PAGE ACTIONS (Public Interface)
  // ==========================================
  public async addToCart(quantity: number = 1): Promise<void> {
    await this.setQuantity(quantity);
    await this.clickAddToCart();
    await this.waitForCartUpdate();
  }

  public async getProductInfo(): Promise<ProductInfo> {
    return {
      title: await this.getProductTitle(),
      price: await this.getProductPrice(),
      description: await this.getProductDescription(),
      imageCount: await this.getImageCount()
    };
  }

  // ==========================================
  // PAGE QUERIES (Public Interface)
  // ==========================================
  public async getProductTitle(): Promise<string> {
    return await this.productTitle.textContent() || '';
  }

  public async getProductPrice(): Promise<number> {
    const priceText = await this.productPrice.textContent() || '0';
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }

  public async isAddToCartEnabled(): Promise<boolean> {
    return await this.addToCartButton.isEnabled();
  }

  // ==========================================
  // PRIVATE HELPER METHODS (Implementation Details)
  // ==========================================
  private async setQuantity(quantity: number): Promise<void> {
    await this.action.clearInput(this.quantityInput);
    await this.action.fillInput(this.quantityInput, quantity.toString());
  }

  private async clickAddToCart(): Promise<void> {
    await this.action.clickLocator(this.addToCartButton);
  }

  private async waitForCartUpdate(): Promise<void> {
    // Wait for cart icon to update or success message
    await this.wait.waitForElement(this.page.locator('[data-testid="cart-success"]'));
  }

  private async getProductDescription(): Promise<string> {
    return await this.productDescription.textContent() || '';
  }

  private async getImageCount(): Promise<number> {
    return await this.productImages.count();
  }
}

// Supporting types
interface ProductInfo {
  title: string;
  price: number;
  description: string;
  imageCount: number;
}
```

### 2. Component Objects ✅
**"Reusable UI components should be separate classes"**

```typescript
// ✅ GOOD: Reusable component objects
class NavigationComponent extends BasePage {
  private readonly navContainer = this.page.locator('[data-testid="main-navigation"]');
  private readonly menuItems = this.navContainer.locator('.nav-item');
  private readonly userMenu = this.navContainer.locator('[data-testid="user-menu"]');
  private readonly logoutButton = this.userMenu.locator('[data-testid="logout"]');

  public async navigateToSection(sectionName: string): Promise<void> {
    const menuItem = this.menuItems.filter({ hasText: sectionName });
    await this.action.clickLocator(menuItem);
  }

  public async logout(): Promise<void> {
    await this.action.clickLocator(this.userMenu);
    await this.action.clickLocator(this.logoutButton);
  }

  public async getCurrentSection(): Promise<string> {
    const activeItem = this.menuItems.locator('.active');
    return await activeItem.textContent() || '';
  }
}

class SearchComponent extends BasePage {
  private readonly searchContainer = this.page.locator('[data-testid="search-component"]');
  private readonly searchInput = this.searchContainer.locator('input[type="search"]');
  private readonly searchButton = this.searchContainer.locator('[data-testid="search-button"]');
  private readonly searchResults = this.searchContainer.locator('[data-testid="search-results"]');
  private readonly resultItems = this.searchResults.locator('.result-item');

  public async search(query: string): Promise<void> {
    await this.action.fillInput(this.searchInput, query);
    await this.action.clickLocator(this.searchButton);
    await this.waitForResults();
  }

  public async getResults(): Promise<string[]> {
    return await this.resultItems.allTextContents();
  }

  public async clearSearch(): Promise<void> {
    await this.action.clearInput(this.searchInput);
  }

  private async waitForResults(): Promise<void> {
    await this.wait.waitForElement(this.searchResults);
  }
}

// Page using components
class HomePage extends BasePage {
  // Composition - using component objects
  public readonly navigation = new NavigationComponent(this.page, this.config);
  public readonly search = new SearchComponent(this.page, this.config);

  private readonly heroSection = this.page.locator('[data-testid="hero-section"]');
  private readonly featuredProducts = this.page.locator('[data-testid="featured-products"]');

  public async searchForProduct(productName: string): Promise<string[]> {
    return await this.search.search(productName);
  }

  public async navigateToProducts(): Promise<void> {
    await this.navigation.navigateToSection('Products');
  }

  public async getFeaturedProducts(): Promise<string[]> {
    return await this.featuredProducts.locator('.product-card h3').allTextContents();
  }
}
```

### 3. Page Factory Pattern ✅
**"Centralized page creation and management"**

```typescript
// ✅ GOOD: Page factory for centralized page management
class PageFactory {
  constructor(private page: Page, private config: FrameworkConfig) {}

  // Factory methods for different page types
  public createLoginPage(): LoginPage {
    return new LoginPage(this.page, this.config);
  }

  public createHomePage(): HomePage {
    return new HomePage(this.page, this.config);
  }

  public createProductPage(): ProductDetailsPage {
    return new ProductDetailsPage(this.page, this.config);
  }

  public createUserProfilePage(): UserProfilePage {
    return new UserProfilePage(this.page, this.config);
  }

  // Generic page creation
  public createPage<T extends BasePage>(
    PageClass: new (page: Page, config: FrameworkConfig) => T
  ): T {
    return new PageClass(this.page, this.config);
  }
}

// Usage in tests
class TestBase {
  protected pageFactory: PageFactory;

  constructor(page: Page, config: FrameworkConfig) {
    this.pageFactory = new PageFactory(page, config);
  }

  protected get loginPage(): LoginPage {
    return this.pageFactory.createLoginPage();
  }

  protected get homePage(): HomePage {
    return this.pageFactory.createHomePage();
  }

  protected get productPage(): ProductDetailsPage {
    return this.pageFactory.createProductPage();
  }
}
```

## 🎯 Implementation Examples

### Complete Page Object Example

```typescript
/**
 * 🛒 Shopping Cart Page
 * 
 * Demonstrates proper OOP and POM implementation:
 * - Encapsulation: Private locators and helper methods
 * - Inheritance: Extends BasePage
 * - Abstraction: Clear public interface
 * - Single Responsibility: Only handles cart functionality
 */
class ShoppingCartPage extends BasePage {
  // ==========================================
  // PRIVATE LOCATORS (Encapsulation)
  // ==========================================
  private readonly cartContainer = this.page.locator('[data-testid="shopping-cart"]');
  private readonly cartItems = this.cartContainer.locator('[data-testid="cart-item"]');
  private readonly emptyCartMessage = this.cartContainer.locator('[data-testid="empty-cart"]');
  private readonly totalPrice = this.cartContainer.locator('[data-testid="total-price"]');
  private readonly checkoutButton = this.cartContainer.locator('[data-testid="checkout-button"]');
  private readonly continueShoppingButton = this.cartContainer.locator('[data-testid="continue-shopping"]');

  // ==========================================
  // PAGE IDENTIFICATION
  // ==========================================
  protected getPageUrl(): string {
    return '/cart';
  }

  public async isLoaded(): Promise<boolean> {
    return await this.cartContainer.isVisible();
  }

  // ==========================================
  // PUBLIC INTERFACE (What users of this class need)
  // ==========================================

  /**
   * Get all items currently in the cart
   */
  public async getCartItems(): Promise<CartItem[]> {
    const items: CartItem[] = [];
    const itemCount = await this.cartItems.count();

    for (let i = 0; i < itemCount; i++) {
      const item = await this.getCartItemDetails(i);
      items.push(item);
    }

    return items;
  }

  /**
   * Remove an item from the cart by product name
   */
  public async removeItem(productName: string): Promise<void> {
    const itemIndex = await this.findItemByName(productName);
    if (itemIndex === -1) {
      throw new Error(`Product "${productName}" not found in cart`);
    }

    await this.removeItemByIndex(itemIndex);
    await this.waitForCartUpdate();
  }

  /**
   * Update quantity of an item in the cart
   */
  public async updateItemQuantity(productName: string, newQuantity: number): Promise<void> {
    const itemIndex = await this.findItemByName(productName);
    if (itemIndex === -1) {
      throw new Error(`Product "${productName}" not found in cart`);
    }

    await this.setItemQuantity(itemIndex, newQuantity);
    await this.waitForCartUpdate();
  }

  /**
   * Get the total price of all items in cart
   */
  public async getTotalPrice(): Promise<number> {
    const priceText = await this.totalPrice.textContent() || '0';
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }

  /**
   * Check if cart is empty
   */
  public async isEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  /**
   * Proceed to checkout
   */
  public async proceedToCheckout(): Promise<void> {
    if (await this.isEmpty()) {
      throw new Error('Cannot checkout with empty cart');
    }

    await this.action.clickLocator(this.checkoutButton);
    await this.waitForNavigation();
  }

  /**
   * Continue shopping (go back to products)
   */
  public async continueShopping(): Promise<void> {
    await this.action.clickLocator(this.continueShoppingButton);
    await this.waitForNavigation();
  }

  // ==========================================
  // PRIVATE HELPER METHODS (Implementation Details)
  // ==========================================

  private async getCartItemDetails(index: number): Promise<CartItem> {
    const item = this.cartItems.nth(index);
    
    return {
      name: await item.locator('[data-testid="item-name"]').textContent() || '',
      price: await this.getItemPrice(item),
      quantity: await this.getItemQuantity(item),
      total: await this.getItemTotal(item)
    };
  }

  private async getItemPrice(item: Locator): Promise<number> {
    const priceText = await item.locator('[data-testid="item-price"]').textContent() || '0';
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }

  private async getItemQuantity(item: Locator): Promise<number> {
    const quantityText = await item.locator('[data-testid="item-quantity"]').inputValue();
    return parseInt(quantityText) || 0;
  }

  private async getItemTotal(item: Locator): Promise<number> {
    const totalText = await item.locator('[data-testid="item-total"]').textContent() || '0';
    return parseFloat(totalText.replace(/[^0-9.]/g, ''));
  }

  private async findItemByName(productName: string): Promise<number> {
    const itemCount = await this.cartItems.count();
    
    for (let i = 0; i < itemCount; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator('[data-testid="item-name"]').textContent();
      
      if (name === productName) {
        return i;
      }
    }
    
    return -1;
  }

  private async removeItemByIndex(index: number): Promise<void> {
    const item = this.cartItems.nth(index);
    const removeButton = item.locator('[data-testid="remove-item"]');
    await this.action.clickLocator(removeButton);
  }

  private async setItemQuantity(index: number, quantity: number): Promise<void> {
    const item = this.cartItems.nth(index);
    const quantityInput = item.locator('[data-testid="item-quantity"]');
    
    await this.action.clearInput(quantityInput);
    await this.action.fillInput(quantityInput, quantity.toString());
  }

  private async waitForCartUpdate(): Promise<void> {
    // Wait for cart to update after changes
    await this.wait.waitForNetworkIdle();
    await this.page.waitForTimeout(500); // Small delay for UI updates
  }

  private async waitForNavigation(): Promise<void> {
    await this.wait.waitForNavigation();
  }
}

// Supporting interfaces
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
}
```

## 🚫 Anti-Patterns to Avoid

### 1. ❌ Exposing Internal Details
```typescript
// ❌ BAD: Exposing locators
class BadLoginPage extends BasePage {
  public emailInput = this.page.locator('#email'); // Should be private
  public passwordInput = this.page.locator('#password'); // Should be private
  
  public async login(email: string, password: string): Promise<void> {
    // Forces users to know about internal structure
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
}
```

### 2. ❌ God Objects
```typescript
// ❌ BAD: One class doing everything
class BadApplicationPage extends BasePage {
  // Login functionality
  public async login(email: string, password: string): Promise<void> { }
  
  // Product functionality
  public async searchProducts(query: string): Promise<void> { }
  public async addToCart(productId: string): Promise<void> { }
  
  // User profile functionality
  public async updateProfile(data: any): Promise<void> { }
  
  // Admin functionality
  public async manageUsers(): Promise<void> { }
  
  // Too many responsibilities!
}
```

### 3. ❌ Tight Coupling
```typescript
// ❌ BAD: Tight coupling between pages
class BadProductPage extends BasePage {
  public async addToCartAndGoToCart(): Promise<void> {
    // Directly creating other page objects - tight coupling
    const cartPage = new ShoppingCartPage(this.page, this.config);
    
    await this.addToCart();
    await cartPage.navigate();
  }
}
```

## ✅ Junior Developer Checklist

### Page Object Checklist
- [ ] Each page is a separate class
- [ ] Locators are private and well-named
- [ ] Public methods represent user actions
- [ ] No business logic in page objects
- [ ] Clear separation between pages and tests
- [ ] Reusable components are separate classes
- [ ] Page objects don't know about other pages

### OOP Checklist
- [ ] Proper encapsulation (private/protected/public)
- [ ] Inheritance used appropriately
- [ ] Interfaces define contracts
- [ ] Single responsibility per class
- [ ] No god objects
- [ ] Composition over inheritance where appropriate

### Code Quality Checklist
- [ ] Descriptive method and variable names
- [ ] Comprehensive JSDoc documentation
- [ ] Error handling in place
- [ ] No magic strings or numbers
- [ ] Consistent coding style
- [ ] Unit tests for complex logic

---

## 💡 Remember: Good OOP and POM make tests maintainable and readable!

When in doubt, ask yourself:
- "Does this class have a single, clear responsibility?"
- "Can I understand what this method does from its name?"
- "Are implementation details hidden from users of this class?"
- "Would a junior developer understand this code?"