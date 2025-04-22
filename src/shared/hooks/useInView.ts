import { useState, useEffect, useRef, MutableRefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

type InViewRef<T> = MutableRefObject<T | null>;

export const useInView = <T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [InViewRef<T>, boolean] => {
  const { 
    threshold = 0.1, 
    triggerOnce = false, 
    rootMargin = '0px' 
  } = options;
  
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce, rootMargin]);

  return [ref, isInView];
}; 