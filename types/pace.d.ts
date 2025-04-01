declare global {
    interface Pace {
      on(event: string, callback: () => void): void;
    }
  
    const Pace: Pace;
  }
  
  export {};
  