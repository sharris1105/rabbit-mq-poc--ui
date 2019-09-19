
import { Subject } from 'rxjs';

export function AutoUnsubscribe(constructor: any): any {
  const originalDestroy = constructor.prototype.ngOnDestroy;
  if (typeof originalDestroy !== 'function') {
    // tslint:disable-next-line:no-console
    console.warn(`${constructor.name} is using @TakeUntilDestroy but does not implement OnDestroy`);
  }
  constructor.prototype.componentDestroy = () => {
    // tslint:disable-next-line:no-invalid-this
    this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();

    // tslint:disable-next-line:no-invalid-this
    return this._takeUntilDestroy$.asObservable();
  };

  constructor.prototype.ngOnDestroy = function (): any {
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:no-invalid-this
    originalDestroy && typeof originalDestroy === 'function' && originalDestroy.apply(this, arguments);
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:no-invalid-this
    this._takeUntilDestroy$ && this._takeUntilDestroy$.next() && this._takeUntilDestroy$.complete();
  };
}
