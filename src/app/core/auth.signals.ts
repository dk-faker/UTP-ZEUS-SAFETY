// src/app/core/auth.signals.ts
import { signal, computed } from '@angular/core';

export const isLoggedInSignal = signal<boolean>(false);

export const isAuthenticated = computed(() => isLoggedInSignal());