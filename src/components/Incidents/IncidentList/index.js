import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import responders from "../../../data/responders.json";
import { IncidentSeverity } from "../incident-severity";
import { IncidentStatus } from "../incident-status";

const IncidentItem = React.memo(({ incident }) => {
  const {
    title,
    id,
    created_at: createdAt
    // status
  } = incident;
  const age = dayjs(createdAt).fromNow();
  const navigate = useNavigate();
  const navigateToIncidentDetails = (id) => {
    navigate(`/incidents/${id}`);
  };
  return (
    <tr
      className="last:border-b-0 border-b cursor-pointer"
      onClick={() => navigateToIncidentDetails(id)}
    >
      <td
        colSpan={2}
        className="px-6 py-4 text-gray-900 col-span-2 text-sm leading-5 font-medium"
      >
        {title}
      </td>
      <td className="py-4 px-3">
        <div className="flex flex-row items-center">
          <IncidentSeverity incident={incident} />
        </div>
      </td>
      <td className="px-3 py-4 shrink-0">
        <IncidentStatus incident={incident} />
      </td>
      <td className="px-3 text-gray-500 text-sm py-4">{age}</td>
      <td className="px-3 text-sm py-4" colSpan={2}>
        <div className="flex">
          {responders.map(({ image, name }) => (
            <div
              className="flex flex-row mr-4 items-center justify-between"
              key={name}
            >
              <img
                className="h-6 w-6 rounded-full bg-gray-400"
                src={image}
                alt=""
              />
              <p className="ml-1 text-sm text-dark-gray font-normal">{name}</p>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
});
IncidentItem.displayName = "IncidentItem";

export const IncidentList = React.memo(({ list, ...rest }) => {
  const IncidentItems = useMemo(
    () =>
      list.map((incident) => <IncidentItem incident={incident} key={uuid()} />),
    [list]
  );

  return (
    <div className="border border-gray-200 rounded-md">
      <table className="table-auto w-full" aria-label="table" {...rest}>
        <thead className="rounded-md">
          <tr className="border-b border-gray-200 uppercase bg-column-background rounded-t-md items-center">
            <th
              className="px-6 py-3 text-gray-500 font-medium text-xs col-span-2 text-left"
              colSpan={2}
            >
              Name
            </th>
            <th className="px-3 py-3 text-gray-500 font-medium text-xs text-left">
              Severity
            </th>
            <th className="px-3 py-3 text-gray-500 font-medium text-xs text-left">
              Status
            </th>
            <th className="px-3 py-3 text-gray-500 font-medium text-xs text-left">
              Age
            </th>
            <th
              className="px-3 py-3 text-gray-500 font-medium text-xs col-span-2 text-left"
              colSpan={2}
            >
              Responders
            </th>
          </tr>
        </thead>
        <tbody className="flex-1 overflow-y-auto">{IncidentItems}</tbody>
      </table>
    </div>
  );
});

IncidentList.displayName = "IncidentList";
