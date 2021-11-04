import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

export const debounced = (cb, time) => {
    const db = new Subject();
    const sub = db.pipe(debounceTime(time)).subscribe(cb);
    const func = v => db.next(v);
  
    func.unsubscribe = () => sub.unsubscribe();
  
    return func;
  };