import { Listener } from "../types";

export class MyActionListener {
  private _listeners: Map<string, Listener[]>;

  constructor() {
    this._listeners = new Map();
  }

  registerListener(action: string, listener: Listener): void {
    if (!this._listeners.has(action)) {
      this._listeners.set(action, []);
    }
    this._listeners.get(action)!.push(listener);
  }

  removeListener(action: string): void {
    this._listeners.delete(action);
  }

  emit(name: string, data: any): void {
    const listeners = this._listeners.get(name);
    if (!listeners) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits`);
    }
    for (const listener of listeners) {
      listener(data);
    }
  }
}
