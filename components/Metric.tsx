import React from 'react';

interface MetricProps {
  title: string;
  value: string | number;
  unit: string;
  textStyles?: string;
}

const Metric = ({ title, value, unit, textStyles }: MetricProps) => {
  return (
    <>
      <p className={`${textStyles} flex items-center gap-1`}>
        {title}
        <span
          className={`small-regular line-clamp-1 `}
        >{`${value} ${unit}`}</span>
      </p>
    </>
  );
};

export default Metric;
