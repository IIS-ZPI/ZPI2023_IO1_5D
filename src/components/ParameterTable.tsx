import React from 'react';

interface ParameterTableProps {
  mode: number;
  median: number;
  standardDeviation: number;
  coefficientOfVariation: number;
}

const ParameterTable: React.FC<ParameterTableProps> = ({ mode, median, standardDeviation, coefficientOfVariation }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-xl font-bold">Parameters</h2>
        <div className="mt-4">
          <p className="mb-2">Mode:</p>
          <p className="mb-2">Median:</p>
          <p className="mb-2">Standard deviation:</p>
          <p className="mb-2">Coefficient of variation:</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Values</h2>
        <div className="mt-4">
          <input
            type="text"
            readOnly
            className="mb-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={mode}
          />
          <input
            type="text"
            readOnly
            className="mb-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={median}
          />
          <input
            type="text"
            readOnly
            className="mb-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={standardDeviation}
          />
          <input
            type="text"
            readOnly
            className="mb-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={coefficientOfVariation}
          />
        </div>
      </div>
    </div>
  );
};

export default ParameterTable;
