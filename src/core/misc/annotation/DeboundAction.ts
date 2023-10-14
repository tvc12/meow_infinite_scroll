import { Annotation } from "@/core/misc/annotation/Annotation";


const toMethodName = (key: PropertyKey): string => {
  return `__di_atomic_action_${String(key)}__`;
}
export const DeboundAction = (delay = 500) =>   {
  let timer: number | null = null;

  return Annotation.create((key: PropertyKey) => toMethodName(key), {
    transformOriginFn: (originFn: () => any, key, args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        originFn();
        timer = null;
      }, delay);
    }
  });
}
