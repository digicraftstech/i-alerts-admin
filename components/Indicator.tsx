import React from 'react';
import {
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  Wifi as WiFiHigh,
  WifiHigh as WiFiMedium,
  WifiLow as WiFiLow,
  WifiZero as WiFiZero,
  type LucideIcon,
  Wifi,
  WifiHigh,
  WifiLow,
  WifiZero,
} from 'lucide-react';

import { cn } from '@/lib/utils';

type IndicatorType = 'battery' | 'signal';

interface IndicatorProps {
  type: IndicatorType;
  level?: number | null;
  className?: string;
}

const Indicator = ({ type, level, className }: IndicatorProps) => {
  const hasValue = typeof level === 'number' && !Number.isNaN(level);

  let Icon: LucideIcon = type === 'battery' ? BatteryMedium : SignalZero;
  let valueText = '--';
  // let toneClasses = 'border-black/10 bg-black/5 text-dark400_light700';
  let toneClasses = '';

  if (type === 'battery') {
    const batteryLevel = hasValue ? Math.max(0, Math.min(100, level)) : null;

    Icon =
      batteryLevel === null
        ? BatteryMedium
        : batteryLevel <= 2
          ? BatteryLow
          : batteryLevel <= 7
            ? BatteryMedium
            : BatteryFull;

    valueText = batteryLevel !== null ? `${batteryLevel * 10}%` : '--';
    toneClasses =
      batteryLevel !== null && batteryLevel <= 2
        ? 'text-level-low'
        : 'text-level-normal';
  } else {
    const signalLevel = hasValue ? level : null;
    const isBars = signalLevel !== null && signalLevel >= 0 && signalLevel <= 5;
    const isLowSignal =
      signalLevel !== null && (isBars ? signalLevel <= 2 : signalLevel < -80);

    Icon =
      signalLevel === null
        ? SignalZero
        : isBars
          ? signalLevel >= 4
            ? WiFiHigh
            : signalLevel >= 3
              ? WiFiMedium
              : signalLevel > 0
                ? WiFiLow
                : WiFiZero
          : signalLevel >= -67
            ? SignalHigh
            : signalLevel >= -80
              ? SignalMedium
              : SignalLow;

    valueText =
      signalLevel === null
        ? '--'
        : isBars
          ? `${signalLevel}/5`
          : signalLevel > 0
            ? `${signalLevel}%`
            : `${signalLevel} dBm`;

    toneClasses = isLowSignal ? 'text-level-low' : 'text-level-normal';
  }

  return (
    <div className={cn('flex items-center text-xs ', toneClasses, className)}>
      <Icon className='h-4 w-4' />
      <span className='subtle-regular '>{valueText}</span>
    </div>
  );
};

export default Indicator;
export type { IndicatorProps, IndicatorType };
