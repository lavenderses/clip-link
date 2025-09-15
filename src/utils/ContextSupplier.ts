enum AppRuntimeContext {
  CRHOME_EXTENSION,
  BROWSER,
}

class ContextSupplier {
  context: AppRuntimeContext

  constructor() {
    if (this.isOnChromeExtension()) {
        this.context = AppRuntimeContext.CRHOME_EXTENSION
    } else {
        this.context = AppRuntimeContext.BROWSER
    }
    console.log(`current context: ${this.context}`)
  }

  getAppRuntimeContext: () => AppRuntimeContext = () => {
    return this.context
  }

  async byContext<T>(
    onChromeExtension: () => Promise<T>,
    onBrowser: () => Promise<T>,
  ): Promise<T> {
    switch (this.context) {
      case AppRuntimeContext.CRHOME_EXTENSION:
        return await onChromeExtension()
      case AppRuntimeContext.BROWSER:
        return await onBrowser()
    }
  }

  private isOnChromeExtension: () => Boolean = () => {
    return typeof chrome !== "undefined" && !!chrome.runtime && !!chrome.runtime.id;
  }
}

export default ContextSupplier
