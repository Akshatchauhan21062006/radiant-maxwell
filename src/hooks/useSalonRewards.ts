import { useState, useEffect } from 'react';
import { INITIAL_SALON_STAMPS, SalonStamp } from '../data/salonDelightsData';

const STORAGE_KEY = 'radiant_salon_stamps_v1';
const USERNAME_KEY = 'radiant_salon_username_v1';

export function useSalonRewards() {
  const [unlockedStamps, setUnlockedStamps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const [userName, setUserName] = useState<string>(() => {
    try {
      return localStorage.getItem(USERNAME_KEY) || '';
    } catch {
      return '';
    }
  });

  const [justUnlocked, setJustUnlocked] = useState<SalonStamp | null>(null);
  const [showDiplomaModal, setShowDiplomaModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedStamps));
    } catch {
      // ignore
    }
  }, [unlockedStamps]);

  useEffect(() => {
    try {
      if (userName) {
        localStorage.setItem(USERNAME_KEY, userName);
      }
    } catch {
      // ignore
    }
  }, [userName]);

  const unlockStamp = (id: 'burn' | 'persona' | 'scroll' | 'poetry') => {
    if (!unlockedStamps[id]) {
      const updated = { ...unlockedStamps, [id]: true };
      setUnlockedStamps(updated);
      const stampMeta = INITIAL_SALON_STAMPS[id];
      if (stampMeta) {
        setJustUnlocked(stampMeta);
        setTimeout(() => {
          setJustUnlocked(null);
        }, 4000);
      }
    }
  };

  const unlockedCount = Object.keys(unlockedStamps).filter(k => unlockedStamps[k]).length;
  const isFellowshipEligible = unlockedCount >= 3;

  return {
    unlockedStamps,
    unlockStamp,
    unlockedCount,
    isFellowshipEligible,
    userName,
    setUserName,
    justUnlocked,
    setJustUnlocked,
    showDiplomaModal,
    setShowDiplomaModal
  };
}
