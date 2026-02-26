# Simple Python Logger

```python
import logging

class Logger:
    def __init__(self, name: str = 'Framework'):
        self.logger = logging.getLogger(name)
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)
    
    def debug(self, message: str, *args):
        self.logger.debug(message, *args)
    
    def info(self, message: str, *args):
        self.logger.info(message, *args)
    
    def warn(self, message: str, *args):
        self.logger.warning(message, *args)
    
    def error(self, message: str, *args):
        self.logger.error(message, *args)

def create_logger(name: str) -> Logger:
    return Logger(name)

# Usage
logger = Logger('Framework')
```

## Usage in Classes

```python
class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.logger = create_logger(self.__class__.__name__)
    
    def some_method(self):
        self.logger.warn('Skipping address verification — field not visible or readonly.', err)