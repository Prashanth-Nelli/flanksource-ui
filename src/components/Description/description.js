import React from "react";

export const Description = React.memo(({ label, value }) => (
  <div>
    <h2 className="text-sm font-medium text-gray-500">{label}</h2>
    <ul className="mt-1 space-y-1">
      <li className="flex justify-start">{value}</li>
    </ul>
  </div>
));

Description.displayName = "Description";
